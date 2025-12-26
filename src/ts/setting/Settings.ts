// settings 保存了下载器的所有设置项

// 获取设置项的值：
// settings[name]

// 修改设置项的值：
// setSetting(name, value)

// 本模块会触发 3 个事件：

// EVT.list.settingChange
// 当任意一个设置项被赋值时触发（本模块不会区分值是否发生了变化）。这是最常用的事件。
// 事件的参数里会传递这个设置项的名称和值，格式如：
// {name: string, value: any}
// 如果某个模块要监听特定的设置项，应该使用参数的 name 来判断触发事件的设置项是否是自己需要的设置项
// 如果不依赖于特定设置项，则应该考虑使用节流或者防抖来限制事件监听器的执行频率，防止造成严重的性能问题

// EVT.list.settingInitialized
// 当设置初始化完毕后（恢复保存的设置之后）触发。这个事件在生命周期里只会触发一次。
// 过程中，每个设置项都会触发一次 settingChange 事件

// EVT.list.resetSettingsEnd
// 重置设置之后触发
// 导入设置之后触发
// 过程中，每个设置项都会触发一次 settingChange 事件

// 如果打开了多个标签页，每个页面的 settings 数据是互相独立的，在一个页面里修改设置不会影响另一个页面里的设置。
// 但是持久化保存的数据只有一份：最后一次设置变更是在哪个页面发生的，就保存哪个页面的 settings 数据。

import { EVT } from '../EVT'
import { Utils } from '../utils/Utils'
import { msgBox } from '../MsgBox'
import { Config } from '../Config'
import { toast } from '../Toast'
import { lang } from '../Lang'

export interface BlockTagsForSpecificUserItem {
  uid: number
  user?: string
  tags: string[]
}

type SettingValue =
  | string
  | number
  | boolean
  | string[]
  | number[]
  | object[]
  | { [key: number]: string }
  | Map<string, string>

export interface SettingChangeData {
  name: SettingKeys
  value: SettingValue
}

interface XzSetting {
  image: boolean
  music: boolean
  video: boolean
  compressed: boolean
  ps: boolean
  other: boolean
  free: boolean
  pay: boolean
  feeSwitch: boolean
  feeRange: '>=' | '=' | '<='
  fee: number
  idRangeSwitch: boolean
  idRangeInput: number
  idRange: '>' | '<'
  postDate: boolean
  postDateStart: number
  postDateEnd: number
  saveLink: boolean
  saveText: boolean
  userSetName: string
  autoStartDownload: boolean
  downloadThread: number
  dateFormat: string
  savePostCover: boolean
  userSetLang: 'zh-cn' | 'zh-tw' | 'ja' | 'en' | 'ko' | 'auto'
  tipCreateFolder: boolean
  whatIsNewFlag: string
  showAdvancedSettings: boolean
  bgDisplay: boolean
  bgOpacity: number
  bgPositionY: 'center' | 'top'
  boldKeywords: boolean
  namingRuleList: string[]
  showNotificationAfterDownloadComplete: boolean
  zeroPadding: boolean
  zeroPaddingLength: number
  deduplication: boolean
  showHowToUse: boolean
  unifiedURL: boolean
  titleMustTextSwitch: boolean
  titleMustText: string[]
  titleCannotTextSwitch: boolean
  titleCannotText: string[]
  nameruleForNonImages: string
  fileNameIncludeSwitch: boolean
  fileNameInclude: string[]
  fileNameExcludeSwitch: boolean
  fileNameExclude: string[]
  /**设置下载一个文件后，需要等待多久才能开始下一次下载。值为 0 - 3600 秒，允许小数 */
  downloadInterval: number
  crawlInterval: number
  totalDownloadLimitSwitch: boolean
  /** 每天下载的文件大小限制，单位 GiB */
  totalDownloadLimit: number
  /**每天下载的文件大小限制，这是转换为 byte 的值 */
  totalDownloadLimitByte: number
  /** 保存图片的缩略图还是原图 */
  imageSize: 'original' | 'thumbnail'
}
// chrome storage 里不能使用 Map，因为保存时，Map 会被转换为 Object {}

type SettingKeys = keyof XzSetting

class Settings {
  constructor() {
    this.restore()
    this.bindEvents()
  }

