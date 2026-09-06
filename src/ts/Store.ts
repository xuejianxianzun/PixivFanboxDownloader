import { Config } from './Config'
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

  /**因为价格限制而不能抓取的文章 */
  public skipDueToFee = 0

  /**缓存每个投稿里的图片/视频/音频文件数量，用于生成 {PVA} 标记。key 是 postId */
  private pvaMap: Map<string, { P: number; V: number; A: number }> = new Map()

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
      createID: data.createID,
      tags: data.tags,
    }
  }

  // 添加每个作品的信息。只需要传递有值的属性
  public addResult(data: ResultMeta) {
    this.resultMeta.push(data)
    // 为投稿里的所有的 文本内容 生成一份数据
    // 但是此时并不会生成文本的 URL，等到下载时才会为其生成 URL
    // HTML 可能只有资源，没有纯文本内容
    if (data.textContent.text.length > 0 || data.textContent.htmlData) {
      const result = Object.assign(this.getCommonData(data), data.textContent)

      this.result.push(result)
    }
    // 为投稿里的每个 files 生成一份数据
    const files = data.files
    // 统计并缓存本投稿里的图片/视频/音频文件数量，供生成 {PVA} 标记使用
    // 在把本投稿的所有文件都加入 result 之后再设置缓存，确保数值是完整的
    const pva = { P: 0, V: 0, A: 0 }
    for (const fileData of files) {
      const result = Object.assign(this.getCommonData(data), fileData)
      this.result.push(result)

      const ext = fileData.ext.toLowerCase()
      if (Config.fileType.image.includes(ext)) {
        pva.P++
      } else if (Config.fileType.video.includes(ext)) {
        pva.V++
      } else if (Config.fileType.music.includes(ext)) {
        pva.A++
      }
    }
    this.pvaMap.set(data.postId, pva)
    // console.log(this.result)
  }

  public resetResult() {
    this.postIdList = []
    this.resultMeta = []
    this.result = []
    this.skipDueToFee = 0
    // 清空缓存。因为重新抓取时 result 会被重置并重新生成，旧的缓存已经失效
    this.pvaMap.clear()
  }

  /**
   * 获取一个投稿里的图片/视频/音频文件数量，用于生成 {PVA} 标记。
   * 正常情况下数量在 addResult 时已经缓存；如果缓存中没有（例如从存档恢复任务时直接整体赋值了 result），
   * 则在这里遍历 result 现场统计一次，并把结果缓存起来。
   */
  public getPva(postId: string) {
    const cached = this.pvaMap.get(postId)
    if (cached) {
      return cached
    }

    const pva = { P: 0, V: 0, A: 0 }
    for (const item of this.result) {
      if (item.postId !== postId) {
        continue
      }
      const ext = item.ext.toLowerCase()
      if (Config.fileType.image.includes(ext)) {
        pva.P++
      } else if (Config.fileType.video.includes(ext)) {
        pva.V++
      } else if (Config.fileType.music.includes(ext)) {
        pva.A++
      }
    }
    this.pvaMap.set(postId, pva)
    return pva
  }
}

const store = new Store()
export { store }
