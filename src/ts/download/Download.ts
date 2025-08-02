// 下载文件，并发送给浏览器下载
import { EVT } from '../EVT'
import { fileName } from '../FileName'
import {
  downloadArgument,
  SendToBackEndData,
  DonwloadSuccessData,
  DonwloadSkipData,
} from './DownloadType'
import { progressBar } from '../ProgressBar'
import { downloadRecord } from './DownloadRecord'
import { lang } from '../Lang'
import { log } from '../Log'
import { states } from '../States'
import { downloadInterval } from './DownloadInterval'

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
        const donwloadSuccessData = event.detail.data as DonwloadSuccessData

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
  private browserDownload(
    url: string,
    fileName: string,
    id: string,
    taskBatch: number,
  ) {
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
