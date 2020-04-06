// 过滤器
import { FilterOption, FilterWh } from './Filter.d'
import { form } from './Settings'
import { lang } from './Lang'
import { log } from './Log'
import { API } from './API'
import { EVT } from './EVT'

// 审查每个作品的数据，决定是否要下载它。下载区域有一些选项是过滤器选项。
class Filter {

  private idRangeSwitch = false // id 范围的开关
  private idRange: number = -1 // id 范围，默认不限制

  private postDate: boolean = false // 是否设置投稿时间
  private postDateStart = new Date()
  private postDateEnd = new Date()


  // 从下载区域上获取过滤器的各个选项
  public init() {
    // 获取排除作品类型的设置
    this.getDownType()

    // 获取 id 范围设置
    this.idRangeSwitch = form.idRangeSwitch.checked
    if (this.idRangeSwitch) {
      this.idRange = this.getIdRange()
    }

    // 获取投稿时间设置
    this.postDate = this.getPostDateSetting()
  }

  // 检查作品是否符合过滤器的要求
  // 想要检查哪些数据就传递哪些数据，不需要传递 FilterOption 的所有选项
  public check(option: FilterOption) {
    // 检查下载的作品类型设置
    if (!this.checkDownType(option.illustType)) {
      return false
    }

    
    // 检查 id 范围设置
    if (!this.checkIdRange(option.id)) {
      return false
    }

    // 检查投稿时间设置
    if (!this.checkPostDate(option.createDate)) {
      return false
    }


    return true
  }

  // 当需要时抛出错误
  private throwError(msg: string) {
    EVT.fire(EVT.events.crawlError)
    log.error(msg, 2)
    window.alert(msg)
    throw new Error(msg)
  }

  // 获取下载的作品类型设置
  private getDownType() {
  }


  // 获取 id 范围设置
  private getIdRange() {
    const result = parseInt(form.idRange.value)

    if (result === 1 || result === 2) {
      let id = parseInt(form.idRangeInput.value)
      if (isNaN(id)) {
        EVT.fire(EVT.events.crawlError)

        const msg = 'id is not a number!'
        window.alert(msg)
        log.error(msg)
        throw new Error(msg)
      }
    }

    if (result === 1) {
      log.warning(`id > ${form.idRangeInput.value}`)
    }

    if (result === 2) {
      log.warning(`id < ${form.idRangeInput.value}`)
    }

    return result
  }

  // 获取投稿时间设置
  private getPostDateSetting() {
    if (form.postDate.checked === false) {
      return false
    } else {
      // 如果启用了此设置，需要判断是否是有效的时间格式
      const postDateStart = new Date(form.postDateStart.value)
      const postDateEnd = new Date(form.postDateEnd.value)
      // 如果输入的时间可以被转换成有效的时间，则启用
      // 转换时间失败时，值是 Invalid Date，不能转换成数字
      if (isNaN(postDateStart.getTime()) || isNaN(postDateEnd.getTime())) {
        EVT.fire(EVT.events.crawlError)

        const msg = 'Date format error!'
        log.error(msg)
        window.alert(msg)
        throw new Error(msg)
      } else {
        // 转换时间成功
        this.postDateStart = postDateStart
        this.postDateEnd = postDateEnd
        log.warning(
          `${lang.transl('_时间范围')}: ${form.postDateStart.value} - ${
            form.postDateEnd.value
          }`
        )
        return true
      }
    }
  }

  // 检查下载的作品类型设置
  private checkDownType(illustType: FilterOption['illustType']) {
    if (illustType === undefined) {
      return true
    } else {
      switch (illustType) {
        
      }
    }
  }

  // 检查 id 范围设置
  private checkIdRange(id: FilterOption['id']) {
    if (id === undefined || !this.idRangeSwitch) {
      return true
    }

    const nowId = parseInt(id.toString())
    const setId = parseInt(form.idRangeInput.value)

    if (this.idRange === 1) {
      // 大于
      return nowId > setId
    } else if (this.idRange === 2) {
      // 小于
      return nowId < setId
    } else {
      return true
    }
  }

  // 检查投稿时间设置
  private checkPostDate(date: FilterOption['createDate']) {
    if (!this.postDate || date === undefined) {
      return true
    } else {
      const nowDate = new Date(date)
      if (nowDate >= this.postDateStart && nowDate <= this.postDateEnd) {
        return true
      } else {
        return false
      }
    }
  }

}

const filter = new Filter()
export { filter }
