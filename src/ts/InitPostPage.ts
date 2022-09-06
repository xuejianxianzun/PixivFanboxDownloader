import { lang } from './Lang'
import { Colors } from './Colors'
import { DOM } from './DOM'
import { InitPageBase } from './InitPageBase'
import { API } from './API'
import { store } from './Store'

class InitPostPage extends InitPageBase {
  constructor() {
    super()
    this.init()
  }

  private quickDownBtn = document.createElement('div')

  // 添加中间按钮
  protected appendCenterBtns() {
    DOM.addBtn(
      'crawlBtns',
      Colors.bgBlue,
      lang.transl('_抓取这篇投稿')
    ).addEventListener('click', () => {
      this.readyCrawl()
    })
  }

  protected appendElseEl() {
    // 在右侧创建快速下载按钮
    this.quickDownBtn.id = 'quick_down_btn'
    this.quickDownBtn.textContent = '↓'
    this.quickDownBtn.setAttribute('title', lang.transl('_快速下载本页'))
    document.body.appendChild(this.quickDownBtn)
    this.quickDownBtn.addEventListener(
      'click',
      () => {
        store.states.quickDownload = true
        this.readyCrawl()
      },
      false
    )
  }

  protected destroy() {
    DOM.clearSlot('crawlBtns')

    // 删除快速下载按钮
    const quickBtn = document.querySelector('#quick_down_btn')
    quickBtn && quickBtn.remove()
  }

  protected nextStep() {
    this.getPostDataThreadNum = 1
    this.fetchPost()
  }

  protected async FetchPostList() { }

  protected async fetchPost() {
    const data = await API.getPost(API.getURLPathField('posts'))
    this.afterFetchPost(data)
  }
}

export { InitPostPage }
