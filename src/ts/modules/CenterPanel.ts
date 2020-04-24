// 用户界面
import { lang } from './Lang'
import { EVT } from './EVT'
import { DOM } from './DOM'

// 中间面板
class CenterPanel {
  constructor() {
    this.addCenterPanel()
    this.bindEvents()
  }

  private centerPanel: HTMLDivElement = document.createElement('div') // 中间面板

  // 添加中间面板
  private addCenterPanel() {
    const centerPanelHTML = `
      <div class="centerWrap">
      <div class="centerWrap_head">
      <p class="centerWrap_title blue">Pixiv Fanbox Downloader</p>
      <div class="btns">
      <a class="has_tip centerWrap_top_btn" data-tip="${lang.transl(
        '_github'
      )}" href="https://github.com/xuejianxianzun/PixivFanboxDownloader" target="_blank">
      <svg t="1574401005111" class="icon" widht="16" height="16" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2594" xmlns:xlink="http://www.w3.org/1999/xlink><defs><style type="text/css"></style></defs><path d="M0 520.886c0-69.368 13.51-135.697 40.498-199.02 26.987-63.323 63.322-117.826 109.006-163.51 45.65-45.65 100.154-81.985 163.51-109.006A502.289 502.289 0 0 1 512 8.92c69.335 0 135.663 13.477 198.986 40.497 63.356 26.988 117.86 63.323 163.51 109.007 45.684 45.65 82.02 100.154 109.006 163.51A502.289 502.289 0 0 1 1024 520.852c0 111.318-32.504 211.472-97.511 300.494-64.975 88.989-148.48 150.825-250.484 185.476-5.351 0-9.348-0.99-11.99-2.973-2.676-1.982-4.196-3.997-4.526-6.012a59.458 59.458 0 0 1-0.495-8.984 7.663 7.663 0 0 1-0.991-3.006v-128.99c0-40.63-14.336-75.314-43.008-103.986 76.667-13.345 134.011-41.819 171.999-85.487 37.987-43.669 57.013-96.52 57.013-158.522 0-58.005-18.663-108.346-56.022-150.99 13.345-42.678 11-87.668-6.97-135.003-18.697-1.322-39.011 1.85-61.01 9.513-22 7.663-38.318 14.831-49.02 21.47-10.637 6.673-20.316 13.016-28.97 19.027-38.68-10.669-81.854-16.02-129.486-16.02-47.7 0-90.509 5.351-128.529 16.02-7.333-5.35-15.855-11.164-25.5-17.507-9.68-6.342-26.493-14.005-50.507-22.99-23.982-9.018-45.65-12.85-65.008-11.495-18.663 47.996-20.645 93.646-5.979 136.984-36.665 42.678-54.998 92.986-54.998 150.99 0 62.002 18.663 114.689 55.99 157.994 37.326 43.339 94.67 72.01 171.998 86.016a142.303 142.303 0 0 0-39.969 70.029c-56.683 13.972-96.355 3.963-119.015-30.06-42.017-61.308-79.674-83.307-113.003-65.965-4.69 4.657-3.997 9.48 1.982 14.501 6.012 4.988 14.996 11.66 27.02 19.985 11.99 8.357 20.976 17.507 26.987 27.515 0.661 1.322 2.51 6.177 5.517 14.502a831.917 831.917 0 0 0 8.985 23.981c2.973 7.663 8.654 16.186 17.011 25.5 8.324 9.349 18.003 17.178 29.003 23.52 11 6.309 26.161 11 45.485 14.006 19.324 2.972 41.323 3.138 65.998 0.495v100.484c0 0.991-0.165 2.643-0.495 5.021-0.33 2.312-0.991 3.964-1.982 4.955-0.991 1.024-2.345 2.015-4.03 3.039a12.52 12.52 0 0 1-6.474 1.486c-2.676 0-6.012-0.33-10.009-0.99-101.343-35.345-183.825-97.182-247.51-185.51C31.842 731.037 0 631.577 0 520.92z" p-id="2595"></path></svg>
      </a>
      
        <div class="has_tip centerWrap_top_btn centerWrap_close" data-tip="${lang.transl(
          '_快捷键切换显示隐藏'
        )}">
        <svg t="1574392276519" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1123" data-spm-anchor-id="a313x.7781069.0.i0" xmlns:xlink="http://www.w3.org/1999/xlink" width="14" height="14"><defs><style type="text/css"></style></defs><path d="M521.693867 449.297067L111.4112 39.0144a51.2 51.2 0 1 0-72.430933 72.362667l410.282666 410.3168-410.282666 410.3168a51.2 51.2 0 1 0 72.3968 72.3968l410.3168-410.282667 410.3168 410.282667a51.2 51.2 0 1 0 72.3968-72.362667l-410.282667-410.350933 410.282667-410.282667a51.2 51.2 0 1 0-72.3968-72.3968l-410.282667 410.282667z" p-id="1124"></path></svg>
        </div>
      </div>
      </div>

      <div class="centerWrap_con">
      <slot data-name="form"></slot>
      </div>

      <div class="gray1 bottom_help_bar"> 
      <span class="showDownTip">${lang.transl('_常见问题')}</span>
      <span id="resetOption">${lang.transl('_重置设置')}</span>
      <a id="zanzhu" class="wiki2 patronText" href="https://afdian.net/@xuejianxianzun" target="_blank">通过“爱发电”网站支持我</a>
      <a id="patreon" class="wiki2 patronText" href="https://www.patreon.com/xuejianxianzun" target="_blank">Become a patron</a>
      <br>
      <p class="downTip tip"> ${lang.transl('_下载说明')}</p>
      </div>

      </div>
      `
    document.body.insertAdjacentHTML('beforeend', centerPanelHTML)

    this.centerPanel = document.querySelector('.centerWrap') as HTMLDivElement

    const userLang = document.documentElement.lang
    if (['zh', 'zh-CN', 'zh-Hans'].includes(userLang)) {
      document.getElementById('zanzhu')!.style.display = 'inline-block'
    } else {
      document.getElementById('patreon')!.style.display = 'inline-block'
    }
  }

