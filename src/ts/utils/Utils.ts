class Utils {
  // 不安全的字符，这里多数是控制字符，需要替换掉
  static unsafeStr = new RegExp(
    /[\u0001-\u001f\u007f-\u009f\u00ad\u0600-\u0605\u061c\u06dd\u070f\u08e2\u180e\u200b-\u200f\u202a-\u202e\u2060-\u2064\u2066-\u206f\ufdd0-\ufdef\ufeff\ufff9-\ufffb\ufffe\uffff]/g
  )

  // 一些需要替换成全角字符的符号，左边是正则表达式的字符
  static readonly fullWidthDict: string[][] = [
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

  // reg 预先创建，而不是运行时创建，因为运行时重复创建太多次了

  // 用正则去掉不安全的字符
  static replaceUnsafeStr(str: string) {
    str = str.replace(this.unsafeStr, '')
    // 把一些特殊字符替换成全角字符
    for (let index = 0; index < this.fullWidthDict.length; index++) {
      const rule = this.fullWidthDict[index]
      const reg = new RegExp(rule[0], 'g')
      str = str.replace(reg, rule[1])
    }
    return str
  }

  // 对象深拷贝
  static deepCopy<T>(data: T): T {
    if (data === null || typeof data !== 'object') {
      return data
    }

    const result = (Array.isArray(data) ? [] : {}) as any

    for (const [key, value] of Object.entries(data)) {
      result[key] =
        data === null || typeof data !== 'object' ? value : this.deepCopy(value)
    }

    return result
  }

  // 字符串分割成数组
  static string2array(str: string): string[] {
    str = str.replace(/\n/g, '') // textarea 的值可能会存在换行符
    const temp = str.trim().split(',')
    const result = []
    for (const str of temp) {
      if (str !== '') {
        result.push(str.trim())
      }
    }
    return result
  }

  // 依据对象某个属性的值（视为数字）来排序对象数组。默认降序排列
  static sortByProperty(key: string, order: 'desc' | 'asc' = 'desc') {
    return function (a: any, b: any) {
      // 排序的内容有时可能是字符串，需要转换成数字排序
      const value1 = typeof a[key] === 'number' ? a[key] : parseFloat(a[key])
      const value2 = typeof b[key] === 'number' ? b[key] : parseFloat(b[key])

      if (value2 < value1) {
        return order === 'desc' ? -1 : 1
      } else if (value2 > value1) {
        return order === 'desc' ? 1 : -1
      } else {
        return 0
      }
    }
  }

  // 创建 input 元素选择 json 文件
  static async loadJSONFile<T>(): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      const i = document.createElement('input')
      i.setAttribute('type', 'file')
      i.setAttribute('accept', 'application/json')
      i.onchange = () => {
        if (i.files && i.files.length > 0) {
          // 读取文件内容
          const file = new FileReader()
          file.readAsText(i.files[0])
          file.onload = () => {
            const str = file.result as string
            let result: T
            try {
              result = JSON.parse(str)
              // if((result as any).constructor !== Object){
              // 允许是对象 {} 或者数组 []
              if (result === null || typeof result !== 'object') {
                const msg = 'Data is not an object!'
                return reject(new Error(msg))
              }
              return resolve(result)
            } catch (error) {
              const msg = 'JSON parse error!'
              return reject(new Error(msg))
            }
          }
        }
      }

      i.click()
    })
  }

  // 创建 input 元素选择文件
  static async selectFile(accept?: string) {
    return new Promise<FileList>((resolve, reject) => {
      const i = document.createElement('input')
      i.setAttribute('type', 'file')
      if (accept) {
        i.setAttribute('accept', accept)
      }
      i.onchange = () => {
        if (i.files && i.files.length > 0) {
          return resolve(i.files)
        } else {
          return reject()
        }
      }

      i.click()
    })
  }

  // 通过创建 a 标签来下载文件
  static downloadFile(url: string, fileName: string) {
    const a = document.createElement('a')
    a.href = url
    a.download = fileName
    a.click()
  }

  // 从 url 中获取指定的查询字段的值
  // 注意：返回值经过 encodeURIComponent 编码！
  static getURLSearchField(url: string, query: string) {
    const result = new URL(url).searchParams.get(query)
    if (result !== null) {
      return encodeURIComponent(result)
    } else {
      return ''
    }
  }

  /**获取 URL path 中，某个路径名称后面的字符串。适用于符合 RESTful API 风格的路径
   *
   * 注意：传入的是 path，而不是整个 URL
   */
  // 例如：
  // https://www.pixiv.net/users/27482064/following/%E9%83%A8%E5%88%86%E5%96%9C%E6%AC%A2
  // 查询 'users' 返回 '27482064'
  // 因为 location.pathname 传入的字符串是浏览器自动编码过的，所以返回的字符串也是编码过的
  static getURLPathField(path: string, query: string) {
    const array = path.split('/')
    const index = array.findIndex((str) => str === query)
    if (index === -1) {
      return ''
    }
    return array[index + 1] || ''
  }

  // 切换 DOM 元素的可见性
  // 第二个参数设置显示时的 display，默认是 block，如果要设置为其他类型，则需要指定第二个参数
  static toggleEl(el: HTMLElement, showDisplay: string = 'block') {
    el.style.display = el.style.display === showDisplay ? 'none' : showDisplay
  }

  // 动态添加 css 样式
  static addStyle(css: string) {
    const e = document.createElement('style')
    e.innerHTML = css
    document.body.append(e)
  }

  // 加载一个图片，当 onload 事件发生之后返回 img 元素
  static async loadImg(url: string) {
    return new Promise<HTMLImageElement>((resolve, reject) => {
      const img = new Image()
      img.src = url
      img.onload = function () {
        resolve(img)
      }
      img.onerror = () => {
        reject(new Error(`Load image error! url: ${url}`))
      }
    })
  }

  /**JSON 转换成 Blob 对象。如果数据量可能比较大，则不应该使用这个方法 */
  static json2Blob(data: any) {
    const str = JSON.stringify(data, null, 2)
    const blob = new Blob([str], { type: 'application/json' })
    return blob
  }

  /**JSON 转换成 Blob 对象。可以处理更大的数据量 */
  static json2BlobSafe(data: any[]): Blob {
    // 在这个数组里储存数组字面量
    let result: string[] = []

    // 添加数组的开始符号
    result.push('[')

    // 循环添加每一项数据
    for (const item of data) {
      result.push(JSON.stringify(item))
      result.push(',')
    }

    // 删除最后一个分隔符，否则会导致格式错误
    result.pop()

    // 添加数组的结束符号
    result.push(']')

    // 创建 blob 对象
    const blob = new Blob(result, { type: 'application/json' })
    result = []

    return blob
  }

  /**防抖 */
  static debounce(func: Function, wait: number) {
    // 默认的定时器 id 不能使用有意义的数字，否则 clearTimeout 可能会错误的清除其他定时器
    let timer: number | undefined = undefined
    const context = this
    return function () {
      const args = arguments
      window.clearTimeout(timer)
      timer = window.setTimeout(func.bind(context, ...args), wait)
    }
  }

  /**节流 */
  static throttle(func: Function, delay: number) {
    let time = 0
    const context = this
    return function () {
      const args = arguments
      const now = new Date().getTime()
      if (now - time >= delay) {
        time = now
        return func.apply(context, args)
      }
    }
  }

  /**用 URL 里的后缀名替换 originName 的后缀名
   *
   * 例如传入参数 123.txt, https://.../123.jpg
   *
   * 返回 123.jpg
   */
  static replaceSuffix(originName: string, url: string) {
    const nameArray = originName.split('.')
    const urlArray = url.split('.')
    nameArray[nameArray.length - 1] = urlArray[urlArray.length - 1]
    return nameArray.join('.')
  }

  /**获取后缀名 */
  static getSuffix(name: string) {
    const nameArray = name.split('.')
    return nameArray[nameArray.length - 1]
  }
}

export { Utils }
