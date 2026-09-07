import { EVT } from '../EVT'
import { fileName } from '../FileName'
import {
  downloadArgument,
  SendToBackEndData,
  DownloadSuccessData,
  DonwloadSkipData,
} from './DownloadType'
import { progressBar } from '../ProgressBar'
import { downloadRecord } from './DownloadRecord'
import { lang } from '../Lang'
import { log } from '../Log'
import { states } from '../States'
import { downloadInterval } from './DownloadInterval'
import browser from 'webextension-polyfill'
import { Utils } from '../utils/Utils'
import { Config } from '../Config'

class Download {
  constructor(progressBarIndex: number, data: downloadArgument) {
    this.progressBarIndex = progressBarIndex
    this.arg = data

    this.download(data)

    this.bindEvents()
  }

  private progressBarIndex: number
  private arg: downloadArgument

  private fileName = ''

  private bindEvents() {
    window.addEventListener(
      EVT.list.downloadSuccess,
      (event: CustomEventInit) => {
        const donwloadSuccessData = event.detail.data as DownloadSuccessData

        if (donwloadSuccessData.url === this.arg.data.url) {
          this.setProgressBar(1024, 1024)
        }
      },
    )
  }

  // 跳过下载这个文件。可以传入用于提示的文本
  private skipDownload(data: DonwloadSkipData, msg?: string) {
    if (msg) {
      log.warning(msg)
    }
    if (states.downloading) {
      EVT.fire('skipDownload', data)
    }
  }

  // 设置进度条信息
  private setProgressBar(loaded: number, total: number) {
    progressBar.setProgress(this.progressBarIndex, {
      name: this.fileName,
      loaded: loaded,
      total: total,
    })
  }

  // 下载文件
  private async download(arg: downloadArgument) {
    this.fileName = fileName.getFileName(arg.data)

    // 检查是否是重复文件
    const url = arg.data.url
    if (!url.startsWith('blob')) {
      const duplicate = await downloadRecord.checkDeduplication(arg.data)
      if (duplicate) {
        return this.skipDownload(
          {
            id: arg.id,
            reason: 'duplicate',
          },
          lang.transl('_跳过下载因为重复文件', this.fileName),
        )
      }
    }

    await downloadInterval.wait()

    // 重设当前下载栏的信息
    this.setProgressBar(0, 0)

    // 向浏览器发送下载任务
    this.browserDownload(url, this.fileName, arg.id, arg.taskBatch)
  }

  // 向浏览器发送下载任务
  private async browserDownload(
    url: string,
    fileName: string,
    id: string,
    taskBatch: number,
  ) {
    // Firefox Android 不支持 downloads API，改为使用 a 标签下载文件
    if (Config.downloadsAPIDisabled) {
      // a 标签不能建立文件夹，所以移除路径部分，只保留文件名
      const lastName = fileName.split('/').pop() || fileName
      Utils.downloadFile(url, lastName)
      // 向后台发送消息，使其模拟返回一个下载成功的消息，让下载流程得以继续。
      // 注意：这个分支不携带文件数据，只传递任务信息即可
      browser.runtime
        .sendMessage({
          msg: 'save_work_file_a_download',
          fileUrl: url,
          fileName: fileName,
          id,
          taskBatch,
        })
        .catch((error) => {
          // 消息发送失败时打印错误，避免下载任务卡住却没有提示
          console.error('发送 save_work_file_a_download 消息失败', error)
        })
      return
    }

    const sendData: SendToBackEndData = {
      msg: 'send_download',
      fileUrl: url,
      fileName: fileName,
      id,
      taskBatch,
      conflictAction: this.arg.conflictAction,
    }

    // 下载器动态生成的文件（url 是 blob URL）在 Firefox 和 Chrome 的隐私窗口里
    // 不能直接使用前台生成的 blob URL 下载，需要同时携带文件数据。
    // 详见 Config.sendBlob / sendDataURL 的注释
    if (url.startsWith('blob:') && this.arg.blob) {
      if (Config.sendDataURL) {
        sendData.dataURL = await Utils.blobToDataURL(this.arg.blob)
      }
      if (Config.sendBlob) {
        sendData.blob = this.arg.blob
      }
    }

    browser.runtime.sendMessage(sendData).catch((error) => {
      // 消息发送失败时打印错误（例如扩展被更新后 context invalidated）
      console.error('发送下载消息失败', error)
    })
  }
}

export { Download }
