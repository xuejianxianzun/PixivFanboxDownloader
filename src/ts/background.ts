import { DonwloadListData } from './download/DownloadType'
import { totalDownload } from './TotalDownload'
import browser from 'webextension-polyfill'
import { Config } from './Config'

// 当点击扩展图标时，显示/隐藏下载面板
browser.action.onClicked.addListener(function (tab) {
  // 在本程序没有权限的页面上点击扩展图标时，url 始终是 undefined，此时不发送消息
  if (!tab.url) {
    return
  }

  // 页面里可能没有内容脚本，sendMessage 会失败，忽略错误即可
  browser.tabs
    .sendMessage(tab.id!, {
      msg: 'click_icon',
    })
    .catch(() => {})
})

// 当扩展被安装、被更新、或者浏览器升级时，初始化数据
browser.runtime.onInstalled.addListener((details) => {
  browser.storage.local.set({ dlData: {}, batchNo: {} })
})

/**存储每个下载任务的数据。
 *
 * 因为下载完成的顺序和前台发送的顺序可能不一致，所以需要把数据保存起来以供查询 */
let dlData: DonwloadListData = {}
// 当浏览器开始下载一个由前台传递的文件时，会把一些数据保存到 dlData 里
// 当浏览器把这个文件下载完毕之后，从 dlData 里取出保存的数据，发送给前台
// 由于这个下载器是由浏览器去下载文件的，某些大文件可能需要比较长的时间才能下载完，在这期间 SW 有可能被回收，
// 导致 dlData 被清空，所以需要持久化储存 dlData

type batchNoType = { [key: string]: number }
/**使用每个页面的 tabId 作为索引，储存当前下载任务的批次编号（在该页面里）。用来判断不同批次的下载 */
let batchNo: batchNoType = {}

// 储存每个 URL 对应的文件名，用于下载后判断实际的文件名是否符合预期
type url = string
type name = string
const fileNameList: Map<url, name> = new Map()

// 接收下载请求
// 注意：监听器本身不能是 async 函数。因为 async 函数总是返回 Promise，
// 在 webextension-polyfill（Chrome 中）和 Firefox 中，监听器返回的 Promise 都会被当作
// 对该消息的异步响应。如果监听器对与本模块无关的消息（例如查询下载量的消息）也返回
// Promise，就会抢先返回一个 undefined 响应，导致真正处理该消息的其他监听器无法返回数据。
// 所以这里在监听器里同步判断消息类型，只对本模块处理的消息返回异步处理结果。
// 对于其他消息，监听器同步结束（返回 undefined），不会产生响应。
browser.runtime.onMessage.addListener(function (
  msg: any,
  sender: browser.Runtime.MessageSender,
) {
  if (msg.msg === 'send_download') {
    return downloadFile(msg, sender)
  } else if (msg.msg === 'save_file_no_replay') {
    return saveFileNoReplay(msg)
  } else if (msg.msg === 'save_work_file_a_download') {
    // 使用 a 标签下载文件后，下载不会经过 downloads API，也不会触发下面的 onChanged 事件。
    // 所以这里模拟一个下载成功的消息返回给前台，使下载流程得以继续
    return simulateDownloaded(msg, sender)
  }
})

// 解析实际用于下载的 URL 或数据。
// 下载器要下载的文件分两种：
// 1. 原始 URL（fanbox 上的文件），直接交给浏览器下载即可，在所有浏览器里都没有问题。
// 2. 下载器动态生成的文件（blob URL，如保存的正文文件、HTML 文件、粉丝卡等）。
//    前台生成的 blob URL 在 Firefox 里无法在后台使用；在 Chrome 的隐私窗口（spanning）里也无法使用。
//    所以发送这种文件的下载消息时，会附带 blob（Firefox）或 dataURL（Chrome 隐私窗口），按下面的优先级使用
async function getFileURL(msg: any) {
  // 在 Chrome 的隐私窗口里，使用 dataURL 下载
  if (msg.dataURL) {
    return msg.dataURL
  }

  // 在 Firefox 里，根据前台传递的 blob 生成 blob URL 来下载
  if (Config.isFirefox && msg.blob) {
    return URL.createObjectURL(msg.blob)
  }

  // 其他情况：原始 URL，或 Chrome 的正常窗口里前台生成的 blob URL
  return msg.fileUrl
}

