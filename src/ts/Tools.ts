import { lang } from './Lang'

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
}

export { Tools }
