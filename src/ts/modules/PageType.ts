// 获取页面类型
import { EVT } from './EVT'

class PageType {
  constructor() {
    this.type = this.getPageType()

    // 页面切换时检查新旧页面是否不同
    window.addEventListener(EVT.events.pageSwitch, () => {
      this.checkPageTypeIsNew()
    })
  }

  private type: number = 0

  // 判断页面类型
  public getPageType(): number {
    let type: number
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
      type = 0
    } else if (path === '/home/supporting') {
      // https://www.fanbox.cc/home/supporting
      // 正在赞助
      type = 1
    } else if (
      userPage &&
      !path.includes('/posts') &&
      !path.includes('/tags/') &&
      !path.includes('/shop')
    ) {
      // https://kyomoneko.fanbox.cc/
      // https://www.fanbox.cc/@official
      // 画师主页
      type = 2
    } else if (userPage && path.endsWith('/posts')) {
      // https://kyomoneko.fanbox.cc/posts
      // https://www.fanbox.cc/@official/posts
      // 画师投稿列表页
      type = 3
    } else if (userPage && path.includes('/posts/')) {
      // https://kyomoneko.fanbox.cc/posts/904593
      // https://www.fanbox.cc/@official/posts/996286
      // 投稿内容页
      type = 4
    } else if (userPage && path.includes('/tags/')) {
      // https://eto13.fanbox.cc/tags/%E5%8B%95%E7%94%BB
      // tag 页面
      type = 5
    } else if (userPage && path.endsWith('/shop')) {
      // https://yajirushikey.fanbox.cc/shop
      // 商店页面
      type = 6
    } else {
      // 没有匹配到可用的页面类型
      throw new Error('Page type matching failed')
    }

    return type
  }

  // 检查是不是进入到了新的页面类型
  private checkPageTypeIsNew() {
    let newType = this.getPageType()

    if (this.type !== newType) {
      EVT.fire(EVT.events.pageTypeChange, newType)
    }

    // 保存当前页面类型
    this.type = newType
  }
}

const pageType = new PageType()
export { pageType }
