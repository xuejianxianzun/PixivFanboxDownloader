// 用户界面
import { lang } from './Lang'
import { EVT } from './EVT'
import './OpenCenterPanel'
import { bg } from './BG'
import { BoldKeywords } from './BoldKeywords'
import { states } from './States'
import { msgBox } from './MsgBox'
import { Config } from './Config'

// 中间面板
class CenterPanel {
  constructor() {
    this.addCenterPanel()
    lang.register(this.centerPanel)

    bg.useBG(this.centerPanel)

    new BoldKeywords(this.centerPanel)

    this.allLangFlag = lang.langTypes.map((type) => 'lang_' + type)
    this.setLangFlag()
    this.bindEvents()
  }

  private centerPanel: HTMLDivElement = document.createElement('div') // 中间面板

  // 添加中间面板
  private addCenterPanel() {
    const centerPanelHTML = `
      <div class="centerWrap ${'lang_' + lang.type}">

      <div class="centerWrap_head">
      <div class="centerWrap_title blue">
      ${Config.appName}
      <div class="btns">
      <a class="has_tip centerWrap_top_btn" data-xztip="_github" href="https://github.com/xuejianxianzun/PixivFanboxDownloader" target="_blank">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-github"></use>
      </svg>
      </a>
      
      <button class="textButton has_tip centerWrap_top_btn centerWrap_close" data-xztip="_隐藏下载面板" data-xztitle="_隐藏下载面板">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-guanbi"></use>
      </svg>
      </button>

      </div>
      </div>

      </div>

      <div class="centerWrap_con beautify_scrollbar">
      <slot data-name="form"></slot>

      <div class="help_bar gray1"> 
      <button class="textButton gray1" id="showDownTip" type="button" data-xztext="_常见问题"></button>
      <a class="gray1" href="https://discord.gg/u4wVMy7xJM" target="_blank">Discord</a>
      <a class="gray1" href="https://chrome.google.com/webstore/detail/powerful-pixiv-downloader/dkndmhgdcmjdmkdonmbgjpijejdcilfh" target="_blank" data-xztext="_pixivDownloader"></a>
      <button class="textButton gray1" id="showPatronTip" type="button" data-xztext="_赞助我"></button>
      </div>
      
      </div>

      </div>
      `
    document.body.insertAdjacentHTML('beforebegin', centerPanelHTML)

    this.centerPanel = document.querySelector('.centerWrap') as HTMLDivElement
  }

  private allLangFlag: string[] = []
  private setLangFlag() {
    this.allLangFlag.forEach((flag) => {
      this.centerPanel.classList.remove(flag)
    })
    this.centerPanel.classList.add('lang_' + lang.type)
  }

  // 绑定中间面板上的事件
  private bindEvents() {
    // 监听点击扩展图标的消息，开关中间面板
    chrome.runtime.onMessage.addListener((msg) => {
      if (msg.msg === 'click_icon') {
        this.toggle()
      }
    })

    // 使用快捷键 Alt + x 切换中间面板显示隐藏
    window.addEventListener(
      'keydown',
      (ev) => {
        if (ev.altKey && ev.code === 'KeyX') {
          this.toggle()
        }
      },
      false
    )

    // 关闭按钮
    document
      .querySelector('.centerWrap_close')!
      .addEventListener('click', () => {
        EVT.fire('closeCenterPanel')
      })

    // 开始抓取作品时，隐藏
    window.addEventListener(EVT.list.crawlStart, () => {
      EVT.fire('closeCenterPanel')
    })

    // 抓取完作品详细数据时，显示
    for (const ev of [EVT.list.crawlFinish, EVT.list.resume]) {
      window.addEventListener(ev, () => {
        if (!states.quickCrawl) {
          this.show()
        }
      })
    }

    window.addEventListener(EVT.list.openCenterPanel, () => {
      this.show()
    })

    window.addEventListener(EVT.list.closeCenterPanel, () => {
      this.close()
    })

    // 显示常见问题
    this.centerPanel
      .querySelector('#showDownTip')!
      .addEventListener('click', () =>
        msgBox.show(lang.transl('_常见问题说明'), {
          title: lang.transl('_常见问题'),
        })
      )

    this.centerPanel
      .querySelector('#showPatronTip')!
      .addEventListener('click', () =>
        msgBox.show(lang.transl('_赞助方式提示'), {
          title: lang.transl('_赞助我'),
        })
      )

    this.centerPanel.addEventListener('click', (e) => {
      const ev = e || window.event
      ev.stopPropagation()
    })

    document.addEventListener('click', () => {
      if (getComputedStyle(this.centerPanel)['display'] !== 'none') {
        EVT.fire('closeCenterPanel')
      }
    })

    window.addEventListener(EVT.list.langChange, () => {
      this.setLangFlag()
    })
  }

  // 显示中间区域
  public show() {
    this.centerPanel.style.display = 'block'
    EVT.fire('centerPanelOpened')
  }

  // 隐藏中间区域
  public close() {
    this.centerPanel.style.display = 'none'
    EVT.fire('centerPanelClosed')
  }

  public toggle() {
    const nowDisplay = this.centerPanel.style.display
    nowDisplay === 'block' ? this.close() : this.show()
    if (nowDisplay === 'block') {
      EVT.fire('closeCenterPanel')
    } else {
      EVT.fire('openCenterPanel')
    }
  }
}

new CenterPanel()
