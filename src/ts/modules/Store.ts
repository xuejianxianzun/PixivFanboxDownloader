// 仓库
import { EVT } from './EVT'
import { CommonResult, ResultMeta, Result } from './Store.d'

// 存储抓取结果和状态
class Store {
  constructor() {
    this.bindEvents()
  }

  public resultMeta: ResultMeta[] = [] // 储存抓取结果的元数据
  public result: Result[] = [] // 储存抓取结果

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

  private getCommonData(data: ResultMeta): CommonResult {
    return {
      id: data.id,
      type: data.type,
      title: data.title,
      date: data.date,
      fee: data.fee,
      user: data.user,
      uid: data.uid,
      tags: data.tags,
    }
  }

  // 添加每个作品的信息。只需要传递有值的属性
  public addResult(data: ResultMeta) {
    this.resultMeta.push(data)

    // 为投稿里的每个 files 生成一份数据
    const files = data.files
    for (const fileData of files) {
      const result = Object.assign(this.getCommonData(data), fileData)
      this.result.push(result)
    }
    // 为投稿里的所有 text 生成一份数据
    if (data.links.text.length > 0) {
      const text = data.links.text.join('\r\n')
      const blob = new Blob([text], {
        type: 'text/plain',
      })
      data.links.url = URL.createObjectURL(blob)
      const result = Object.assign(this.getCommonData(data), data.links)
      this.result.push(result)
    }
  }

  // 储存和下载有关的状态
  public states = {
    allowWork: true, // 当前是否允许展开工作（如果抓取未完成、下载未完成则应为 false
    quickDownload: false, // 快速下载当前作品，这个只在作品页内直接下载时使用
  }

  public resetResult() {
    this.resultMeta = []
    this.result = []
  }

  public resetStates() {
    this.states.allowWork = true
    this.states.quickDownload = false
  }
}

const store = new Store()
export { store }
