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
}
