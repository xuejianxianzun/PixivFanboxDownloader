import { lang } from './Lang'
import { Colors } from './Colors'
import { Tools } from './Tools'
import { InitPageBase } from './InitPageBase'
import { PostList } from './CrawlResult.d'
import { API } from './API'
import { log } from './Log'

class InitPostListPage extends InitPageBase {
  constructor() {
    super()
    this.init()
  }

  // 添加中间按钮
  protected addCrawlBtns() {
    Tools.addBtn(
      'crawlBtns',
      Colors.bgBlue,
      '_抓取该用户的投稿'
    ).addEventListener('click', () => {
      this.readyCrawl()
    })
  }

  protected async nextStep() {
    this.postListURLs = []
    // 获取分页数据，然后构造出每次请求 300 篇文章的 URL
    const creatorId = API.getCreatorId(location.href)
    const paginateData: {
      body: string[]
    } = await API.request(
      `https://api.fanbox.cc/post.paginateCreator?creatorId=${creatorId}`
    )
    // console.log(paginateData.body)

    if (paginateData?.body.length > 0) {
      // 分页 API 返回的是每次请求 10 个作品数据的 URL，如：
      // https://api.fanbox.cc/post.listCreator?creatorId=usotukiya&maxPublishedDatetime=2024-08-04%2020%3A41%3A47&maxId=8345112&limit=10
      // 因为 getPostListByUser API 每次最多可以请求 300 个文章数据,
      // 所以如果文章总数不超过 300, 一次请求就可以全部获取
      // 如果超过了 300 个, 则需要构造出列表页 API 网址列表

      let index = 0
      const total = paginateData.body.length
      while (index < total) {
        const url = paginateData.body[index]
        this.postListURLs.push(url.replace('limit=10', 'limit=300'))
        // 每隔 30 页构造一个请求列表页数据的 URL
        index = index + 30
      }
      // this.postListURLs.forEach(url => console.log(url))
    }

    this.FetchPostList()
  }

  protected async FetchPostList() {
    const url = this.postListURLs.shift()
    if (url === undefined) {
      log.error(
        `Error in crawling: internal error \n FetchPostList url is undefined\n End Crawling`
      )
      return this.FetchPostListFinished()
    }
    const data: PostList = (await API.request(url)) as PostList
    this.afterFetchPostList(data)
  }
}

export { InitPostListPage }
