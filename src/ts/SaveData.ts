import { filter } from './Filter'
import { store } from './Store'
import { FileResult, ResultMeta } from './StoreType'
import {
  ServiceProvider,
  VideoProvider,
  PostBody,
  ImageData,
  FileData,
} from './CrawlResult'
import { settings } from './setting/Settings'
import { log } from './Log'
import { lang } from './Lang'
import { msgBox } from './MsgBox'
import { Tools } from './Tools'
import { renderCommentsText } from './RenderCommentsText'

type EmbedDataArr = [ServiceProvider | VideoProvider, string][]

class SaveData {
  private readonly extractTextReg = new RegExp(/<[^<>]+>/g)

  public receive(data: PostBody) {
    // console.log(data)
    this.parsePost(data)
  }

  private parsePost(data: PostBody) {
    // 针对投稿进行检查，决定是否保留它
    const id = data.id
    const creatorId = data.creatorId
    const fee = data.feeRequired
    const date = data.publishedDatetime
    const title = data.title
    const check = filter.check({ id, creatorId, fee, date, title })
    if (!check) {
      return
    }

    // 如果投稿检查通过，保存投稿信息
    const result: ResultMeta = {
      postId: data.id,
      type: data.type,
      title: data.title,
      date,
      fee,
      user: data.user.name,
      uid: data.user.userId,
      createID: data.creatorId,
      tags: data.tags.join(','),
      files: [],
      textContent: {
        fileID: '',
        name: data.id,
        ext: 'txt',
        size: null,
        // 文本资源的序号总是 0
        index: 0,
        // text 里的内容有两个来源：外链和正文文本。
        // 在这个模块里，text 里保存的内容不会受“保存投稿中的文字”设置的影响。虽然这个设置可以选择纯文本或者 HTML，但是这个模块里的 text 的内容总是值为“纯文本”时的内容。
        // 如果这个设置的值是 HTML，那么会在下载时生成真正的 HTML 代码。此时并不会使用这个模块里的 text 内容。
        text: [],
        url: '',
        retryUrl: null,
      },
    }

    // 提取它的资源文件，并对每个资源进行检查，决定是否保存

    let index = 0 // 资源的序号
    // 封面图和文本资源的序号是 0，其他文件的序号自增

    // 提取投稿的封面图片
    // 封面图片的序号设置为 0，所以它里面不需要对 index 进行操作
    if (settings.savePostCover) {
      // 移除这部分路径，得到的就是缩略图的原图链接
      const cover = data.coverImageUrl?.replace('/c/1200x630_90_a2_g5', '')
      if (cover) {
        const { name, ext } = this.getUrlNameAndExt(cover)
        const r: FileResult = {
          fileID: Tools.createFileId(),
          name,
          ext,
          size: null,
          index,
          url: cover,
          retryUrl: null,
        }
        result.files.push(r)
      }
    }

    // 对于因为价格限制不能抓取文章，在此时返回，但是会保存封面图
    if (data.body === null) {
      store.skipDueToFee++
      log.warning(
        lang.transl(
          '_跳过文章因为',
          `<a href="https://www.fanbox.cc/@${creatorId}/posts/${id}" target="_blank">${title}</a>`,
        ) +
          lang.transl('_价格限制') +
          ` ${fee}`,
      )
      // 评论是投稿级别的数据，不依赖正文，也可以保存
      renderCommentsText.render(result, data)
      if (result.files.length > 0) {
        store.addResult(result)
      }
      return
    }

    // 非 article 投稿都有 text 字段，这这里统一提取里面的链接
    // 但是因为正则没有分组，所以非 article 投稿中如果有多个链接，可能会有遗漏，待考
    // 提取文本中的链接有两种来源，一种是文章正文里的文本，一种是嵌入资源。先从正文提取链接，后提取嵌入资源的链接。这样链接保存下来的顺序比较合理。
    if (data.type !== 'article') {
      let text = ''
      if (data.type === 'entry') {
        text = data.body.html.replace(this.extractTextReg, '')
      } else {
        text = data.body.text
      }
      if (text) {
        const links = this.getTextLinks(text)
        result.textContent.text = result.textContent.text.concat(links)
        result.textContent.fileID = Tools.createFileId()

        // 保存文章正文里的文字
        if (settings.saveText) {
          result.textContent.text.push(text)
        }
      }
    }

    // 提取 article 投稿的资源
    if (data.type === 'article') {
      let linkTexts: string[] = []
      let text = '' // 正文文本

      for (const block of data.body.blocks) {
        if (block.type === 'p' || block.type === 'header') {
          // 保存正文里的链接
          // 文本里也可能有链接，稍后会尝试提取链接
          block.text && linkTexts.push(block.text)

          if (block.links && block.links.length > 0) {
            // 保存链接
            for (const links of block.links) {
              linkTexts.push(links.url)
            }
          }

          // 保存正文里的文字
          if (block.text) {
            if (block.type === 'p') {
              // 在每个段落后面添加换行
              text += block.text + '\r\n'
            } else if (block.type === 'header') {
              // 对于标题文本，在其前后添加换行，以便和其他文本之间留出一定空白
              text += `\r\n${block.text}\r\n\r\n`
            }
          } else if (block.text === '') {
            // 空字符串在网页上渲染出来的表现是一个额外的空行，用于隔开段落。所以这里额外添加一个换行
            text += '\r\n'
          }
        }
      }

      for (const link of linkTexts) {
        const links = this.getTextLinks(link)
        result.textContent.text = result.textContent.text.concat(links)
        result.textContent.fileID = Tools.createFileId()
      }

      // 如果有链接，则添加一个空字符串，使其占据一行
      // 这样可以让链接和下面的正文部分之间有一个空行
      if (result.textContent.text.length > 0) {
        result.textContent.text.push('')
      }

      if (settings.saveText && text) {
        result.textContent.text.push(text)
      }

      // 保存图片资源
      for (const block of data.body.blocks) {
        if (block.type === 'image') {
          const imageData = data.body.imageMap[block.imageId]
          if (!imageData) {
            continue
          }
          index++
          const resource = this.getImageData(imageData, index)
          resource !== null && result.files.push(resource)
        }
      }

      // 保存 file 资源
      for (const block of data.body.blocks) {
        if (block.type === 'file') {
          const fileData = data.body.fileMap[block.fileId]
          if (!fileData) {
            continue
          }
          index++
          const resource = this.getFileData(fileData, index)
          resource !== null && result.files.push(resource)
        }
      }

      // 保存嵌入的资源，只能保存到文本
      const embedDataArr: EmbedDataArr = []
      for (const [id, embedData] of Object.entries(data.body.embedMap)) {
        embedDataArr.push([embedData.serviceProvider, embedData.contentId])
      }
      const embedLinks = this.getEmbedLinks(embedDataArr, data.id)
      result.textContent.text = result.textContent.text.concat(embedLinks)
      result.textContent.fileID = Tools.createFileId()

      // 保存嵌入的 URL，只能保存到文本
      if (settings.saveLink) {
        const urlArr: string[] = []
        for (const val of Object.values(data.body.urlEmbedMap)) {
          if (val.type === 'default') {
            urlArr.push(val.url)
          } else if (val.type === 'html' || val.type === 'html.card') {
            // 尝试从 html 代码中提取 url
            const testURL = val.html.match('iframe src="(http.*)"')
            if (testURL && testURL.length > 1) {
              let url = testURL[1]
              // 对 Google Drive 的链接进行特殊处理，将其从转换后的嵌入网址还原为原始网址
              if (url.includes('preview?usp=embed_googleplus')) {
                url = url.replace(
                  'preview?usp=embed_googleplus',
                  'edit?usp=drive_link',
                )
              }
              if (url.includes('embeddedfolderview?id=')) {
                url = url
                  .replace('embeddedfolderview?id=', 'drive/folders/')
                  .replace('#list', '?usp=drive_link')
              }
              urlArr.push(url)
            } else {
              urlArr.push(val.html)
            }
          }
        }
        if (urlArr.length > 0) {
          result.textContent.text = result.textContent.text.concat(
            urlArr.join('\n\n'),
          )
          result.textContent.fileID = Tools.createFileId()
        }
      }
    }

    // 提取 image 投稿的资源
    if (data.type === 'image') {
      // 保存图片资源
      for (const imageData of data.body.images) {
        if (!imageData) {
          continue
        }
        index++
        const resource = this.getImageData(imageData, index)
        resource !== null && result.files.push(resource)
      }
    }

    // 提取 entry 投稿的图片资源
    // 不知道此类型投稿中是否有其他类型的资源
    if (data.type === 'entry') {
      const LinkList = data.body.html.match(/<a.*?>/g)
      if (LinkList) {
        for (const a of LinkList) {
          const matchUrl = a.match('https.*(jpeg|jpg|png|gif|bmp)')
          if (!matchUrl) {
            continue
          }
          // 组合出 imageData，添加到结果中
          index++
          const url = matchUrl[0]
          const { name, ext } = this.getUrlNameAndExt(url)

          let width = 0
          const widthMatch = a.match(/width="(\d*?)"/)
          if (widthMatch && widthMatch.length > 1) {
            width = parseInt(widthMatch[1])
          }

          let height = 0
          const heightMatch = a.match(/height="(\d*?)"/)
          if (heightMatch && heightMatch.length > 1) {
            height = parseInt(heightMatch[1])
          }

          const imageData: ImageData = {
            id: name,
            extension: ext,
            originalUrl: url,
            thumbnailUrl: url,
            width: width,
            height: height,
          }

          const resource = this.getImageData(imageData, index)
          resource !== null && result.files.push(resource)
        }
      }
    }

    // 提取 file 投稿的资源，也就是作者上传的附件
    if (data.type === 'file') {
      // 保存 file 资源
      for (const fileData of data.body.files) {
        if (!fileData) {
          continue
        }
        index++
        const resource = this.getFileData(fileData, index)
        resource !== null && result.files.push(resource)
      }
    }

    // 提取 video 投稿的资源，注意这里的 video 是引用的外部网站的链接，不是作者上传的附件
    // video 数据保存到文本
    if (data.type === 'video') {
      const video = data.body.video
      const embedDataArr: EmbedDataArr = [
        [video.serviceProvider, video.videoId],
      ]
      const embedLinks = this.getEmbedLinks(embedDataArr, data.id)
      result.textContent.text = result.textContent.text.concat(embedLinks)
      result.textContent.fileID = Tools.createFileId()
    }

    // 保存投稿中的评论
    // 评论不依赖投稿正文，正文之外的信息（链接等）可能包含在评论里
    renderCommentsText.render(result, data)

    if (settings.saveText && settings.textFormat === 'html') {
      result.textContent.ext = 'html'
      result.textContent.htmlData = data
      result.textContent.fileID ||= Tools.createFileId()
    }

    // 检查文本里是否含有网址
    let findURL = result.textContent.text.some((text) =>
      /https?:\/\//.test(text),
    )
    if (findURL) {
      // 如果有外链，则在文件名前面添加 links-
      result.textContent.name = 'links-' + result.textContent.name
      msgBox.once('tipLinktext', lang.transl('_提示会把外链保存到文件'))
    }

    if (
      result.textContent.ext === 'txt' &&
      result.textContent.text.length > 0
    ) {
      // 对于 TXT 文件，在内容的开头添加文章标题
      result.textContent.text.unshift(data.title + '\r\n')
    }

    // 这里的 result 类型是 ResultMeta，它包含了这个投稿里所有的资源和文本信息。
    // 经过 store.addResult 处理之后，可能会生成多个 result，每个 result 里只包含一个文件或者一份文本。
    store.addResult(result)
  }

