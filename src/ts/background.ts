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

// 当扩展被安装、被更新、或者浏览器升级时，初始化数据
chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.set({ dlData: {}, batchNo: {} })
})

// 存储每个下载任务的数据，这是因为下载完成的顺序和前台发送的顺序可能不一致，所以需要把数据保存起来以供使用
let dlData: DonwloadListData = {}
// 当浏览器开始下载一个由前台传递的文件时，会把一些数据保存到 dlData 里
// 当浏览器把这个文件下载完毕之后，从 dlData 里取出保存的数据，发送给前台
// 由于这个下载器是由浏览器去下载文件的，某些大文件可能需要比较长的时间才能下载完，在这期间 SW 有可能被回收，
// 导致 dlData 被清空，所以需要持久化储存 dlData

type batchNoType = { [key: string]: number }

// 使用每个页面的 tabId 作为索引，储存此页面里当前下载任务的编号。用来判断不同批次的下载
let batchNo: batchNoType = {}

// 储存每个 URL 对于的文件名，用于下载后判断实际的文件名是否符合预期
type url = string
type name = string
const fileNameList: Map<url, name> = new Map()

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
      const data = await chrome.storage.local.get(['batchNo', 'dlData'])
      batchNo = data.batchNo
      dlData = data.dlData
    }

    const tabId = sender.tab!.id!
    // 如果开始了新一批的下载，重设批次编号，清空下载索引
    if (batchNo[tabId] !== msg.taskBatch) {
      batchNo[tabId] = msg.taskBatch
      chrome.storage.local.set({ batchNo })
    }

    fileNameList.set(msg.fileUrl, msg.fileName)

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
        chrome.storage.local.set({ dlData })
      }
    )
  }
})

// 判断文件名是否变成了 UUID 格式。因为文件名处于整个绝对路径的中间，所以没加首尾标记 ^ $
const UUIDRegexp =
  /[0-9a-z]{8}-[0-9a-z]{4}-[0-9a-z]{4}-[0-9a-z]{4}-[0-9a-z]{12}/

// 监听下载事件
// 每个下载会触发两次 onChanged 事件
chrome.downloads.onChanged.addListener(async function (detail) {
  // 根据 detail.id 取出保存的数据
  let data = dlData[detail.id]
  if (!data) {
    const getData = await chrome.storage.local.get(['dlData'])
    dlData = getData.dlData
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

      if (changedName.endsWith('jfif')) {
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
      chrome.storage.local.set({ dlData })
    }
  }
})
