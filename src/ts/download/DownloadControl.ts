// 下载控制
import { EVT } from '../EVT'
import { Tools } from '../Tools'
import {
  downloadArgument,
  DonwloadSuccessData,
  DownloadedMsg,
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
      '.skip_tip'
    ) as HTMLSpanElement
    new ShowSkipCount(skipTipWrap)
  }

  private readonly downloadThreadMax: number = 6 // 同时下载的线程数的最大值，也是默认值

  private downloadThread: number = 3 // 同时下载的线程数

  private taskBatch = 0 // 标记任务批次，每次重新下载时改变它的值，传递给后台使其知道这是一次新的下载

  private taskList: TaskList = {} // 下载任务列表，使用下载的文件的 id 做 key，保存下载栏编号和它在下载状态列表中的索引

  private downloaded: number = 0 // 已下载的任务数量

  private reTryTimer: number = 0 // 重试下载的定时器

  private wrapper: HTMLDivElement = document.createElement('div')

  private downStatusEl: HTMLSpanElement = document.createElement('span')

  private stop: boolean = false // 是否停止下载

  private pause: boolean = false // 是否暂停下载

  private readonly msgFlag = 'uuidTip'

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
      // 跳过下载的文件不会触发 downloadSuccess 事件
      const data = ev.detail.data as DonwloadSuccessData
      this.downloadSuccess(data)
    })

    // 监听浏览器下载文件后，返回的消息
    chrome.runtime.onMessage.addListener((msg: DownloadedMsg) => {
      if (!this.taskBatch) {
        return
      }

      // UUID 的情况
      if (msg.data?.uuid) {
        log.error(lang.transl('_uuid'))
        msgBox.once(this.msgFlag, lang.transl('_uuid'), 'error')
      }

      // 文件下载成功
      if (msg.msg === 'downloaded') {
        EVT.fire('downloadSuccess', msg.data)

        this.downloadSuccess(msg.data)
      } else if (msg.msg === 'download_err') {
        // 浏览器把文件保存到本地时出错
        if (msg.err === 'SERVER_BAD_CONTENT') {
          log.error(
            `${msg.data.url} Download error! Code: ${msg.err}. 404: file does not exist.`
          )
          // 404 错误不重试下载
        } else {
          log.error(
            `${msg.data.url} Download error! Code: ${msg.err}. Will try again later.`
          )

          // 重新下载这个文件
          this.downloadError(msg.data, msg.err)
        }
        EVT.fire('downloadError')
      }

      // UUID 的情况
      if (msg.data && msg.data.uuid) {
        log.error(lang.transl('_uuid'))
      }
    })

    window.addEventListener(EVT.list.downloadComplete, () => {
      log.success(lang.transl('_下载完毕'), 2)
      toast.success(lang.transl('_下载完毕2'), {
        position: 'topCenter',
      })
    })
  }

  private setDownloaded() {
    this.downloaded = downloadStates.downloadedCount()

    const text = `${this.downloaded} / ${store.result.length}`
    log.log(text, 2, false)

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
      '.down_status'
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
      setThread > this.downloadThreadMax ||
      isNaN(setThread)
    ) {
      // 如果数值非法，则重设为默认值
      this.downloadThread = this.downloadThreadMax
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
    }

    // 重置一些条件
    this.reset()
    this.setDownloaded()
    this.taskBatch = new Date().getTime() // 修改本批下载任务的标记
    this.setDownloadThread()

    EVT.fire('downloadStart')

    // 启动或继续下载，建立并发下载线程
    for (let i = 0; i < this.downloadThread; i++) {
      this.createDownload(i)
    }

    this.setDownStateText(lang.transl('_正在下载中'))

    log.log(lang.transl('_正在下载中'))
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
        log.warning(lang.transl('_已暂停'), 2)
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
    log.error(lang.transl('_已停止'), 2)
    this.pause = false
  }

  private downloadError(data: DonwloadSuccessData, err?: string) {
    if (this.pause || this.stop) {
      return false
    }
    const task = this.taskList[data.id]
    // 复位这个任务的状态
    downloadStates.setState(task.index, -1)
    // 建立下载任务，再次下载它
    // 如果出现了服务端错误，可能是获取原图时出现错误，改为使用缩略图进行下载
    this.createDownload(task.progressBarIndex, err === 'SERVER_FAILED')
  }

  private downloadSuccess(data: DonwloadSuccessData) {
    const task = this.taskList[data.id]
    // 更改这个任务状态为“已完成”
    downloadStates.setState(task.index, 1)

    // 增加已下载数量
    this.setDownloaded()

    // 是否继续下载
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
  // 可选第二个参数：使用缩略图 url 而不是原图 url 进行下载
  private createDownload(progressBarIndex: number, useThumb: boolean = false) {
    const index = downloadStates.getFirstDownloadItem()

    if (index === undefined) {
      throw new Error('There are no data to download')
    } else {
      let result = store.result[index]

      // 对于文本数据，此时创建其 URL
      if ((result as any).text && (result as any).text.length > 0) {
        const text = (result as any).text.join('\r\n')
        const blob = new Blob([text], {
          type: 'text/plain',
        })
        result.url = URL.createObjectURL(blob)
        result.size = blob.size
      }

      if (useThumb && result.retryUrl) {
        ;[result.url, result.retryUrl] = [result.retryUrl, result.url]
      }
      const data: downloadArgument = {
        id: result.fileId,
        data: result,
        index: index,
        progressBarIndex: progressBarIndex,
        taskBatch: this.taskBatch,
      }

      // 保存任务信息
      this.taskList[data.data.fileId] = {
        index,
        progressBarIndex: progressBarIndex,
      }

      // 建立下载
      new Download(progressBarIndex, data)
    }
  }
}

new DownloadControl()
