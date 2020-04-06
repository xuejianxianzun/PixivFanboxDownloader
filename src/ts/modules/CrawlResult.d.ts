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

interface BlocksDataText {
  type: 'p'
  text: string
  styles?: [{ type: 'bold'; offset: number; length: number }]
  links?: [{ offset: number; length: number; url: string }]
}

interface BlocksDataFile {
  type: 'file'
  fileId: string
}

interface BlocksDataImage {
  type: 'image'
  imageId: string
}

type Blocks = BlocksDataText | BlocksDataFile | BlocksDataImage

interface ImageData {
  id: string
  extension: string
  width: number
  height: number
  originalUrl: string
  thumbnailUrl: string
}

type ImageMap = {
  [key: string]: ImageData
}

interface FileData {
  id: string
  name: number
  extension: string
  size: number
  url: string
}

type FileMap = {
  [key: string]: FileData
}

// serviceProvider 支持嵌入的所有数据来源如下：
// pixivFANBOX, Twitter, YouTube, Vimeo, SoundCloud, Google Forms, GitHub Gist
// Google Forms 叫什么名字还不确定，猜测为 gsuite
type ServiceProvider =
  | string
  | 'youtube'
  | 'fanbox'
  | 'twitter'
  | 'vimeo'
  | 'soundcloud'
  | 'gsuite'
  | 'gist'

type EmbedMap = {
  [key: string]: {
    id: string
    serviceProvider: ServiceProvider
    contentId: string
  }
}

// article（博客类型）投稿的数据
interface PostDataOfArticle {
  body: {
    id: string
    title: string
    coverImageUrl: string | null
    feeRequired: number
    publishedDatetime: string
    updatedDatetime: string
    type: 'article'
    body: null | {
      blocks: Blocks[]
      imageMap: ImageMap
      fileMap: FileMap
      embedMap: EmbedMap
    }
    tags: string[]
    excerpt: string | null
    isLiked: boolean
    likeCount: number
    commentCount: number
    restrictedFor: number | null
    user: {
      userId: string
      name: string
      iconUrl: string
    }
    creatorId: string
    status: 'published'
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
  }
}

// image（图片类型）投稿的数据
interface PostDataOfImage {
  body: {
    id: string
    title: string
    coverImageUrl: string | null
    feeRequired: number
    publishedDatetime: string
    updatedDatetime: string
    type: 'image'
    body: null | {
      text: string
      images: ImageData[]
    }
    tags: string[]
    excerpt: string | null
    isLiked: boolean
    likeCount: number
    commentCount: number
    restrictedFor: number | null
    user: {
      userId: string
      name: string
      iconUrl: string
    }
    creatorId: string
    status: 'published'
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
  }
}

// file（文件类型）投稿的数据
interface PostDataOfFile {
  body: {
    id: string
    title: string
    coverImageUrl: string | null
    feeRequired: number
    publishedDatetime: string
    updatedDatetime: string
    type: 'file'
    body: null | {
      text: string
      files: FileData[]
    }
    tags: string[]
    excerpt: string | null
    isLiked: boolean
    likeCount: number
    commentCount: number
    restrictedFor: number | null
    user: {
      userId: string
      name: string
      iconUrl: string
    }
    creatorId: string
    status: 'published'
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
  }
}

// text（文本类型）投稿的数据
interface PostDataOfText {
  body: {
    id: string
    title: string
    coverImageUrl: string | null
    feeRequired: number
    publishedDatetime: string
    updatedDatetime: string
    type: 'text'
    body: null | {
      text: string
    }
    tags: string[]
    excerpt: string | null
    isLiked: boolean
    likeCount: number
    commentCount: number
    restrictedFor: number | null
    user: {
      userId: string
      name: string
      iconUrl: string
    }
    creatorId: string
    status: 'published'
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
  }
}

// video（视频/音乐类型）投稿的数据
interface PostDataOfVideo {
  body: {
    id: string
    title: string
    coverImageUrl: string | null
    feeRequired: number
    publishedDatetime: string
    updatedDatetime: string
    type: 'video'
    body: null | {
      text: string
      video: {
        serviceProvider: ServiceProvider
        videoId: string
      }
    }
    tags: string[]
    excerpt: string | null
    isLiked: boolean
    likeCount: number
    commentCount: number
    restrictedFor: number | null
    user: {
      userId: string
      name: string
      iconUrl: string
    }
    creatorId: string
    status: 'published'
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
  }
}

export {
  PostDataOfArticle,
  PostDataOfFile,
  PostDataOfImage,
  PostDataOfText,
  PostDataOfVideo
}
