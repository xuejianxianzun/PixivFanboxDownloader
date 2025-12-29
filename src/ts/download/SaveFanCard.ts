import { API } from '../API'
import { Plan } from '../CrawlResult.d'
import { lang } from '../Lang'
import { log } from '../Log'
import { msgBox } from '../MsgBox'
import { Utils } from '../utils/Utils'
import { SendToBackEndData } from './DownloadType'

interface Config {
  canvasWidth: number
  canvasHeight: number
  fontFamily: string
  assets: {
    cardMask: string
    logoDark: string
    logoLight: string
  }
}

type FanCardData = {
  creatorName: string
  yourName: string
  backgroundURL: string
  sinceDate: string
} & Plan

// 保存粉丝卡
// 生成粉丝卡的代码是从 Fanbox 的代码里逆向出来的。因为粉丝卡是动态生成的，需要在一张静态的背景图片上绘制文字，为了保持生成的效果与 Fanbox 完全一致，需要逆向代码（当然我也可以偷懒了😄）
class SaveFanCard {
  private displayName = true // 是否显示用户名
  private busy = false // 是否正在保存粉丝卡
  private errorCount = 0

  public async save(scope: 'current' | 'all') {
    if (this.busy) {
      const msg = lang.transl('_正在保存粉丝卡请稍后再试')
      msgBox.error(msg)
      return
    }
    this.busy = true

    this.displayName = window.confirm(
      lang.transl('_你想在粉丝卡上显示你的用户名吗'),
    )
    this.loadMaskURL()

    let createIds: string[] = []

    if (scope === 'all') {
      const allPlan = await API.getAllSupportingPlan()
      if (Array.isArray(allPlan.body) && allPlan.body.length > 0) {
        createIds = allPlan.body.map((plan) => plan.creatorId)
      } else {
        const msg = lang.transl('_你没有赞助任何创作者所以无法生成粉丝卡')
        log.error(msg)
        msgBox.error(msg)
        return
      }
    } else {
      const createId = API.getCreatorId(window.location.href)
      createIds.push(createId)
    }

    const total = createIds.length
    let no = 0
    log.success(lang.transl('_开始保存粉丝卡'))
    log.log(`${no} / ${total}`, 1, false, 'saveFanCard')

    for (const createId of createIds) {
      const data: FanCardData | null = await this.getFanCardData(createId)
      if (data) {
        await this.generateSupporterCard(
          data.backgroundURL,
          data.title,
          data.fee,
          data.creatorName,
          data.yourName,
          data.sinceDate,
        )
        log.log(
          lang.transl('_已保存该创作者的粉丝卡') + ': ' + data.creatorName,
        )
      }
      no++
      log.log(`${no} / ${total}`, 1, false, 'saveFanCard')

      if (no < total) {
        await Utils.sleep(1000)
      }
    }

    // 如果全都出错了，则不显示保存完毕的消息
    if (this.errorCount < total) {
      const msg = lang.transl('_粉丝卡保存完毕')
      log.success(msg)
      msgBox.success(msg)
    }

    // 添加一行空的日志，单纯起到添加间隔的作用
    log.log('')

    // 重置一些状态
    this.busy = false
    this.errorCount = 0
  }

  private async getFanCardData(createId: string): Promise<FanCardData | null> {
    let supportInfo = null
    try {
      supportInfo = await API.getSupportingPlanForOneCreator(createId)
    } catch (error: Error | any) {
      this.errorCount++
      // 如果你没有赞助这个创作者，会返回 404 状态码
      let msg = lang.transl('_你不是xx的赞助者无法生成粉丝卡', createId)
      if (error?.status !== 404) {
        msg = lang.transl('_获取你对xx的赞助计划时出现错误', createId)
      }
      log.error(msg)
      msgBox.error(msg)
      return null
    }

    return {
      ...supportInfo.body.plan,
      creatorName: supportInfo.body.plan.user.name,
      yourName: supportInfo.body.supportTransactions[0].supporter.name,
      backgroundURL: supportInfo.body.plan.coverImageUrl,
      sinceDate: supportInfo.body.supportStartDatetime,
    }
  }

