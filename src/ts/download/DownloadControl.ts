// 下载控制
import { EVT } from '../EVT'
import { Tools } from '../Tools'
import {
  downloadArgument,
  DownloadSuccessData,
  SendToBackEndData,
} from './DownloadType'
import { store } from '../Store'
import { log } from '../Log'
import { lang } from '../Lang'
import { Colors } from '../Colors'
import { Download } from './Download'
import { progressBar } from '../ProgressBar'
import { settings } from '../setting/Settings'
import { states } from '../States'
import { ShowSkipCount } from './ShowSkipCount'
import { msgBox } from '../MsgBox'
import { downloadStates } from './DownloadStates'
import { toast } from '../Toast'
import { Config } from '../Config'
import { getTotalDownload } from './GetTotalDownload'
import { createHtmlDocument } from './CreateHtmlDocument'
import { fileName } from '../FileName'
import { FileResult, ResultMeta } from '../StoreType'
import { DateFormat } from '../utils/DateFormat'
import { Utils } from '../utils/Utils'
import { saveData } from '../SaveData'
import browser from 'webextension-polyfill'

interface TaskList {
  [id: string]: {
    index: number
    progressBarIndex: number
  }
}

class DownloadControl {
  constructor() {
    this.createDownloadArea()

    this.bindEvents()

    const skipTipWrap = this.wrapper.querySelector(
      '.skip_tip',
    ) as HTMLSpanElement
    new ShowSkipCount(skipTipWrap)
  }

  private downloadThread: number = 2 // 同时下载的线程数

  private taskBatch = 0 // 标记任务批次，每次重新下载时改变它的值，传递给后台使其知道这是一次新的下载

  private taskList: TaskList = {} // 下载任务列表，使用下载的文件的 id 做 key，保存下载栏编号和它在下载状态列表中的索引

  /**记录每个文件的累计失败次数。以文件的 fileID 为 key，避免不同文件（不同 URL）的失败次数互相混淆。
   *
   * 当一个文件的累计失败次数达到 Config.retryMax 时，不再重试
   */
  private retryCount: Map<string, number> = new Map()

  private downloaded: number = 0 // 已下载的任务数量

  private reTryTimer: number = 0 // 重试下载的定时器

  private wrapper: HTMLDivElement = document.createElement('div')

  private downStatusEl: HTMLSpanElement = document.createElement('span')

  private stop: boolean = false // 是否停止下载

  private pause: boolean = false // 是否暂停下载

