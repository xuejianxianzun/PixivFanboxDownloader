import { PostBody } from './CrawlResult'

// 通用的结果数据
// 不涉及文件和文本
interface CommonResult {
  postId: string
  /** 注意：这个 type 是投稿的 type，不是这个文件的 type。要获取文件类型，应该根据 ext 来判断 */
  type: 'file' | 'image' | 'article' | 'video' | 'text' | 'entry'
  title: string
  date: string
  fee: number
  user: string
  uid: string
  createID: string
  tags: string
}

// 文件的数据
interface FileResult {
  /** 对于图片文件，它的 fileID 就是图片名（不含扩展名） */
  // 例如 url：https://downloads.fanbox.cc/images/post/8282479/s3VOD8r4o7YCaADUXW0i28rT.png
  // fileID 就是 "s3VOD8r4o7YCaADUXW0i28rT"
  fileID: string
  name: string
  ext: string
  /**当这个文件是直接上传到 fanbox 时，才会有 size（通过外链插入的文件没有 size） */
  size: number | null
  /** 对于图片文件，封面图片的 index 总是 0, 正文里的图片则从 1 开始。
   *
   * 如果没有封面图片，或者用户选择了不保存封面图片，那么 0 依然会被保留，此时 index 会从 1 开始 */
  index: number
  url: string
  retryUrl: string | null
}

/** 一个完整的图片文件的 Result 示例，它是正文里的第一张图片 */
// 测试用的文章：https://www.fanbox.cc/@xuejianxianzun/posts/12560223
const exampleImageResult: Result = {
  postId: '12560223',
  type: 'image',
  title: '封面图片',
  date: '2026-09-07T03:35:08+09:00',
  fee: 0,
  user: '雪见仙尊',
  uid: '9460149',
  createID: 'xuejianxianzun',
  tags: '',
  fileID: 'AqJzctJrx7O3JMW5eoD0ilgv',
  name: 'AqJzctJrx7O3JMW5eoD0ilgv',
  ext: 'jpeg',
  size: null,
  index: 1,
  url: 'https://downloads.fanbox.cc/images/post/12560223/AqJzctJrx7O3JMW5eoD0ilgv.jpeg',
  retryUrl:
    'https://downloads.fanbox.cc/images/post/12560223/w/1200/AqJzctJrx7O3JMW5eoD0ilgv.jpeg',
}

// 文本的数据。正文文本和外链都会保存到它的 text 数组里
// 序号总是 0
// 如果一个作品有多个要保存的文本数据，添加到 links 数组里，最后会合并起来生成一个文件
interface TextResult {
  name: string
  fileID: string
  ext: 'txt' | 'html'
  size: number | null
  /** 文本资源的序号总是 0 */
  index: 0
  text: string[]
  url: string
  retryUrl: string | null
  htmlData?: PostBody
}

