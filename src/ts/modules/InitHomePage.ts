import { lang } from './Lang'
import { Colors } from './Colors'
import { DOM } from './DOM'
import { InitPageBase } from './InitPageBase'
import { API } from './API'
import { filter } from './Filter'
import { store } from './Store'

class InitHomePage extends InitPageBase {
  constructor() {
    super()
    this.init()
  }
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
    const items = data.body.items
    for (const item of items) {
      const id = item.id
      const fee = item.feeRequired
      const date = item.publishedDatetime

      filter.check({})
    }
  }

  // getIdListFinished
  protected resetGetIdListStatus() {}
}

export { InitHomePage }