  private bindEvents() {
    window.addEventListener(EVT.list.crawlStart, () => {
      this.hideDownloadArea()
      this.reset()
    })

    for (const ev of [EVT.list.crawlFinish, EVT.list.resume]) {
      window.addEventListener(ev, (ev) => {
        // 当恢复了未完成的抓取数据时，将下载状态设置为暂停
        this.pause = ev.type === 'resume'
        // 让开始下载的方法进入任务队列，以便让监听上述事件的其他部分的代码先执行完毕
        window.setTimeout(() => {
          this.readyDownload()
        }, 0)
      })
    }

    window.addEventListener(EVT.list.skipDownload, (ev: CustomEventInit) => {
      const data = ev.detail.data as DownloadSuccessData
      this.downloadSuccess(data)
    })

    // 监听浏览器下载文件后，返回的消息
    browser.runtime.onMessage.addListener((msg: any) => {
      if (!this.taskBatch) {
        return
      }

      // 丢失文件名的情况。对于下载器动态创建的 Blob URL，文件名会是 UUID
      // 对于 Fanbox 原有的 URL，文件名会是 URL 最后一段路径（浏览器会把这段作为默认的文件名）
      if (msg.data?.uuid) {
        log.log(lang.transl('_uuid'), 'filenameUUID')
        msgBox.once('uuidTip', lang.transl('_uuid'), 'show')
        this.pauseDownload()
        // 此时 return，这个文件的下载状态会保持为“下载中”，可以在之后再次下载。
        return
      }

      // 文件下载成功。
      // 当一个文件满足以下条件时，才会触发 downloadSuccess 事件：
      // 1. 它是通过 send_download 消息发送给后台下载的，这样前台才会收到 downloaded 消息
      //    通过 save_file_no_replay 保存的文件（如错误记录 txt）不会写入后台的下载记录，
      //    浏览器下载完成后后台不会向前台回传任何消息
      // 2. 浏览器下载成功（状态变为 complete）且没有出错。
      //    出错时后台回传的是 download_err 消息
      // 3. 文件名正常。如果文件名异常（data.uuid 为 true，如实际文件名是 UUID 或与预期不符），就会在上面 return
      // 4. 前台处于下载轮次中（taskBatch 不为 0）
      if (msg.msg === 'downloaded') {
        EVT.fire('downloadSuccess', msg.data)

        // 文件下载成功，清除它的失败次数记录
        this.retryCount.delete(msg.data.id)

        this.downloadSuccess(msg.data)
      } else if (msg.msg === 'download_err') {
        // 浏览器把文件保存到本地时出错
        if (msg.err === 'USER_CANCELED') {
          // 用户操作导致下载取消的情况，跳过这个文件，不再重试保存它，也不会保存错误 txt 文件。
          // 触发条件如：
          // 用户在浏览器弹出“另存为”对话框时取消保存
          // 用户让 IDM 转接这个下载时
          log.error(lang.transl('_user_canceled_tip'))
          this.logErrorFileInfo(msg.data)
          this.downloadSuccess(msg.data)
          return
        } else {
          // 对于其他所有错误，走统一的重试流程：
          // 尝试重新下载这个文件数次；达到重试上限时，保存一个对应的 txt 文件，不再重试它。
          this.downloadError(msg.data, msg.err)
        }
        EVT.fire('downloadError')
      }
    })

    window.addEventListener(EVT.list.downloadComplete, () => {
      this.setDownStateText(lang.transl('_下载完毕2'), Colors.textSuccess)
      log.success(lang.transl('_下载完毕'))
      log.log('')
      toast.success(lang.transl('_下载完毕2'), {
        position: 'topCenter',
      })
    })
  }

  private logErrorFileInfo(data: DownloadSuccessData) {
    log.error(
      lang.transl('_文件下载出错时显示文件名和网址', data.filename, data.url),
    )
  }

  private setDownloaded() {
    this.downloaded = downloadStates.downloadedCount()

    const text = `${this.downloaded} / ${store.result.length}`
    log.log(text, 'showDownloadProgress')

    // 设置总下载进度条
    progressBar.setTotalProgress(this.downloaded)

    // 所有文件正常下载完毕（跳过下载的文件也算正常下载）
    if (this.downloaded === store.result.length) {
      window.setTimeout(() => {
        // 延后触发下载完成的事件。因为下载完成事件是由上游事件（跳过下载，或下载成功事件）派生的，如果这里不延迟触发，可能导致其他模块先接收到下载完成事件，后接收到上游事件。
        EVT.fire('downloadComplete')
      }, 0)
      this.reset()
    }
  }

  // 显示或隐藏下载区域
  private showDownloadArea() {
    this.wrapper.style.display = 'block'
  }

  private hideDownloadArea() {
    this.wrapper.style.display = 'none'
  }

  // 设置下载状态文本，默认颜色为主题蓝色
  private setDownStateText(str: string, color: string = '') {
    const el = document.createElement('span')
    el.textContent = str
    if (color) {
      el.style.color = color
    }
    this.downStatusEl.innerHTML = ''
    this.downStatusEl.appendChild(el)
  }

  private reset() {
    this.pause = false
    this.stop = false
    clearTimeout(this.reTryTimer)
  }