  private getImageData(imageData: ImageData, index: number): FileResult | null {
    if (
      filter.check({
        ext: imageData.extension,
      })
    ) {
      return {
        fileID: imageData.id,
        name: imageData.id,
        ext: imageData.extension,
        size: null,
        index,
        url: imageData[
          settings.imageSize === 'original' ? 'originalUrl' : 'thumbnailUrl'
        ],
        retryUrl: imageData.thumbnailUrl,
      }
    }

    return null
  }

  private getFileData(fileData: FileData, index: number): FileResult | null {
    if (
      filter.check({
        ext: fileData.extension,
        name: fileData.name,
      })
    ) {
      return {
        fileID: fileData.id,
        name: fileData.name,
        ext: fileData.extension,
        size: fileData.size,
        index,
        url: fileData.url,
        retryUrl: null,
      }
    }

    return null
  }

  // 从文本里提取链接
  private getTextLinks(text: string) {
    const links: string[] = []

    if (!settings.saveLink) {
      return links
    }

    // 一个段落里可能包含多个链接（啊好麻烦），所以用换行符来尝试分割一下
    const textArray = text.split('\n')
    const Reg = /http[s]*:\/\/[\w=\?\.\/&\-\#\!\%]+/g
    for (const str of textArray) {
      const match = Reg.exec(str)
      Reg.lastIndex = 0
      if (match && match.length > 0) {
        for (const link of match) {
          links.push(link)
        }
      }
    }

    return links
  }

  // 从嵌入的资源里，获取资源的原网址
  private getEmbedLinks(dataArr: EmbedDataArr, postId: string) {
    const links: string[] = []

    if (!settings.saveLink) {
      return links
    }

    for (const data of dataArr) {
      const [serviceProvider, contentId] = data
      links.push(Tools.getEmbedUrl(serviceProvider, contentId))
    }

    return links
  }

  // 传入文件 url，提取文件名和扩展名
  private getUrlNameAndExt(url: string): {
    name: string
    ext: string
  } {
    const split = url.split('/')
    const fileName = split[split.length - 1]
    const name = fileName.split('.')[0]
    const ext = fileName.split('.')[1]
    return {
      name,
      ext,
    }
  }
}

const saveData = new SaveData()
export { saveData }
