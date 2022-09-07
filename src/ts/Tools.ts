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

  static addBtn(
    slot: string,
    bg: string = '',
    text: string = '',
    attr: string[][] = []
  ) {
    const e = document.createElement('button')
    e.type = 'button'
    e.style.backgroundColor = bg
    e.textContent = text

    for (const [key, value] of attr) {
      e.setAttribute(key, value)
    }
    this.useSlot(slot, e)

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
