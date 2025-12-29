// 评论数据
interface CommentData {
  id: string
  parentCommentId: string
  rootCommentId: string
  body: string
  createdDatetime: string
  likeCount: number
  isLiked: boolean
  isOwn: boolean
  user: {
    userId: string
    name: string
    iconUrl: string
  }
  replies: CommentData[]
}

// 在所有投稿列表、投稿详情里都通用的数据
interface CommonAllData {
  id: string
  title: string
  coverImageUrl: string | null
  feeRequired: number
  publishedDatetime: string
  updatedDatetime: string
  cover: string | null
  tags: string[]
  excerpt: string | null
  isLiked: boolean
  likeCount: number
  commentCount: number
  isRestricted: boolean
  user: {
    userId: string
    name: string
    iconUrl: string
  }
  creatorId: string
  hasAdultContent: boolean
}

// 所有投稿详情里都存在的数据。列表里没有
interface CommonPostData {
  commentList: {
    items: CommentData[]
    nextUrl: string | null
  }
  nextPost: {
    id: string
    title: string
    publishedDatetime: string
  }
  prevPost: {
    id: string
    title: string
    publishedDatetime: string
  }
  imageForShare: string
  restrictedFor: number | null
}

// 通用的图片文件数据
interface ImageData {
  id: string
  extension: string
  width: number
  height: number
  originalUrl: string
  thumbnailUrl: string
}

// 通用的 file 文件数据
interface FileData {
  id: string
  name: string
  extension: string
  size: number
  url: string
}

// serviceProvider 支持嵌入的所有数据来源如下：
// pixivFANBOX, Twitter, YouTube, Vimeo, SoundCloud, Google Forms, GitHub Gist
type ServiceProvider =
  | 'youtube'
  | 'fanbox'
  | 'twitter'
  | 'vimeo'
  | 'soundcloud'
  | 'google_forms'
  | 'gist'

// article 投稿里的段落信息1
// type p 对应普通文本、加粗文本、链接。
// 加粗时会有 styles
// 链接会有 links
// type header 对应标题文本
interface BlocksDataText {
  type: 'p' | 'header'
  text: string
  styles?: [{ type: 'bold'; offset: number; length: number }]
  links?: [{ offset: number; length: number; url: string }]
}

// article 投稿里的段落信息2
interface BlocksDataFile {
  type: 'file'
  fileId: string
}

// article 投稿里的段落信息3
interface BlocksDataImage {
  type: 'image'
  imageId: string
}

// article 投稿里的段落信息4
interface BlocksDataEmbed {
  type: 'embed'
  embedId: string
}

// article 投稿里所有可能出现的段落信息
type AllBlocks =
  | BlocksDataText
  | BlocksDataFile
  | BlocksDataImage
  | BlocksDataEmbed

interface EmbedData {
  id: string
  serviceProvider: ServiceProvider
  contentId: string
}

interface URLEmbedDataDefault {
  id: string
  type: 'default'
  url: string
  host: string
}

interface URLEmbedDataHtml {
  id: string
  type: 'html' | 'html.card'
  html: string
}

interface URLEmbedDataPost {
  id: string
  type: 'fanbox.post'
  postInfo: {
    id: string
    title: string
    feeRequired: string
    hasAdultContent: boolean
    creatorId: string
    user: {
      userId: string
      name: string
      iconUrl: string
    }
    coverImageUrl: string
    excerpt: '' | string
    publishedDatetime: string
  }
}

// article 投稿数据
interface OnlyArticleData {
  type: 'article'
  body: null | {
    blocks: AllBlocks[]
    imageMap: {
      [key: string]: ImageData
    }
    fileMap: {
      [key: string]: FileData
    }
    embedMap: {
      [key: string]: EmbedData
    }
    urlEmbedMap: {
      [key: string]: URLEmbedDataDefault | URLEmbedDataHtml | URLEmbedDataPost
    }
  }
}

// article（博客类型）投稿的数据
type PostDataOfArticle = OnlyArticleData & CommonPostData & CommonAllData

// image 投稿数据
interface OnlyImageData {
  type: 'image'
  body: null | {
    text: string
    images: ImageData[]
  }
}

// image（图片类型）投稿的数据
type PostDataOfImage = OnlyImageData & CommonPostData & CommonAllData

// file 投稿数据
interface OnlyFileData {
  type: 'file'
  body: null | {
    text: string
    files: FileData[]
  }
}

// file（文件类型）投稿的数据
type PostDataOfFile = OnlyFileData & CommonPostData & CommonAllData

// text 投稿数据
interface OnlyTextData {
  type: 'text'
  body: null | {
    text: string
  }
}

// text（文本类型）投稿的数据
type PostDataOfText = OnlyTextData & CommonPostData & CommonAllData

type VideoProvider = 'youtube' | 'vimeo' | 'soundcloud'

