// api 类
// 只依赖 Config（用于判断浏览器类型），可独立使用
import {
  Post,
  PostList,
  CreatorData,
  SupportPostList,
  TagPostList,
  AllSupportingPlan,
  SupportInfo,
  CommentData,
} from './CrawlResult.d'
import { Config } from './Config'

class API {
  // 组装 url 的查询参数。当该参数有值时，将其添加到 url 里
  static assembleURL(
    baseURL: string,
    args: { [key: string]: string | number },
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
            return response.json().then((data) => {
              // 拷贝成内容脚本自己的对象后再返回，见 cloneData 的说明
              resolve(API.cloneData<T>(data))
            })
          } else {
            // HTTP 状态码错误
            reject({
              status: response.status,
              statusText: response.statusText,
              message: `HTTP error: ${response.status} ${response.statusText}`,
            })
          }
        })
        .catch((error) => {
          // 第二种异常，请求失败
          // fanbox 的 429 错误会触发请求失败
          // Uncaught (in promise) TypeError: Failed to fetch
          reject({
            message: `Fetch failed: ${error.message}`,
            error,
          })
          // 发生 429 错误时，返回的错误信息如下面的 error 所示
        })
    })
  }

  private error = {
    message: 'Fetch failed: Failed to fetch',
    error: {
      message: 'Failed to fetch',
      stack: `TypeError: Failed to fetch\n
              at chrome-extension://mfkglccbgcbnbkdgekepcgnhobeopoji/js/content.js:112:13\n
              ...更多栈信息`,
    },
  }

  /**把接口返回的 json 数据复制为内容脚本自己的对象，然后返回。
   *
   * Firefox 里内容脚本的 fetch 返回的 Response.json() 数据被 XrayWrapper 包装，属于页面的隔离环境。
   * 读取这种数据是正常的，但修改它（例如给投稿数据写入 commentList）会抛出异常：
   * Not allowed to define cross-origin object as property on [Object] or [Array] XrayWrapper
   * 所以这里统一做一次深拷贝，让后续代码只操作内容脚本自己的对象。
   * 其他浏览器（如 Chrome）里 fetch 返回的就是内容脚本自己的对象，不需要拷贝 */
  private static cloneData<T>(data: T): T {
    if (!Config.isFirefox) {
      return data
    }
    return JSON.parse(JSON.stringify(data)) as T
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

  /** 获取自己所有的赞助方案，但是不包含背景图片、开始日期等属于自己的附加数据 */
  static async getAllSupportingPlan(): Promise<AllSupportingPlan> {
    const url = `https://api.fanbox.cc/plan.listSupporting`
    return this.request(url)
  }

  /** 获取自己对某个创作者的赞助计划详情，包含背景图片、开始日期等自己的数据，这是创建粉丝卡的必要数据 */
  static async getSupportingPlanForOneCreator(
    creatorId: string,
  ): Promise<SupportInfo> {
    const url = `https://api.fanbox.cc/legacy/support/creator?creatorId=${creatorId}`
    return this.request(url)
  }

  /**获取赞助的用户的文章列表 */
  static async getPostListSupporting(
    limit = 10,
    maxPublishedDatetime = '',
    maxId = '',
  ): Promise<SupportPostList> {
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
    maxId = '',
  ): Promise<PostList> {
    const baseURL = `https://api.fanbox.cc/post.listCreator?creatorId=${creatorId}`
    const url = this.assembleURL(baseURL, {
      limit,
      maxPublishedDatetime,
      maxId,
      withPinned: 'true',
    })
    return this.request(url)
  }

  static async getTagPostListByUser(
    userId: string,
    tag: string,
  ): Promise<TagPostList> {
    const url = `https://api.fanbox.cc/post.listTagged?tag=${tag}&userId=${userId}`
    return this.request(url)
  }

  static async getPost(postId: string): Promise<Post> {
    const url = `https://api.fanbox.cc/post.info?postId=${postId}`
    return this.request(url)
  }

  /** 获取投稿的评论列表。offset 用于分页，limit 是单次获取的数量 */
  static async getPostComments(
    postId: string,
    offset = 0,
    limit = 50,
  ): Promise<{
    body: {
      commentList: {
        items: CommentData[]
        nextUrl: string | null
      }
    }
  }> {
    const url = `https://api.fanbox.cc/post.getComments?postId=${postId}&offset=${offset}&limit=${limit}`
    return this.request(url)
  }
}

export { API }
