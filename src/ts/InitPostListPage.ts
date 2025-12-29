import { lang } from './Lang'
import { Colors } from './Colors'
import { Tools } from './Tools'
import { InitPageBase } from './InitPageBase'
import { API } from './API'
import { log } from './Log'
import { saveFanCard } from './download/SaveFanCard'

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
      '_抓取该用户的投稿',
    ).addEventListener('click', () => {
      this.readyCrawl()
    })

    // 添加保存粉丝卡的按钮
    Tools.addBtn(
      'crawlBtns',
      Colors.bgGreen,
      '_保存该用户的粉丝卡',
    ).addEventListener('click', () => {
      saveFanCard.save('current')
    })
    // 虽然可以判断是否赞助了这个用户：
    // 查找以 `/creators/supporting/` 开头的 a 标签，就是页面右侧的“正在赞助”按钮上的链接，点击会进入粉丝卡页面
    // const findA = document.querySelector('a[href^="/creators/supporting/"]')
    // 但这个按钮一开始是未关注状态，需要等 Fanbox 的一些请求完成后才会变成“正在赞助”状态，懒得检测了
  }

  protected async nextStep() {
    log.log(lang.transl('_抓取该用户的投稿'))

    this.postListURLs = []
    const creatorId = API.getCreatorId(location.href)

    await this.getPostListURLs(creatorId)

    this.FetchPostList()
  }
}

export { InitPostListPage }
