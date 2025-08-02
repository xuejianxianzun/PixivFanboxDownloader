import { lang } from './Lang'
import { Colors } from './Colors'
import { Tools } from './Tools'
import { InitPageBase } from './InitPageBase'

// 这个类没有编写实际功能，没有被实际使用
class InitShopPage extends InitPageBase {
  constructor() {
    super()
    this.init()
  }

  // 添加中间按钮
  protected addCrawlBtns() {
    Tools.addBtn(
      'crawlBtns',
      Colors.bgBlue,
      '_抓取商品的封面图',
    ).addEventListener('click', () => {
      this.readyCrawl()
    })
  }
}

export { InitShopPage }
