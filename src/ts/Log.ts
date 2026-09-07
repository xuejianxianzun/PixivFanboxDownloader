import { EVT } from './EVT'
import { Colors } from './Colors'
import { theme } from './Theme'
import { lang } from './Lang'
import { toast } from './Toast'
import { Utils } from './utils/Utils'
import { DateFormat } from './utils/DateFormat'

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
  private logButtonsClassName = 'logButtons' // 日志操作按钮容器的类名（目前只有一个"导出日志"按钮）

  /**储存会刷新的日志所使用的元素（插槽），可以传入 key 来区分多个刷新区域 */
  // 每个刷新区域使用一个 span 元素，里面的文本会变化
  // 通常用于显示进度，例如 0/10, 1/10, 2/10... 10/10
  // 如果不传入 key，那么所有的刷新内容会共用 default 插槽
  private slots: { [key: string]: HTMLElement } = {
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

  /**
  添加一条日志
  @param str 日志文本，可以是 HTML
  @param level 日志等级。0: normal, 1: success, 2: warning, 3: error
  @param key 每个 key 对应一条专用的日志插槽（一个 span 元素）。

  不传入 key 时，每次调用都会新增一条日志。
  传入 key 时，不会新增日志，而是把这条日志输出到 key 对应的插槽里，替换掉该插槽之前的内容。通常用于刷新进度，例如 0/10, 1/10 ... 10/10。如果插槽还不存在，会创建它。
  注意：传入 key 的日志不计入日志条数，也不会触发"日志条数达到上限后创建新日志区域"的逻辑。
  */
  private add(str: string, level: number, key = '') {
    this.createLogArea()
    let span = document.createElement('span')
    if (key) {
      // 为需要刷新的日志使用插槽
      if (this.slots[key] === undefined) {
        this.slots[key] = span
      } else {
        span = this.slots[key]
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

    span.appendChild(document.createElement('br'))

    this.logContent.appendChild(span)
    this.toBottom = true // 需要把日志滚动到底部
  }

  /** 输出普通日志 */
  public log(str: string, key = '') {
    this.add(str, 0, key)
  }

  /** 输出绿色日志，常用于任务开始、任务完成的提示 */
  public success(str: string, key = '') {
    this.add(str, 1, key)
  }

  /** 输出黄色日志，常用于重要提醒、警告信息 */
  public warning(str: string, key = '') {
    this.add(str, 2, key)
  }

  /** 输出红色日志，用于错误信息 */
  public error(str: string, key = '') {
    this.add(str, 3, key)
  }

  /**将一条刷新的日志持久化 */
  // 例如当某个进度显示到 10/10 的时候，就不会再变化了，此时应该将其持久化
  // 其实就是下载器解除了对它的引用，这样它的内容就不会再变化了
  // 并且下载器会为这个 key 生成一个新的 span 元素待用
  public persistentRefresh(key: string) {
    if (key) {
      this.slots[key] = document.createElement('span')
    }
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
      theme.register(this.logWrap)
      this.logContent = logContent
      document.body.insertAdjacentElement('beforebegin', this.logWrap)

      // 日志操作按钮要放在日志区域后面，所以新日志区域创建后，把按钮移到它的后面
      this.ensureLogButtons()
    }
  }

  /**日志操作按钮的容器。目前只有"导出日志"按钮 */
  private logButtons: HTMLDivElement | null = null

  /**把日志操作按钮放到最新的日志区域里、日志内容的下方 */
  // 按钮只创建一次。当它随着旧日志区域被移除后，再次输出日志时会创建新的区域，并把按钮放入新区域
  private ensureLogButtons() {
    if (this.logButtons === null) {
      this.logButtons = document.createElement('div')
      this.logButtons.classList.add(this.logButtonsClassName)

      const exportLogBtn = document.createElement('button')
      exportLogBtn.type = 'button'
      exportLogBtn.classList.add('logActionBtn')
      exportLogBtn.dataset.xztext = '_导出日志'
      exportLogBtn.addEventListener('click', () => {
        this.exportLogs()
      })

      this.logButtons.append(exportLogBtn)
      lang.register(this.logButtons)
    }

    // 把按钮放到当前（最新）日志区域里、日志内容的下方。
    // 如果按钮已经在旧区域里，append 会把按钮移动到新区域
    this.logWrap.append(this.logButtons)
  }

  /**把当前日志区域里的日志导出为 html 文件 */
  private exportLogs() {
    const allLogWrap = document.querySelectorAll(
      `.${this.logWrapFlag}`,
    ) as NodeListOf<HTMLDivElement>
    const logs: string[] = []
    for (const wrap of allLogWrap) {
      const content = wrap.querySelector(
        `.${this.logContentClassName}`,
      ) as HTMLDivElement
      if (content) {
        logs.push(content.innerHTML)
      }
    }

    // 没有日志时不导出
    if (logs.length === 0) {
      return
    }

    const fileName = `log-${Utils.replaceUnsafeStr(
      document.title || 'fanbox',
    )}-${DateFormat.format(new Date(), 'YYYY-MM-DD hh-mm-ss')}.html`

    const html = `<!DOCTYPE html>
        <html>
        <body>
        <div id="logWrap">
        ${logs.join('\n')}
        </div>
        </body>
        </html>`

    const blob = new Blob([html], {
      type: 'text/html',
    })
    const url = URL.createObjectURL(blob)
    Utils.downloadFile(url, fileName)

    toast.success(lang.transl('_导出日志成功'), {
      position: 'center',
    })
  }

  public removeAll() {
    const allLogWrap = document.querySelectorAll(`.${this.logWrapFlag}`)
    allLogWrap.forEach((wrap) => wrap.remove())

    // 日志操作按钮不属于日志区域，需要单独移除
    if (this.logButtons) {
      this.logButtons.remove()
    }

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
