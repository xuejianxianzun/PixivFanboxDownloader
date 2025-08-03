import { lang } from './Lang'
import { Config } from './Config'
import { msgBox } from './MsgBox'
import { EVT } from './EVT'
import { setSetting, settings } from './setting/Settings'

// 显示最近更新内容
class ShowWhatIsNew {
  constructor() {
    this.bindEvents()
  }

  private flag = '4.7.0'

  private bindEvents() {
    window.addEventListener(EVT.list.settingInitialized, () => {
      // 消息文本要写在 settingInitialized 事件回调里，否则它们可能会被翻译成错误的语言
      let msg = `
      <strong class="blue">${lang.transl('_新增设置项')}: ${lang.transl(
        '_抓取间隔',
      )}</strong>
      <br>
      ${lang.transl('_抓取间隔的说明')}
      <br>
      <br>
      <strong class="blue">${lang.transl('_新增设置项')}: ${lang.transl(
        '_下载间隔',
      )}</strong>
      <br>
      ${lang.transl('_下载间隔的说明')}
      <br>
      <br>
      <strong class="blue">${lang.transl('_新增设置项')}: ${lang.transl(
        '_每天下载的文件大小限制',
      )}</strong>
      <br>
      ${lang.transl('_每天下载的文件大小限制的说明')}
      <br>
      <br>
      <strong class="blue"> ${lang.transl('_添加了俄语文本')}</strong>
      `

      // <strong>${lang.transl('_新增设置项')}: ${lang.transl(
      //   '_非图片的命名规则'
      // )}</strong>

      // ${lang.transl('_新增非图片命名规则的说明')}

      // 在更新说明的下方显示赞助提示
      msg += `
      <br>
      <br>
      ${lang.transl('_赞助方式提示')}`

      this.show(msg)
    })
  }

  private show(msg: string) {
    if (settings.whatIsNewFlag !== this.flag) {
      msgBox.show(msg, {
        title: Config.appName + ` ${lang.transl('_最近更新')}`,
        btn: lang.transl('_我知道了'),
      })
      setSetting('whatIsNewFlag', this.flag)
    }
  }
}

new ShowWhatIsNew()
