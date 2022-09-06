// api 类
// 不依赖其他模块，可独立使用
import { Post, PostList, CreatorData } from './CrawlResult.d'

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
  static getURLSearchField(url: string, query: string) {
    const result = new URL(url).searchParams.get(query)
    if (result !== null) {
      return encodeURIComponent(result)
    } else {
      return ''
    }
  }

  // 从 URL 中获取指定路径名的值，适用于符合 RESTful API 风格的路径
  // 如 https://kyomoneko.fanbox.cc/posts/904593
  // 把路径用 / 分割，查找 key 所在的位置，后面一项就是它的 value
  static getURLPathField(query: string) {
    const pathArr = location.pathname.split('/')
    const index = pathArr.indexOf(query)
    if (index > 0) {
      return pathArr[index + 1]
    }

    throw new Error(`getURLPathField ${query} failed!`)
  }

  // 组装 url 的查询参数。当该参数有值时，将其添加到 url 里
  static assembleURL(
    baseURL: string,
    args: { [key: string]: string | number }
  ) {
    const temp = new URL(baseURL)
    for (const [key, value] of Object.entries(args)) {
      value && temp.searchParams.append(key, value.toString())
    }
    return temp.toString()
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

  static getCreatorId(url: string) {
    const split = url.split('/')
    // 首先获取以 @ 开头的用户名
    for (const str of split) {
      if (str.startsWith('@')) {
        return str.split('@')[1]
      }
    }

    // 获取自定义的用户名
    for (const str of split) {
      // hostname
      if (str.endsWith('.fanbox.cc')) {
        return str.split('.')[0]
      }
    }

    throw new Error('GetCreatorId error!')
  }

  // 用 creatorId（用户名） 获取 userId
  static async getUserId(creatorId: string) {
    const baseURL = `https://api.fanbox.cc/creator.get?creatorId=${creatorId}`
    const res = (await this.request(baseURL)) as CreatorData
    return res.body.user.userId
  }

  static async getPostListSupporting(
    limit = 10,
    maxPublishedDatetime = '',
    maxId = ''
  ): Promise<PostList> {
    const baseURL = 'https://api.fanbox.cc/post.listSupporting'
    const url = this.assembleURL(baseURL, {
      limit,
      maxPublishedDatetime,
      maxId,
    })
    return this.request(url)
  }

  static async getPostListByUser(
    creatorId: string,
    limit = 10,
    maxPublishedDatetime = '',
    maxId = ''
  ): Promise<PostList> {
    const baseURL = `https://api.fanbox.cc/post.listCreator?creatorId=${creatorId}`
    const url = this.assembleURL(baseURL, {
      limit,
      maxPublishedDatetime,
      maxId,
    })
    return this.request(url)
  }

  static async getTagPostListByUser(
    userId: string,
    tag: string
  ): Promise<PostList> {
    const url = `https://api.fanbox.cc/post.listTagged?tag=${tag}&userId=${userId}`
    return this.request(url)
  }

  static async getPost(postId: string): Promise<Post> {
    const url = `https://api.fanbox.cc/post.info?postId=${postId}`
    return this.request(url)
  }
}

export { API }
