// 初始化抓取页面的流程
import { lang } from './Lang'
import { Colors } from './Colors'
import { DOM } from './DOM'
import { options } from './Options'
import { FilterOption } from './Filter.d'
import {} from './CrawlResult.d'
import { filter } from './Filter'
import { API } from './API'
import { store } from './Store'
import { log } from './Log'
import { EVT } from './EVT'
import { form } from './Settings'
import { titleBar } from './TitleBar'

abstract class InitPageBase {
  // 初始化
  protected init() {
    this.appendCenterBtns()
    this.appendElseEl()
    this.initElse()

    window.addEventListener(EVT.events.destroy, () => {
      this.destroy()
    })
  }

  // 各个子类私有的初始化内容
  protected initElse() {}

  // 销毁初始化页面时添加的元素和事件，恢复设置项等
  protected destroy(): void {
    DOM.clearSlot('crawlBtns')
    DOM.clearSlot('otherBtns')
  }

  // 添加中间按钮
  protected appendCenterBtns() {
    DOM.addBtn(
      'crawlBtns',
      Colors.blue,
      lang.transl('_开始抓取')
    ).addEventListener('click', () => {
      this.readyCrawl()
    })
  }

  // 添加其他元素（如果有）
  protected appendElseEl(): void {}

  protected crawlNumber: number = 0 // 要抓取的个数/页数

  protected maxCount = 1000 // 当前页面类型最多有多少个页面/作品

  protected readonly ajaxThreadsDefault: number = 10 // 抓取时的并发连接数默认值，也是最大值

  protected ajaxThreads: number = this.ajaxThreadsDefault // 抓取时的并发连接数

  protected ajaxThreadsFinished: number = 0 // 统计有几个并发线程完成所有请求。统计的是并发线程（ ajaxThreads ）而非请求数

  // 作品个数/页数的输入不合法
  private getWantPageError() {
    EVT.fire(EVT.events.crawlError)
    const msg = lang.transl('_参数不合法')
    window.alert(msg)
    throw new Error(msg)
  }

  // 检查用户输入的投稿数量设置，并返回提示信息
  // 可以为 -1，或者大于 0
  protected checkWantPageInput(crawlPartTip: string, crawlAllTip: string) {
    const temp = parseInt(form.setWantPage.value)

    // 如果比 1 小，并且不是 -1，则不通过
    if ((temp < 1 && temp !== -1) || isNaN(temp)) {
      // 比 1 小的数里，只允许 -1 , 0 也不行
      this.getWantPageError()
    }

    if (temp >= 1) {
      log.warning(crawlPartTip.replace('-num-', temp.toString()))
    } else if (temp === -1) {
      log.warning(crawlAllTip)
    }

    return temp
  }

  // 获取投稿数量设置
  protected getWantPage() {
    const wantPage = parseInt(form.setWantPage.value)
    if (isNaN(wantPage)) {
      this.getWantPageError()
    }

    if (wantPage > 0) {
      this.crawlNumber = wantPage
    } else {
      this.crawlNumber = -1
    }
  }

  // 准备抓取，进行抓取之前的一些检查工作。必要时可以在子类中改写
  protected async readyCrawl() {
    if (!store.states.allowWork) {
      window.alert(lang.transl('_当前任务尚未完成2'))
      return
    }

    EVT.fire(EVT.events.crawlStart)

    log.clear()

    log.success(lang.transl('_任务开始0'))

    titleBar.change('↑')

    this.getWantPage()

    filter.init()

    // 进入第一个抓取方法
    this.nextStep()
  }

  // 当可以开始抓取时，进入下一个流程。默认情况下，开始获取作品列表。如有不同，由子类具体定义
  protected nextStep() {
    this.getPostList()
  }

  // 获取作品列表，由各个子类具体定义
  protected abstract getPostList(): void

