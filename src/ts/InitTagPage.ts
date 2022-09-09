import { lang } from './Lang'
import { Colors } from './Colors'
import { Tools } from './Tools'
import { InitPageBase } from './InitPageBase'
import { PostList } from './CrawlResult.d'
import { API } from './API'
import { Utils } from './utils/Utils'

class InitTagPage extends InitPageBase {
  constructor() {
    super()
    this.init()
  }

  // 添加中间按钮
  protected addCrawlBtns() {
    Tools.addBtn(
      'crawlBtns',
      Colors.bgBlue,
      '_抓取该tag的投稿'
    ).addEventListener('click', () => {
      this.readyCrawl()
    })
  }

  protected async FetchPostList() {
    let data: PostList
    if (this.nextUrl) {
      data = (await API.request(this.nextUrl)) as PostList
    } else {
      data = await API.getTagPostListByUser(
        await API.getUserId(API.getCreatorId(location.href)),
        Utils.getURLPathField(window.location.pathname, 'tags')
      )
    }
    this.afterFetchPostList(data)
  }
}

export { InitTagPage }
