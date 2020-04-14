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

    if (window.location.pathname === '/fanbox') {
      // https://www.pixiv.net/fanbox
      // 自己主页
      type = 0
    } else if (window.location.pathname === '/fanbox/supporting') {
      // https://www.pixiv.net/fanbox/supporting
      // 正在赞助
      type = 1
    } else if (/creator\/\d*$/.test(window.location.pathname)) {
      // https://www.pixiv.net/fanbox/creator/1499614
      // 画师主页
      type = 2
    } else if (window.location.pathname.endsWith('/post')) {
      // https://www.pixiv.net/fanbox/creator/1499614/post
      // 画师投稿列表页
      type = 3
    } else if (/post\/\d*$/.test(window.location.pathname)) {
      // https://www.pixiv.net/fanbox/creator/1499614/post/867418
      // 投稿内容页
      type = 4
    } else if (window.location.pathname.includes('/tag/')) {
      // https://www.pixiv.net/fanbox/creator/1082583/tag/%E5%8B%95%E7%94%BB
      // tag 页面
      type = 5
    } else if (window.location.pathname.endsWith('/shop')) {
      // https://www.pixiv.net/fanbox/creator/6843920/shop
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