  private createDownloadArea() {
    const html = `<div class="download_area">
    <div class="centerWrap_btns">
    <button class="startDownload" type="button" style="background:${Colors.bgBlue};" data-xztext="_开始下载"></button>
    <button class="pauseDownload" type="button" style="background:${Colors.bgYellow};" data-xztext="_暂停下载"></button>
    <button class="stopDownload" type="button" style="background:${Colors.bgRed};" data-xztext="_停止下载"></button>
    <button class="previewFileName" type="button" style="background:${Colors.bgGreen};" data-xztext="_预览文件名"></button>
    </div>
    <div class="download_status_text_wrap">
    <span data-xztext="_当前状态"></span>
    <span class="down_status" data-xztext="_未开始下载"></span>
    <span class="skip_tip warn"></span>
    </div>
    </div>`

    this.wrapper = Tools.useSlot('downloadArea', html) as HTMLDivElement
    lang.register(this.wrapper)

    this.downStatusEl = this.wrapper.querySelector(
      '.down_status',
    ) as HTMLSpanElement

    this.wrapper
      .querySelector('.startDownload')!
      .addEventListener('click', () => {
        this.startDownload()
      })

    this.wrapper
      .querySelector('.pauseDownload')!
      .addEventListener('click', () => {
        this.pauseDownload()
      })

    this.wrapper
      .querySelector('.stopDownload')!
      .addEventListener('click', () => {
        this.stopDownload()
      })

    this.wrapper
      .querySelector('.previewFileName')!
      .addEventListener('click', () => {
        EVT.fire('previewFileName')
      })
  }

  // 下载线程设置
  private setDownloadThread() {
    const setThread = settings.downloadThread
    if (
      setThread < 1 ||
      setThread > Config.downloadThreadMax ||
      isNaN(setThread)
    ) {
      // 如果数值非法，则重设为默认值
      this.downloadThread = Config.downloadThreadMax
    } else {
      this.downloadThread = setThread // 设置为用户输入的值
    }

    // 如果剩余任务数量少于下载线程数
    if (store.result.length - this.downloaded < this.downloadThread) {
      this.downloadThread = store.result.length - this.downloaded
    }

    // 重设下载进度条
    progressBar.reset(this.downloadThread, this.downloaded)
  }

  // 抓取完毕之后，已经可以开始下载时，根据一些状态进行处理
  private readyDownload() {
    if (states.busy || store.result.length === 0) {
      return
    }

    this.showDownloadArea()

    this.setDownloaded()

    this.setDownloadThread()

    // 视情况自动开始下载
    if (settings.autoStartDownload || states.quickCrawl) {
      this.startDownload()
    }
  }

  // 开始下载
  private startDownload() {
    // 如果正在下载中，或无图片，则不予处理
    if (states.busy || store.result.length === 0) {
      return
    }

    if (this.pause) {
      // 从上次中断的位置继续下载
      // 把“使用中”的下载状态重置为“未使用”
      downloadStates.resume()
    } else {
      // 如果之前没有暂停任务，也没有进入恢复模式，则重新下载
      // 初始化下载状态列表
      downloadStates.init()
      // 开始新一轮下载，清除每个文件的失败次数记录，重新给予重试机会
      // 注意：暂停后继续下载（上面的分支）不会清除记录，同一轮任务中的失败次数会继续累计
      this.retryCount.clear()
    }

    // 重置一些条件
    this.reset()
    this.setDownloaded()
    this.taskBatch = new Date().getTime() // 修改本批下载任务的标记
    this.setDownloadThread()

    EVT.fire('downloadStart')
    msgBox.resetOnce('totalDownloadLimit')

    // 启动或继续下载，建立并发下载线程
    for (let i = 0; i < this.downloadThread; i++) {
      this.createDownload(i)
    }

    this.setDownStateText(lang.transl('_正在下载中'))

    log.log(lang.transl('_正在下载中'))

    if (Config.mobile) {
      log.warning(lang.transl('_移动端浏览器可能不会建立文件夹的说明'))
      if (Config.isFirefox) {
        log.warning(lang.transl('_在移动版Firefox上提示无法可靠的批量下载'))
      }
    }
  }

  // 暂停下载
  private pauseDownload() {
    clearTimeout(this.reTryTimer)

    if (store.result.length === 0) {
      return
    }

    // 停止的优先级高于暂停。点击停止可以取消暂停状态，但点击暂停不能取消停止状态
    if (this.stop === true) {
      return
    }

    if (this.pause === false) {
      // 如果正在下载中
      if (states.busy) {
        this.pause = true // 发出暂停信号
        EVT.fire('downloadPause')

        this.setDownStateText(lang.transl('_已暂停'), '#f00')
        log.warning(lang.transl('_已暂停'))
        log.log('')
      } else {
        // 不在下载中的话不允许启用暂停功能
        return
      }
    }
  }

