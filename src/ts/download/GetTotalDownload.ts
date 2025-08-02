import { EVT } from '../EVT'
import { lang } from '../Lang'
import { log } from '../Log'
import { msgBox } from '../MsgBox'

type History = { history: { date: string; bytes: number }[] }

class GetTotalDownload {
  constructor() {
    this.bindEvents()
  }

  private bindEvents() {
    window.addEventListener(
      EVT.list.totalDownloadHistory,
      (ev: CustomEventInit) => {
        this.getHistory30Day()
      },
    )
  }

  public async getToday() {
    return new Promise<number>((resolve, reject) => {
      chrome.runtime.sendMessage(
        {
          msg: 'getTotalDownload',
        },
        (response) => {
          // response: { total: number }
          const total = response?.total || -1
          return resolve(total)
        },
      )
    })
  }

  private getHistory30Day() {
    chrome.runtime.sendMessage(
      {
        msg: 'getTotalDownloadHistory30',
      },
      (response: History) => {
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
