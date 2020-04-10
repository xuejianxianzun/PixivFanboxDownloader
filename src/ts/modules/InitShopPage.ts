import { lang } from './Lang'
import { Colors } from './Colors'
import { DOM } from './DOM'
import { InitPageBase } from './InitPageBase'
import { API } from './API'

class InitShopPage extends InitPageBase {
  constructor() {
    super()
    this.init()
  }

  // 添加中间按钮
  protected appendCenterBtns() {
    DOM.addBtn(
      'crawlBtns',
      Colors.blue,
      lang.transl('_抓取商品的封面图')
    ).addEventListener('click', () => {
      this.readyCrawl()
    })
  }

  protected async FetchPostList() {}

  protected async fetchPost() {}
}

export { InitShopPage }
