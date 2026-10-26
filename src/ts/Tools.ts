import { ServiceProvider, VideoProvider } from './CrawlResult'
import { lang } from './Lang'
import { DateFormat } from './utils/DateFormat'

type Dict = {
  [key in ServiceProvider]: string
}

class Tools {
  static getUserId() {
    const Reg = /creator\/(\d*)?/
    const testString = [location.href, document.head.innerHTML]
    for (const string of testString) {
      const result = Reg.exec(string)
      if (result && result.length > 1) {
        return result[1]
      }
    }

    throw new Error('getUserId failed!')
  }

  // 动态添加 css 样式
  static addStyle(css: string) {
    const e = document.createElement('style')
    e.innerHTML = css
    document.body.append(e)
  }

  // 寻找 slot，本程序使用的 slot 都要有 data-name 属性
  static findSlot(name: string) {
    const slot = document.querySelector(`slot[data-name=${name}]`)
    if (!slot) {
      throw new Error(`No such slot: ${name}`)
    }
    return slot
  }

  // 使用指定的插槽
  static useSlot(name: string, element: string | HTMLElement) {
    const slot = this.findSlot(name)

    if (typeof element === 'string') {
      // 插入字符串形式的元素
      const wrap = document.createElement('div')
      wrap.innerHTML = element
      const el = wrap.children[0]
      slot.appendChild(el)
      return el
    } else {
      // 插入 html 元素
      slot.appendChild(element)
      return element
    }
  }

  // 清空指定的插槽
  static clearSlot(name: string) {
    this.findSlot(name).innerHTML = ''
  }

  // 创建下载面板上的通用按钮
  // 注意 textFlag 和 titleFlag 必须是 LangText 里存在的属性，这是为了能根据语言设置动态切换文本
  // 如果 text 和 title 是直接设置的字符串，那么不应该使用这个方法设置，而是由调用者自行设置
  static addBtn(
    slot: string,
    bg: string = '',
    textFlag: string = '',
    titleFlag: string = '',
  ) {
    const e = document.createElement('button')
    e.type = 'button'
    e.style.backgroundColor = bg
    textFlag && e.setAttribute('data-xztext', textFlag)
    titleFlag && e.setAttribute('data-xztitle', titleFlag)

    this.useSlot(slot, e)
    lang.register(e)
    return e
  }

  /**获取页面标题 */
  // 删除了下载器在标题上添加的状态
  static getPageTitle() {
    let result = document.title
      .replace(/\[(↑|→|▶|↓|║|■|✓| )\]/, '')
      .replace(/^ (\d+) /, '')

    // 如果开头有空格则去掉空格
    if (result.startsWith(' ')) {
      result = result.replace(/ */, '')
    }

    return result
  }

  // 嵌入的文件只支持指定的网站，每个网站有固定的前缀
  static readonly providerDict: Dict = {
    youtube: 'https://www.youtube.com/watch?v=',
    fanbox: 'https://www.fanbox.cc/',
    gist: 'https://gist.github.com/',
    soundcloud: 'https://soundcloud.com/',
    vimeo: 'https://player.vimeo.com/video/',
    twitter: 'https://twitter.com/i/web/status/',
    google_forms: 'https://docs.google.com/forms/d/e/',
  }

  static getEmbedUrl(
    serviceProvider: ServiceProvider | VideoProvider,
    contentId: string,
  ) {
    let url = this.providerDict[serviceProvider] + contentId
    if (serviceProvider === 'google_forms') {
      url += '/viewform'
    }
    return url
  }

  static escapeHtml(value: string) {
    return value.replace(/[&<>"']/g, (character) => {
      const entities: { [key: string]: string } = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;',
      }
      return entities[character]
    })
  }

  // 下载器自己生成的 txt 文件没有 id，所以这里需要自己给它生成一个 id
  // 使用时间戳并不保险，因为有时候代码执行太快，会生成重复的时间戳。所以后面加上随机字符
  static createFileId() {
    return (
      new Date().getTime().toString() +
      Math.random().toString(16).replace('.', '')
    )
  }

  /** 下载器导出的一些文件的名字里含有时间戳。这个方法用来格式化这种时间戳，格式固定为 2026-08-07 08-01-00 */
  static formatDateTimeInFilename(date?: Date) {
    const now = date || new Date()
    return DateFormat.format(now, 'YYYY-MM-DD hh-mm-ss')
  }
}

export { Tools }