  // 停止下载
  private stopDownload() {
    clearTimeout(this.reTryTimer)

    if (store.result.length === 0 || this.stop) {
      return
    }

    this.stop = true
    EVT.fire('downloadStop')

    this.setDownStateText(lang.transl('_已停止'), '#f00')
    log.error(lang.transl('_已停止'))
    log.log('')
    this.pause = false
  }

  private downloadError(data: DownloadSuccessData, err?: string) {
    if (this.pause || this.stop) {
      return false
    }

    const task = this.taskList[data.id]
    if (!task) {
      return false
    }

    // 累计这个文件的失败次数。以 fileID 为 key，不同文件（不同 URL）的失败次数不会互相混淆
    const count = (this.retryCount.get(data.id) || 0) + 1
    this.retryCount.set(data.id, count)

    // 失败次数未达到上限，复位这个任务的状态，再次下载它
    if (count < Config.retryMax) {
      downloadStates.setState(task.index, -1)
      this.createDownload(task.progressBarIndex, err)
      return
    }

    // 失败次数达到上限

    // 在日志里显示这个文件的错误信息
    if (err === 'SERVER_BAD_CONTENT') {
      // 404 错误。文件不存在
      log.error(lang.transl('_文件下载失败因为SERVER_BAD_CONTENT'))
    } else if (err === 'SERVER_FAILED') {
      // 通常是 500 错误，尝试重试下载
      log.error(lang.transl('_文件下载失败因为SERVER_FAILED'))
    } else if (err === 'NETWORK_FAILED') {
      // 网络错误。通常是文件下载了一部分，但最终无法完成下载
      log.error(lang.transl('_文件下载失败因为NETWORK_FAILED'))
    } else {
      // 其他错误
      log.error(lang.transl('_文件下载失败并且错误代码是', err || ''))
    }
    this.logErrorFileInfo(data)
    log.error(lang.transl('_下载器会跳过这个错误文件的提示'))
    log.log('')
    log.error(
      lang.transl('_下载完成后重试出错的文件的提示'),
      'tipRetryDownloadError',
    )
    log.log('')

    // 清除它的失败次数记录，以便下次重新下载时重新给予重试机会
    this.retryCount.delete(data.id)

    // 保存这个文件的错误记录
    this.saveErrorRecord(data, err || '')

    // 把它视为完成，以便开始下载下一个文件
    this.downloadSuccess(data)
  }

  // 为一个多次下载失败的文件，生成一份错误记录 txt 并保存到本地。
  // txt 与原文件在同一个文件夹里、使用相同的命名规则，只是后缀名改为 txt
  private async saveErrorRecord(data: DownloadSuccessData, err: string) {
    // 下载器自己生成的文本文件（正文 txt / HTML）不做错误记录。
    // 它的 url 是 blob，而且它本身就是下载器生成的文件，失败后重新下载即可
    if (data.url.startsWith('blob:')) {
      return
    }

    const task = this.taskList[data.id]
    if (!task) {
      return
    }

    const result = store.result[task.index]
    if (!result || 'text' in result) {
      return
    }

    // 原始文件名（包含完整路径）
    const originalName = fileName.getFileName(result)

    // 错误记录 txt 的文件名：与原始文件同名，仅把末尾的扩展名替换为 txt
    // 注意：不能把 ext 改成 txt 后重新走命名规则，因为命名规则会根据扩展名选用不同的模板
    // （图片一套、非图片另一套），那样生成的记录名可能与原始文件不同名
    const recordName = originalName.replace(/\.[^./]+$/, '') + '.txt'

    const text = [
      lang.transl('_文件下载失败下面是错误信息'),
      '',
      `URL:`,
      data.url,
      '',
      `Error Code:`,
      err,
      '',
      `File:`,
      originalName,
      '',
      'Time:',
      DateFormat.format(new Date(), 'YYYY-MM-DD hh:mm:ss'),
    ].join('\r\n')

    const blob = new Blob([text], {
      type: 'text/plain;charset=utf-8',
    })

    // Firefox Android 不支持 downloads API，使用 a 标签下载错误记录。
    // a 标签不能建立文件夹，所以只保留文件名部分
    if (Config.downloadsAPIDisabled) {
      Utils.downloadFile(
        URL.createObjectURL(blob),
        recordName.split('/').pop() || recordName,
      )
      return
    }

    const sendData: SendToBackEndData = {
      msg: 'save_file_no_replay',
      fileUrl: URL.createObjectURL(blob),
      fileName: recordName,
      // 同名文件冲突时的处理方式由用户设置决定
      conflictAction: settings.conflictAction,
    }

    // 在 Firefox / Chrome 的隐私窗口里下载 blob 文件时，需要携带文件数据，
    // 详见 Config.sendBlob / sendDataURL 的注释
    if (Config.sendDataURL) {
      sendData.dataURL = await Utils.blobToDataURL(blob)
    }
    if (Config.sendBlob) {
      sendData.blob = blob
    }

    // 通过后台脚本把错误记录下载到本地。
    // 使用 save_file_no_replay 消息，该下载不会返回下载状态，不会触发下载成功/失败流程，
    // 也不会影响上述失败次数的统计
    browser.runtime.sendMessage(sendData).catch(() => {})
  }