interface VideoData {
  serviceProvider: VideoProvider
  videoId: string
}

// video 投稿数据
interface OnlyVideoData {
  type: 'video'
  body: null | {
    text: string
    video: VideoData
  }
}

// video（视频/音乐类型）投稿的数据
type PostDataOfVideo = OnlyVideoData & CommonPostData & CommonAllData

// entry 投稿数据
interface OnlyEntryData {
  type: 'entry'
  body: null | {
    html: string
  }
}

// entry 投稿的数据
type PostDataOfEntry = OnlyEntryData & CommonPostData & CommonAllData

// 囊括所有类型的投稿详情数据
type PostBody =
  | PostDataOfArticle
  | PostDataOfFile
  | PostDataOfImage
  | PostDataOfText
  | PostDataOfVideo
  | PostDataOfEntry

interface Post {
  body: PostBody
}

// 投稿列表里 items 的数据
type PostListItem = (
  | OnlyArticleData
  | OnlyImageData
  | OnlyFileData
  | OnlyTextData
  | OnlyVideoData
  | OnlyEntryData
) &
  CommonAllData

// 囊括所有类型的列表数据
interface PostList {
  body: PostListItem[]
}

interface SupportPostList {
  body: {
    items: PostListItem[]
    nextUrl: null | string
  }
}

interface TagPostList {
  body: {
    count: number
    items: PostListItem[]
    nextUrl: null | string
  }
}

interface Creator {
  user: {
    userId: string
    name: string
    iconUrl: string
  }
  creatorId: string
  description: string
  hasAdultContent: boolean
  coverImageUrl: string | null
  profileLinks: string[]
  profileItems: []
  isFollowed: boolean
  isSupported: boolean
  isStopped: boolean
  hasBoothShop: boolean
  isAcceptingRequest: boolean
  hasPublishedPost: boolean
  category: string
}

interface CreatorData {
  body: Creator
}

/** 赞助方案的数据 */
interface Plan {
  /** 该方案的封面图，和背景图相同，但尺寸较小，宽度是 900 多 px */
  coverImageUrl: string
  /** 创作者的 creatorId */
  creatorId: string
  /** 方案描述 */
  description: string
  /** 金额 */
  fee: number
  hasAdultContent: boolean
  /** 方案的 id，是字符串形式的数字，示例："335879" */
  id: string
  /** 支付方式，可能是 CARD，也可能是其他形式（我没试过） */
  paymentMethod: 'CARD' | string
  /** 看意思好像是福利，但我不清楚会有什么内容。我只看到了空数组 */
  perks: []
  /** 方案名 */
  title: string
  /** 创作者的信息 */
  // 创作者可能有 3 个标识，例如：
  // name：显示在网页上的名称
  // userId：创作者的用户 ID，是数字形式的字符串
  // creatorId：创作者的唯一标识，可能是数字也可能是字母或混合形式
  // 例如：
  // Yuluer 的 name 是 Yuluer，userId 是 "36370997"，creatorId 是 yuluer
  // 大嘘 的 name 是 大嘘，userId 是 "457541"，creatorId 是 usotukiya
  user: {
    /** 创作者的用户 ID，是数字 */
    userId: string
    /** 创作者的用户名（显示在网页上的名字） */
    name: string
    /** 创作者的头像 URL */
    iconUrl: string
  }
}

/** 你当前生效的所有赞助方案 */
interface AllSupportingPlan {
  body: Plan[]
}

interface SupportInfo {
  body: {
    plan: Plan
    /** 尚不清楚具体含义，我只看到了空数组 []，不知道内容会是什么 */
    supportReservations: []
    /** 赞助开始时间，例如 "2025-12-25T23:00:29+09:00"*/
    supportStartDatetime: string
    /** 该赞助方案的背景图，宽度为 1280 px */
    supporterCardImageUrl: string
    /**对该创作者所有的赞助记录。每次支付都会在这里保存一份记录 */
    // 如果开启了自动续费的话，Fanbox 通常会在下个月的 2 号 10 点左右自动扣款
    supportTransactions: {
      /** 这次赞助的 id，例如 "174830285" */
      id: string
      /** 赞助的金额 */
      paidAmount: number
      /** 这次赞助对应的月份，如 "2025-12" */
      targetMonth: string
      /** 这次支付成功的时间，例如 "2025-12-25T23:00:29+09:00" */
      transactionDatetime: string
      /** 赞助者（你自己）的信息 */
      supporter: {
        iconUrl: string
        name: string
        userId: string
      }
    }[]
  }
}

export {
  PostBody,
  Post,
  PostListItem,
  PostList,
  SupportPostList,
  TagPostList,
  ServiceProvider,
  VideoProvider,
  ImageData,
  FileData,
  EmbedData,
  VideoData,
  CreatorData,
  Creator,
  AllSupportingPlan,
  SupportInfo,
  Plan,
}
