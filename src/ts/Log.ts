import { EVT } from './EVT'
import { Colors } from './Colors'

// 日志
class Log {
  constructor() {
    // 因为日志区域限制了最大高度，可能会出现滚动条
    // 所以使用定时器，使日志总是滚动到底部
    window.setInterval(() => {
      if (this.toBottom) {
        this.logContent.scrollTop = this.logContent.scrollHeight
        this.toBottom = false
      }
    }, 500)

    window.addEventListener(EVT.list.clearLog, () => {
      this.removeAll()
    })
  }

  /**每个日志区域显示多少条日志 */
  // 如果日志条数超出最大值，下载器会创建多个日志区域
  private max = 100

  /**最新的日志区域里的日志条数。刷新的日志不会计入 */
  private count = 0

  private logWrap = document.createElement('div') // 日志容器的区域，当日志条数很多时，会产生多个日志容器。默认是隐藏的（display: none）
  private activeLogWrapID = 'logWrap' // 当前活跃的日志容器的 id，也是最新的一个日志容器
  private logContent = document.createElement('div') // 日志的主体区域，始终指向最新的那个日志容器内部
  private logContentClassName = 'logContent' // 日志主体区域的类名
  private logWrapClassName = 'logWrap' // 日志容器的类名，只负责样式
  private logWrapFlag = 'logWrapFlag' // 日志容器的标志，当需要查找日志区域时，使用这个类名而不是 logWrap，因为其他元素可能也具有 logWrap 类名，以应用其样式。

  /**储存会刷新的日志所使用的元素，可以传入 flag 来区分多个刷新区域 */
  // 每个刷新区域使用一个 span 元素，里面的文本会变化
  // 通常用于显示进度，例如 0/10, 1/10, 2/10... 10/10
  // 如果不传入 flag，那么所有的刷新内容会共用 default 的 span 元素
  private refresh: { [key: string]: HTMLElement } = {
    default: document.createElement('span'),
  }

  private toBottom = false // 指示是否需要把日志滚动到底部。当有日志被添加或刷新，则为 true。滚动到底部之后复位到 false，避免一直滚动到底部。

  /**不同日志等级的文字颜色 */
  private readonly levelColor = [
    'inherit',
    Colors.textSuccess,
    Colors.textWarning,
    Colors.textError,
  ]

  // 添加日志
  /*
  str 日志文本
  level 日志等级
  br 换行标签的个数
  keepShow 是否为持久日志。默认为 true，把这一条日志添加后不再修改。false 则会刷新显示这条日志。

  level 日志等级：
  0 normal
  1 success
  2 warning
  3 error
  */
  private add(
    str: string,
    level: number,
    br: number,
    keepShow: boolean,
    refreshFlag: string = 'default',
  ) {
    this.createLogArea()
    let span = document.createElement('span')
    if (!keepShow) {
      if (this.refresh[refreshFlag] === undefined) {
        this.refresh[refreshFlag] = span
      } else {
        span = this.refresh[refreshFlag]
      }
    } else {
      this.count++

      // 如果页面上的日志条数超过指定数量，则生成一个新的日志区域
      // 因为日志数量太多的话会占用很大的内存。同时显示 8000 条日志可能占用接近 1 GB 的内存
      if (this.count >= this.max) {
        // 移除 id 属性，也就是 this.activeLogWrapID
        // 下次输出日志时查找不到这个 id，就会新建一个日志区域
        this.logWrap.removeAttribute('id')
        // 滚动到底部
        this.logContent.scrollTop = this.logContent.scrollHeight
      }
    }

    span.innerHTML = str

    span.style.color = this.levelColor[level]

    while (br > 0) {
      span.appendChild(document.createElement('br'))
      br--
    }

    this.logContent.appendChild(span)
    this.toBottom = true // 需要把日志滚动到底部
  }

  public log(
    str: string,
    br: number = 1,
    keepShow: boolean = true,
    refreshFlag = 'default',
  ) {
    this.add(str, 0, br, keepShow, refreshFlag)
  }

  public success(
    str: string,
    br: number = 1,
    keepShow: boolean = true,
    refreshFlag = 'default',
  ) {
    this.add(str, 1, br, keepShow, refreshFlag)
  }

  public warning(
    str: string,
    br: number = 1,
    keepShow: boolean = true,
    refreshFlag = 'default',
  ) {
    this.add(str, 2, br, keepShow, refreshFlag)
  }

  public error(
    str: string,
    br: number = 1,
    keepShow: boolean = true,
    refreshFlag = 'default',
  ) {
    this.add(str, 3, br, keepShow, refreshFlag)
  }

  /**将一条刷新的日志元素持久化 */
  // 例如当某个进度显示到 10/10 的时候，就不会再变化了，此时应该将其持久化
  // 其实就是下载器解除了对它的引用，这样它的内容就不会再变化了
  // 并且下载器会为这个 flag 生成一个新的 span 元素待用
  public persistentRefresh(refreshFlag: string = 'default') {
    this.refresh[refreshFlag] = document.createElement('span')
  }

  /**创建新的日志区域 */
  private createLogArea() {
    // 先检查是否存在日志区域
    let test = document.getElementById(this.activeLogWrapID)

    // 创建日志区域
    if (test === null) {
      this.count = 0

      const logWrap = document.createElement('div')
      logWrap.id = this.activeLogWrapID
      logWrap.classList.add(this.logWrapClassName, this.logWrapFlag)
      const logContent = document.createElement('div')
      logContent.classList.add(this.logContentClassName, 'beautify_scrollbar')
      logWrap.append(logContent)

      // 添加到 body 前面
      this.logWrap = logWrap
      this.logContent = logContent
      document.body.insertAdjacentElement('beforebegin', this.logWrap)
    }
  }

  public removeAll() {
    const allLogWrap = document.querySelectorAll(`.${this.logWrapFlag}`)
    allLogWrap.forEach((wrap) => wrap.remove())

    this.count = 0
  }

  public showAll() {
    const allLogWrap = document.querySelectorAll(
      `.${this.logWrapFlag}`,
    ) as NodeListOf<HTMLDListElement>
    allLogWrap.forEach((wrap) => {
      wrap.style.display = 'block'
      // 把内容滚动到底部
      const logContent = wrap.querySelector(
        `.${this.logContentClassName}`,
      ) as HTMLDivElement
      if (logContent) {
        logContent.scrollTop = logContent.scrollHeight
      }
    })
  }

  public hideAll() {
    const allLogWrap = document.querySelectorAll(`.${this.logWrapFlag}`)
    allLogWrap.forEach(
      (wrap) => ((wrap as HTMLDListElement).style.display = 'none'),
    )
  }
}

const log = new Log()
export { log }
