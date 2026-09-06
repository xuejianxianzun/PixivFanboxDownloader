import { EVT } from '../EVT'
import { lang } from '../Lang'
import { msgBox } from '../MsgBox'

type History = { history: { date: string; bytes: number }[] }

class GetTotalDownload {
  constructor() {
    this.bindEvents()
  }

  private bindEvents() {
    window.addEventListener(EVT.list.totalDownloadHistory, () => {
      this.getHistory30Day()
    })
  }

  /**
   * 向后台脚本发送消息，并等待其返回响应。
   *
   * 后台脚本是 MV3 的 Service Worker，可能已经被浏览器回收。当它被回收后，
   * 第一次发送消息时它需要重新启动，此时可能拿不到响应（response 为 undefined
   * 或 null，同时会设置 chrome.runtime.lastError）。等待片刻后重试即可成功，
   * 所以这里在拿到响应之前会按指定次数自动重试。
   */
  private sendMessageWithRetry<T>(
    msg: string,
    maxRetry: number,
    callback: (response: T | undefined) => void,
  ) {
    chrome.runtime.sendMessage({ msg }, (response) => {
      // 后台脚本未就绪时，response 可能是 undefined 或 null，并且 lastError 会被设置
      if (
        chrome.runtime.lastError ||
        response === undefined ||
        response === null
      ) {
        if (maxRetry > 0) {
          // 等待后台脚本完成启动，然后再次发送消息
          window.setTimeout(() => {
            this.sendMessageWithRetry(msg, maxRetry - 1, callback)
          }, 500)
        } else {
          // 重试次数已用尽，此时以 undefined 告知调用方
          callback(undefined)
        }
        return
      }
      callback(response as T)
    })
  }

  public async getToday() {
    return new Promise<number>((resolve) => {
      this.sendMessageWithRetry<{ total?: number }>(
        'getTotalDownload',
        2,
        (response) => {
          // response: { total: number }
          const total = response?.total || -1
          return resolve(total)
        },
      )
    })
  }

  private getHistory30Day() {
    this.sendMessageWithRetry<History>(
      'getTotalDownloadHistory30',
      2,
      (response) => {
        // 多次重试后仍然没有获取到数据。可能的情况：
        // - 后台脚本之前被回收了，现在重试数次之后仍然没能获取到数据
        // - 用户在安装这个扩展后从来没有下载过文件，没有记录，此时 response 是 undefined
        if (!response) {
          console.log('getTotalDownloadHistory30 response:', response)
          msgBox.warning(lang.transl('_没有数据可供使用'))
          return
        }

        // response.history 例如：
        // [{date: '2025-08-03', bytes: 18431824}]
        if (response.history.length === 0) {
          msgBox.warning(lang.transl('_没有数据可供使用'))
          return
        }

        const array: string[] = []
        response.history.forEach(({ date, bytes }) => {
          // 选择显示单位
          let size = ''
          const MiB = bytes / 1024 / 1024
          const GiB = MiB / 1024
          if (GiB < 1) {
            size = `${MiB.toFixed(2)} MiB`
          } else {
            size = `${GiB.toFixed(2)} GiB`
          }

          array.push(`<p><span>${date}</span> <span>${size}</span></p>`)
        })

        // 显示历史记录
        const html = `<div id="downloadTotal30Day">
        <style>
          #downloadTotal30Day span{width:30%;display: inline-block;}
        </style>
        ${array.join('')}
        </div>`
        msgBox.show(html, {
          title: lang.transl('_最近30天内的下载记录'),
        })
      },
    )
  }
}

const getTotalDownload = new GetTotalDownload()
export { getTotalDownload }
