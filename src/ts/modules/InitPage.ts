// 初始化页面，初始化抓取流程
import { EVT } from './EVT'
import { pageType } from './PageType'

import { InitHomePage } from './InitHomePage'
import { InitPostListPage } from './InitPostListPage'
import { InitTagPage } from './InitTagPage'
import { InitPostPage } from './InitPostPage'
import { InitShopPage } from './InitShopPage'

class InitPage {
  constructor() {
    this.initPage()

    // 页面类型变化时，初始化抓取流程
    window.addEventListener(EVT.events.pageTypeChange, () => {
      EVT.fire(EVT.events.destroy)
      this.initPage()
    })
  }

  private initPage() {
    switch (pageType.getPageType()) {
      case 0:
      case 1:
        return new InitHomePage()
      case 2:
      case 3:
        return new InitPostListPage()
      case 4:
        return new InitPostPage()
      case 5:
        return new InitTagPage()
      default:
        throw new Error('InitCrawlProcess error: Illegal pageType.')
    }
  }
}

new InitPage()
export {}
