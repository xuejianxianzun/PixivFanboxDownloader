import { EVT } from '../EVT'
import { lang } from '../Lang'
import { log } from '../Log'
import { settings } from '../setting/Settings'
import { Config } from '../Config'
import { Utils } from '../utils/Utils'

class DownloadInterval {
  constructor() {
    this.bindEvents()
  }

  /**允许开始下载的时间戳 */
  // 不管设置里的值是多少，初始值都是 0，即允许第一次下载立即开始
  // 在开始下载第一个文件后，才会有实际的值
  private allowDownloadTime = 0

  private bindEvents() {
    window.addEventListener(EVT.list.settingChange, (ev: CustomEventInit) => {
      const data = ev.detail.data as any
      if (data.name === 'downloadInterval') {
        if (data.value === 0) {
          this.reset()
        }
      }
    })

    const resetEvents = [
      EVT.list.crawlFinish,
      EVT.list.downloadStart,
      EVT.list.downloadPause,
      EVT.list.downloadStop,
      EVT.list.downloadComplete,
    ]
    resetEvents.forEach((evt) => {
      window.addEventListener(evt, () => {
        this.reset()
      })
    })

    window.addEventListener(EVT.list.downloadStart, () => {
      // 在开始下载时，如果应用了间隔时间，则显示一条日志提醒
      if (settings.downloadInterval > 0) {
        const msg =
          lang.transl('_下载间隔') +
          `: ${settings.downloadInterval} ` +
          lang.transl('_秒')
        log.warning(msg, 'downloadInterval')
      }
    })
  }

  private reset() {
    this.allowDownloadTime = 0
  }

  private addTime() {
    // 对 settings.downloadInterval 进行随机，生成它的 0.8 倍至 1.2 倍之间的数字
    const randomFactor = 0.8 + Math.random() * 0.4
    const interval = settings.downloadInterval * 1000 * randomFactor
    this.allowDownloadTime = new Date().getTime() + interval
  }

  public wait() {
    return new Promise(async (resolve) => {
      // 首先检查此设置不应该生效的情况，立即放行
      if (settings.downloadInterval === 0) {
        // 在 Firefox Android 上会使用 a 标签下载文件（见 Config.downloadsAPIDisabled）。
        // 如果不添加延迟时间，极端情况下 1 秒内可能会下载几十个文件，浏览器实际上
        // 可能不会下载部分文件，所以强制添加 200 ms 的延迟
        if (Config.downloadsAPIDisabled) {
          await Utils.sleep(200)
        }
        return resolve(true)
      }

      // 可以立即开始下载
      if (new Date().getTime() >= this.allowDownloadTime) {
        this.addTime()
        return resolve(true)
      }

      // 需要等待
      const timer = window.setInterval(() => {
        if (new Date().getTime() >= this.allowDownloadTime) {
          window.clearInterval(timer)
          this.addTime()
          return resolve(true)
        }
      }, 50)
    })
  }
}

const downloadInterval = new DownloadInterval()
export { downloadInterval }
