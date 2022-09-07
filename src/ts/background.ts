import { DonwloadListData, SendToBackEndData } from './download/DownloadType'

// 设置 Origin 和 Referer
chrome.webRequest.onBeforeSendHeaders.addListener(
  function (details) {
    if (details.url.includes('api.fanbox.cc/')) {
      let hasOrigin = false
      for (const HttpHeader of details.requestHeaders!) {
        if (HttpHeader.name === 'Origin') {
          hasOrigin = true
          break
        }
      }
      if (!hasOrigin) {
        details.requestHeaders!.push({
          name: 'Origin',
          value: details.initiator,
        })
        details.requestHeaders!.push({
          name: 'Referer',
          value: details.initiator + '/',
        })
      }
    }

    return {
      requestHeaders: details.requestHeaders,
    }
  },
  {
    urls: ['*://*.fanbox.cc/*'],
  },
  ['blocking', 'requestHeaders', 'extraHeaders']
)

// 当点击扩展图标时，切换显示/隐藏下载面板
chrome.browserAction.onClicked.addListener(function (tab) {
  // 打开下载面板
  chrome.tabs.sendMessage(tab.id!, {
    msg: 'click_icon',
  })
})

// 因为下载完成的顺序和发送顺序可能不一致，所以需要存储任务的数据
let dlData: DonwloadListData = {}

// 储存下载任务的批次编号，用来判断不同批次的下载
let dlBatch: number[] = []

// 接收下载请求
chrome.runtime.onMessage.addListener(function (msg: SendToBackEndData, sender) {
  // 接收下载任务
  if (msg.msg === 'send_download') {
    const tabId = sender.tab!.id!
    // 如果开始了新一批的下载，重设批次编号，清空下载索引
    if (dlBatch[tabId] !== msg.taskBatch) {
      dlBatch[tabId] = msg.taskBatch
    }

    // 开始下载
    chrome.downloads.download(
      {
        url: msg.fileUrl,
        filename: msg.fileName,
        conflictAction: 'uniquify',
        saveAs: false,
      },
      (id) => {
        // id 是 Chrome 新建立的下载任务的 id
        dlData[id] = {
          url: msg.fileUrl,
          id: msg.id,
          tabId: tabId,
          uuid: false,
        }
      }
    )
  }
})

// 判断文件名是否变成了 UUID 格式。因为文件名处于整个绝对路径的中间，所以没加首尾标记 ^ $
const UUIDRegexp =
  /[0-9a-z]{8}-[0-9a-z]{4}-[0-9a-z]{4}-[0-9a-z]{4}-[0-9a-z]{12}/

// 监听下载事件
chrome.downloads.onChanged.addListener(function (detail) {
  // 根据 detail.id 取出保存的数据
  const data = dlData[detail.id]
  if (data) {
    let msg = ''
    let err = ''

    // 判断当前文件名是否正常。下载时必定会有一次 detail.filename.current 有值
    if (detail.filename && detail.filename.current) {
      const changedName = detail.filename.current
      if (
        changedName.endsWith('jfif') ||
        changedName.match(UUIDRegexp) !== null
      ) {
        // 文件名是 UUID
        data.uuid = true
      }
    }

    if (detail.state && detail.state.current === 'complete') {
      msg = 'downloaded'
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
      chrome.tabs.sendMessage(data.tabId, { msg, data, err })
      // 清除这个任务的数据
      dlData[detail.id] = null
    }
  }
})