  // 在需要时加载遮罩图片（蒙版）
  private loadMaskURL() {
    if (!this.config.assets.cardMask) {
      this.config.assets.cardMask = chrome.runtime.getURL('images/cardMask.png')
    }
  }

  private config: Config = {
    canvasWidth: 1280,
    canvasHeight: 800,
    fontFamily:
      'Arial, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Droid Sans, Helvetica Neue, Hiragino Kaku Gothic ProN, Meiryo, sans-serif',
    assets: {
      cardMask: '',
      logoDark:
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASQAAAAoCAYAAABXTIcjAAAPPUlEQVR4Xu1d7bXbNhIFpALWrmDtCiKTBcSpIEkFa1cQuwI7FcRbQeIK1qlgXwoQ87aCOBXELoDEntEB34EozNwLENJ7yrH+igTxNRd3LgYD7778vvTAlx742/TAbrd7tN1uvw0hPPHeP08bFkK49d5/HMfx19vb248PsdG+7/tQWrEQwkdpWAjhZpomadwtWwb6Xgjhx2EY3qbl9X3/i3Pun9Y3xnF8iTq567qfvfdPtHJCCP8bhuFV+n/XdTfe+6+tb+/3ez//33XdO+/9D6g/0nesZ5nvO+fe7/f7F+ib6f+73W633W5/KnlHe3a/339jlRPH71/Mt0IIL4dhkPGmfrvd7vl2u/0vengcx29ub29vtOdQObn30TtGnaQen5xzN+M4/lZiP0b9n2w2mzfee3YeyLd/tPpEvtV13Svv/bfA9lqV87IKkDKVux3H8TVqnLxXA0hd173w3v9sdUoI4fUwDO+MARMD/B2UcWIMDCCk4NL3/XfOuf+sNZD5fdRf8lypEcs7K4zppGkIXLuu+8NaCBYFFoFrQTvMcne73ZPtdvuHNm6NAWn5GQoctLr1ff9DCOGt9/4RmnfL/0MI76ZpEkARgDz5oX6JL/y63+9l3qu/ruv+suoXQvhtGIbnrQDpUBFp3DAMr62KIQPLMaQIZNJh/9DKFtY2DMNTY9Bk1VVX6RDCn8MwnLCnUkCKlPkvNDEYECEngxvH8Slih8v6FBgyaoqzAIltw/wRNI617QghfJqmSfopa3hxjqnewpkBabaft8Mw/Ag7PHkgsn6WFWlFC6EQBpntm77vPzjnEEtS5yBDKOb+bQpIEZR+GYbhpQEMpouoAVLXdbICvLEGS6PlAhKbzUZWaXUF0QCiFJCkfl3Xia/+lVXXEMK/l+5hjbFpQIom9aUAiZmMy7qWAGxJO9AiYC2WlwCkaD8nkoU2lo3AaC5eBSWmjzW7jUAvLvWRnpW2KZ3DzQEJdWotQ4rMQ4Q4lSVpWgoyCsuoKwEJ6kgzRbWAgwHhGv1IvslMMgRq8/8WQyrRjxKWROtIhe24sfSuhwBI0gfjOD5DuhI5N9ghnJ9T+wfZgcZsGYacLhRnAaTYqVkKVwtIkXkwLOnxknoiDcNaOdFASL2WBsnqSEh7YagyWvW1GVloyObEBoAkut2u0DJoHam0HRb7eiiAJGK3BZxxQ8LUQwv7++5xbT6R/fz9fr8X9+7uhxakJRk4GyA557JC1xpAYljSUtwmOvLzfr9XXbkaQGJ1JOSa9H0PjRmVcZ+AxPbDso4lOhIxvkfFA9fiXjWktKIAOE0XqBaMonfzcZomYWgnehJhC0c2XyOVMID0fhzHu23YzWYjvqDsepnb8BpLWgNIDEtaTmYCoU2fnRiErKjbdZ2ERqA+OllRFqsL0tuyQjwzIUsN2SpTY0gsU8yVzQJtaTsssGvNkJZuubgv0X6E6aMwlmyYQkl7JYwlhufIgitxSWg+HoZC27Fmvp2OW41UAgEpt6JE5PuA4nOcczkKh4zMBAjGJ50FSOLZz+M4PrF2XmoBCQFhHHi1rczg1+pH8m2mfBS7g4DPiskSY3HOPTKMxATr+dtMO5b11Np1bkBK6iybLLLxoQKEBgrMvHLOybz+Lg3DiTYrMUXmxtDMkrQda7TQpnhBSCUnoTpVgBQntBm3oRncWoYk5RKDctAgkPBn0fd58tQCElodYv8cYi9yhk2+T4u/y28whrwWkIDL+V4ASdtOZnYhWWDN9G9Wo7oUIEWmb8bWGbvNZjxP9ExUURzZxNxXmrCO5uXMQIn5lSUD1YAUO9WMYlairlcxJBYMx3F8vNlsfjcC8iA7Ytooz+RcFoKdCTVWY6eYiG/WrckBHjFhZLfHjG62GBLSj4QBRIakrdi3+/3+GWJhTDuWZWgxSZcEJFRvxXaYoFsUACpHS9ButcxNNSwFsSTxjJxzUlcr7i/rHawCJLQLdC5AIlmShOdbsQ9UvEctQ4pgBnUkAc4aAbE2/qjE1VkDSEg/krKlLtaxD61vUoBBhq0BWm436SEBUq7vGXZDhgysCktBLEl2CS3biy5lViq5WkBiGIi1urLsYg0gEa6lykJQqP0a/Yh1ddYAEmJ4wiqJMYQ6Ui0g5bbWLwlIyKhzwEIQAGqTgw0bsMI5CJakmp8llawCJGSsOWGuhYY0t5QxeKVX6DgX1EbNZWN0Ak1nIwy16vxaKbNYCUiqOx8PMR9ik/q+V48EMTrSCkA6OXJzSUDq+17dujeOMaEzgfS8RnZIaFHwfKlie6ZUUg1ISCOIDTrRIFBHMEJziduR6xSWHa3RkFitK8d0GCMracN9aEhgnO8MBwA+1JGIvvqsRfcv59olACnJsmDJCdmD4oTtmAfM03nALLTWgsTEBNaQgWpAYs7R5DQAolMpbWduLNOxi46hV5G1gIQYQKzXidEhrWCtfsS6bCEEiT8z8+ZM0/R+ebAXgUTKnJFrh3Qk5lve+2yalUzMWtPASBHPvfd3qXlCCDt0Ij9lj+dktMj909j7AtTgyYklKKGFtBiQYjzDTyjvinZWqzUgoQlZ2iHL5xnAA0cn4EnpzNETMzPBWv2IBSRVBEj+qBFf03cILWVtHqOnVlqRNFauNUNi+i99RsBomqbnuU0OZp6XuNho0WMAqYIlQTLAANIhGVvScSrVXHRuNkamNSCxLCbWDeZtaQ1IMcGVmQhtOZHQkZHa82ulKy5jUAogmeEgKetBAity4ZGhCtgDNnBnJPcJSLKAT9MkwYxaXiKYiA6djSxlN6jvo+3RLAmxIykPAhIzKZfPWC7FOQCJFbcZkbQ1ICGDiyvREXijPmIGFo0bMmT0/vx/DpCs+ufmBnheDR5lmF4EJDN+ZwbI+wKk6Nq9HcdR3N9rAyRK3JY2DsPwGM2rswCSRR2RsTGovFjpJdALJkSLhg+TdLUGJCnP2kmK9boLQkMA1kI/YgwZTRwNkAigO2GpKH8USABnMof5XbCbd1gQ7guQ5r6MwPRyeWKeHa/7YEiIzTNeU/pMc0BC7kRrQGJ84UWn0DsRrDuIJgISEFO9DWkqLfQjdoIzoLRcfNB4GDnT1ahesNtDARIQzw8bC/cNSAkwncgdBNCbmTszCy10tRA5YOq0sD0zq2tzlw2BUWQLq4+OzI1k0htk3EnYKek7a0XtCGpyqNHUkWZQIwy6+vzagllCTaIGkBD41ojglmEgo0gOWps51cUNPkNO7c9y08cRAwAXRiTM8+g8GmqnvHdpUduKpdLmDsKIJgwp7g68QFnuWgMSMt7aTmkNSMgNi5PpkNAOAWAL/ejMDMk8/JnbxkfGZmXXRO8udvTU1MKiL1q3xdSksM3VOy6iorugG1+OkrShdpYCElo4og2okfJMfXL2h3JdVQNSTB8h1yB9YG4bmSvXymWrYUcJJaZZEgIIKRO5bAwQz9vP4MiImUyOYTQJu4QMqWTFjSBnshBN/2KCbLU+RoaxACSVqcarvdQrsloB0tz/5O7rEUsibIeWI5h5bZ2Lq2FHCftTQzkYQDpK0CaBcqU3XKSGQnQqFRhJaC2mfSLqmEyconvZtI+iCSBuyTRN74BAXxy2oNUHGXLpisu4pmL0zrnsnWve+6O7+Jb11owDtSMFEgb4tP5qDUixv8zD10tXlTg/BuN8WGJgLbTM0SawOKopeiEgIWGrZFVmmAL7PSL5058gQ56Zt/gMgGSKiDEO5a11+h3dPVcyFsiQawCJdANKqnn3bG0Ww0yMFwo6zdbvTIAE50SaLwv1L3KHEnbM3FEol6Zmc6GjMBthwig7pca+rxKQEDuSDpEgM3QxJOOSIGbDumwIACJ7EB1D1RaY1BKstaP61AASkaGArV7uuSw7RO3IABKTU+jk+2cCJHOzY6lBMZopM0fQcR1pvBazx7CjuEEgYr51Q1CWEFwrIJmnnmeWRYAJZElEGZSGxLBD55wcM9FuAG2mH0ldkCGXAhIj3K9BIy2wDrVD2dWDeaoyLuOJ7oG+ja66QgCzfB/lmIp1hgna0B2FsZysoE2wo0MgK2pbnF8nNxNdHSAhdpQ2lHzWvAOrJSAxZRlG20w/OgcgMSLtGkCK43oyVggUFECCCcouBEjF6USQBqv1UyJBwPijWMZJ4kCGHc3aLPNsLqbu6gCJiAw9WiFQlDQKNGRAhNllk0FmVg3NaFvqR+cAJLRyrgWj6Eac7CLVABJpLEdVbu2yMXOhJog09pOcSPh+ufvddd0btHkQG51d/JCrt9xFRZpXjiVdFSChyZdzM1AnatQxWVGa7LKxIKAZLqMNlBh9TV9a5aNNhpK6lbBE1A5NJ0THVc7FkJ49e/b1ZrN5Zbjmd5/OjTlq76LeNyEESScrP4l9UsMa0vcU8GWuoz/aIa9xMa8KkFDsQy7OhVwNVb+7JUNase3cVD9iwZER/WNZzA00MMIcgUROR0IGagASdSh0NtQahrQGhNde7177bU33YhhdLmiXCFWQCPM79/BqAAlNvEhVtZQnMCeRFgHdEpCi26ZGC5cwg9oJN7/H9CcLSKRWl71aPW1HDZtF7dDaUJrL5x4ASQ1yRG1eMzdq2ZEmfTDaYuqaXg0gIXZk3WTAUEfjHqxmLlsEpGJBtbV+1JohEfoRxfDIcTpadJBxgswTdEzSJQFJyxpZCt4VwKRpR1AIB8BvZuNIr6W6CkBa63ZFIEBRsdnUJK0ZEmN0Gf3C3AmsmHhNt/0J/YjaIawZ5zWAhN4ldBV4/KZibCQJvmSNPDqUmysHubgl346xezvlSi4UZmPedkIsWBL3dNCfrgKQmAYh0beUOs6D2RqQKnQkil2UTL6WDIkBETb6nlw4js4hIlBBbiejcUi9LsSQaDCKYyhCszD4r0rHf/G8+l3GHUcMHo1RlFsOCdwePCCRE97MKjgPHkrklrvRtDUgVehIFLsonZDMJEHGLN9kGB9Tzlz/0q1i1A70bUasvRAgyZnRtzXnRBntTZsfKHUuwX7ZG6ChdioxTA8ekBh2xB6UrSnrTIBE60ho9SkFotaiNmMMbJxWBGuYOyod77WAxCx45wAkAQLJVS/b8jFjRjZ1LTu+0g+bzUbmFcWWRKeSmKRcdsrEO2B2IqkDvSTT+ujZBv8dnpPJ55xDsRifGP/92vtDXEc5QQLaIV2xylCuvZ+urf5yhGez2byQsfXey/jO58nmZHEfpmm6ufQcJ+eb+z8OR7gT9SZ7mwAAAABJRU5ErkJggg==',
      logoLight:
        'data:image/png;base64,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',
    },
  }

