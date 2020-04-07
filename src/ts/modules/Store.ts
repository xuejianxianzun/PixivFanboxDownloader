// 仓库
import { EVT } from './EVT'
import { Result } from './Store.d'

// 存储抓取结果和状态
class Store {
  constructor() {
    this.bindEvents()
  }

  public result: Result[] = [] // 储存抓取结果

  public PostIdList: string[] = [] // 储存从列表中抓取到的作品的 id

  private bindEvents() {
    const allowWorkTrue = [
      EVT.events.crawlFinish,
      EVT.events.crawlEmpty,
      EVT.events.crawlError,
      EVT.events.downloadPause,
      EVT.events.downloadStop,
    ]

    allowWorkTrue.forEach((type) => {
      window.addEventListener(type, () => {
        this.states.allowWork = true
      })
    })

    const allowWorkFalse = [EVT.events.crawlStart, EVT.events.downloadStart]

    allowWorkFalse.forEach((type) => {
      window.addEventListener(type, () => {
        this.states.allowWork = false
      })
    })

    window.addEventListener(EVT.events.crawlStart, () => {
      this.resetResult()
    })

    window.addEventListener(EVT.events.downloadComplete, () => {
      this.resetStates()
    })
  }

  // 添加每个作品的信息。只需要传递有值的属性
  public addResult(data: Result) {
    this.result.push(data)
  }

  // 储存和下载有关的状态
  public states = {
    allowWork: true, // 当前是否允许展开工作（如果抓取未完成、下载未完成则应为 false
    quickDownload: false, // 快速下载当前作品，这个只在作品页内直接下载时使用
  }

  public resetResult() {
    this.result = []
    this.PostIdList = []
  }

  public resetStates() {
    this.states.allowWork = true
    this.states.quickDownload = false
  }
}

const store = new Store()
export { store }
