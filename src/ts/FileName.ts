// 生成文件名
import { Result } from './StoreType'
import { EVT } from './EVT'
import { store } from './Store'
import { lang } from './Lang'
import { DateFormat } from './utils/DateFormat'
import { settings } from './setting/Settings'
import { Config } from './Config'

class FileName {
  constructor() {
    window.addEventListener(EVT.list.previewFileName, () => {
      this.previewFileName()
    })
  }
  // 用正则过滤不安全的字符，（Chrome 和 Windows 不允许做文件名的字符）
  // 不安全的字符，这里多数是控制字符，需要替换掉
  private unsafeStr = new RegExp(
    /[\u0001-\u001f\u007f-\u009f\u00ad\u0600-\u0605\u061c\u06dd\u070f\u08e2\u180e\u200b-\u200f\u202a-\u202e\u2060-\u2064\u2066-\u206f\ufdd0-\ufdef\ufeff\ufff9-\ufffb\ufffe\uffff]/g
  )
  // 一些需要替换成全角字符的符号，左边是正则表达式的字符
  private fullWidthDict: string[][] = [
    ['\\\\', '＼'],
    ['/', '／'],
    [':', '：'],
    ['\\?', '？'],
    ['"', '＂'],
    ['<', '＜'],
    ['>', '＞'],
    ['\\*', '＊'],
    ['\\|', '｜'],
    ['~', '～'],
  ]

  // 把一些特殊字符替换成全角字符
  private replaceUnsafeStr(str: string) {
    str = str.replace(this.unsafeStr, '')
    for (let index = 0; index < this.fullWidthDict.length; index++) {
      const rule = this.fullWidthDict[index]
      const reg = new RegExp(rule[0], 'g')
      str = str.replace(reg, rule[1])
    }
    return str
  }

  // 生成 {index} 标记的值
  private createIndex(data: Result) {
    let index = data.index.toString()
    // 处理在前面填充 0 的情况
    return settings.zeroPadding
      ? index.padStart(settings.zeroPaddingLength, '0')
      : index
  }

  // 生成文件名，传入参数为图片信息
  public getFileName(data: Result) {
    let result = settings.userSetName
    // 为空时使用预设的命名规则
    result = result || Config.defaultNameRule

    // 配置所有命名标记
    const cfg = {
      '{postid}': {
        value: data.postId,
        safe: true,
      },
      '{title}': {
        value: data.title,
        safe: false,
      },
      '{name}': {
        value: data.name,
        safe: false,
      },
      '{ext}': {
        value: data.ext,
        safe: false,
      },
      '{index}': {
        value: this.createIndex(data),
        safe: false,
      },
      '{tags}': {
        value: data.tags,
        safe: false,
      },
      '{date}': {
        value: DateFormat.format(data.date, settings.dateFormat),
        safe: false,
      },
      '{task_date}': {
        value: DateFormat.format(store.date, settings.dateFormat),
        prefix: '',
        safe: false,
      },
      '{fee}': {
        value: data.fee,
        safe: true,
      },
      '{user}': {
        value: data.user,
        safe: false,
      },
      '{uid}': {
        value: data.uid,
        safe: true,
      },
    }

    // 替换命名规则里的特殊字符
    result = this.replaceUnsafeStr(result)
    // 上一步会把斜线 / 替换成全角的斜线 ／，这里再替换回来，否则就不能建立文件夹了
    result = result.replace(/／/g, '/')

    // 把命名规则的标记替换成实际值
    for (const [key, val] of Object.entries(cfg)) {
      // 只有当标记有值时才会进行替换，所以没有值的标记会原样保留
      if (result.includes(key) && val.value !== '' && val.value !== null) {
        let once = String(val.value)

        // 处理标记值中的特殊字符
        if (!val.safe) {
          once = this.replaceUnsafeStr(once)
        }

        result = result.replace(new RegExp(key, 'g'), once) // 将标记替换成最终值，如果有重复的标记，全部替换
      }
    }

    // 处理空值，连续的 '//'。 有时候两个斜线中间的字段是空值，最后就变成两个斜线挨在一起了
    result = result.replace(/undefined/g, '').replace(/\/{2,9}/, '/')

    // 对每一层路径进行处理
    let tempArr = result.split('/')
    tempArr.forEach((str, index, arr) => {
      // 替换路径首尾的空格
      // 把每层路径头尾的 . 变成全角的．因为 Chrome 不允许头尾使用 .
      arr[index] = str.trim().replace(/^\./g, '．').replace(/\.$/g, '．')
    })
    result = tempArr.join('/')

    // 去掉头尾的 /
    if (result.startsWith('/')) {
      result = result.replace('/', '')
    }
    if (result.endsWith('/')) {
      result = result.substr(0, result.length - 1)
    }

    // 添加后缀名
    result += '.' + data.ext
    return result
  }

  // 预览文件名
  private previewFileName() {
    if (store.result.length === 0) {
      return alert(lang.transl('_没有数据可供使用'))
    }

    // 使用数组储存和拼接字符串，提高性能
    const resultArr: string[] = []

    const length = store.result.length
    for (let i = 0; i < length; i++) {
      const data = store.result[i]
      // 为生成的文件名添加颜色
      const fullName = this.getFileName(data)
      const part = fullName.split('/')
      const length = part.length
      for (let i = 0; i < length; i++) {
        const str = part[i]
        if (i < length - 1) {
          // 如果不是最后一项，说明是文件夹名，添加颜色
          part[i] = `<span class="color666">${str}</span>`
        } else {
          // 最后一项，是文件名，添加颜色
          part[i] = `<span class="color000">${str}</span>`
        }
      }
      const fullNameHtml = part.join('/')

      // 保存本条结果
      const nowResult = `<p class="result">${fullNameHtml}</p>`
      resultArr.push(nowResult)
    }

    // 拼接所有结果
    const result = resultArr.join('')
    EVT.fire('output', {
      content: result,
      title: '_预览文件名',
    })
  }
}

const fileName = new FileName()
export { fileName }
