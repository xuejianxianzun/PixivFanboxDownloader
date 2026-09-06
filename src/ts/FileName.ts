// 生成文件名
import { Result } from './StoreType'
import { EVT } from './EVT'
import { store } from './Store'
import { lang } from './Lang'
import { DateFormat } from './utils/DateFormat'
import { Utils } from './utils/Utils'
import { settings } from './setting/Settings'
import { Config } from './Config'

class FileName {
  constructor() {
    window.addEventListener(EVT.list.previewFileName, () => {
      this.previewFileName()
    })
  }

  /** 生成 {index} 标记的值 */
  private createIndex(data: Result) {
    let index = data.index.toString()
    // 处理在前面填充 0 的情况
    return settings.zeroPadding
      ? index.padStart(settings.zeroPaddingLength, '0')
      : index
  }

  /** 生成 {PVA} 标记的值 */
  private getPVA(postId: string) {
    const { P, V, A } = store.getPva(postId)

    const array: string[] = []
    P && array.push(`${P}P`)
    V && array.push(`${V}V`)
    A && array.push(`${A}A`)

    if (array.length === 0) {
      return ''
    }

    // 根据下载器的语言，生成不同的 PVA 字符串
    // 依据文档：docs/资源标记习惯的中英差异.md
    if (lang.type === 'zh-cn' || lang.type === 'zh-tw' || lang.type === 'ja') {
      // 中文、日文里，返回值如 【15P1V1A】
      const str = `【${array.join('')}】`
      return str
    } else {
      // 在其他语言里使用英语圈的习惯，返回值如 [15P+1V+1A]
      const str = `[${array.join('+')}]`
      return str
    }
  }

  private getNameRule(data: Result) {
    if (Config.fileType.image.includes(data.ext.toLowerCase())) {
      return settings.userSetName || Config.defaultNameRule
    } else {
      return settings.nameruleForNonImages || Config.defaultNameRuleForNonImages
    }
  }

  // 生成文件名，传入参数为图片信息
  public getFileName(data: Result) {
    let result = this.getNameRule(data)

    // 配置所有命名标记
    const cfg = {
      '{postid}': {
        value: data.postId,
        safe: true,
      },
      '{post_id}': {
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
      // {create_id} 是历史遗留，已经被 {creator_id} 取代。
      // 为了保持兼容性，继续保留它
      '{create_id}': {
        value: data.createID,
        safe: true,
      },
      '{creator_id}': {
        value: data.createID,
        safe: true,
      },
      '{uid}': {
        value: data.uid,
        safe: true,
      },
      '{user_id}': {
        value: data.uid,
        safe: true,
      },
      '{PVA}': {
        value: this.getPVA(data.postId),
        safe: true,
      },
    }

    // 替换命名规则里的特殊字符
    result = Utils.replaceUnsafeStr(result)
    // 上一步会把斜线 / 替换成全角的斜线 ／，这里再替换回来，否则就不能建立文件夹了
    result = result.replace(/／/g, '/')

    // 把命名规则的标记替换成实际值
    for (const [key, val] of Object.entries(cfg)) {
      if (result.includes(key)) {
        // 处理空值，避免出现 undefined、null、'' 等情况。对于数字 0 则会正常转换为字符串 '0'
        let once =
          val.value === '' || val.value === null || val.value === undefined
            ? ''
            : String(val.value)
        // 有些标记可能是空字符串，移除它们前面的多余的分割符号
        if (once === '') {
          result = this.removeEmptyTag(result, key)
        }
        if (!val.safe) {
          once = Utils.replaceUnsafeStr(once)
        }
        result = result.replace(new RegExp(key, 'g'), once)
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

  /** 如果某个标记的值是空字符串，则检查它前面是否有分割字符，有的话就把它和分隔符一起去掉。返回修改后的 rule */
  // 例如：如果 {tags} 是空字符串，那么 `-{tags}` 会留下一个横线 `-`
  // 这里的处理是为了去掉横线。除了 `-` 还检测了其他一些常用的分割字符
  // 但如果用户在前面添加了自定义文字，是无法去掉自定义文字的，例如 `tags:{tags}` 会留下 `tags:`
  private removeEmptyTag(rule: string, tag: string): string {
    const symbols = ['-', '_', ' ', ',', '&', '#']
    for (const symbol of symbols) {
      rule = rule.replaceAll(symbol + tag, '')
    }

    return rule
  }

  // 预览文件名
  private previewFileName() {
    if (store.result.length === 0) {
      return alert(lang.transl('_没有数据可供使用'))
    }

    // 使用数组储存和拼接字符串，提高性能
    const resultArr: string[] = []
    let result = ''

    const length = store.result.length
    if (length < Config.outputMax) {
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
      result = resultArr.join('')
    } else {
      // 不生成 html 标签，只生成纯文本，保存为 txt 文件
      for (let i = 0; i < length; i++) {
        const data = store.result[i]
        const fullName = this.getFileName(data)
        resultArr.push(fullName)
      }

      result = resultArr.join('\n')
    }

    EVT.fire('output', {
      content: result,
      title: '_预览文件名',
    })
  }
}

const fileName = new FileName()
export { fileName }