// 模拟一个下载成功的消息返回给前台。
// 用于在 Firefox Android（不支持 downloads API，见 Config.downloadsAPIDisabled）里
// 使用 a 标签下载文件后的场景
async function simulateDownloaded(
  msg: any,
  sender: browser.Runtime.MessageSender,
) {
  const tabId = sender.tab!.id!

  // 与 downloads API 下载完成时回传的消息格式保持一致
  browser.tabs
    .sendMessage(tabId, {
      msg: 'downloaded',
      data: {
        // url 必须与前台该下载任务的 url（msg.fileUrl）一致，前台才能匹配到下载任务
        url: msg.fileUrl,
        id: msg.id,
        filename: msg.fileName,
        tabId: tabId,
        uuid: false,
        size: -1,
      },
      err: '',
    })
    .catch(() => {})
}

// 接收下载任务，通过浏览器开始下载
async function downloadFile(msg: any, sender: browser.Runtime.MessageSender) {
  // 当处于初始状态时，或者变量被回收了，就从存储中读取数据储存在变量中
  // 之后每当要使用这两个数据时，从变量读取，而不是从存储中获得。这样就解决了数据不同步的问题，而且性能更高
  if (Object.keys(batchNo).length === 0) {
    const data = await browser.storage.local.get(['batchNo', 'dlData'])
    batchNo = (data.batchNo as batchNoType) || {}
    dlData = (data.dlData as DonwloadListData) || {}
  }

  const tabId = sender.tab!.id!
  // 如果开始了新一批的下载，重设批次编号，清空下载索引
  if (batchNo[tabId] !== msg.taskBatch) {
    batchNo[tabId] = msg.taskBatch
    await browser.storage.local.set({ batchNo })
  }

  fileNameList.set(msg.fileUrl, msg.fileName)

  // 获取实际用于下载的 URL 或数据（在 Firefox / Chrome 隐私窗口里下载 blob 文件时，
  // 实际下载的 URL 可能与前台传递的 fileUrl 不同，详见 getFileURL）
  const downloadUrl = await getFileURL(msg)

  // 开始下载。downloads.download 失败时（例如文件名非法）会抛出错误，
  // 需要捕获，避免异步监听器抛错，导致发送方收到未处理的 Promise 拒绝
  try {
    // id 是浏览器新建立的下载任务的 id
    const id = await browser.downloads.download({
      url: downloadUrl,
      filename: msg.fileName,
      conflictAction: msg.conflictAction || 'uniquify',
      saveAs: false,
    })
    dlData[id] = {
      url: msg.fileUrl,
      id: msg.id,
      filename: msg.fileName,
      tabId: tabId,
      uuid: false,
      size: -1,
      // 如果实际下载的 URL 是后台根据 blob 生成的（Firefox 场景），记录它，
      // 下载完成后吊销。注意：前台生成的 blob URL（msg.fileUrl）不会被吊销，
      // 因为前台可能复用同一个 blob URL（例如下载失败后重试）
      blobURLBack:
        downloadUrl.startsWith('blob:') && downloadUrl !== msg.fileUrl
          ? downloadUrl
          : undefined,
    }
    await browser.storage.local.set({ dlData })
  } catch (error) {
    console.error('下载失败:', error)
  }
}

// 保存不需要返回下载状态的文件
async function saveFileNoReplay(msg: any) {
  try {
    // 获取实际用于下载的 URL 或数据，详见 getFileURL
    const downloadUrl = await getFileURL(msg)
    await browser.downloads.download({
      url: downloadUrl,
      filename: msg.fileName,
      conflictAction: 'overwrite',
      saveAs: false,
    })
    // 说明：如果 downloadUrl 是这里根据 blob 生成的（Firefox 场景），不会吊销它。
    // 这种文件（错误记录 txt、粉丝卡）的下载不注册到 dlData 里，无法得知下载完成时机；
    // 且它们都是小文件、低频出现，内存影响可以忽略
  } catch (error) {
    console.error('保存文件失败:', error)
  }
}

// 判断文件名是否变成了 UUID 格式。因为文件名处于整个绝对路径的中间，所以没加首尾标记 ^ $
const UUIDRegexp =
  /[0-9a-z]{8}-[0-9a-z]{4}-[0-9a-z]{4}-[0-9a-z]{4}-[0-9a-z]{12}/