  // 默认设置
  private readonly defaultSettings: XzSetting = {
    image: true,
    music: true,
    video: true,
    compressed: true,
    ps: true,
    other: true,
    free: true,
    pay: true,
    feeSwitch: false,
    feeRange: '>=',
    fee: 500,
    idRangeSwitch: false,
    idRangeInput: 0,
    idRange: '>',
    postDate: false,
    // 默认的起始时间：2018-01-01
    postDateStart: 1514764800000,
    // 默认的结束时间：2030-01-01
    postDateEnd: 1893456000000,
    saveLink: true,
    saveText: false,
    userSetName: 'fanbox/{user}/{date}-{title}/{index}',
    autoStartDownload: true,
    downloadThread: 2,
    dateFormat: 'YYYY-MM-DD',
    savePostCover: true,
    userSetLang: 'auto',
    tipCreateFolder: true,
    whatIsNewFlag: 'xuejian&saber',
    showAdvancedSettings: false,
    bgDisplay: false,
    bgOpacity: 60,
    bgPositionY: 'center',
    boldKeywords: true,
    namingRuleList: [],
    showNotificationAfterDownloadComplete: false,
    zeroPadding: false,
    zeroPaddingLength: 3,
    deduplication: false,
    showHowToUse: true,
    unifiedURL: true,
    titleMustTextSwitch: false,
    titleMustText: [],
    titleCannotTextSwitch: false,
    titleCannotText: [],
    nameruleForNonImages: 'fanbox/{user}/{date}-{title}/{name}',
    fileNameIncludeSwitch: false,
    fileNameInclude: [],
    fileNameExcludeSwitch: false,
    fileNameExclude: [],
    downloadInterval: 1,
    crawlInterval: 1,
    totalDownloadLimitSwitch: true,
    totalDownloadLimit: 10,
    totalDownloadLimitByte: 10737418240,
    imageSize: 'original',
  }

  private allSettingKeys = Object.keys(this.defaultSettings)

  // 值为浮点数的选项
  private floatNumberKey: string[] = [
    'downloadInterval',
    'crawlInterval',
    'totalDownloadLimit',
  ]

  // 值为整数的选项不必单独列出

  // 值为数字数组的选项
  private numberArrayKeys: string[] = []

  // 值为字符串数组的选项
  private stringArrayKeys = [
    'namingRuleList',
    'titleMustText',
    'titleCannotText',
    'fileNameInclude',
    'fileNameExclude',
  ]

  // 以默认设置作为初始设置
  public settings: XzSetting = Utils.deepCopy(this.defaultSettings)

  private bindEvents() {
    // 当设置发生变化时进行本地存储
    window.addEventListener(EVT.list.settingChange, () => {
      this.store()
    })

    window.addEventListener(EVT.list.resetSettings, () => {
      this.reset()
    })

    window.addEventListener(EVT.list.exportSettings, () => {
      this.exportSettings()
    })

    window.addEventListener(EVT.list.importSettings, () => {
      this.importSettings()
    })
  }

  // 读取恢复设置
  private restore() {
    let restoreData = this.defaultSettings
    // 首先从 chrome.storage 获取配置
    chrome.storage.local.get(Config.settingStoreName, (result) => {
      if (result[Config.settingStoreName]) {
        restoreData = result[Config.settingStoreName] as XzSetting
      } else {
        // 如无数据则尝试从 localStorage 获取配置，因为旧版本的配置储存在 localStorage 中
        const savedSettings = localStorage.getItem(Config.settingStoreName)
        if (savedSettings) {
          restoreData = JSON.parse(savedSettings) as XzSetting
        }
      }
      this.assignSettings(restoreData)
      EVT.fire('settingInitialized')
    })
  }

  private store = Utils.debounce(() => {
    // chrome.storage.local 的储存上限是 5 MiB（5242880 Byte）
    chrome.storage.local.set({
      [Config.settingStoreName]: this.settings,
    })
  }, 50)

  // 接收整个设置项，通过循环将其更新到 settings 上
  // 循环设置而不是整个替换的原因：
  // 1. 进行类型转换，如某些设置项是 number ，但是数据来源里是 string，setSetting 可以把它们转换到正确的类型
  // 2. 某些选项在旧版本里没有，所以不能用旧的设置整个覆盖
  private assignSettings(data: XzSetting) {
    const origin = Utils.deepCopy(data)
    for (const [key, value] of Object.entries(origin)) {
      this.setSetting(key as SettingKeys, value)
    }
  }

  private exportSettings() {
    const blob = Utils.json2Blob(this.settings)
    const url = URL.createObjectURL(blob)
    Utils.downloadFile(url, Config.appName + ` Settings.json`)
    toast.success(lang.transl('_导出成功'))
  }

