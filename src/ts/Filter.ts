import { log } from './Log'
import { EVT } from './EVT'
import { Config } from './Config'
import { SettingKeys, settings } from './setting/Settings'
import { msgBox } from './MsgBox'
import { lang } from './Lang'

/** 过滤选项，所有字段都是可选的 */
interface FilterOption {
  /**文章 ID */
  id?: number | string
  /**文章发布日期 */
  date?: string
  /**文章价格 */
  fee?: number
  /**文件扩展名 */
  ext?: string
  /**文章标题 */
  title?: string
  /**文件名（原名，不是下载器重命名后的名字） */
  name?: string
}

// 审查每个文件的数据，决定是否要下载它
class Filter {
  constructor() {
    this.bindEvents()
  }

  // 对启用了的过滤选项显示提示
  private showTip() {
    this.getFeeType()
    this.getFeeRange()
    this.getIdRange()
    this.getPostDate()
    this.getTitleMustText()
    this.getTitleCannotText()
    this.getFileNameIncludes()
    this.getFileNameExcludes()
  }

  private getFeeType() {
    if (settings.free && settings.pay) {
      return
    }

    let msg = ''
    if (settings.free) {
      msg = `${lang.transl('_费用类型')}: ${lang.transl('_免费投稿')}`
    }
    if (settings.pay) {
      msg = `${lang.transl('_费用类型')}: ${lang.transl('_付费投稿')}`
    }
    log.warning(msg)
  }

  private getFeeRange() {
    if (!settings.feeSwitch) {
      return
    }

    const msg = `${lang.transl('_价格范围')}: ${lang.transl('_最小值')} ${
      settings.fee
    }¥`
    log.warning(msg)
  }

  // 提示 id 范围设置
  private getIdRange() {
    if (!settings.idRangeSwitch) {
      return
    }

    log.warning(`id ${settings.idRange} ${settings.idRangeInput}`)
  }

  // 提示投稿时间设置
  private getPostDate() {
    if (!settings.postDate) {
      return
    }

    if (isNaN(settings.postDateStart) || isNaN(settings.postDateStart)) {
      const msg = lang.transl('_日期时间格式错误')
      this.showWarning(msg)
    } else {
      const start = new Date(settings.postDateStart).toLocaleString()
      const end = new Date(settings.postDateEnd).toLocaleString()
      log.warning(`${lang.transl('_时间范围')}: ${start} - ${end}`)
    }
  }

  private getTitleMustText() {
    if (!settings.titleMustTextSwitch) {
      return
    }

    const msg = `${lang.transl(
      '_投稿标题必须含有文字'
    )}: ${settings.titleMustText.toString()}`
    log.warning(msg)
  }

  private getTitleCannotText() {
    if (!settings.titleCannotTextSwitch) {
      return
    }

    const msg = `${lang.transl(
      '_投稿标题不能含有文字'
    )}: ${settings.titleCannotText.toString()}`
    log.warning(msg)
  }

  private getFileNameIncludes() {
    if (
      !settings.fileNameIncludeSwitch &&
      settings.fileNameInclude.length > 0
    ) {
      return
    }

    const msg = `${lang.transl(
      '_文件名中必须含有文字'
    )}: ${settings.fileNameInclude.toString()}`
    log.warning(msg)
  }

  private getFileNameExcludes() {
    if (
      !settings.fileNameExcludeSwitch &&
      settings.fileNameExclude.length > 0
    ) {
      return
    }

    const msg = `${lang.transl(
      '_文件名中不能含有文字'
    )}: ${settings.fileNameExclude.toString()}`
    log.warning(msg)
  }

