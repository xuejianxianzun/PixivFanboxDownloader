// 获取页面类型
import { EVT } from './EVT'

// 所有页面类型及对应的数字编号
// 可以通过 pageType.list 使用
enum PageName {
  Unsupported = -1,
  Home,
  Supporting,
  UserHome,
  UserPostList,
  Post,
  Tags,
  Shop,
}

class PageType {
  constructor() {
    this.type = this.getType()

    // 页面切换时检查新旧页面是否不同
    window.addEventListener(EVT.list.pageSwitch, () => {
      this.checkTypeChange()
    })
  }

  public type: number = 0

  // 所有页面类型
  public readonly list = PageName

  private getType(): PageName {
    const host = window.location.hostname
    const path = window.location.pathname

    const userPage =
      (!host.startsWith('www.') &&
        !host.startsWith('api.') &&
        !host.startsWith('downloads.')) ||
      path.startsWith('/@')
    if (host === 'www.fanbox.cc' && path === '/') {
      // https://www.fanbox.cc/
      // 自己主页
      return PageName.Home
    } else if (path === '/home/supporting') {
      // https://www.fanbox.cc/home/supporting
      // 正在赞助
      return PageName.Supporting
    } else if (
      userPage &&
      !path.includes('/posts') &&
      !path.includes('/tags/') &&
      !path.includes('/shop')
    ) {
      // https://kyomoneko.fanbox.cc/
      // https://www.fanbox.cc/@official
      // 画师主页
      return PageName.UserHome
    } else if (userPage && path.endsWith('/posts')) {
      // https://kyomoneko.fanbox.cc/posts
      // https://www.fanbox.cc/@official/posts
      // 画师投稿列表页
      return PageName.UserPostList
    } else if (userPage && path.includes('/posts/')) {
      // https://kyomoneko.fanbox.cc/posts/904593
      // https://www.fanbox.cc/@official/posts/996286
      // 投稿内容页
      return PageName.Post
    } else if (userPage && path.includes('/tags/')) {
      // https://eto13.fanbox.cc/tags/%E5%8B%95%E7%94%BB
      // tag 页面
      return PageName.Tags
    } else if (userPage && path.endsWith('/shop')) {
      // https://yajirushikey.fanbox.cc/shop
      // 商店页面
      return PageName.Shop
    } else {
      // 没有匹配到可用的页面类型
      return PageName.Unsupported
    }
  }

  // 页面切换时，检查页面类型是否变化
  private checkTypeChange() {
    const old = this.type
    this.type = this.getType()
    if (this.type !== old) {
      EVT.fire('pageSwitchedTypeChange', this.type)
    } else {
      EVT.fire('pageSwitchedTypeNotChange', this.type)
    }
  }
}

const pageType = new PageType()
export { pageType }
