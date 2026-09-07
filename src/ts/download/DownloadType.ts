import { Result } from '../StoreType'

export interface downloadArgument {
  id: string
  data: Result
  index: number
  progressBarIndex: number
  taskBatch: number
  conflictAction?: 'uniquify' | 'overwrite' | 'prompt'
  /**文件的 Blob 数据。仅当下载下载器动态生成的文件（data.url 是 blob URL）时提供。
   *
   * 在 Firefox 里，前台生成的 blob URL 无法在后台使用，需要把 Blob 发送给后台，由后台生成 blob URL；
   * 在 Chrome 的隐私窗口里，需要把 Blob 转换为 dataURL 发送给后台。详见 Config.sendBlob / sendDataURL */
  blob?: Blob
}

// 前台向后台发送的任务信息
export interface SendToBackEndData {
  msg: string
  /**浏览器要下载的 URL。可能是文件的原始 URL（fanbox 上的文件），也可能是前台生成的 blob URL
   *（下载器动态生成的文件，如保存的正文文件、HTML 文件等）
   *
   * 注意：blob URL 在 Firefox 里无法在后台使用，在 Chrome 的隐私窗口里也无法使用。
   * 这两种情况下需要同时携带 blob 或 dataURL 字段，由后台选择可用的下载方式。详见 Config.sendBlob / sendDataURL */
  fileUrl: string
  fileName: string
  /**下载任务的 id。用于回传下载状态时匹配任务。save_file_no_replay 消息不使用 */
  id?: string
  /**下载批次编号。save_file_no_replay 消息不使用 */
  taskBatch?: number
  conflictAction?: 'uniquify' | 'overwrite' | 'prompt'
  /**文件的 Blob 数据。在 Firefox 里下载 blob URL 文件时携带，由后台生成 blob URL 后下载 */
  blob?: Blob
  /**文件的 dataURL。在 Chrome 的隐私窗口里下载 blob URL 文件时携带（详见 Config.sendDataURL） */
  dataURL?: string
}

// 浏览器下载时每个任务的信息
export interface DownloadSuccessData {
  url: string
  id: string
  filename: string
  tabId: number
  uuid: boolean
  size: number
  /**后台生成的 blob URL。仅在 Firefox 里下载 blob URL 文件时存在（后台根据消息里的 blob 生成）。
   * 下载完成后需要吊销它。前台生成的 blob URL（url 字段）不会记录在这里，因为 result.url 可能被复用（如下载失败后重试） */
  blobURLBack?: string
}

export interface DonwloadSkipData {
  id: string
  reason:
    | 'duplicate'
    | 'size'
    | 'color'
    | 'widthHeight'
    | '404'
    | '500'
    | 'excludedType'
}

// 所有任务的信息
export interface DonwloadListData {
  [key: number]: DownloadSuccessData | null
}

// 下载完成后返回的信息
export interface DownloadedMsg {
  msg: string
  data: DownloadSuccessData
  err?: string
}
