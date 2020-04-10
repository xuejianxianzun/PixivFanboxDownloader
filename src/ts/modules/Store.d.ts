// 通用的结果数据
// 不涉及文件和文本
interface CommonResult {
  id: string
  type: 'file' | 'image' | 'article' | 'video' | 'text'
  title: string
  date: string
  fee: number
  user: string
  uid: string
  tags: string
}

// 文件的数据
// 当这个文件是直接上传到 fanbox 时，才会有 size（通过外链插入的文件没有 size）
interface FileResult {
  name: string
  ext: string
  size: number | null
  index: number
  url: string
}

// fileType: 'image' | 'music' | 'video' | 'compressed' | 'ps' | 'other'

// 文本的数据
// 如果一个作品有多个要保存的文本，添加到 links 数组里
interface TextResult {
  name: string
  ext: 'txt'
  size: null
  index: 0
  text: string[]
  url: string
}

// 以投稿为单位，保存要下载的资源
// 一个投稿里可能有多个文件，以及一份文本
type ResultMeta = CommonResult & {
  files: FileResult[]
  links: TextResult
}

// 以文件为单位保存数据
// 一个数据里只包含一个文件，或者一份文本
type Result = (CommonResult & FileResult) | (CommonResult & TextResult)

export { CommonResult, ResultMeta, Result, FileResult }
