// 初始化抓取页面的流程
import { lang } from './Lang'
import { Tools } from './Tools'
import { filter } from './Filter'
import { store } from './Store'
import { log } from './Log'
import { EVT } from './EVT'
import { saveData } from './SaveData'
import { PostList, Post, SupportPostList, TagPostList } from './CrawlResult.d'
import { API } from './API'
import { states } from './States'
import { msgBox } from './MsgBox'
import { toast } from './Toast'
import { Utils } from './utils/Utils'

abstract class InitPageBase {
  protected init() {
    this.addCrawlBtns()
    this.addAnyElement()
    this.initAny()

    window.addEventListener(EVT.list.pageSwitchedTypeChange, () => {
      this.destroy()
    })
  }

  // 各个子类私有的初始化内容
  protected initAny() {}

  // 销毁初始化页面时添加的元素和事件，恢复设置项等
  protected destroy(): void {
    Tools.clearSlot('crawlBtns')
  }

  // 添加中间按钮
  protected addCrawlBtns() {}

  // 添加其他元素（如果有）
  protected addAnyElement(): void {}

  protected crawlNumber: number = 0 // 要抓取的个数/页数
  protected nextUrl: null | string = null

  /**并发请求数量 */
  private readonly getPostDataThreadMax = 1
  protected getPostDataThreadNum = 0
  protected getPostDatafinished = 0

  protected postListURLs: string[] = []

  // 准备抓取，进行抓取之前的一些检查工作。必要时可以在子类中改写
  protected async readyCrawl() {
    if (states.busy) {
      window.alert(lang.transl('_当前任务尚未完成2'))
      return
    }

    log.clear()

    log.success(lang.transl('_开始抓取'))
    toast.show(lang.transl('_开始抓取'))
    msgBox.resetOnce('tipLinktext')

    EVT.fire('crawlStart')

    this.getPostDataThreadNum = 0
    this.getPostDatafinished = 0
    this.nextUrl = null
    this.postListURLs = []

    // 进入第一个抓取方法
    this.nextStep()
  }

  // 当可以开始抓取时，进入下一个流程。默认情况下，开始获取文章列表。如有不同，由子类自行修改
  protected nextStep() {
    this.FetchPostList()
  }

  /**获取一个作者的文章列表分页网址 */
  // 获取分页数据，然后构造出每次请求该作者 300 篇文章的 URL
  protected async getPostListURLs(creatorId: string) {
    const paginateData: {
      body: string[]
    } = await API.request(
      `https://api.fanbox.cc/post.paginateCreator?creatorId=${creatorId}`
    )
    // console.log(paginateData.body)

    if (paginateData?.body.length > 0) {
      // 分页数据里的 URL 格式如下：
      // https://api.fanbox.cc/post.listCreator?creatorId=usotukiya&maxPublishedDatetime=2024-08-04%2020%3A41%3A47&maxId=8345112&limit=10
      // 每次可以获取 10 个文章的数据，但是 limit 的最大值是 300，可以一次获取 300 篇文章的数据
      // 所以下面每隔 30 个网址保存一次，并把 limit 改成 300

      let index = 0
      const total = paginateData.body.length
      while (index < total) {
        const url = paginateData.body[index]
        this.postListURLs.push(url.replace('limit=10', 'limit=300'))
        index = index + 30
      }
      // this.postListURLs.forEach(url => console.log(url))
    }
  }

  /**获取文章列表数据。如果传入了 URL，则是为了重试抓取该 URL */
  protected async FetchPostList(url?: string) {
    await states.awaitNextCrawl()

    if (url === undefined) {
      url = this.postListURLs.shift()
      if (url === undefined) {
        log.error(
          `Error in crawling: internal error \n FetchPostList url is undefined\n End Crawling`
        )
        return this.FetchPostListFinished()
      }
    }

    try {
      const data: PostList = (await API.request(url)) as PostList
      states.addNextCrawlTime()
      this.afterFetchPostList(data)
    } catch (error) {
      console.log(error)
      states.addNextCrawlTime('long')
      this.FetchPostList(url)
    }
  }

  /**保存符合过滤条件的文章的 ID，之后会抓取这些文章的详细数据 */
  protected afterFetchPostList(data: PostList) {
    if (data.body.length === 0) {
      return this.noResult()
    }

    for (const item of data.body) {
      if (item.body === null) {
        continue
      }
      // 对投稿进行检查，决定是否保留它
      const id = item.id
      const creatorId = item.creatorId
      const fee = item.feeRequired
      const date = item.publishedDatetime
      const title = item.title
      const check = filter.check({ id, creatorId, fee, date, title })
      if (check) {
        store.postIdList.push(id)
      }
    }

    if (this.postListURLs.length > 0) {
      this.FetchPostList()
    } else {
      this.FetchPostListFinished()
    }
  }

  protected afterFetchPostListOld(data: SupportPostList | TagPostList) {
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
      const creatorId = item.creatorId
      const fee = item.feeRequired
      const date = item.publishedDatetime
      const title = item.title
      const check = filter.check({ id, creatorId, fee, date, title })
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

  /**获取了要抓取的文章的 ID 列表之后，开始抓取每个文章的详细数据 */
  protected FetchPostListFinished() {
    log.log(lang.transl('_列表页抓取完成'))

    if (store.postIdList.length === 0) {
      return this.noResult()
    }

    log.log(lang.transl('_当前有x个投稿', store.postIdList.length.toString()))
    log.log(lang.transl('_开始获取投稿信息'))

    for (let i = 0; i < this.getPostDataThreadMax; i++) {
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
    await states.awaitNextCrawl()

    try {
      const data = await API.getPost(postId)
      states.addNextCrawlTime()
      this.afterFetchPost(data)
    } catch (error) {
      console.log(error)
      states.addNextCrawlTime('long')
      this.fetchPost(postId)
    }
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
    if (store.skipDueToFee > 0) {
      log.warning(
        lang.transl('_因为价格限制而跳过的投稿数量') + store.skipDueToFee
      )
    }
    if (store.result.length === 0) {
      return this.noResult()
    }

    // 把抓取结果按照 postid 升序排列
    store.result.sort(Utils.sortByProperty('postId', 'asc'))

    store.date = new Date()

    log.log(lang.transl('_抓取文件数量', store.result.length.toString()))

    log.success(lang.transl('_抓取完毕'), 2)

    EVT.fire('crawlFinish')
    // console.log(store.result)
  }

  // 抓取结果为 0 时输出提示
  protected noResult() {
    EVT.fire('crawlFinish')
    EVT.fire('crawlEmpty')
    log.error(lang.transl('_抓取结果为零'), 2)
    msgBox.error(lang.transl('_抓取结果为零'))
  }
}

export { InitPageBase }
