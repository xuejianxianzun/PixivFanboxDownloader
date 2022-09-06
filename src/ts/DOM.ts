// DOM 操作类
// 保存公用的 DOM 操作方法，以及从 DOM 中获取数据的 API
class DOM {
  // 切换 DOM 元素的可见性
  static toggleEl(el: HTMLElement) {
    el.style.display = el.style.display === 'block' ? 'none' : 'block'
  }

  // 将元素插入到页面顶部
  /*
  newindex-inner 是在未登录时的用户投稿列表页面使用的
  layout-body 是在未登录时的搜索页使用的
  */
  static insertToHead<T extends Element>(el: T): T {
    const insertPoint = document.body.querySelector('#root')
    if (insertPoint) {
      insertPoint.insertAdjacentElement('afterbegin', el)
    }
    return el
  }

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
}

export { DOM }
