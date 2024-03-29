import { lang } from './Lang'
import { Colors } from './Colors'
import { Tools } from './Tools'
import { InitPageBase } from './InitPageBase'
import { PostList } from './CrawlResult.d'
import { API } from './API'
import { EVT } from './EVT'

class InitHomePage extends InitPageBase {
  constructor() {
    super()
    this.init()
  }

  // 添加中间按钮
  protected addCrawlBtns() {
    Tools.addBtn(
      'crawlBtns',
      Colors.bgBlue,
      '_抓取赞助的所有用户的投稿'
    ).addEventListener('click', () => {
      this.readyCrawl()
    })

    Tools.addBtn(
      'crawlBtns',
      Colors.bgGreen,
      '_清空已保存的抓取结果'
    ).addEventListener('click', () => {
      EVT.fire('clearSavedCrawl')
    })
  }

  protected async FetchPostList() {
    let data: PostList
    if (this.nextUrl) {
      data = (await API.request(this.nextUrl)) as PostList
    } else {
      data = await API.getPostListSupporting(300)
    }
    this.afterFetchPostList(data)
  }
}

export { InitHomePage }
