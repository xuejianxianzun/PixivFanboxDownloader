import { CommonResult, ResultMeta } from '../StoreType'
import { Tools } from '../Tools'
import { ImageData, PostBody } from '../CrawlResult'
import { Config } from '../Config'
import { settings } from '../setting/Settings'
import { fileName } from '../FileName'
import { renderCommentsHtml } from '../RenderCommentsHtml'

class CreateHtmlDocument {
  public async create(data: PostBody, result: ResultMeta) {
    const postUrl = `https://www.fanbox.cc/@${encodeURIComponent(
      data.creatorId,
    )}/posts/${encodeURIComponent(data.id)}`
    const safePostUrl = this.getSafeExternalUrl(postUrl)!
    const commonResult = this.getCommonResult(result)
    const htmlPath = fileName.getFileName({
      ...commonResult,
      ...result.textContent,
    })
    let coverHtml = ''
    let body = ''

    const cover = result.files.find((file) => file.index === 0)

    if (data.body) {
      if (data.type === 'article') {
        body = data.body.blocks
          .map((block) => {
            if (block.type === 'p' || block.type === 'header') {
              const tag = block.type === 'header' ? 'h2' : 'p'
              return `<${tag}>${this.renderInlineText(
                block.text,
                block.styles || [],
                block.links || [],
              )}</${tag}>`
            }

            if (block.type === 'image') {
              const image = data.body!.imageMap[block.imageId]
              if (!image) {
                return ''
              }
              return this.renderPostImage(image, result, commonResult, htmlPath)
            }

            if (block.type === 'file') {
              const file = data.body!.fileMap[block.fileId]
              if (!file) {
                return ''
              }
              return this.renderPostFile(
                file.url,
                `${file.name}.${file.extension}`,
                file.extension,
                file.id,
                result,
                commonResult,
                htmlPath,
              )
            }

            // 对于嵌入的 URL，fanbox 在显示时会对其进行解析，以显示简略说明。但下载器不会这么做，所以只显示简单的超链接即可。
            if (block.type === 'embed') {
              const embed = data.body!.embedMap[block.embedId]
              if (!embed) {
                return ''
              }
              const url = Tools.getEmbedUrl(
                embed.serviceProvider,
                embed.contentId,
              )
              return this.renderExternalLink(url, url, 'embed')
            }

            if (block.type !== 'url_embed' || !settings.saveLink) {
              return ''
            }
            const urlEmbed = data.body!.urlEmbedMap[block.urlEmbedId]
            if (!urlEmbed) {
              return ''
            }

            let url = ''
            if (urlEmbed.type === 'default') {
              url = urlEmbed.url
            } else if (
              urlEmbed.type === 'html' ||
              urlEmbed.type === 'html.card'
            ) {
              const matchedUrl = urlEmbed.html.match('iframe src="(http.*)"')
              if (matchedUrl && matchedUrl.length > 1) {
                url = matchedUrl[1]
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
              }
            } else if (urlEmbed.type === 'fanbox.post') {
              url = `https://www.fanbox.cc/@${encodeURIComponent(
                urlEmbed.postInfo.creatorId,
              )}/posts/${encodeURIComponent(urlEmbed.postInfo.id)}`
            }
            return this.renderExternalLink(url, url, 'embed')
          })
          .join('\n')
      } else if (data.type === 'entry') {
        body = this.sanitizeEntryHtml(
          data.body.html,
          result,
          commonResult,
          htmlPath,
        )
      } else {
        // 前面已经处理了 article 和 entry 类型的投稿，现在剩余的类型有：'file' | 'image' | 'video' | 'text'
        body = this.textToHtml(data.body.text)

        if (data.type === 'image') {
          body =
            data.body.images
              .map((image) =>
                this.renderPostImage(image, result, commonResult, htmlPath),
              )
              .join('\n') + body
        } else if (data.type === 'file') {
          body += data.body.files
            .map((file) =>
              this.renderPostFile(
                file.url,
                `${file.name}.${file.extension}`,
                file.extension,
                file.id,
                result,
                commonResult,
                htmlPath,
              ),
            )
            .join('\n')
        } else if (data.type === 'video') {
          const url = Tools.getEmbedUrl(
            data.body.video.serviceProvider,
            data.body.video.videoId,
          )
          body = this.renderExternalLink(url, url, 'embed') + body
        }
      }
    }

    if (cover) {
      const coverPath = fileName.getFileName({
        ...commonResult,
        ...cover,
      })
      const relativeCoverPath = this.getRelativePath(htmlPath, coverPath)
      if (!body.includes(relativeCoverPath)) {
        coverHtml = this.renderImageSource(relativeCoverPath, cover.name)
      }
    }

    const commentsHtml = await renderCommentsHtml.render(data)

    return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta http-equiv="Content-Security-Policy" content="default-src 'none'; img-src 'self' https: http: data:; media-src 'self' https: http: file: blob: data:; style-src 'unsafe-inline'; script-src 'none'; frame-src 'none'; object-src 'none'; form-action 'none';">
<title>${Tools.escapeHtml(data.title)}</title>
<style>body{max-width:800px;margin:0 auto;padding:24px;font-family:Arial,sans-serif;line-height:1.7;color:#222;overflow-wrap:anywhere}img,video{max-width:100%;height:auto}video,audio{display:block;margin:0 auto}audio{width:80%;max-width:100%}.media{margin:1.5em 0;text-align:center}.media-name{margin:0 0 .5em}a{color:#06c}figure{margin:1.5em 0;text-align: center;}h1{line-height:1.3}.meta{color:#666;font-size:.9em}.comments{margin-top:2em;border-top:1px solid #ddd;padding-top:1em}.comment{display:flex;gap:.6em;margin:1em 0}.comment-icon{width:32px;height:32px;border-radius:50%;flex-shrink:0}.comment-main{flex:1;min-width:0}.comment-meta{color:#666;font-size:.85em;margin:0 0 .3em}.comment-body{white-space:pre-line}.comment-replies{margin-left:1.5em}</style>
</head>
<body>
<header><h1>${Tools.escapeHtml(data.title)}</h1><p class="meta"><a href="${Tools.escapeHtml(
      safePostUrl,
    )}" rel="noopener noreferrer">${Tools.escapeHtml(safePostUrl)}</a></p></header>
<main>${coverHtml}${body}${commentsHtml}</main>
</body>
</html>`
  }

  private renderInlineText(
    text: string,
    styles: { type: 'bold'; offset: number; length: number }[],
    links: { offset: number; length: number; url: string }[],
  ) {
    const boundaries = new Set<number>([0, text.length])
    const ranges = [...styles, ...links]
    for (const range of ranges) {
      boundaries.add(Math.max(0, Math.min(text.length, range.offset)))
      boundaries.add(
        Math.max(0, Math.min(text.length, range.offset + range.length)),
      )
    }

    const points = [...boundaries].sort((a, b) => a - b)
    let html = ''
    for (let i = 0; i < points.length - 1; i++) {
      const start = points[i]
      const end = points[i + 1]
      let part = Tools.escapeHtml(text.slice(start, end))
      const bold = styles.some(
        (style) => start >= style.offset && end <= style.offset + style.length,
      )
      const link = links.find(
        (item) => start >= item.offset && end <= item.offset + item.length,
      )
      if (bold) {
        part = `<strong>${part}</strong>`
      }
      const url = link && this.getSafeExternalUrl(link.url)
      if (url) {
        part = `<a href="${Tools.escapeHtml(
          url,
        )}" rel="noopener noreferrer">${part}</a>`
      }
      html += part
    }
    return html
  }

  private getSafeExternalUrl(value: string) {
    try {
      const url = new URL(value)
      return url.protocol === 'http:' || url.protocol === 'https:'
        ? url.href
        : null
    } catch {
      return null
    }
  }

  private getCommonResult(result: ResultMeta): CommonResult {
    return {
      postId: result.postId,
      type: result.type,
      title: result.title,
      date: result.date,
      fee: result.fee,
      user: result.user,
      uid: result.uid,
      createID: result.createID,
      tags: result.tags,
    }
  }

  /** 把文章里的图片渲染为 img 标签。注意：如果图片已经下载，会使用本地路径；否则使用原始 URL */
  private renderPostImage(
    image: ImageData,
    result: ResultMeta,
    commonResult: CommonResult,
    htmlPath: string,
  ) {
    const downloadedImage = result.files.find(
      (file) => file.fileID === image.id,
    )
    if (downloadedImage) {
      const imagePath = fileName.getFileName({
        ...commonResult,
        ...downloadedImage,
      })
      return this.renderImageSource(
        this.getRelativePath(htmlPath, imagePath),
        image.id,
      )
    }

    return this.renderImage(
      image[settings.imageSize === 'original' ? 'originalUrl' : 'thumbnailUrl'],
      image.id,
    )
  }

  private getRelativePath(fromFile: string, toFile: string) {
    const from = fromFile.replace(/\\/g, '/').split('/')
    const to = toFile.replace(/\\/g, '/').split('/')
    from.pop()

    while (from.length > 0 && to.length > 0 && from[0] === to[0]) {
      from.shift()
      to.shift()
    }

    return [
      ...from.map(() => '..'),
      ...to.map((segment) => encodeURIComponent(segment)),
    ].join('/')
  }

  private renderImage(src: string, alt: string) {
    const safeSrc = this.getSafeExternalUrl(src)
    return safeSrc ? this.renderImageSource(safeSrc, alt) : ''
  }

  private renderImageSource(src: string, alt: string) {
    return `<figure><img src="${Tools.escapeHtml(src)}" alt="${Tools.escapeHtml(
      alt,
    )}"></figure>`
  }

  private renderExternalLink(
    url: string,
    text: string,
    className: string,
    local: boolean = false,
  ) {
    const safeUrl = this.getSafeExternalUrl(url)
    const content = Tools.escapeHtml(text)
    if (local) {
      return `<p class="${className}"><a href="${Tools.escapeHtml(
        url,
      )}" rel="noopener noreferrer">${content}</a></p>`
    }
    return safeUrl
      ? `<p class="${className}"><a href="${Tools.escapeHtml(
          safeUrl,
        )}" rel="noopener noreferrer">${content}</a></p>`
      : content
        ? `<p class="${className}">${content}</p>`
        : ''
  }

  private renderPostFile(
    url: string,
    text: string,
    extension: string,
    fileId: string,
    result: ResultMeta,
    commonResult: CommonResult,
    htmlPath: string,
  ) {
    const downloadedFile = result.files.find((file) => file.fileID === fileId)
    if (downloadedFile) {
      const filePath = fileName.getFileName({
        ...commonResult,
        ...downloadedFile,
      })
      const relativeFilePath = this.getRelativePath(htmlPath, filePath)
      // 如果这个文件是图片，则直接显示 img 标签
      if (Config.fileType.image.includes(extension.toLowerCase())) {
        return this.renderImageSource(relativeFilePath, text)
      }
      return this.renderFileContent(relativeFilePath, text, extension, true)
    }
    return this.renderFileContent(url, text, extension)
  }

  private renderFileContent(
    url: string,
    text: string,
    extension: string,
    local: boolean = false,
  ) {
    const source = local ? url : this.getSafeExternalUrl(url)
    if (!source) {
      return this.renderExternalLink(url, text, 'attachment', local)
    }

    const safeSource = Tools.escapeHtml(source)
    const safeText = Tools.escapeHtml(text)

    // 为视频和音频文件生成对应的 html 标签，以便用户可以直接播放它们。这也使得体验与 fanbox 网页里的体验更接近。
    // PS：fanbox 的视频格式有 3 种：'mp4','mov','avi'，只对 mp4 生成 video 标签。这是因为 mov 和 avi 是容器格式，其中的视频编码或音频编码不固定，浏览器可能不支持某些编码，会导致视频无法播放。而且浏览器对 avi 容器的支持很差。
    switch (extension.toLowerCase()) {
      case 'mp4':
        return `<div class="attachment media"><p class="media-name">${safeText}</p><video controls preload="metadata" src="${safeSource}">${safeText}</video></div>`
      case 'wav':
      case 'mp3':
      case 'flac':
        return `<div class="attachment media"><p class="media-name">${safeText}</p><audio controls preload="metadata" src="${safeSource}">${safeText}</audio></div>`
      default:
        return this.renderExternalLink(url, text, 'attachment', local)
    }
  }

  private textToHtml(text: string) {
    return text
      .split(/\r?\n/)
      .map((line) => `<p>${this.renderTextWithLinks(line) || '<br>'}</p>`)
      .join('\n')
  }

  private renderTextWithLinks(text: string) {
    const urlReg = /https?:\/\/[^\s<>"']+/g
    let html = ''
    let previousIndex = 0
    let match: RegExpExecArray | null

    while ((match = urlReg.exec(text)) !== null) {
      const urlText = match[0]
      html += Tools.escapeHtml(text.slice(previousIndex, match.index))

      const url = this.getSafeExternalUrl(urlText)
      html += url
        ? `<a href="${Tools.escapeHtml(url)}" rel="noopener noreferrer">${Tools.escapeHtml(urlText)}</a>`
        : Tools.escapeHtml(urlText)
      previousIndex = match.index + urlText.length
    }

    return html + Tools.escapeHtml(text.slice(previousIndex))
  }

  private sanitizeEntryHtml(
    html: string,
    result: ResultMeta,
    commonResult: CommonResult,
    htmlPath: string,
  ) {
    const document = new DOMParser().parseFromString(html, 'text/html')
    const allowedTags = new Set([
      'p',
      'br',
      'strong',
      'b',
      'em',
      'i',
      'u',
      's',
      'h1',
      'h2',
      'h3',
      'h4',
      'h5',
      'h6',
      'ul',
      'ol',
      'li',
      'blockquote',
      'pre',
      'code',
      'a',
      'img',
      'figure',
      'figcaption',
      'div',
      'span',
    ])
    const sanitizeNode = (node: Node) => {
      for (const child of [...node.childNodes]) {
        sanitizeNode(child)
      }
      if (!(node instanceof Element)) {
        return
      }

      const tag = node.tagName.toLowerCase()
      if (
        node.namespaceURI !== 'http://www.w3.org/1999/xhtml' ||
        !allowedTags.has(tag)
      ) {
        node.replaceWith(...node.childNodes)
        return
      }

      const allowedAttributes =
        tag === 'a'
          ? new Set(['href', 'title'])
          : tag === 'img'
            ? new Set(['src', 'alt', 'title', 'width', 'height'])
            : new Set<string>()
      for (const attribute of [...node.attributes]) {
        if (!allowedAttributes.has(attribute.name.toLowerCase())) {
          node.removeAttribute(attribute.name)
        }
      }

      const urlAttribute = tag === 'a' ? 'href' : tag === 'img' ? 'src' : null
      if (urlAttribute && node.hasAttribute(urlAttribute)) {
        const sourceUrls = [node.getAttribute(urlAttribute)!]
        if (
          tag === 'img' &&
          node.parentElement?.tagName.toLowerCase() === 'a'
        ) {
          const href = node.parentElement.getAttribute('href')
          href && sourceUrls.push(href)
        }
        const downloadedImage =
          tag === 'img'
            ? result.files.find(
                (file) => file.fileID === this.getImageFileId(sourceUrls[0]),
              )
            : undefined
        if (downloadedImage) {
          const imagePath = fileName.getFileName({
            ...commonResult,
            ...downloadedImage,
          })
          node.setAttribute('src', this.getRelativePath(htmlPath, imagePath))
        } else {
          const url = this.getSafeExternalUrl(node.getAttribute(urlAttribute)!)
          if (url) {
            node.setAttribute(urlAttribute, url)
          } else {
            node.removeAttribute(urlAttribute)
          }
        }
      }
      if (tag === 'img' && node.hasAttribute('src')) {
        const src = node.getAttribute('src')!
        if (!src.startsWith('../') && !src.startsWith('./')) {
          const url = this.getSafeExternalUrl(src)
          if (url) {
            node.setAttribute('src', url)
          }
        }
      }
    }

    for (const child of [...document.body.childNodes]) {
      sanitizeNode(child)
    }
    return document.body.innerHTML
  }

  private getImageFileId(url: string) {
    try {
      const pathname = new URL(url).pathname
      const fileName = pathname.split('/').pop() || ''
      return fileName.split('.')[0]
    } catch {
      return ''
    }
  }
}

const createHtmlDocument = new CreateHtmlDocument()
export { createHtmlDocument }
