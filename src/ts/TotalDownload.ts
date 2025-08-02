class TotalDownload {
  /** 记录每天的下载总体积。key 是当天的 date，value 是当天的下载总量（字节数） */
  private data: { [key: string]: number } = {}

  constructor() {
    this.init()
  }

  private init() {
    // 初始化存储
    chrome.runtime.onInstalled.addListener((details) => {
      if (details.reason === 'install') {
        chrome.storage.local.set({ totalDownload: {} }, () => {
          if (chrome.runtime.lastError) {
            console.error('初始化存储失败:', chrome.runtime.lastError.message)
          } else {
            console.log('totalDownload 初始化成功')
          }
        })
      }
    })

    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
      if (request.msg === 'getTotalDownload') {
        // 返回今天的数据
        sendResponse({ total: this.data[this.getDate()] })
      } else if (request.msg === 'getTotalDownloadHistory30') {
        // 返回最近 30 天的数据（虽然可以返回所有数据，但是天数太多的话，前台不好展示）
        this.getLast30DaysData().then((history) => {
          sendResponse({ history })
        })
        // 由于这个 sendResponse 是异步，所以需要返回 true 让消息端口不要关闭
        // Return true to keep the message port open for async response
        return true
      } else {
        // Return false for unhandled messages
        return false
      }
    })

    // 加载 totalDownload
    this.loadTotalDownload()
  }

  private loadTotalDownload() {
    // 使用 setTimeout 延迟加载
    setTimeout(() => {
      chrome.storage.local.get(['totalDownload'], (result) => {
        // 确保 result.totalDownload 是对象
        this.data = result.totalDownload || {}
        // console.log('loaded totalDownload', this.data)
      })
    }, 300)
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
    chrome.storage.local.set({ totalDownload: this.data }, () => {
      // console.log(`更新 ${date} 的下载量: ${this.data[date]} 字节`)
    })
  }

  /**
   * 获取最近 30 天的数据（包括今天），以数组形式返回
   */
  public async getLast30DaysData(): Promise<
    Array<{ date: string; bytes: number }>
  > {
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
