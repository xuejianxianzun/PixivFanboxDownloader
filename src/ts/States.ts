import { EVT } from './EVT'

// 储存需要跨模块使用的、会变化的状态
// 这里的状态不需要持久化保存
// 状态的值通常只由单一的模块修改
class States {
  constructor() {
    this.bindEvents()
  }

  /**指示 settings 是否初始化完毕 */
  public settingInitialized = false

  /**表示下载器是否处于繁忙状态
   *
   * 繁忙：下载器正在抓取作品，或者正在下载文件
   */
  public busy = false

  /**快速下载标记
   *
   * 快速下载模式中不会显示下载面板，并且总是会自动开始下载
   *
   * 启动快速下载时设为 true，下载完成或中止时复位到 false
   */
  public quickCrawl = false

  /**是否处于下载中 */
  public downloading = false

  private bindEvents() {
    window.addEventListener(EVT.list.settingInitialized, () => {
      this.settingInitialized = true
    })

    const idle = [
      EVT.list.crawlFinish,
      EVT.list.downloadPause,
      EVT.list.downloadStop,
      EVT.list.downloadComplete,
    ]

    idle.forEach((type) => {
      window.addEventListener(type, () => {
        this.busy = false
      })
    })

    const busy = [EVT.list.crawlStart, EVT.list.downloadStart]

    busy.forEach((type) => {
      window.addEventListener(type, () => {
        this.busy = true
      })
    })

    // 下载完成，或者下载中止时，复位快速下载类状态
    const resetQuickState = [
      EVT.list.crawlEmpty,
      EVT.list.downloadStop,
      EVT.list.downloadPause,
      EVT.list.downloadComplete,
    ]

    for (const ev of resetQuickState) {
      window.addEventListener(ev, () => {
        this.quickCrawl = false
      })
    }

    window.addEventListener(EVT.list.downloadStart, () => {
      this.downloading = true
    })

    const downloadIdle = [
      EVT.list.downloadPause,
      EVT.list.downloadStop,
      EVT.list.downloadComplete,
    ]
    for (const ev of downloadIdle) {
      window.addEventListener(ev, () => {
        this.downloading = false
      })
    }
  }
}

const states = new States()
export { states }
