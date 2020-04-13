import { lang } from './Lang'
import { Colors } from './Colors'
import { DOM } from './DOM'
import { InitPageBase } from './InitPageBase'
import { PostList } from './CrawlResult.d'
import { API } from './API'

class InitPostListPage extends InitPageBase {
  constructor() {
    super()
    this.init()
  }

  // 添加中间按钮
  protected appendCenterBtns() {
    DOM.addBtn(
      'crawlBtns',
      Colors.blue,
      lang.transl('_抓取该用户的投稿')
    ).addEventListener('click', () => {
      this.readyCrawl()
    })
  }

  protected async FetchPostList() {
    let data: PostList
    if (this.nextUrl) {
      data = (await API.request(this.nextUrl)) as PostList
    } else {
      data = await API.getPostListByUser(API.getURLPathField('creator'), 300)
    }
    this.afterFetchPostList(data)
  }

  protected async fetchPost() {}
}

export { InitPostListPage }
