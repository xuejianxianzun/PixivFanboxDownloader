import { EVT } from './EVT'

// 辅助功能
class Support {
  constructor() {
    this.supportListenHistory()
    this.listenPageSwitch()
  }

  // 使用无刷新加载的页面需要监听 url 的改变，这里为这些事件添加监听支持
  private supportListenHistory() {
    const element = document.createElement('script')
    element.setAttribute('type', 'text/javascript')
    element.innerHTML = `
    let _wr = function (type) {
      let orig = history[type];
      return function () {
        let rv = orig.apply(this, arguments);
        let e = new Event(type);
        e.arguments = arguments;
        window.dispatchEvent(e);
        return rv;
      };
    };
    history.pushState = _wr('pushState');
    history.replaceState = _wr('replaceState');
    `
    document.head.appendChild(element)
  }

  // 监听页面的无刷新切换。某些页面可以无刷新切换，这时需要进行一些处理
  private listenPageSwitch() {
    // 绑定无刷新切换页面的事件，只绑定一次
    ;['pushState', 'popstate', 'replaceState'].forEach((item) => {
      window.addEventListener(item, () => {
        EVT.fire(EVT.list.pageSwitch)
      })
    })
  }
}
new Support()
