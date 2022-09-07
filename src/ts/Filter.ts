import { log } from './Log'
import { EVT } from './EVT'
import { Config } from './Config'
import { SettingKeys, settings } from './setting/Settings'
import { msgBox } from './MsgBox'
import { lang } from './Lang'

/** 过滤选项，其中所有字段都是可选的 */
interface FilterOption {
  id?: number | string
  date?: string
  fee?: number
  ext?: string
}

// 审查每个文件的数据，决定是否要下载它
class Filter {
  constructor() {
    this.bindEvents()
  }

  // 对启用了的过滤选项输出提示
  private showTip() {
    this.getIdRange()
    this.getPostDate()
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
      const msg = 'Date format error!'
      this.showWarning(msg)
    } else {
      const start = new Date(settings.postDateStart).toLocaleString()
      const end = new Date(settings.postDateEnd).toLocaleString()
      log.warning(`${lang.transl('_时间范围')}: ${start} - ${end}`)
    }
  }

  // 检查作品是否符合过滤器的要求
  // 想要检查哪些数据就传递哪些数据，不需要传递 FilterOption 的所有选项
  public check(option: FilterOption) {
    // 检查文件类型
    if (!this.checkFileType(option.ext)) {
      return false
    }

    // 检查收费还是免费
    if (!this.checkfeeType(option.fee)) {
      return false
    }

    // 检查价格范围
    if (!this.checkfeeRange(option.fee)) {
      return false
    }

    // 检查 id 范围
    if (!this.checkIdRange(option.id)) {
      return false
    }

    // 检查投稿时间
    if (!this.checkPostDate(option.date)) {
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

    const flag = parseInt(settings.idRange)
    const nowId = parseInt(id.toString())
    const setId = settings.idRangeInput

    if (flag === 1) {
      // 大于
      return nowId > setId
    } else if (flag === 2) {
      // 小于
      return nowId < setId
    } else {
      return true
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