  // 作品列表获取完毕，开始抓取作品内容页
  protected getIdListFinished() {
    // 列表页获取完毕后，可以在这里重置一些变量
    this.resetGetIdListStatus()

    if (store.PostIdList.length === 0) {
      return this.noResult()
    }

    log.log(lang.transl('_当前投稿个数', store.PostIdList.length.toString()))

    if (store.PostIdList.length <= this.ajaxThreadsDefault) {
      this.ajaxThreads = store.PostIdList.length
    } else {
      this.ajaxThreads = this.ajaxThreadsDefault
    }

    for (let i = 0; i < this.ajaxThreads; i++) {
      this.getPostData()
    }
  }

  // 获取作品的数据
  // 在重试时会传入要重试的 id
  protected async getPostData(id?: string) {
    id = id || store.PostIdList.shift()!

    let data
    try {
      // 发起请求
      data = await API.getPost('867418')
    } catch (error) {
      //  请求成功，但 response.ok 错误。不重试请求，跳过该作品继续抓取
      if (error.status) {
        this.logErrorStatus(error.status, id)
        this.afterGetWorksData()
      } else {
        // 请求失败，会重试这个请求
        setTimeout(() => {
          this.getPostData(id)
        }, 2000)
      }

      return
    }

    const body = data.body

    const filterOpt: FilterOption = {}

    // 检查通过
    if (filter.check(filterOpt)) {
      // 时间原数据如 "2019-12-18T22:23:37+00:00"
      // 网页上显示的日期是转换成了本地时间的，如北京时区显示为 "2019-12-19"，不是显示原始日期 "2019-12-18"。所以这里转换成本地时区的日期，和网页上保持一致，以免用户困惑。
      const date0 = new Date(body.publishedDatetime)
      const y = date0.getFullYear()
      const m = (date0.getMonth() + 1).toString().padStart(2, '0')
      const d = date0.getDate().toString().padStart(2, '0')
      const date = `${y}-${m}-${d}`

      // 储存作品信息
    }
    return
    this.afterGetWorksData()
  }

  // 每当获取完一个作品的信息
  private afterGetWorksData() {
    if (store.PostIdList.length > 0) {
      // 如果存在下一个作品，则
      this.getPostData()
    } else {
      // 没有剩余作品
      this.ajaxThreadsFinished++
      if (this.ajaxThreadsFinished === this.ajaxThreads) {
        // 如果所有并发请求都执行完毕，复位
        this.ajaxThreadsFinished = 0
        this.crawlFinished()
      }
    }
  }

  // 抓取完毕
  protected crawlFinished() {
    if (store.result.length === 0) {
      return this.noResult()
    }

    this.sortResult()

    log.log(lang.transl('_抓取文件数量', store.result.length.toString()))

    log.log(lang.transl('_抓取完毕'), 2)

    EVT.fire(EVT.events.crawlFinish)
  }

  // 重设抓取作品列表时使用的变量或标记
  protected abstract resetGetIdListStatus(): void

  // 网络请求状态异常时输出提示
  private logErrorStatus(status: number, id: string) {
    log.error(lang.transl('_无权访问2', id), 1)

    switch (status) {
      case 0:
        console.log(lang.transl('_作品页状态码0'))
        break

      case 400:
        console.log(lang.transl('_作品页状态码400'))
        break

      case 403:
        console.log(lang.transl('_作品页状态码403'))
        break

      case 404:
        console.log(lang.transl('_作品页状态码404') + ' ' + id)
        break

      default:
        break
    }
  }

  // 在抓取图片网址时，输出提示
  protected logImagesNo() {
    log.log(
      lang.transl('_抓取文件数量', store.result.length.toString()),
      1,
      false
    )
  }

  // 抓取结果为 0 时输出提示
  protected noResult() {
    EVT.fire(EVT.events.crawlEmpty)
    titleBar.reset()
    log.error(lang.transl('_抓取结果为零'), 2)
    window.alert(lang.transl('_抓取结果为零'))
  }

  // 抓取完成后，对结果进行排序
  protected sortResult() {}
}

export { InitPageBase }