  private async loadImage(url: string): Promise<HTMLImageElement> {
    // 粉丝卡的背景图是保存在 pixiv 上的，例如：
    // https://pixiv.pximg.net/c/1280x800_90_a2_g5/fanbox/public/images/plan/335879/cover/VyxOduCIButmyx17qGlmYOW4.jpeg
    // 为了避免跨域限制（会导致这个 img 无法绘制到 canvas 上），需要将其转换为 blob URL。
    // 对 chrome-extension:// 协议的本地资源也需要采用同样的方法，因为这种 URL 不能作为 img 的 src，会报错。
    if (url.startsWith('http') || url.startsWith('chrome-extension://')) {
      // const fetchOptions = url.startsWith('http') ? { credentials: 'same-origin' } : {}
      const res = await fetch(url, { credentials: 'same-origin' })
      const blob = await res.blob()
      url = URL.createObjectURL(blob)
    }

    return new Promise((resolve, reject) => {
      const img = document.createElement('img')
      img.onload = () => {
        if (url.startsWith('blob')) {
          URL.revokeObjectURL(url)
        }
        return resolve(img)
      }
      img.onerror = (err) => reject(new Error(`Failed to load image: ${url}`))
      img.src = url
    })
  }

  // 截断文本以适应 maxWidth，必要时添加省略号
  private truncateText(
    ctx: CanvasRenderingContext2D,
    text: string,
    fontSize: number,
    maxWidth: number,
  ): string {
    ctx.font = `${fontSize}px ${this.config.fontFamily}`
    if (ctx.measureText(text).width <= maxWidth) {
      return text
    }
    let truncatedText = text
    while (
      truncatedText.length > 1 &&
      ctx.measureText(truncatedText + '...').width > maxWidth
    ) {
      truncatedText = truncatedText.slice(0, -1)
    }
    return truncatedText.length < text.length ? `${truncatedText}...` : text
  }