  // 绑定中间面板上的事件
  private bindEvents() {
    // 监听点击扩展图标的消息，开关中间面板
    chrome.runtime.onMessage.addListener((msg) => {
      if (msg.msg === 'click_icon') {
        if (this.centerPanel.style.display === 'block') {
          this.close()
        } else {
          this.show()
        }
      }
    })

    // 关闭按钮
    document
      .querySelector('.centerWrap_close')!
      .addEventListener('click', () => {
        this.close()
      })

    // 使用快捷键 Alt + x 切换中间面板显示隐藏
    window.addEventListener(
      'keydown',
      (ev) => {
        if (ev.altKey && ev.keyCode === 88) {
          const nowDisplay = this.centerPanel.style.display
          if (nowDisplay === 'block') {
            this.close()
          } else {
            this.show()
          }
        }
      },
      false
    )

    // 点击右侧图标时，显示
    window.addEventListener(EVT.events.clickRightIcon, () => {
      this.show()
    })

    // 开始抓取作品时，隐藏
    window.addEventListener(EVT.events.crawlStart, () => {
      this.close()
    })

    // 抓取完作品详细数据时，显示
    window.addEventListener(EVT.events.crawlFinish, () => {
      this.show()
    })

    // 显示常见问题
    document
      .querySelector('.showDownTip')!
      .addEventListener('click', () =>
        DOM.toggleEl(document.querySelector('.downTip')! as HTMLDivElement)
      )

    // 重置设置
    document.getElementById('resetOption')!.addEventListener('click', () => {
      const result = window.confirm(lang.transl('_是否重置设置'))
      if (result) {
        EVT.fire(EVT.events.resetOption)
      }
    })
  }

  // 显示中间区域
  public show() {
    this.centerPanel.style.display = 'block'
    EVT.fire(EVT.events.showCenterPanel)
  }

  // 隐藏中间区域
  public close() {
    this.centerPanel.style.display = 'none'
    EVT.fire(EVT.events.hideCenterPanel)
  }
}

const centerPanel = new CenterPanel()
export { centerPanel }