  private async downloadSuccess(data: DownloadSuccessData) {
    const task = this.taskList[data.id]
    // 更改这个任务状态为“已完成”
    downloadStates.setState(task.index, 1)

    // 增加已下载数量
    this.setDownloaded()

    // 是否继续下载

    // 检查下载总体积限制
    if (settings.totalDownloadLimitSwitch) {
      const total = await getTotalDownload.getToday()
      if (total > settings.totalDownloadLimitByte) {
        this.pauseDownload()
        const msg =
          lang.transl('_下载已暂停原因') +
          '<br>' +
          lang.transl('_达到每天下载的文件大小限制的说明')
        log.warning(msg, 'totalDownloadLimit')
        msgBox.once('totalDownloadLimit', msg, 'warning', {
          title: lang.transl('_已暂停'),
        })
      }
    }

    // 检查是否还有未完成的下载
    const no = task.progressBarIndex
    if (this.checkContinueDownload()) {
      this.createDownload(no)
    }
  }

  // 当一个文件下载完成后，检查是否还有后续下载任务
  private checkContinueDownload() {
    // 如果没有全部下载完毕
    if (this.downloaded < store.result.length) {
      // 如果任务已停止
      if (this.pause || this.stop) {
        return false
      }
      // 如果已完成的数量 加上 线程中未完成的数量，仍然没有达到文件总数，继续添加任务
      if (this.downloaded + this.downloadThread - 1 < store.result.length) {
        return true
      } else {
        return false
      }
    } else {
      return false
    }
  }

