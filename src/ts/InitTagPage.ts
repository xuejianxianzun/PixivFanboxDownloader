import { lang } from './Lang'
import { Colors } from './Colors'
import { Tools } from './Tools'
import { InitPageBase } from './InitPageBase'
import { PostList, TagPostList } from './CrawlResult.d'
import { API } from './API'
import { Utils } from './utils/Utils'
import { log } from './Log'

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
    log.log(lang.transl('_抓取该tag的投稿'))
    let data: TagPostList
    if (this.nextUrl) {
      data = (await API.request(this.nextUrl)) as TagPostList
    } else {
      data = await API.getTagPostListByUser(
        await API.getUserId(API.getCreatorId(location.href)),
        Utils.getURLPathField(window.location.pathname, 'tags')
      )
    }
    this.afterFetchPostListOld(data)
  }
}

export { InitTagPage }
