// 初始化抓取页面的流程
import { lang } from './Lang'
import { Colors } from './Colors'
import { DOM } from './DOM'
import { options } from './Options'
import { filter } from './Filter'
import { API } from './API'
import { store } from './Store'
import { log } from './Log'
import { EVT } from './EVT'
import { form } from './Settings'
import { titleBar } from './TitleBar'
import { saveData } from './SaveData'
import { PostList, Post } from './CrawlResult.d'

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
  protected nextUrl: null | string = null

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
    this.FetchPostList()
  }

  // 获取投稿列表
  protected abstract async FetchPostList(): Promise<void>

  protected afterFetchPostList(data: PostList) {
    const items = data.body.items
    this.nextUrl = data.body.nextUrl

    for (const item of items) {
      saveData.receive(item)
    }

    if (this.nextUrl) {
      this.FetchPostList()
    } else {
      this.crawlFinished()
    }
  }

  protected abstract async fetchPost(): Promise<void>

  protected afterFetchPost(data: Post) {
    saveData.receive(data.body)
    this.crawlFinished()
  }

  // 抓取完毕
  protected crawlFinished() {
    if (store.result.length === 0) {
      return this.noResult()
    }

    this.nextUrl = null

    log.log(lang.transl('_抓取文件数量', store.result.length.toString()))

    log.log(lang.transl('_抓取完毕'), 2)

    EVT.fire(EVT.events.crawlFinish)
  }

  // 抓取结果为 0 时输出提示
  protected noResult() {
    EVT.fire(EVT.events.crawlEmpty)
    titleBar.reset()
    log.error(lang.transl('_抓取结果为零'), 2)
    window.alert(lang.transl('_抓取结果为零'))
  }
}

export { InitPageBase }