  private drawTextWithOutline(
    ctx: CanvasRenderingContext2D,
    text: string,
    x: number,
    y: number,
    fontSize: number,
    textAlign: 'left' | 'right' | 'center',
    fontWeight: 'normal' | 'bold' = 'normal',
  ) {
    ctx.textAlign = textAlign
    ctx.font = `${fontWeight} ${fontSize}px ${this.config.fontFamily}`

    // 使用“multiply”混合模式，使文本看起来更柔和
    ctx.globalCompositeOperation = 'multiply'

    // 外阴影/描边
    ctx.lineJoin = 'round'
    ctx.lineWidth = 5
    ctx.strokeStyle = '#bbb'
    ctx.strokeText(text, x, y)

    // 内阴影/描边
    ctx.fillStyle = '#ddd'
    ctx.lineWidth = 4
    ctx.strokeText(text, x + 2, y + 2)

    // 填充文本
    ctx.globalCompositeOperation = 'source-over'
    ctx.fillStyle = '#fff'
    ctx.lineWidth = 0
    ctx.fillText(text, x, y)

    return ctx.measureText(text).width
  }

  private drawCroppedBackgroundImage(
    ctx: CanvasRenderingContext2D,
    image: HTMLImageElement,
  ) {
    const canvasWidth = ctx.canvas.width
    const canvasHeight = ctx.canvas.height
    const imgWidth = image.width
    const imgHeight = image.height

    const canvasAspectRatio = canvasWidth / canvasHeight
    const imgAspectRatio = imgWidth / imgHeight

    let sourceX = 0,
      sourceY = 0,
      sourceWidth = imgWidth,
      sourceHeight = imgHeight

    if (imgAspectRatio > canvasAspectRatio) {
      // 如果 Image 比 canvas 的宽高比更宽，裁剪两侧
      sourceWidth = imgHeight * canvasAspectRatio
      sourceX = (imgWidth - sourceWidth) / 2
    } else {
      // 如果 Image 比 canvas 的宽高比更高，裁剪顶部/底部
      sourceHeight = imgWidth / canvasAspectRatio
      sourceY = (imgHeight - sourceHeight) / 2
    }

    ctx.drawImage(
      image,
      sourceX,
      sourceY,
      sourceWidth,
      sourceHeight,
      0,
      0,
      canvasWidth,
      canvasHeight,
    )
  }