const exampleTextResult: Result = {
  postId: '12560223',
  type: 'image',
  title: '封面图片',
  date: '2026-09-07T03:35:08+09:00',
  fee: 0,
  user: '雪见仙尊',
  uid: '9460149',
  createID: 'xuejianxianzun',
  tags: '',
  fileID: '17887197260200b898f1fdf06128',
  name: '12560223',
  ext: 'html',
  size: 1598,
  index: 0,
  text: [
    '<!doctype html>\n<html lang="en">\n<head>\n<meta charset="utf-8">\n<meta name="viewport" content="width=device-width, initial-scale=1">\n<meta http-equiv="Content-Security-Policy" content="default-src \'none\'; img-src \'self\' https: http: data:; media-src \'self\' https: http: file: blob: data:; style-src \'unsafe-inline\'; script-src \'none\'; frame-src \'none\'; object-src \'none\'; form-action \'none\';">\n<title>封面图片</title>\n<style>body{max-width:800px;margin:0 auto;padding:24px;font-family:Arial,sans-serif;line-height:1.7;color:#222;overflow-wrap:anywhere}img,video{max-width:100%;height:auto}video,audio{display:block;margin:0 auto}audio{width:80%;max-width:100%}.media{margin:1.5em 0;text-align:center}.media-name{margin:0 0 .5em}a{color:#06c}figure{margin:1.5em 0;text-align: center;}h1{line-height:1.3}.meta{color:#666;font-size:.9em}.comments{margin-top:2em;border-top:1px solid #ddd;padding-top:1em}.comment{display:flex;gap:.6em;margin:1em 0}.comment-icon{width:32px;height:32px;border-radius:50%;flex-shrink:0}.comment-main{flex:1;min-width:0}.comment-meta{color:#666;font-size:.85em;margin:0 0 .3em}.comment-body{white-space:pre-line}.comment-replies{margin-left:1.5em}</style>\n</head>\n<body>\n<header><h1>封面图片</h1><p class="meta"><a href="https://www.fanbox.cc/@xuejianxianzun/posts/12560223" rel="noopener noreferrer">https://www.fanbox.cc/@xuejianxianzun/posts/12560223</a></p></header>\n<main><figure><img src="000.jpeg" alt="dQIrrFxP2S1juAyU5nT8pEgb"></figure><figure><img src="001.jpeg" alt="AqJzctJrx7O3JMW5eoD0ilgv"></figure><p>吃白饭的大肥鱼</p></main>\n</body>\n</html>',
  ],
  url: 'blob:https://www.fanbox.cc/22495039-e66b-439c-821d-7bd78ebb93f1',
  retryUrl: null,
  htmlData: {
    id: '12560223',
    title: '封面图片',
    feeRequired: 0,
    publishedDatetime: '2026-09-07T03:35:08+09:00',
    updatedDatetime: '2026-09-07T03:35:08+09:00',
    tags: [],
    isLiked: false,
    likeCount: 0,
    isCommentingRestricted: false,
    commentCount: 0,
    isRestricted: false,
    user: {
      userId: '9460149',
      name: '雪见仙尊',
      iconUrl:
        'https://pixiv.pximg.net/c/160x160_90_a2_g5/fanbox/public/images/user/9460149/icon/fm6mHUOwxOIpNFFvoY6rzl6l.jpeg',
    },
    creatorId: 'xuejianxianzun',
    hasAdultContent: true,
    type: 'image',
    coverImageUrl:
      'https://pixiv.pximg.net/c/1200x630_90_a2_g5/fanbox/public/images/post/12560223/cover/dQIrrFxP2S1juAyU5nT8pEgb.jpeg',
    body: {
      text: '吃白饭的大肥鱼',
      images: [
        {
          id: 'AqJzctJrx7O3JMW5eoD0ilgv',
          extension: 'jpeg',
          width: 1143,
          height: 2048,
          originalUrl:
            'https://downloads.fanbox.cc/images/post/12560223/AqJzctJrx7O3JMW5eoD0ilgv.jpeg',
          thumbnailUrl:
            'https://downloads.fanbox.cc/images/post/12560223/w/1200/AqJzctJrx7O3JMW5eoD0ilgv.jpeg',
        },
      ],
    },
    excerpt: '吃白饭的大肥鱼',
    nextPost: null,
    prevPost: {
      id: '11131562',
      title: '测试大画幅图片',
      publishedDatetime: '2025-12-27T01:35:09+09:00',
    },
    imageForShare:
      'https://pixiv.pximg.net/c/1200x630_90_a2_g5/fanbox/public/images/post/12560223/cover/dQIrrFxP2S1juAyU5nT8pEgb.jpeg',
    isPinned: false,
  },
}

// 以投稿为单位，保存要下载的资源
// 一个投稿里可能有多个文件，以及一份文本
type ResultMeta = CommonResult & {
  files: FileResult[]
  /** 文本的数据。正文文本和外链都会保存到它的 text 数组里 */
  textContent: TextResult
}

// 以文件为单位保存数据
// 一个数据里只包含一个文件，或者一份文本
type Result = (CommonResult & FileResult) | (CommonResult & TextResult)

export { CommonResult, ResultMeta, Result, FileResult }
