import { form } from './Settings'
import { log } from './Log'
import { EVT } from './EVT'
import { store } from './Store'

interface FilterOption {
  id?: number | string
  date?: string
  fee?: number
  ext?: string
}

// 审查每个文件的数据，决定是否要下载它
class Filter {
  public init() {
    this.getIdRange()
    this.getDateRange()
  }

  private _postDateStart = 0
  private _postDateEnd = 0

  // 获取 id 范围设置
  private getIdRange() {
    if (form.idRangeSwitch.checked) {
      let id = parseInt(form.idRangeInput.value)
      if (isNaN(id)) {
        EVT.fire(EVT.events.crawlError)

        const msg = 'id is not a number!'
        window.alert(msg)
        log.error(msg)
        throw new Error(msg)
      }
    }
  }

  private getDateRange() {
    if (
      !form.postDate.checked ||
      form.postDateStart.value === '' ||
      form.postDateEnd.value === ''
    ) {
      return
    }

    // 判断是否是有效的时间格式
    const postDateStart = new Date(form.postDateStart.value)
    const postDateEnd = new Date(form.postDateEnd.value)
    // 如果输入的时间可以被转换成有效的时间，则启用
    // 转换时间失败时，值是 Invalid Date，不能转换成数字
    if (isNaN(postDateStart.getTime()) || isNaN(postDateEnd.getTime())) {
      const msg = 'Date format error!'
      this.throwError(msg)
    } else {
      // 转换时间成功
      this._postDateStart = postDateStart.getTime()
      this._postDateEnd = postDateEnd.getTime()
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
    for (const [key, value] of Object.entries(store.fileType)) {
      if (value.includes(ext)) {
        return form[key].checked ? true : false
      }
    }

    // 如果这个 ext 不存在任何规定的类型里，则把它当作 other 类型，决定是否保留
    return form['other'].checked ? true : false
  }

  private checkfeeType(fee: FilterOption['fee']) {
    if (fee === undefined) {
      return true
    }

    if (fee > 0) {
      return form.pay.checked
    } else {
      return form.free.checked
    }
  }

  private checkfeeRange(fee: FilterOption['fee']) {
    if (fee === undefined || !form.feeSwitch.checked) {
      return true
    }

    return fee >= parseInt(form.fee.value)
  }

  private checkIdRange(id: FilterOption['id']) {
    if (id === undefined || !form.idRangeSwitch.checked) {
      return true
    }

    const flag = parseInt(form.idRange.value)
    const nowId = parseInt(id.toString())
    const setId = parseInt(form.idRangeInput.value)

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
      !form.postDate.checked ||
      date === undefined ||
      !this._postDateStart ||
      !this._postDateEnd
    ) {
      return true
    }

    const nowDate = new Date(date)
    return (
      nowDate.getTime() >= this._postDateStart &&
      nowDate.getTime() <= this._postDateEnd
    )
  }

  // 当需要时抛出错误
  private throwError(msg: string) {
    EVT.fire(EVT.events.crawlError)
    log.error(msg, 2)
    window.alert(msg)
    throw new Error(msg)
  }
}

const filter = new Filter()
export { filter, FilterOption }
