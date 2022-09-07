// 初始化页面，初始化抓取流程
import { EVT } from './EVT'
import { pageType } from './PageType'
import { InitHomePage } from './InitHomePage'
import { InitPostListPage } from './InitPostListPage'
import { InitTagPage } from './InitTagPage'
import { InitPostPage } from './InitPostPage'

class InitPage {
  constructor() {
    this.initPage()

    // 页面类型变化时，初始化抓取流程
    window.addEventListener(EVT.list.pageSwitchedTypeChange, () => {
      setTimeout(() => {
        this.initPage()
      }, 0)
    })
  }

  private initPage() {
    switch (pageType.type) {
      case pageType.list.Home:
      case pageType.list.Supporting:
        return new InitHomePage()
      case pageType.list.UserHome:
      case pageType.list.UserPostList:
        return new InitPostListPage()
      case pageType.list.Post:
        return new InitPostPage()
      case pageType.list.Tags:
        return new InitTagPage()
      default:
        return
    }
  }
}

new InitPage()