  // 查找需要进行下载的作品，建立下载
  // 可选第二个参数：下载失败的错误代码。当错误是 SERVER_FAILED 时，会改用缩略图 url 重试；
  // 如果没有缩略图 url 可用，则保存错误记录并跳过这个文件
  private async createDownload(progressBarIndex: number, errorCode?: string) {
    const index = downloadStates.getFirstDownloadItem()

    if (index === undefined) {
      throw new Error('There are no data to download')
    } else {
      let result = store.result[index]

      // 下载器动态生成的文件内容（Blob）。目前只有文本数据（保存的正文 txt / HTML）会有。
      // 它需要在发送下载消息时一并传给后台：在 Firefox 和 Chrome 的隐私窗口里，
      // 前台生成的 blob URL 无法在后台使用，需要发送文件数据（Blob 或 dataURL），
      // 详见 Config.sendBlob / sendDataURL 的注释
      let fileBlob: Blob | null = null

      // 对于文本数据，此时创建其 URL
      // 空正文的 HTML 也需要生成文件，否则无法保存只有资源的投稿
      if ('text' in result) {
        // 是否以 HTML 格式下载文本。
        // 这里以当前设置为准，而不是以抓取时保存的 ext 为准：
        // 用户可能在抓取之后修改了文本格式设置（例如从 HTML 切换为纯文本），
        // 如果仍按抓取时的 ext 下载，会得到不符合当前设置的 HTML 文件
        const isHtml =
          !!result.htmlData &&
          settings.saveText &&
          settings.textFormat === 'html'

        // 有可保存的文本内容时才生成文件。
        // HTML 模式即使正文为空（text 数组为空）也要生成文件，以便保存只有资源的投稿
        if (isHtml || result.text.length > 0) {
          if (isHtml) {
            // HTML 需要在下载时生成，才能获取其他文件的文件名，从而使用相对路径引用它们。
            // HTML 会尽量引用本地文件，而不是远程 URL（远程 URL 无法显示付费内容）。
            // 如果只使用本次抓取到的文件，就会遗漏被过滤条件排除的文件。例如用户以前下载过某个
            // 投稿的全部文件，这次为了提高速度而在抓取时排除了某些文件类型，那么本次抓取结果里
            // 只有一部分文件，但用户本地其实已有完整的文件。所以这里重新解析该投稿，
            // 不使用任何过滤条件，以获得该投稿的完整文件列表
            // 注意：重新解析只是为了获得完整的文件列表（用于匹配已下载的文件并生成相对路径），
            // 并不会改动 store 里的数据。文件命名（包括 {PVA} 标记）仍然以 store 中的数据为准，
            // 这样 HTML 文件会与本次下载的文件保存在相同的文件夹里，相对路径才能正常工作
            // 也就是说，{PVA} 标记以本次下载为准；以下载新投稿的情况为优先，而不是为了匹配旧文件优先。
            let files: FileResult[] = []
            const fullMeta = saveData.parsePost(result.htmlData!, false)
            if (fullMeta) {
              files = fullMeta.files
            }

            const resultMeta: ResultMeta = {
              postId: result.postId,
              type: result.type,
              title: result.title,
              date: result.date,
              fee: result.fee,
              user: result.user,
              uid: result.uid,
              createID: result.createID,
              tags: result.tags,
              files,
              textContent: result,
            }
            result.text = [
              await createHtmlDocument.create(result.htmlData!, resultMeta),
            ]
            result.ext = 'html'
          } else {
            // 纯文本下载。同时修正扩展名，避免文件名仍使用抓取时保存的 html
            result.ext = 'txt'
          }

          const text = result.text.join('\r\n')
          fileBlob = new Blob([text], {
            type: isHtml
              ? 'text/html;charset=utf-8'
              : 'text/plain;charset=utf-8',
          })
          result.url = URL.createObjectURL(fileBlob)
          result.size = fileBlob.size
        }
      }

      // 如果出现了服务端错误，可能是获取原图时出现错误，改为使用缩略图进行下载
      if (errorCode === 'SERVER_FAILED') {
        if (result.retryUrl) {
          ;[result.url, result.retryUrl] = [result.retryUrl, result.url]
        } else {
          // 如果没有缩略图 URL 可用，则保存对应的错误文件，然后把它视为下载成功，以便继续下载下一个文件
          const data: DownloadSuccessData = {
            url: result.url,
            id: result.fileID,
            filename: fileName.getFileName(result),
            tabId: 0,
            uuid: false,
            size: -1,
          }

          this.saveErrorRecord(data, errorCode)
          return this.downloadSuccess(data)
        }
      }

      const data: downloadArgument = {
        id: result.fileID,
        data: result,
        index: index,
        progressBarIndex: progressBarIndex,
        taskBatch: this.taskBatch,
        // 动态生成的文件（url 是 blob URL）携带文件数据，用于在 Firefox /
        // Chrome 隐私窗口里下载。其他文件（原始 URL）没有 blob，值为 undefined
        blob: fileBlob || undefined,
      }

      // 保存任务信息
      this.taskList[data.data.fileID] = {
        index,
        progressBarIndex: progressBarIndex,
      }

      // 建立下载
      new Download(progressBarIndex, data)
    }
  }
}

new DownloadControl()
