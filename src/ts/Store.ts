import { EVT } from './EVT'
import { CommonResult, ResultMeta, Result } from './StoreType'

// 存储抓取结果和状态
class Store {
  constructor() {
    this.bindEvents()
  }

  public postIdList: string[] = []
  /**抓取结果的元数据 */
  private resultMeta: ResultMeta[] = []
  /**抓取结果 */
  public result: Result[] = []
  /**抓取完成的时间 */
  public date: Date = new Date()

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
    // 为投稿里的所有的 文本内容 生成一份数据
    // 但是此时并不会生成文本的 URL，等到下载时才会为其生成 URL
    if (data.links.text.length > 0) {
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