  private drawAdaptiveLogo(
    ctx: CanvasRenderingContext2D,
    logoLight: HTMLImageElement,
    logoDark: HTMLImageElement,
    x: number,
    y: number,
    width: number,
    height: number,
  ) {
    const imageData = ctx.getImageData(x, y, width, height)
    const data = imageData.data
    let r = 0,
      g = 0,
      b = 0

    // 为提高性能，对像素子集进行采样
    for (let i = 0; i + 3 < data.length; i += 16) {
      r += data[i]
      g += data[i + 1]
      b += data[i + 2]
    }

    const pixelCount = data.length / 16
    const avgBrightness = (r / pixelCount + g / pixelCount + b / pixelCount) / 3

    // 如果平均亮度高（浅色背景），则使用深色 Logo，否则使用浅色 Logo
    const useDarkLogo = avgBrightness > 210
    ctx.drawImage(useDarkLogo ? logoDark : logoLight, x, y, width, height)
  }

  private drawCanvasContent(
    canvas: HTMLCanvasElement,
    cardMaskImage: HTMLImageElement,
    logoLightImage: HTMLImageElement,
    logoDarkImage: HTMLImageElement,
    backgroundImage: HTMLImageElement,
    planTitle: string,
    fee: number,
    name: string,
    since: string,
  ) {
    canvas.width = this.config.canvasWidth
    canvas.height = this.config.canvasHeight
    const ctx = canvas.getContext('2d')!

    // 1. 绘制背景图片
    ctx.fillStyle = '#fff'
    ctx.fillRect(0, 0, this.config.canvasWidth, this.config.canvasHeight)
    this.drawCroppedBackgroundImage(ctx, backgroundImage)

    // 2. 绘制方案名称
    let rightEdge = this.config.canvasWidth - 96
    let currentY = 96
    const truncatedTitle = this.truncateText(
      ctx,
      planTitle,
      32,
      rightEdge - this.config.canvasWidth / 3,
    )
    this.drawTextWithOutline(
      ctx,
      truncatedTitle,
      rightEdge,
      currentY,
      32,
      'right',
      'bold',
    )

    // 3. 绘制方案金额
    currentY += 64
    let currentX = rightEdge
    currentX -=
      this.drawTextWithOutline(ctx, 'month', currentX, currentY, 40, 'right') +
      8
    currentX -=
      this.drawTextWithOutline(ctx, '/', currentX, currentY, 40, 'right') + 8
    currentX -=
      this.drawTextWithOutline(ctx, 'JPY', currentX, currentY, 40, 'right') + 16
    this.drawTextWithOutline(
      ctx,
      new Intl.NumberFormat('ja-JP').format(fee),
      currentX,
      currentY,
      56,
      'right',
    )

    // 4. 绘制开始支持的日期
    const leftEdge = 96
    currentY = this.config.canvasHeight - 64
    this.drawTextWithOutline(ctx, since, leftEdge, currentY, 48, 'left')
    this.drawTextWithOutline(ctx, 'SINCE', leftEdge, currentY - 56, 32, 'left')

    // 5. 绘制赞助者的用户名
    currentY -= 80
    // 如果不显示用户名，则使用占位符
    const _name = this.displayName ? name : '＊＊＊＊'
    const truncatedUserName = this.truncateText(
      ctx,
      _name,
      48,
      this.config.canvasWidth / 2 - leftEdge,
    )
    this.drawTextWithOutline(
      ctx,
      truncatedUserName,
      leftEdge,
      currentY - 56,
      48,
      'left',
    )
    this.drawTextWithOutline(
      ctx,
      'NAME',
      leftEdge,
      currentY - 56 - 56,
      32,
      'left',
    )

    // 6. 绘制右下角的 PIXIV FANBOX Logo
    const logoX = this.config.canvasWidth - 64 - 400
    const logoY = this.config.canvasHeight - 64 - 54
    this.drawAdaptiveLogo(
      ctx,
      logoLightImage,
      logoDarkImage,
      logoX,
      logoY,
      400,
      54,
    )

    // 7. 应用蒙版时四角产生圆角的透明区域
    ctx.globalCompositeOperation = 'destination-in'
    ctx.drawImage(
      cardMaskImage,
      0,
      0,
      this.config.canvasWidth,
      this.config.canvasHeight,
    )
  }

