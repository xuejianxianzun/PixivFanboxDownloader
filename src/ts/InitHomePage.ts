import { lang } from './Lang'
import { Colors } from './Colors'
import { Tools } from './Tools'
import { InitPageBase } from './InitPageBase'
import { Creator, SupportPostList } from './CrawlResult.d'
import { API } from './API'
import { EVT } from './EVT'
import { log } from './Log'
import { pageType } from './PageType'

class InitHomePage extends InitPageBase {
  constructor() {
    super()
    this.init()
  }

  private crawlFlag: 'supporting' | 'following' = 'supporting'

  // 添加中间按钮
  protected addCrawlBtns() {
    if (
      pageType.type === pageType.list.Home ||
      pageType.type === pageType.list.Supporting
    ) {
      Tools.addBtn(
        'crawlBtns',
        Colors.bgBlue,
        '_抓取赞助的所有用户的投稿',
      ).addEventListener('click', () => {
        this.crawlFlag = 'supporting'
        this.readyCrawl()
      })
    }

    if (
      pageType.type === pageType.list.Home ||
      pageType.type === pageType.list.Following
    ) {
      Tools.addBtn(
        'crawlBtns',
        Colors.bgBlue,
        '_抓取关注的所有用户的投稿',
      ).addEventListener('click', () => {
        const confirm = window.confirm(
          lang.transl('_抓取关注的所有用户的投稿的提示'),
        )
        if (!confirm) {
          return
        }
        this.crawlFlag = 'following'
        this.readyCrawl()
      })
    }

    if (pageType.type === pageType.list.Home) {
      Tools.addBtn(
        'crawlBtns',
        Colors.bgGreen,
        '_清空已保存的抓取结果',
      ).addEventListener('click', () => {
        EVT.fire('clearSavedCrawl')
      })
    }
  }

  protected nextStep() {
    switch (this.crawlFlag) {
      case 'supporting':
        return this.getSupportingPostList()
      case 'following':
        return this.getFollowingPostList()
    }
  }

  /**获取赞助的所有用户的所有投稿 */
  protected async getSupportingPostList() {
    log.log(lang.transl('_抓取赞助的所有用户的投稿'))
    let data: SupportPostList
    if (this.nextUrl) {
      data = (await API.request(this.nextUrl)) as SupportPostList
    } else {
      data = await API.getPostListSupporting(300)
    }

    // 如果没有赞助任何创作者, 那么这里获取到的是空数据
    // {"body":{"items":[],"nextUrl":null}}
    if (data.body.items.length === 0 && data.body.nextUrl === null) {
      log.error(lang.transl('_没有赞助的用户'))
      return this.FetchPostListFinished()
    }

    this.afterFetchPostListOld(data)
  }

  /**获取关注的所有用户的所有投稿 */
  protected async getFollowingPostList() {
    log.log(lang.transl('_抓取关注的所有用户的投稿'))
    // 获取关注的用户列表
    const url = 'https://api.fanbox.cc/creator.listFollowing'
    const json: { body: Creator[] } = await API.request(url)
    if (json?.body?.length > 0) {
      const userList: {
        creatorId: string
        name: string
      }[] = json.body.map((user) => {
        return {
          creatorId: user.creatorId,
          name: user.user.name,
        }
      })

      log.success(lang.transl('_正在关注的创作者') + ':')
      // 获取每个作者的文章列表分页网址
      for (const user of userList) {
        log.log(user.name)
        await this.getPostListURLs(user.creatorId)
      }
      // console.log(this.postListURLs)

      // 获取文章列表
      this.FetchPostList()
    } else {
      log.error(lang.transl('_没有找到关注的用户'))
      return this.FetchPostListFinished()
    }
  }
}

export { InitHomePage }
