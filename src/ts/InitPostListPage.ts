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
    log.log(lang.transl('_抓取该用户的投稿'))

    this.postListURLs = []
    const creatorId = API.getCreatorId(location.href)

    await this.getPostListURLs(creatorId)

    log.warning(lang.transl('_下载器会减慢抓取速度以免被限制'))
    this.FetchPostList()
  }
}

export { InitPostListPage }
