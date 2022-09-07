import { EVT } from './EVT'
import { CommonResult, ResultMeta, Result } from './StoreType'

// 存储抓取结果和状态
class Store {
  constructor() {
    this.bindEvents()
  }

  public postIdList: string[] = []

  public resultMeta: ResultMeta[] = [] // 储存抓取结果的元数据
  public result: Result[] = [] // 储存抓取结果

  public crawlCompleteTime: Date = new Date()

  private bindEvents() {
    window.addEventListener(EVT.list.crawlStart, () => {
      this.resetResult()
    })
  }

  private getCommonData(data: ResultMeta): CommonResult {
    return {
      postId: data.postId,
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
    // 因为文本的体积小，所以首先生成文本数据，它会被最早下载。这样不用等待大文件下载完了才下载文本文件
    // 为投稿里的所有的 文本内容 生成一份数据
    if (data.links.text.length > 0) {
      const text = data.links.text.join('\r\n')
      const blob = new Blob([text], {
        type: 'text/plain',
      })
      data.links.url = URL.createObjectURL(blob)
      data.links.size = blob.size
      const result = Object.assign(this.getCommonData(data), data.links)

      this.result.push(result)
    }
    // 为投稿里的每个 files 生成一份数据
    const files = data.files
    for (const fileData of files) {
      const result = Object.assign(this.getCommonData(data), fileData)
      this.result.push(result)
    }
  }

  public resetResult() {
    this.postIdList = []
    this.resultMeta = []
    this.result = []
  }
}

const store = new Store()
export { store }
