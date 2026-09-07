import browser from 'webextension-polyfill'

// 储存一些配置
// 用户不可以修改这里的配置
class Config {
  /**使用输出面板显示内容时，如果文件数量大于这个值，就不再显示内容，而是保存到 txt 文件 */
  static readonly outputMax = 5000
  /**同时下载的文件数量的最大值 */
  static readonly downloadThreadMax = 3
  /**下载某个文件时，允许的累计失败次数。达到此上限后，跳过该文件 */
  static readonly retryMax = 3
  /**程序名 */
  static readonly appName = 'Pixiv Fanbox Downloader'
  /**下载器设置在 localStorage 里储存时的 name */
  static readonly settingStoreName = 'fanboxSetting'
  /**文件类型。fanbox 允许直接上传在投稿里的文件类型只有这些。现在没有 bmp 格式了，不过以前文章里上传的文件还会保留，所以这里也不要删除 */
  static readonly fileType = {
    image: ['jpg', 'jpeg', 'png', 'gif', 'bmp'],
    music: ['wav', 'mp3', 'flac'],
    video: ['mp4', 'mov', 'avi'],
    compressed: ['zip'],
    ps: ['psd', 'clip'],
    other: ['txt', 'pdf'],
  }
  /**默认的命名规则 */
  static readonly defaultNameRule = '{user}/{date}-{title}/{index}'
  static readonly defaultNameRuleForNonImages = '{user}/{date}-{title}/{name}'
  /**浏览器是否处于移动端模式 */
  static readonly mobile = navigator.userAgent.includes('Mobile')
  /**检测 Firefox 浏览器 */
  static readonly isFirefox = navigator.userAgent.includes('Firefox')
  /** Firefox Android 上不支持 downloads API（调用 downloads.download 等方法会抛出 "Not implemented" 错误），此时需要使用 a 标签来下载文件 */
  static readonly downloadsAPIDisabled = this.isFirefox && this.mobile
  /** 下载下载器动态生成的文件（如保存的正文文件、HTML 文件等）时，Firefox 里无法在后台使用前台生成的 blob URL。
   * 所以发送消息时需要携带 Blob 对象，由后台脚本生成 blob URL 来下载 */
  static readonly sendBlob = this.isFirefox
  /** 在 Chrome 的隐私窗口里下载下载器动态生成的文件时，需要把 blob 对象转换为 dataURL 发送给后台。
   * 不能直接传递 blob，因为隐私窗口里前台传递给后台的数据会被 Chrome 做 JSON 序列化处理，
   * 而 Blob 无法被序列化，后台接收到的 blob 会变成空对象，无法使用。
   * 前台生成的 blob URL 也无法使用，因为后台脚本（spanning 模式）与隐私窗口位于不同的环境里。
   * dataURL 是纯字符串，在所有情况下都可以传递。由于转换为 dataURL 有额外的性能消耗，
   * 所以只有在其他方式都不可用时才使用它
   */
  static readonly sendDataURL =
    !this.isFirefox &&
    // 这个检测只在页面（content script）里有效；在后台脚本里 browser.extension
    // 可能不存在（例如 Chrome MV3 的 Service Worker），此时为 undefined，不影响使用
    browser.extension?.inIncognitoContext
  static readonly whatIsNewFlagDefault = 'xuejian&saber'
}

export { Config }
