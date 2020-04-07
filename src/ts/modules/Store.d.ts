// 投稿数据里包含的文件
interface FileResult {
  type: 'image' | 'music' | 'video' | 'compressed' | 'ps' | 'other'
  id: string
  name: string
  ext: string
  size: number | null
  index: number
  url: string
}

// 从投稿文本里提取的文字
interface textResult {
  type: 'text'
  body: string
}

type AllResult = FileResult | textResult

// 保存每个要下载的作品的信息
export interface Result {
  id: number
  type: 'file' | 'image' | 'article' | 'video' | 'text'
  title: string
  data: string
  fee: number
  user: string
  uid: string
  tags: string[]
  resources: AllResult[]
}
