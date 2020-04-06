// api 类
// 不依赖其他模块，可独立使用
import {
} from './CrawlResult.d'

import {
} from './CrawlArgument.d'

class API {
  // 检查给定的字符串解析为数字后，是否大于 0
  static checkNumberGreater0(arg: string) {
    let num = parseInt(arg)
    // 空值会是 NaN
    if (!isNaN(num) && num > 0) {
      // 符合条件
      return {
        result: true,
        value: num,
      }
    }
    // 不符合条件
    return {
      result: false,
      value: 0,
    }
  }

  // 从 url 中获取指定的查询字段的值
  // 注意：返回值经过 encodeURIComponent 编码！
  static getURLField(url: string, query: string) {
    const result = new URL(url).searchParams.get(query)
    if (result !== null) {
      return encodeURIComponent(result)
    } else {
      return ''
    }
  }

  // 更新 token
  static updateToken() {
    // 每隔一段时间更新 token，如果未达到指定时间间隔，则不检查
    const interval = 300000 // 两次检查之间的间隔。目前设置为 5 分钟
    const nowTime = new Date().getTime()
    const lastTimeStr = localStorage.getItem('xzTokenTime')
    if (lastTimeStr && nowTime - Number.parseInt(lastTimeStr) < interval) {
      return
    }

    // 从网页源码里获取用户 token，并储存起来
    fetch('https://www.pixiv.net/artworks/62751951')
      .then((response) => {
        return response.text()
      })
      .then((data) => {
        let result = data.match(/token":"(\w+)"/)
        if (result) {
          localStorage.setItem('xzToken', result[1])
          localStorage.setItem('xzTokenTime', new Date().getTime().toString())
        } else {
          console.warn('UpdateToken failed: no token found!')
        }
      })
  }

  // 获取 token
  // 从本地存储里获取用户 token
  static getToken() {
    let result = localStorage.getItem('xzToken')
    if (result) {
      return result
    } else {
      this.updateToken()
      return ''
    }
  }

  // 从 url 里获取作品 id
  // 可以传入 url，无参数则使用当前页面的 url
  static getIllustId(url?: string) {
    const str = url || window.location.search || location.href
    if (str.includes('illust_id')) {
      // 传统 url
      return /illust_id=(\d*\d)/.exec(str)![1]
    } else if (str.includes('/artworks/')) {
      // 新版 url
      return /artworks\/(\d*\d)/.exec(str)![1]
    } else {
      // 直接取出 url 中的数字，不保证准确
      return /\d*\d/.exec(location.href)![0]
    }
  }

  // 通用的请求流程
  // 发送 get 请求，返回 json 数据，抛出异常
  static request<T>(url: string): Promise<T> {
    return new Promise((resolve, reject) => {
      fetch(url, {
        method: 'get',
        credentials: 'same-origin',
      })
        .then((response) => {
          if (response.ok) {
            return response.json()
          } else {
            // 第一种异常，请求成功但状态不对
            reject({
              status: response.status,
              statusText: response.statusText,
            })
          }
        })
        .then((data) => {
          resolve(data)
        })
        .catch((error) => {
          // 第二种异常，请求失败
          reject(error)
        })
    })
  }

}

export { API }
