import { filter } from './Filter'
import { store } from './Store'
import { FileResult, ResultMeta } from './Store.d'
import { form } from './Settings'
import {
  ServiceProvider,
  VideoProvider,
  PostBody,
  Post,
  PostListItem,
  ImageData,
  FileData,
  EmbedData,
  VideoData,
  PostList,
} from './CrawlResult'

type Dict = {
  [key in ServiceProvider]: string
}

type EmbedDataArr = [ServiceProvider | VideoProvider, string][]

class SaveData {
  // 嵌入的文件只支持指定的网站，每个网站有固定的前缀
  private readonly providerDict: Dict = {
    youtube: 'https://www.youtube.com/watch?v=',
    fanbox: 'https://www.pixiv.net/fanbox/',
    gist: 'https://gist.github.com/',
    soundcloud: 'https://soundcloud.com/',
    vimeo: 'https://vimeo.com/',
    twitter: 'https://twitter.com/',
    gsuite: 'https://gsuite.google.com/',
  }

  public receive(data: PostBody | PostListItem) {
    this.parsePost(data)
  }

  private parsePost(data: PostBody | PostListItem) {
    if (data.body === null) {
      return
    }

    // 针对投稿进行检查，决定是否保留它
    const id = data.id
    const fee = data.feeRequired
    const date = data.publishedDatetime
    const check = filter.check({ id, fee, date })
    if (!check) {
      return
    }

    // 如果投稿检查通过，保存投稿信息
    const result: ResultMeta = {
      id: data.id,
      type: data.type,
      title: data.title,
      date,
      fee,
      user: data.user.name,
      uid: data.user.userId,
      tags: data.tags.join(','),
      files: [],
      links: {
        name: 'links-' + data.id,
        ext: 'txt',
        size: null,
        index: 0,
        text: [],
        url: '',
      },
    }

    // 提取它的资源文件，并对每个资源进行检查，决定是否保存

    let index = 0 // 资源的序号

    // 非 article 的投稿都有 text 字段，这这里统一提取里面的链接
    // 提取文本中的链接有两种来源，一种是文章正文里的文本，一种是嵌入资源。先从正文提取链接，后提取嵌入资源的链接。这样链接保存下来的顺序比较合理。
    if (data.type !== 'article') {
      const links = this.getTextLinks(data.body.text, data.id)
      result.links.text = result.links.text.concat(links)
    }

    // 提取 article 投稿的资源
    if (data.type === 'article') {
      // 从正文文本里提取链接
      let texts = ''
      for (const block of data.body.blocks) {
        if (block.type === 'p') {
          texts += block.text
        }
      }
      if (texts) {
        const links = this.getTextLinks(texts, data.id)
        result.links.text = result.links.text.concat(links)
      }

      // 保存图片资源
      for (const [id, imageData] of Object.entries(data.body.imageMap)) {
        index++
        const resource = this.getImageData(imageData, index)
        resource !== null && result.files.push(resource)
      }

      // 保存 file 资源
      for (const [id, fileData] of Object.entries(data.body.fileMap)) {
        index++
        const resource = this.getFileData(fileData, index)
        resource !== null && result.files.push(resource)
      }

      // 嵌入的资源只能保存到文本
      const embedDataArr: EmbedDataArr = []
      for (const [id, embedData] of Object.entries(data.body.embedMap)) {
        embedDataArr.push([embedData.serviceProvider, embedData.contentId])
      }
      const embedLinks = this.getEmbedLinks(embedDataArr, data.id)
      result.links.text = result.links.text.concat(embedLinks)
    }

    // 提取 image 投稿的资源
    if (data.type === 'image') {
      // 保存图片资源
      for (const imageData of data.body.images) {
        index++
        const resource = this.getImageData(imageData, index)
        resource !== null && result.files.push(resource)
      }
    }

    // 提取 file 投稿的资源
    if (data.type === 'file') {
      // 保存 file 资源
      for (const fileData of data.body.files) {
        index++
        const resource = this.getFileData(fileData, index)
        resource !== null && result.files.push(resource)
      }
    }

    // 提取 video 投稿的资源
    // video 数据保存到文本
    if (data.type === 'video') {
      const video = data.body.video
      const embedDataArr: EmbedDataArr = [
        [video.serviceProvider, video.videoId],
      ]
      const embedLinks = this.getEmbedLinks(embedDataArr, data.id)
      result.links.text = result.links.text.concat(embedLinks)
    }

    store.addResult(result)
  }

  private getImageData(imageData: ImageData, index: number): FileResult | null {
    if (
      filter.check({
        ext: imageData.extension,
      })
    ) {
      return {
        name: imageData.id,
        ext: imageData.extension,
        size: null,
        index,
        url: imageData.originalUrl,
      }
    }

    return null
  }

  private getFileData(fileData: FileData, index: number): FileResult | null {
    if (
      filter.check({
        ext: fileData.extension,
      })
    ) {
      return {
        name: fileData.name,
        ext: fileData.extension,
        size: fileData.size,
        index,
        url: fileData.url,
      }
    }

    return null
  }

  // 从文本里提取链接
  private getTextLinks(text: string, postId: string) {
    const links: string[] = []

    if (!form.saveLink.checked) {
      return links
    }
    const Reg = /https:\/\/[\w=\?\.\/&-]+/g
    const match = Reg.exec(text)
    if (match && match.length > 0) {
      for (const link of match) {
        links.push(link)
      }
    }

    return links
  }

  // 从嵌入的资源里，获取资源的原网址
  private getEmbedLinks(dataArr: EmbedDataArr, postId: string) {
    const links: string[] = []

    if (!form.saveLink.checked) {
      return links
    }

    for (const data of dataArr) {
      const [serviceProvider, contentId] = data
      links.push(this.providerDict[serviceProvider] + contentId)
    }

    return links
  }
}

const saveData = new SaveData()
export { saveData }
