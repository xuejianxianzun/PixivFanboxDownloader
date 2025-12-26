import { EVT } from '../EVT'
import { settings, setSetting, SettingKeys } from './Settings'
import { SettingsForm } from './SettingsForm'
import { DateFormat } from '../utils/DateFormat'
import { nameRuleManager } from './NameRuleManager'

// 管理 from 表单里的输入选项（input 元素和 textarea 元素）
// 从 settings 里恢复选项的值；当选项改变时保存到 settings 里
// 不属于输入选项的设置，不在这里处理

interface InputFileds {
  text: SettingKeys[]
  textarea: SettingKeys[]
  checkbox: SettingKeys[]
  radio: SettingKeys[]
  datetime: SettingKeys[]
}

class FormSettings {
  constructor(form: SettingsForm) {
    this.form = form

    nameRuleManager.registerInput(this.form.userSetName)

    this.bindEvents()

    this.restoreFormSettings()

    this.ListenChange()
  }

  private form!: SettingsForm

  // 没有填写 userSetName 字段，因为这个字段由 nameRuleManager 管理
  private readonly inputFileds: InputFileds = {
    checkbox: [
      'image',
      'music',
      'video',
      'compressed',
      'ps',
      'other',
      'free',
      'pay',
      'feeSwitch',
      'idRangeSwitch',
      'postDate',
      'saveLink',
      'saveText',
      'autoStartDownload',
      'showAdvancedSettings',
      'bgDisplay',
      'boldKeywords',
      'showNotificationAfterDownloadComplete',
      'zeroPadding',
      'deduplication',
      'savePostCover',
      'unifiedURL',
      'titleMustTextSwitch',
      'titleCannotTextSwitch',
      'fileNameIncludeSwitch',
      'fileNameExcludeSwitch',
      'totalDownloadLimitSwitch',
    ],
    text: [
      'fee',
      'idRangeInput',
      'downloadThread',
      'dateFormat',
      'bgOpacity',
      'zeroPaddingLength',
      'titleMustText',
      'titleCannotText',
      'nameruleForNonImages',
      'fileNameInclude',
      'fileNameExclude',
      'downloadInterval',
      'crawlInterval',
      'totalDownloadLimit',
    ],
    radio: ['idRange', 'feeRange', 'bgPositionY', 'userSetLang', 'imageSize'],
    textarea: [],
    datetime: ['postDateStart', 'postDateEnd'],
  }

  private restoreTimer = 0

  private bindEvents() {
    window.addEventListener(EVT.list.settingChange, () => {
      window.clearTimeout(this.restoreTimer)
      this.restoreTimer = window.setTimeout(() => {
        this.restoreFormSettings()
      }, 0)
    })
  }

  // 监听所有输入选项的变化
  // 该函数可执行一次，否则事件会重复绑定
  private ListenChange() {
    for (const name of this.inputFileds.text) {
      this.saveTextInput(name)
    }

    for (const name of this.inputFileds.textarea) {
      this.saveTextInput(name)
    }

    for (const name of this.inputFileds.datetime) {
      this.saveTextInput(name)
    }

    for (const name of this.inputFileds.radio) {
      this.saveRadio(name)
    }

    for (const name of this.inputFileds.checkbox) {
      this.saveCheckBox(name)
    }
  }

  // 读取设置，恢复到表单里
  private restoreFormSettings() {
    for (const name of this.inputFileds.text) {
      this.restoreString(name)
    }

    for (const name of this.inputFileds.radio) {
      this.restoreString(name)
    }

    for (const name of this.inputFileds.textarea) {
      this.restoreString(name)
    }

    for (const name of this.inputFileds.checkbox) {
      this.restoreBoolean(name)
    }

    for (const name of this.inputFileds.datetime) {
      this.restoreDate(name)
    }
  }

  // ---------------------

  // 处理输入框： change 时保存 value
  private saveTextInput(name: SettingKeys) {
    const el = this.form[name] as HTMLInputElement
    el.addEventListener('change', () => {
      setSetting(name, el.value)
    })
  }

  // 处理复选框： click 时保存 checked
  private saveCheckBox(name: SettingKeys) {
    const el = this.form[name] as HTMLInputElement
    el.addEventListener('click', () => {
      setSetting(name, el.checked)
    })
  }

  // 处理单选框： click 时保存 value
  private saveRadio(name: SettingKeys) {
    const radios = this.form[name]
    for (const radio of radios) {
      radio.addEventListener('click', () => {
        setSetting(name, radio.value)
      })
    }
  }

  // 恢复值为 Boolean 的设置项
  private restoreBoolean(name: SettingKeys) {
    if (settings[name] !== undefined) {
      this.form[name].checked = settings[name] as boolean
    }
  }

  // 恢复值为 string 的设置项
  private restoreString(name: SettingKeys) {
    if (settings[name] !== undefined) {
      this.form[name].value = settings[name].toString()
    }
  }

  // 恢复日期、时间设置项
  private restoreDate(name: SettingKeys) {
    if (settings[name] !== undefined) {
      // 把时间戳转换成 input 使用的字符串
      const date = settings[name] as number
      this.form[name].value = DateFormat.format(date, 'YYYY-MM-DDThh:mm')
    }
  }
}

export { FormSettings }
