// 下载文件，并发送给浏览器下载
import { EVT } from './EVT'
import { titleBar } from './TitleBar'
import { fileName } from './FileName'
import {
  downloadArgument,
  SendToBackEndData,
  DonwloadSuccessData,
} from './Download.d'
import { progressBar } from './ProgressBar'

class Download {
  constructor(progressBarIndex: number, data: downloadArgument) {
    this.progressBarIndex = progressBarIndex
    this.arg = data

    this.download(data)

    this.listenEvents()
  }

  private progressBarIndex: number
  private arg: downloadArgument

  private fileName = ''
  private stoped = false

  private listenEvents() {
    ;[EVT.events.downloadStop, EVT.events.downloadPause].forEach((event) => {
      window.addEventListener(event, () => {
        this.stoped = true
      })
    })

    window.addEventListener(
      EVT.events.downloadSucccess,
      (event: CustomEventInit) => {
        const donwloadSuccessData = event.detail.data as DonwloadSuccessData

        if (donwloadSuccessData.url === this.arg.data.url) {
          this.setProgressBar(1024, 1024)
        }
      }
    )
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
  private download(arg: downloadArgument) {
    titleBar.change('↓')

    // 获取文件名
    this.fileName = fileName.getFileName(arg.data)

    // 重设当前下载栏的信息
    this.setProgressBar(0, 0)

    // 下载图片

    // 向浏览器发送下载任务
    this.browserDownload(arg.data.url, this.fileName, arg.id, arg.taskBatch)
  }

  // 向浏览器发送下载任务
  private browserDownload(
    url: string,
    fileName: string,
    id: string,
    taskBatch: number
  ) {
    // 如果任务已停止，不会向浏览器发送下载任务
    // if (this.stoped) {
    //   // 释放 bloburl
    //   url.startsWith('blob') && URL.revokeObjectURL(url)
    //   return
    // }

    const sendData: SendToBackEndData = {
      msg: 'send_download',
      fileUrl: url,
      fileName: fileName,
      id,
      taskBatch,
    }

    chrome.runtime.sendMessage(sendData)
  }
}

export { Download }
