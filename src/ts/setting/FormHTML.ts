import formHtmlTemplate from './FormHTML.html'
import { Config } from '../Config'

// 生成包含所有设置项的 HTML，动态值由模板占位标记替换。
const createFormHtml = () =>
  formHtmlTemplate
    .replace(/__fileType\.image__/g, Config.fileType.image.join())
    .replace(/__fileType\.music__/g, Config.fileType.music.join())
    .replace(/__fileType\.video__/g, Config.fileType.video.join())
    .replace(/__fileType\.compressed__/g, Config.fileType.compressed.join())
    .replace(/__fileType\.ps__/g, Config.fileType.ps.join())
    .replace(/__fileType\.other__/g, Config.fileType.other.join())
    .replaceAll(/__defaultNameRule__/g, Config.defaultNameRule)

export const formHtml = createFormHtml()
