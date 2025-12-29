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

  private flag = '4.8.0'

  private bindEvents() {
    window.addEventListener(EVT.list.settingInitialized, () => {
      // 消息文本要写在 settingInitialized 事件回调里，否则它们可能会被翻译成错误的语言
      let msg = `
      ${lang.transl('_更新说明480')}
      <br>
      <br>
      🐞${lang.transl('_修复bug')}
      <br>
      <br>
      😊${lang.transl('_优化用户体验')}
      `

      // <strong>${lang.transl('_新增设置项')}: ${lang.transl(
      //   '_非图片的命名规则'
      // )}</strong>

      // 🐞${lang.transl('_修复bug')}
      // 😊${lang.transl('_优化用户体验')}

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