  // 检查投稿是否符合过滤器的要求
  // 想要检查哪些数据就传递哪些数据，不需要传递 FilterOption 的所有选项
  public check(option: FilterOption) {
    if (!this.checkFileType(option.ext)) {
      return false
    }

    if (!this.checkfeeType(option.fee)) {
      log.warning(
        lang.transl('_跳过文章因为', option.title!) + lang.transl('_费用类型')
      )
      return false
    }

    if (!this.checkfeeRange(option.fee)) {
      log.warning(
        lang.transl('_跳过文章因为', option.title!) + lang.transl('_价格范围')
      )
      return false
    }

    if (!this.checkIdRange(option.id)) {
      log.warning(
        lang.transl('_跳过文章因为', option.title!) + lang.transl('_id范围')
      )
      return false
    }

    if (!this.checkPostDate(option.date)) {
      log.warning(
        lang.transl('_跳过文章因为', option.title!) + lang.transl('_投稿时间')
      )
      return false
    }

    if (!this.checkTitltMustText(option.title)) {
      log.warning(
        lang.transl('_跳过文章因为', option.title!) +
          lang.transl('_投稿标题必须含有文字')
      )
      return false
    }

    if (!this.checkTitltCannotText(option.title)) {
      log.warning(
        lang.transl('_跳过文章因为', option.title!) +
          lang.transl('_投稿标题不能含有文字')
      )
      return false
    }

    if (!this.checkFileNameInclude(option.name)) {
      log.warning(
        lang.transl('_跳过文章因为', `${option.name}.${option.ext}`) +
          lang.transl('_文件名中必须含有文字') +
          ': ' +
          settings.fileNameInclude.join(',')
      )
      return false
    }

    if (!this.checkFileNameExclude(option.name)) {
      log.warning(
        lang.transl('_跳过文章因为', `${option.name}.${option.ext}`) +
          lang.transl('_文件名中不能含有文字') +
          ': ' +
          settings.fileNameExclude.join(',')
      )
      return false
    }

    return true
  }

  private checkFileType(ext: FilterOption['ext']) {
    // 如果没有传递 ext，则保留这个文件
    if (!ext) {
      return true
    }

    // 检查 ext 存在于哪种类型里，然后检查这个类型是否被选中
    for (const [key, value] of Object.entries(Config.fileType)) {
      if (value.includes(ext)) {
        return settings[key as SettingKeys]
      }
    }

    // 如果这个 ext 不存在任何规定的类型里，则把它当作 other 类型，决定是否保留
    return settings.other
  }

  private checkfeeType(fee: FilterOption['fee']) {
    if (fee === undefined) {
      return true
    }

    if (fee > 0) {
      return settings.pay
    } else {
      return settings.free
    }
  }

  private checkfeeRange(fee: FilterOption['fee']) {
    if (fee === undefined || !settings.feeSwitch) {
      return true
    }

    return fee >= settings.fee
  }

  private checkIdRange(id: FilterOption['id']) {
    if (id === undefined || !settings.idRangeSwitch) {
      return true
    }

    const nowId = parseInt(id.toString())
    const setId = settings.idRangeInput

    if (settings.idRange === '>') {
      return nowId > setId
    } else {
      return nowId < setId
    }
  }

  private checkPostDate(date: FilterOption['date']) {
    if (
      !settings.postDate ||
      date === undefined ||
      !settings.postDateStart ||
      !settings.postDateEnd
    ) {
      return true
    }

    const nowDate = new Date(date)
    return (
      nowDate.getTime() >= settings.postDateStart &&
      nowDate.getTime() <= settings.postDateEnd
    )
  }

  private checkTitltMustText(title: FilterOption['title']) {
    if (
      !settings.titleMustTextSwitch ||
      !title ||
      settings.titleMustText.length === 0
    ) {
      return true
    }

    title = title.toLowerCase()
    const match = settings.titleMustText.filter((str) =>
      title!.includes(str.toLowerCase())
    )
    if (match.length === 0) {
      return false
    }
    return true
  }

  private checkTitltCannotText(title: FilterOption['title']) {
    if (
      !settings.titleCannotTextSwitch ||
      !title ||
      settings.titleCannotText.length === 0
    ) {
      return true
    }

    title = title.toLowerCase()
    const match = settings.titleCannotText.filter((str) =>
      title!.includes(str.toLowerCase())
    )
    if (match.length > 0) {
      return false
    }
    return true
  }

  private checkFileNameInclude(name: FilterOption['name']) {
    if (
      !settings.fileNameIncludeSwitch ||
      settings.fileNameInclude.length === 0 ||
      !name
    ) {
      return true
    }

    const find = settings.fileNameInclude.some((str) =>
      name.toLowerCase().includes(str.toLowerCase())
    )
    return find
  }

  private checkFileNameExclude(name: FilterOption['name']) {
    if (
      !settings.fileNameExcludeSwitch ||
      settings.fileNameExclude.length === 0 ||
      !name
    ) {
      return true
    }

    const find = settings.fileNameExclude.some((str) =>
      name.toLowerCase().includes(str.toLowerCase())
    )
    return !find
  }

  // 如果设置项的值不合法，则显示提示
  private showWarning(msg: string) {
    EVT.fire('wrongSetting')
    msgBox.error(msg)
  }

  private bindEvents() {
    window.addEventListener(EVT.list.crawlStart, () => {
      this.showTip()
    })
  }
}

const filter = new Filter()
export { filter }
