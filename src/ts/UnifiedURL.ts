import { settings } from './setting/Settings'
import { EVT } from './EVT'

class UnifiedURL {
  constructor() {
    this.bindEvents()
  }

  private bindEvents() {
    window.addEventListener(EVT.list.settingChange, (ev: CustomEventInit) => {
      const data = ev.detail.data as any
      if (data.name === 'unifiedURL' && data.value) {
        this.check()
      }
    })
  }

  private check() {
    // 首先取出二级域名
    // https://www.fanbox.cc/
    const test = location.hostname.match(/(.*)\.fanbox.cc/)
    if (test && test.length > 1) {
      const subDomain = test[1]
      // 对于一些特定的二级域名，不会跳转
      if (
        subDomain === 'www' ||
        subDomain === 'api' ||
        subDomain === 'downloads'
      ) {
        return
      }

      // 如果二级域名不符合上面的条件，那么就是用户名。在 https://www.fanbox.cc/ 后面插入用户名
      // 用户名在后面时，path 不能以斜线结尾，否则会 404。（用户名在前且处于用户主页时，path 就只有一个斜线）
      let path = location.pathname
      if (path.endsWith('/')) {
        path = path.substring(0, path.length - 1)
      }
      const newURL = `https://www.fanbox.cc/@${subDomain}` + path
      location.href = newURL
    }
  }
}

new UnifiedURL()