  private async importSettings() {
    const loadedJSON = (await Utils.loadJSONFile().catch((err) => {
      return msgBox.error(err)
    })) as XzSetting
    if (!loadedJSON) {
      return
    }
    // 检查是否存在设置里的属性
    if (loadedJSON.downloadThread === undefined) {
      return msgBox.error(lang.transl('_格式错误'))
    }
    // 开始恢复导入的设置
    this.reset(loadedJSON)
    toast.success(lang.transl('_导入成功'), {
      position: 'center',
    })
  }

  // 重置设置 或者 导入设置
  // 可选参数：传递一份设置数据，用于从配置文件导入，恢复设置
  private reset(data?: XzSetting) {
    this.assignSettings(data ? data : this.defaultSettings)
    EVT.fire('resetSettingsEnd')
  }

  private tipError(key: string) {
    msgBox.error(`${key}: Invalid value`)
  }

  // 更改设置项
  // 其他模块应该通过这个方法更改设置
  // 这里面有一些类型转换的代码，主要目的：
  // 1. 兼容旧版本的设置。读取旧版本的设置时，将其转换成新版本的设置。例如某个设置在旧版本里是 string 类型，值为 'a,b,c'。新版本里是 string[] 类型，这里会自动将其转换成 ['a','b','c']
  // 2. 减少额外操作。例如某个设置的类型为 string[]，其他模块可以传入 string 类型的值如 'a,b,c'，而不必先把它转换成 string[]
  public setSetting(key: SettingKeys, value: SettingValue) {
    if (!this.allSettingKeys.includes(key)) {
      return
    }

    const keyType = typeof this.defaultSettings[key]
    const valueType = typeof value

    // 将传入的值转换成选项对应的类型
    if (keyType === 'string' && valueType !== 'string') {
      value = value.toString()
    }

    if (keyType === 'number' && valueType !== 'number') {
      // 时间是需要特殊处理的 number 类型
      if (key === 'postDateStart' || key == 'postDateEnd') {
        if (valueType === 'string') {
          if (value === '') {
            // 如果日期是空字符串，则替换为默认值
            value = this.defaultSettings[key]
          } else {
            // 把日期字符串转换成时间戳
            const date = new Date(value as string)
            value = date.getTime()
          }
        }
      } else {
        // 处理普通的 number 类型
        if (this.floatNumberKey.includes(key)) {
          value = Number.parseFloat(value as any)
        } else {
          value = Number.parseInt(value as any)
        }
      }

      if (isNaN(value as number)) {
        return this.tipError(key)
      }
    }

    if (keyType === 'boolean' && valueType !== 'boolean') {
      value = !!value
    }

    if (
      key === 'downloadThread' &&
      (value as number) > Config.downloadThreadMax
    ) {
      value = Config.downloadThreadMax
    }

    if (
      (key === 'downloadInterval' || key === 'crawlInterval') &&
      (value as number) < 0
    ) {
      value = 0
    }

    if (
      (key === 'downloadInterval' || key === 'crawlInterval') &&
      (value as number) > 3600
    ) {
      value = 3600
    }

    // 每天下载的文件大小限制
    if (key === 'totalDownloadLimit') {
      if ((value as number) < 0) {
        value = 0
      }
      // 设置的最大值不得超过 102400 GiB，也就是 100 TB
      if ((value as number) > 102400) {
        value = 1024
      }
      // 将 GiB 转换为 byte
      this.settings.totalDownloadLimitByte =
        (value as number) * 1024 * 1024 * 1024
    }

    // 处理数组类型的值
    if (Array.isArray(this.defaultSettings[key])) {
      if (this.stringArrayKeys.includes(key)) {
        // 字符串转换成 string[]
        if (valueType === 'string') {
          value = Utils.string2array(value as string)
        }
      }

      if (this.numberArrayKeys.includes(key)) {
        // 把数组转换成 number[]
        if (Array.isArray(value)) {
          value = (value as any[]).map((val: string | number) => {
            if (typeof val !== 'number') {
              return Number(val)
            } else {
              return val
            }
          })
        } else {
          return
        }
      }
    }

    // 更改设置
    ;(this.settings[key] as any) = value

    // 触发设置变化的事件
    EVT.fire('settingChange', { name: key, value: value })
  }
}

const self = new Settings()
const settings = self.settings
const setSetting = self.setSetting.bind(self)

export { settings, setSetting, SettingKeys }
