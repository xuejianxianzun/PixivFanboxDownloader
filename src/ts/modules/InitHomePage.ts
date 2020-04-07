import { lang } from './Lang'
import { Colors } from './Colors'
import { DOM } from './DOM'
import { InitPageBase } from './InitPageBase'
import { API } from './API'

class InitHomePage extends InitPageBase {
  // 添加中间按钮
  protected appendCenterBtns() {
    DOM.addBtn(
      'crawlBtns',
      Colors.blue,
      lang.transl('_抓取赞助的所有用户的投稿')
    ).addEventListener('click', () => {
      this.readyCrawl()
    })
  }

  protected async getPostList() {
    const data = await API.getlistSupporting(300)
    console.log(data)
  }

  protected resetGetIdListStatus() {}
}

export { InitHomePage }
