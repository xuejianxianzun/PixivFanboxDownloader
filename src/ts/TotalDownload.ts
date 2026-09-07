import browser from 'webextension-polyfill'

class TotalDownload {
  /** 记录每天的下载总体积。key 是当天的 date，value 是当天的下载总量（字节数） */
  private data: { [key: string]: number } = {}

  constructor() {
    this.init()
  }

  private init() {
    // 初始化存储
    browser.runtime.onInstalled.addListener(async (details) => {
      if (details.reason === 'install') {
        try {
          await browser.storage.local.set({ totalDownload: {} })
          console.log('totalDownload 初始化成功')
        } catch (error) {
          console.error('初始化存储失败:', error)
        }
      }
    })

    // 监听消息，返回数据。
    // 注意：监听器本身不能是 async 函数。因为 async 函数总是返回 Promise，
    // 会被当作对消息的异步响应。如果监听器对与本模块无关的消息也返回 Promise，
    // 就会抢先返回一个 undefined 响应，导致真正处理该消息的其他监听器无法返回数据。
    // 所以这里在监听器里同步判断消息类型，只对本模块处理的消息返回异步处理结果。
    // 对于其他消息，监听器同步结束（返回 undefined），不会产生响应。
    browser.runtime.onMessage.addListener((request: any) => {
      if (request.msg === 'getTotalDownload') {
        return this.getTodayData()
      } else if (request.msg === 'getTotalDownloadHistory30') {
        return this.getHistory30Day()
      }
    })

    // 加载 totalDownload
    setTimeout(() => {
      this.restore()
    }, 0)
  }

  private async restore() {
    const result = await browser.storage.local.get(['totalDownload'])
    this.data = (result.totalDownload as { [key: string]: number }) || {}
  }

  // 返回今天的数据（供消息监听器使用）
  private async getTodayData() {
    return { total: this.data[this.getDate()] }
  }

  // 返回最近 30 天的数据（供消息监听器使用）。虽然可以返回所有数据，
  // 但是天数太多的话，前台不好展示
  private async getHistory30Day() {
    const history = await this.getLast30DaysData()
    return { history }
  }

  /** 生成 YYYY-MM-DD 格式的当前日期 */
  private getDate(): string {
    const date = new Date()
    const year = date.getFullYear()
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const day = date.getDate().toString().padStart(2, '0')
    return `${year}-${month}-${day}`
  }

  // 添加下载量
  public addDownload(bytes: number) {
    const date = this.getDate()
    this.data[date] = (this.data[date] || 0) + bytes
    // 写入存储失败不影响内存中的数据，忽略错误
    browser.storage.local.set({ totalDownload: this.data }).catch(() => {})
  }

  /**
   * 获取最近 30 天的数据（包括今天），以数组形式返回
   */
  public async getLast30DaysData(): Promise<
    Array<{ date: string; bytes: number }>
  > {
    // 如果是空对象，可能尚未从 local storage 里加载数据，尝试重新加载一次
    // 例如后台脚本被回收了，前台却要查看数据, 于是后台脚本被再次执行，此时可能还是默认值
    if (Object.keys(this.data).length === 0) {
      await this.restore()
    }

    const today = new Date()
    const thirtyDaysAgo = new Date(today)
    thirtyDaysAgo.setDate(today.getDate() - 29)

    const result = Object.entries(this.data)
      .filter(([dateStr]) => {
        // 添加 T00:00:00 使日期初始化为本地时间 0 点
        // 如果不带 T 部分，JavaScript 会假设时间为 UTC 时间的 00:00:00
        // 然后，Date 对象会将这个 UTC 时间转换为本地时区（如香港标准时间为 GMT+0800）
        // 如果带 T，且不带时区标识符（如 Z 或 +08:00）时，JavaScript 会假定它是本地时间
        // 也就是 GMT+0000

        // 由于下载器在储存记录时，是使用 new Date() 来获取年月日的，这是本地时间
        // 所以这里对比时间时，也要初始化为本地时间，即指明 T00:00:00
        const date = new Date(dateStr + 'T00:00:00')
        return !isNaN(date.getTime()) && date >= thirtyDaysAgo && date <= today
      })
      .map(([date, bytes]) => ({ date, bytes }))

    return result
  }
}

const totalDownload = new TotalDownload()
export { totalDownload }
