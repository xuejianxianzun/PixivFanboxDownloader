// 初始化抓取页面的流程
import { lang } from './Lang'
import { DOM } from './DOM'
import { filter } from './Filter'
import { store } from './Store'
import { log } from './Log'
import { EVT } from './EVT'
import { titleBar } from './TitleBar'
import { saveData } from './SaveData'
import { PostList, Post } from './CrawlResult.d'
import { API } from './API'

abstract class InitPageBase {
  // 初始化
  protected init() {
    this.appendCenterBtns()
    this.appendElseEl()
    this.initElse()

    window.addEventListener(EVT.list.destroy, () => {
      this.destroy()
    })
  }

  // 各个子类私有的初始化内容
  protected initElse() {}

  // 销毁初始化页面时添加的元素和事件，恢复设置项等
  protected destroy(): void {
    DOM.clearSlot('crawlBtns')
  }

  // 添加中间按钮
  protected appendCenterBtns() {}

  // 添加其他元素（如果有）
  protected appendElseEl(): void {}

  protected crawlNumber: number = 0 // 要抓取的个数/页数
  protected nextUrl: null | string = null

  private readonly getPostDataConcurrencyNumMax = 6
  protected getPostDataThreadNum = 0
  protected getPostDatafinished = 0

  // 准备抓取，进行抓取之前的一些检查工作。必要时可以在子类中改写
  protected async readyCrawl() {
    if (!store.states.allowWork) {
      window.alert(lang.transl('_当前任务尚未完成2'))
      return
    }

    EVT.fire(EVT.list.crawlStart)

    log.clear()

    log.success(lang.transl('_任务开始0'))

    titleBar.change('↑')

    filter.init()

    this.getPostDataThreadNum = 0
    this.getPostDatafinished = 0
    this.nextUrl = null

    // 进入第一个抓取方法
    this.nextStep()
  }

  // 当可以开始抓取时，进入下一个流程。默认情况下，开始获取作品列表。如有不同，由子类具体定义
  protected nextStep() {
    this.FetchPostList()
  }

  // 获取投稿列表
  protected abstract FetchPostList(): Promise<void>

  protected afterFetchPostList(data: PostList) {
    if (data.body.items.length === 0) {
      return this.noResult()
    }

    const items = data.body.items
    this.nextUrl = data.body.nextUrl

    for (const item of items) {
      if (item.body === null) {
        continue
      }
      // 针对投稿进行检查，决定是否保留它
      const id = item.id
      const fee = item.feeRequired
      const date = item.publishedDatetime
      const check = filter.check({ id, fee, date })
      if (check) {
        store.postIdList.push(id)
      }
    }

    if (this.nextUrl) {
      this.FetchPostList()
    } else {
      this.FetchPostListFinished()
    }
  }

  // 抓取文章列表之后，建立并发抓取线程，逐个获取文章数据
  protected FetchPostListFinished() {
    log.log(lang.transl('_列表页抓取完成'))
    log.log(lang.transl('_当前作品个数', store.postIdList.length.toString()))
    log.log(lang.transl('_开始获取作品信息'))

    for (let i = 0; i < this.getPostDataConcurrencyNumMax; i++) {
      const postId = store.postIdList.shift()
      if (postId) {
        this.getPostDataThreadNum++
        this.fetchPost(postId)
      } else {
        break
      }
    }
  }

  protected async fetchPost(postId: string) {
    const data = await API.getPost(postId)
    this.afterFetchPost(data)
  }

  protected afterFetchPost(data: Post) {
    saveData.receive(data.body)
    log.log(`${lang.transl('_待处理')} ${store.postIdList.length}`, 1, false)
    // 当抓取完一个文章之后，如果还有等待抓取的文章就继续抓取
    // 否则当前抓取线程结束。等待所有抓取线程完成之后，文章数据就全部获取了
    const postId = store.postIdList.shift()
    if (postId) {
      this.fetchPost(postId)
    } else {
      this.getPostDatafinished++
      if (this.getPostDatafinished == this.getPostDataThreadNum) {
        this.crawlFinished()
      }
    }
  }

  // 抓取完毕
  protected crawlFinished() {
    if (store.result.length === 0) {
      return this.noResult()
    }

    store.crawlCompleteTime = new Date()

    log.log(lang.transl('_抓取文件数量', store.result.length.toString()))

    log.log(lang.transl('_抓取完毕'), 2)

    EVT.fire(EVT.list.crawlFinish)
  }

  // 抓取结果为 0 时输出提示
  protected noResult() {
    EVT.fire(EVT.list.crawlEmpty)
    titleBar.reset()
    log.error(lang.transl('_抓取结果为零'), 2)
    window.alert(lang.transl('_抓取结果为零'))
  }
}

export { InitPageBase }
