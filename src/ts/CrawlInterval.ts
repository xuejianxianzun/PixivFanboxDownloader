import { EVT } from './EVT'
import { lang } from './Lang'
import { log } from './Log'
import { settings } from './setting/Settings'

class CrawlInterval {
  constructor() {
    this.bindEvents()
  }

  private bindEvents() {
    window.addEventListener(EVT.list.crawlStart, () => {
      // 在开始抓取时，如果应用了间隔时间，则显示一条日志提醒
      if (settings.crawlInterval > 0) {
        const msg =
          lang.transl('_抓取间隔') +
          `: ${settings.crawlInterval} ` +
          lang.transl('_秒')
        log.warning(msg, 1, false, 'crawlInterval')
      }
    })
  }

  /**指示下一次抓取在什么时候进行 */
  private nextCrawlTime = 0

  public async wait() {
    if (this.nextCrawlTime > 0) {
      const now = Date.now()
      if (now < this.nextCrawlTime) {
        const waitTime = this.nextCrawlTime - now
        await new Promise((resolve) => setTimeout(resolve, waitTime))
      }
    }
    return true
  }

  public resetNextCrawlTime() {
    this.nextCrawlTime = 0
  }

  /**设置下一次抓取的时间。
   *
   * timeSpan 参数的默认值是 short，即增加用户设定的时间。
   *
   * 可选设置为 long，增加 6 分钟，在发生 429 错误，需要等待一段时间时使用 */
  public addTime(timeSpan: 'short' | 'long' = 'short') {
    const now = Date.now()
    if (timeSpan === 'short') {
      // 对 settings.crawlInterval 进行随机，生成它的 0.8 倍至 1.2 倍之间的数字
      const randomFactor = 0.8 + Math.random() * 0.4
      const interval = settings.crawlInterval * 1000 * randomFactor
      this.nextCrawlTime = now + interval
    } else {
      // 增加 300 - 360 秒之间的随机时间
      const add_time =
        Math.floor(Math.random() * (360000 - 300000 + 1)) + 300000
      this.nextCrawlTime = now + add_time
      log.warning(lang.transl('_下载器会等待几分钟然后再继续抓取'))
    }
  }
}

const crawlInterval = new CrawlInterval()
export { crawlInterval }
