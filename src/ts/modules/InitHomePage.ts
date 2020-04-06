import { lang } from './Lang'
import { Colors } from './Colors'
import { DOM } from './DOM'
import { InitPageBase } from './InitPageBase'

class InitHomePage extends InitPageBase {
  // 添加中间按钮
  protected appendCenterBtns() {
    DOM.addBtn(
      'crawlBtns',
      Colors.blue,
      lang.transl('_开始抓取')
    ).addEventListener('click', () => {
      this.readyCrawl()
    })
  }

  protected getPostList() {}

  protected resetGetIdListStatus() {}
}

export { InitHomePage }
