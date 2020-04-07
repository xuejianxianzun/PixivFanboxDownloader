// api 类
// 不依赖其他模块，可独立使用
import { Post, PostList } from './CrawlResult.d'

import {} from './CrawlArgument.d'

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
        credentials: 'include',
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

  static async getlistSupporting(
    limit = 10,
    maxPublishedDatetime = '',
    maxId = ''
  ): Promise<PostList> {
    const baseURL = 'https://fanbox.pixiv.net/api/post.listSupporting'
    const temp = new URL(baseURL)
    limit && temp.searchParams.append('limit', limit.toString())
    maxPublishedDatetime &&
      temp.searchParams.append('maxPublishedDatetime', maxPublishedDatetime)
    maxId && temp.searchParams.append('maxId', maxId)
    const url = temp.toString()
    console.log(url)
    return this.request(url)
  }

  static async getPost(postId: string): Promise<Post> {
    const url = `https://fanbox.pixiv.net/api/post.info?postId=${postId}`
    return this.request(url)
  }
}

export { API }
