// 储存一些配置
// 用户不可以修改这里的配置
class Config {
  /**使用输出面板显示内容时，如果文件数量大于这个值，就不再显示内容，而是保存到 txt 文件 */
  static readonly outputMax = 5000
  /**同时下载的文件数量的最大值 */
  static readonly downloadThreadMax = 3
  /**下载某个文件出错时，最大重试次数 */
  static readonly retryMax = 10
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
}

export { Config }
