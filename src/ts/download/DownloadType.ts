import { Result } from '../StoreType'

export interface downloadArgument {
  id: string
  data: Result
  index: number
  progressBarIndex: number
  taskBatch: number
  conflictAction?: 'uniquify' | 'overwrite' | 'prompt'
}

// 前台向后台发送的任务信息
export interface SendToBackEndData {
  msg: string
  fileUrl: string
  fileName: string
  id: string
  taskBatch: number
  conflictAction?: 'uniquify' | 'overwrite' | 'prompt'
}

// 浏览器下载时每个任务的信息
export interface DownloadSuccessData {
  url: string
  id: string
  filename: string
  tabId: number
  uuid: boolean
  size: number
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
