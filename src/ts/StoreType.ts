// 通用的结果数据
// 不涉及文件和文本
interface CommonResult {
  postId: string
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
  fileID: string
  name: string
  ext: string
  /**当这个文件是直接上传到 fanbox 时，才会有 size（通过外链插入的文件没有 size） */
  size: number | null
  index: number
  url: string
  retryUrl: string | null
}

// 文本的数据。正文文本和外链都会保存到它的 text 数组里
// 序号总是 0
// 如果一个作品有多个要保存的文本数据，添加到 links 数组里，最后会合并起来生成一个文件
interface TextResult {
  name: string
  fileID: string
  ext: 'txt'
  size: number | null
  index: 0
  text: string[]
  url: string
  retryUrl: string | null
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
