// 保存和初始化设置项
// 只有部分设置会被保存
import { EVT } from './EVT'
import { store } from './Store'
import { SettingsForm } from './Settings.d'

interface fanboxSetting {
  image: boolean
  music: boolean
  video: boolean
  compressed: boolean
  ps: boolean
  other: boolean
  free: boolean
  pay: boolean
  feeSwitch: boolean
  fee: number
  idRangeSwitch: boolean
  idRangeInput: number
  postDate: boolean
  postDateInput: string
  saveLink: boolean
  saveText: boolean
  userSetName: string
  quietDownload: boolean
  downloadThread: number
}

interface SettingChangeData {
  name: keyof fanboxSetting
  value: string | number | boolean
}

class SaveSettings {
  constructor(form: SettingsForm) {
    this.form = form

    this.bindOptionEvent()

    // 设置发生改变时，保存设置到本地存储
    window.addEventListener(
      EVT.events.settingChange,
      (event: CustomEventInit) => {
        const data = event.detail.data as SettingChangeData
        if (Reflect.has(this.optionDefault, data.name)) {
          if ((this.options[data.name] as any) !== data.value) {
            ;(this.options[data.name] as any) = data.value
            localStorage.setItem(this.storeName, JSON.stringify(this.options))
          }
        }
      }
    )

    this.restoreOption()
  }

  private form: SettingsForm

  // 本地存储中使用的 name
  private readonly storeName = 'fanboxSetting'

  // 需要持久化保存的设置的默认值
  private readonly optionDefault: fanboxSetting = {
    image: true,
    music: true,
    video: true,
    compressed: true,
    ps: true,
    other: true,
    free: true,
    pay: true,
    feeSwitch: false,
    fee: 500,
    idRangeSwitch: false,
    idRangeInput: 0,
    postDate: false,
    postDateInput: '',
    saveLink: true,
    saveText: false,
    userSetName: store.defaultFileName,
    quietDownload: true,
    downloadThread: 3,
  }

  // 需要持久化保存的设置
  private options: fanboxSetting = this.optionDefault

  // 恢复值是 Boolean 的设置项
  // 给复选框使用
  private restoreBoolean(name: keyof fanboxSetting) {
    // 优先使用用户设置的值
    if (typeof this.options[name] === 'boolean') {
      this.form[name].checked = Boolean(this.options[name])
    } else {
      // 否则使用默认值
      this.form[name].checked = Boolean(this.optionDefault[name])
    }
    // 这里不能简单的使用 || 符号来处理，考虑如下情况：
    // this.options[name] || this.optionDefault[name]
    // 用户设置为 false，默认值为 true，使用 || 的话就恒为 true 了
  }

  // 恢复值是 string 的设置项
  // 给单选按钮和文本框使用
  private restoreString(name: keyof fanboxSetting) {
    // 优先使用用户设置的值
    if (this.options[name] !== undefined) {
      this.form[name].value = this.options[name].toString()
    } else {
      // 否则使用默认值
      this.form[name].value = this.optionDefault[name].toString()
    }
  }

  // 从持久化设置，缺省使用默认值，恢复下载区域的设置
  private restoreOption() {
    const savedOption = localStorage.getItem(this.storeName)
    // 读取保存的设置
    if (savedOption) {
      this.options = JSON.parse(savedOption)
    } else {
      // 如果没有保存过，则不做处理
      return
    }

    this.restoreString('fee')
    this.restoreString('idRangeInput')
    this.restoreString('postDateInput')
    this.restoreString('userSetName')
    this.restoreString('downloadThread')

    this.restoreBoolean('image')
    this.restoreBoolean('music')
    this.restoreBoolean('video')
    this.restoreBoolean('compressed')
    this.restoreBoolean('ps')
    this.restoreBoolean('other')
    this.restoreBoolean('free')
    this.restoreBoolean('pay')
    this.restoreBoolean('feeSwitch')
    this.restoreBoolean('idRangeSwitch')
    this.restoreBoolean('postDate')
    this.restoreBoolean('saveLink')
    this.restoreBoolean('saveText')
    this.restoreBoolean('quietDownload')
  }

  // 处理输入框： change 时直接保存 value
  private saveTextInput(name: keyof fanboxSetting) {
    const el = this.form[name] as HTMLInputElement
    el.addEventListener('change', () => {
      this.emitChange(name, el.value)
    })
  }

  // 处理复选框： click 时直接保存 checked
  private saveCheckBox(name: keyof fanboxSetting) {
    const el = this.form[name] as HTMLInputElement
    el.addEventListener('click', () => {
      this.emitChange(name, el.checked)
    })
  }

  // 处理单选框： click 时直接保存 value
  private saveRadio(name: string) {
    const radios = this.form[name]
    for (const radio of radios) {
      radio.addEventListener('click', () => {
        this.emitChange(name, radio.value)
      })
    }
  }

  // 绑定所有选项的事件，当选项变动触发 settingChange 事件
  // 只可执行一次，否则事件会重复绑定
  private bindOptionEvent() {
    this.saveTextInput('fee')
    this.saveTextInput('idRangeInput')
    this.saveTextInput('postDateInput')
    this.saveTextInput('downloadThread')

    this.saveCheckBox('image')
    this.saveCheckBox('music')
    this.saveCheckBox('video')
    this.saveCheckBox('compressed')
    this.saveCheckBox('ps')
    this.saveCheckBox('other')
    this.saveCheckBox('free')
    this.saveCheckBox('pay')
    this.saveCheckBox('feeSwitch')
    this.saveCheckBox('idRangeSwitch')
    this.saveRadio('idRange')
    this.saveRadio('postRange')
    this.saveCheckBox('postDate')
    this.saveCheckBox('saveLink')
    this.saveCheckBox('saveText')
    this.saveCheckBox('quietDownload')

    // 保存命名规则
    const userSetNameInput = this.form.userSetName
    ;['change', 'focus'].forEach((ev) => {
      userSetNameInput.addEventListener(ev, () => {
        this.emitChange('userSetName', userSetNameInput.value)
      })
    })

    window.addEventListener(EVT.events.resetOption, () => {
      this.form.reset()
      this.reset()
    })
  }

  private emitChange(name: string, value: string | number | boolean) {
    EVT.fire(EVT.events.settingChange, { name: name, value: value })
  }

  // 重设选项
  private reset() {
    // 将保存的选项恢复为默认值
    this.options = this.optionDefault
    // 覆写本地存储里的设置为默认值
    localStorage.setItem(this.storeName, JSON.stringify(this.options))
    // 重设选项
    this.restoreOption()
    // 触发设置改变事件
    EVT.fire(EVT.events.settingChange)
  }
}

export { SaveSettings }
