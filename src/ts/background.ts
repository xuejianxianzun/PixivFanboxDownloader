import { DonwloadListData, SendToBackEndData } from './download/DownloadType'

// 当点击扩展图标时，显示/隐藏下载面板
chrome.action.onClicked.addListener(function (tab) {
  // 在本程序没有权限的页面上点击扩展图标时，url 始终是 undefined，此时不发送消息
  if (!tab.url) {
    return
  }

  chrome.tabs.sendMessage(tab.id!, {
    msg: 'click_icon',
  })
})

// 存储每个下载任务的数据，这是因为下载完成的顺序和前台发送的顺序可能不一致，所以需要把数据保存起来以供使用
let dlData: DonwloadListData = {}

// 当扩展被安装、被更新、或者浏览器升级时，初始化数据
chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.set({ batchNo: {} })
})

type batchNoType = { [key: string]: number }

// 使用每个页面的 tabId 作为索引，储存此页面里当前下载任务的编号。用来判断不同批次的下载
let batchNo: batchNoType = {}

// 接收下载请求
chrome.runtime.onMessage.addListener(async function (
  msg: SendToBackEndData,
  sender
) {
  // 接收下载任务
  if (msg.msg === 'send_download') {
    // 当处于初始状态时，或者变量被回收了，就从存储中读取数据储存在变量中
    // 之后每当要使用这两个数据时，从变量读取，而不是从存储中获得。这样就解决了数据不同步的问题，而且性能更高
    if (Object.keys(batchNo).length === 0) {
      const data = await chrome.storage.local.get('batchNo')
      batchNo = data.batchNo
    }

    const tabId = sender.tab!.id!
    // 如果开始了新一批的下载，重设批次编号，清空下载索引
    if (batchNo[tabId] !== msg.taskBatch) {
      batchNo[tabId] = msg.taskBatch
      chrome.storage.local.set({ batchNo })
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
// 每个下载会触发两次 onChanged 事件
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