  /** 生成粉丝卡并返回 Blob URL */
  private async generateSupporterCard(
    bgImageUrl: string,
    planTitle: string,
    fee: number,
    creatorName: string,
    yourName: string,
    sinceDate: string,
  ) {
    // 并行加载所有必要的图像
    const [cardMask, logoLight, logoDark, background] = await Promise.all([
      this.loadImage(this.config.assets.cardMask),
      this.loadImage(this.config.assets.logoLight),
      this.loadImage(this.config.assets.logoDark),
      this.loadImage(bgImageUrl),
    ])

    const canvas = document.createElement('canvas')

    // 格式化开始赞助的日期，例如 "2025.12.25"
    const options = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    } as const
    const since = new Date(sinceDate)
      .toLocaleDateString('ja-JP', options)
      .replace(/\//g, '.')

    // 将所有内容绘制到 canvas 上
    this.drawCanvasContent(
      canvas,
      cardMask,
      logoLight,
      logoDark,
      background,
      planTitle,
      fee,
      yourName,
      since,
    )

    // 保存粉丝卡
    const blobUrl = await this.canvasToBlobUrl(canvas)
    const creator = Utils.replaceUnsafeStr(creatorName)
    const fileName = `fanbox/${creator}/fancard-${creator}.png`
    this.download(blobUrl, fileName)
  }

  private async canvasToBlobUrl(canvas: HTMLCanvasElement): Promise<string> {
    return new Promise((resolve, reject) => {
      canvas.toBlob((blob) => {
        if (blob) {
          const blobUrl = URL.createObjectURL(blob)
          resolve(blobUrl)
        } else {
          reject(new Error('Failed to convert canvas to Blob'))
        }
      }, 'image/png')
    })
  }

  private download(blobUrl: string, fileName: string) {
    const sendData: SendToBackEndData = {
      msg: 'save_file_no_replay',
      fileUrl: blobUrl,
      fileName,
      id: 'fake',
      taskBatch: 0,
    }

    chrome.runtime.sendMessage(sendData)
  }
}

const saveFanCard = new SaveFanCard()
export { saveFanCard }