// 监听下载事件
// 每个下载会触发两次 onChanged 事件
// Firefox Android 不支持 downloads API（注册监听器时会抛出 "Not implemented" 错误），所以不注册该监听器
if (!Config.downloadsAPIDisabled) {
  browser.downloads.onChanged.addListener(async function (detail) {
    // 根据 detail.id 取出保存的数据
    // 如果有数据，就是本扩展建立的下载，所以不会监听到非本扩展建立的下载
    let data = dlData[detail.id]
    if (!data) {
      const getData = await browser.storage.local.get(['dlData'])
      dlData = (getData.dlData as DonwloadListData) || {}
      data = dlData[detail.id]
    }

    if (data) {
      let msg = ''
      let err = ''

      // 判断当前文件名是否正常。下载时必定会有一次 detail.filename.current 有值
      if (detail.filename && detail.filename.current) {
        const changedName = detail.filename.current
        // 文件名是 UUID
        if (changedName.match(UUIDRegexp) !== null) {
          data.uuid = true
        }

        // 检查文件名是 URL 里最后一段的情况

        // Fanbox 下载器的多数文件是直接把原 URL 发送给浏览器下载的，因此很多时候即使受到其他扩展程序的影响，也不会是 UUID，而是原文件名，例如：
        // https://pixiv.pximg.net/c/1200x630_90_a2_g5/fanbox/public/images/post/10264356/cover/cvfFotXy5Cbc2I0uakDXHG0s.jpeg
        // 受到影响时，上面的图片保存后是原文件名：
        // cvfFotXy5Cbc2I0uakDXHG0s.jpeg

        // 此时的 detail 示例：
        // const detailExample = {
        //   "filename": {
        //      current 在 windows 上可能是这样的：
        //     "current": "C:\\download\\cvfFotXy5Cbc2I0uakDXHG0s (6).jpeg",
        //      current 在 Linux 上可能是这样的：
        //     "current": "/home/username/Downloads/cvfFotXy5Cbc2I0uakDXHG0s (6).jpeg",
        //     "previous": ""
        //   },
        //   "id": 1347
        // }

        // fileNameList 里储存的预期的文件名示例：
        // fanbox/omutatsu／おむたつ/2025-07-22-🔞7月22日🔞/0.jpeg
        const expectedName = fileNameList.get(data.url)
        if (expectedName) {
          // 取出预期的文件名的最后一部分，上面的文件名的结果是 "0"
          const name = expectedName.split('/').pop()?.split('.')[0] || ''

          // 取出实际的文件名的最后一部分（注意，即使是与预期一致的文件名，实际上也可能有序号）
          let name2 = ''
          if (changedName.includes('\\')) {
            name2 = changedName.split('\\').pop()?.split('.')[0] || ''
          } else {
            name2 = changedName.split('/').pop()?.split('.')[0] || ''
          }

          // 如果实际文件名不是以预期的文件名开头，则说明文件名异常
          if (name2 && name2.startsWith(name) === false) {
            data.uuid = true
          }
        }
      }

      if (detail.state && detail.state.current === 'complete') {
        msg = 'downloaded'
        // 下载完成后，查询下载项的体积
        // 查询花费的时间：在下载记录不是很多的情况下，查询耗时多为 2 - 5 ms
        const results = await browser.downloads.search({ id: detail.id })
        if (results && results.length > 0) {
          const downloadItem = results[0]
          const fileSize = downloadItem.fileSize // 文件大小（字节）
          if (fileSize !== -1) {
            data.size = fileSize
            totalDownload.addDownload(fileSize)
            // console.log(`文件下载完成，大小: ${fileSize} 字节`)
          } else {
            // console.log("文件下载完成，但大小未知")
          }
        } else {
          // console.error("未找到下载项")
        }
      }

      if (detail.error && detail.error.current) {
        // 下载被取消或者失败时，这里是能捕获到错误的，detail.error.current 包含错误类型：
        // 取消 USER_CANCELED
        // 失败 NETWORK_FAILED
        msg = 'download_err'
        err = detail.error.current
      }

      // 返回信息
      if (msg) {
        // 页面可能已经关闭，sendMessage 可能会失败，忽略错误即可
        browser.tabs.sendMessage(data.tabId, { msg, data, err }).catch(() => {})
        // 下载结束（完成或出错）后，吊销后台生成的 blob URL（如果有）
        if (data.blobURLBack) {
          URL.revokeObjectURL(data.blobURLBack)
        }
        // 清除这个任务的数据
        dlData[detail.id] = null
        await browser.storage.local.set({ dlData })
      }
    }
  })
}
