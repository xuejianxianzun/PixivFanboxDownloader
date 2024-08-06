import { lang } from './Lang'
import { Colors } from './Colors'
import { Tools } from './Tools'
import { InitPageBase } from './InitPageBase'
import { SupportPostList } from './CrawlResult.d'
import { API } from './API'
import { EVT } from './EVT'
import { log } from './Log'

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
    let data: SupportPostList
    if (this.nextUrl) {
      data = (await API.request(this.nextUrl)) as SupportPostList
    } else {
      data = await API.getPostListSupporting(300)
    }

    // 如果没有赞助任何创作者, 那么这里获取到的是空数据
    // {"body":{"items":[],"nextUrl":null}}
    if (data.body.items.length === 0 && data.body.nextUrl === null) {
      log.warning(lang.transl('_没有赞助的用户'))
      return this.FetchPostListFinished()
    }

    this.afterFetchPostListOld(data)
  }
}

export { InitHomePage }
