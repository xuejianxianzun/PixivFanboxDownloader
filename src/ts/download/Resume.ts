import { EVT } from '../EVT'
import { log } from '../Log'
import { lang } from '../Lang'
import { store } from '../Store'
import { states } from '../States'
import { downloadStates, DLStatesI } from './DownloadStates'
import { Result } from '../StoreType'
import { IndexedDB } from '../utils/IndexedDB'
import { toast } from '../Toast'

interface TaskData {
  id: number
  url: string
  data: Result[]
  date: Date
}

interface TaskStates {
  id: number
  states: DLStatesI
}

// 断点续传。恢复未完成的下载
class Resume {
  constructor() {
    this.IDB = new IndexedDB()
    this.init()
  }

  private IDB: IndexedDB
  private readonly DBName = 'PFD'
  private readonly DBVer = 1
  private dataName = 'taskData' // 下载任务数据的表名
  private statesName = 'taskStates' // 下载状态列表的表名

  private readonly putStatesTime = 1000 // 每隔指定时间存储一次最新的下载状态
  private needPutStates = false // 指示是否需要更新存储的下载状态

  // 本模块所操作的下载数据的 id
  // 使用抓取完成时的时间戳作为当前下载任务的 id
  private taskId!: number

  private async init() {
    await this.initDB()
    this.bindEvents()

    if (states.settingInitialized) {
      this.restoreData()
    }

    this.regularPutStates()
    this.clearExired()
  }

  // 初始化数据库，获取数据库对象
  private async initDB() {
    // 在升级事件里创建表和索引
    const onUpdate = (db: IDBDatabase) => {
      if (!db.objectStoreNames.contains(this.dataName)) {
        const dataStore = db.createObjectStore(this.dataName, {
          keyPath: 'id',
        })
        dataStore.createIndex('id', 'id', { unique: true })
        dataStore.createIndex('url', 'url', { unique: true })
      }

      if (!db.objectStoreNames.contains(this.statesName)) {
        const statesStore = db.createObjectStore(this.statesName, {
          keyPath: 'id',
        })
        statesStore.createIndex('id', 'id', { unique: true })
      }
    }

    // 打开数据库
    return new Promise<IDBDatabase>(async (resolve, reject) => {
      resolve(await this.IDB.open(this.DBName, this.DBVer, onUpdate))
    })
  }

  // 恢复未完成任务的数据
  private async restoreData() {
    // 如果下载器在抓取或者在下载，则不恢复数据
    if (states.busy) {
      return
    }

    // 恢复抓取结果
    const url = this.getURL()
    const taskData = (await this.IDB.get(
      this.dataName,
      url,
      'url'
    )) as TaskData | null
    if (taskData === null) {
      return
    }

    log.warning(lang.transl('_正在恢复抓取结果'))

    store.result = taskData.data
    store.date = taskData.date
    this.taskId = taskData.id

    // 恢复下载状态
    const taskStates = (await this.IDB.get(
      this.statesName,
      this.taskId,
      'id'
    )) as TaskStates

    if (taskStates) {
      downloadStates.replace(taskStates.states)
    }

    // 恢复完成
    log.success(lang.transl('_已恢复抓取结果'), 2)
    EVT.fire('resume')
  }

  private bindEvents() {
    // 抓取完成时，保存这次任务的数据
    window.addEventListener(EVT.list.crawlFinish, async () => {
      this.saveData()
    })

    // 当有文件下载完成或者跳过下载时，更新下载状态
    const saveEv = [EVT.list.downloadSuccess, EVT.list.skipDownload]
    saveEv.forEach((val) => {
      window.addEventListener(val, () => {
        this.needPutStates = true
      })
    })

    // 任务下载完毕时，以及停止任务时，清除这次任务的数据
    const clearDataEv = [EVT.list.downloadComplete, EVT.list.downloadStop]
    for (const ev of clearDataEv) {
      window.addEventListener(ev, async () => {
        this.clearData()
      })
    }

    // 切换页面时，重新检查恢复数据
    const restoreEvt = [EVT.list.pageSwitch, EVT.list.settingInitialized]
    restoreEvt.forEach((evt) => {
      window.addEventListener(evt, () => {
        this.restoreData()
      })
    })

    // 清空已保存的抓取结果
    window.addEventListener(EVT.list.clearSavedCrawl, () => {
      this.clearSavedCrawl()
    })
  }

  // 存储抓取结果
  private async saveData() {
    if (store.result.length === 0) {
      return
    }

    this.taskId = store.date.getTime()
    const url = this.getURL()

    // 首先检查这个网址下是否已经存在数据，如果有数据，则清除之前的数据，保持每个网址只有一份数据
    const taskData = (await this.IDB.get(
      this.dataName,
      url,
      'url'
    )) as TaskData | null

    if (taskData) {
      await this.IDB.delete(this.dataName, taskData.id)
      await this.IDB.delete(this.statesName, taskData.id)
    }

    // 如果此时本次任务已经完成，就不进行保存了
    if (downloadStates.downloadedCount() === store.result.length) {
      return
    }

    // 保存本次任务的数据
    log.warning(lang.transl('_正在保存抓取结果'))

    const resultData: TaskData = {
      id: this.taskId,
      url: url,
      data: store.result,
      date: store.date,
    }

    try {
      await this.IDB.add(this.dataName, resultData)
    } catch (error) {
      // 当存储失败时
      console.error(error)
      if (error.target && error.target.error && error.target.error.message) {
        const msg = error.target.error.message as string
        log.error('IndexedDB: ' + msg)
      }
    }

    // 保存 states 数据
    const statesData: TaskStates = {
      id: this.taskId,
      states: downloadStates.states,
    }

    this.IDB.add(this.statesName, statesData)

    log.success(lang.transl('_已保存抓取结果'), 2)
  }

  // 定时 put 下载状态
  private async regularPutStates() {
    window.setInterval(() => {
      if (this.needPutStates) {
        const statesData = {
          id: this.taskId,
          states: downloadStates.states,
        }
        this.needPutStates = false
        // 如果此时本次任务已经完成，就不进行保存了
        if (downloadStates.downloadedCount() === store.result.length) {
          return
        }
        this.IDB.put(this.statesName, statesData)
      }
    }, this.putStatesTime)
  }

  private async clearData() {
    if (!this.taskId) {
      return
    }

    // 下载完成时，清除这次任务储存的数据，需要使用保存的 taskId，而不是 URL
    // 因为用户在下载时可能切换了页面 URL，如果使用 URL 就会导致差找不到对应的数据
    const taskData = (await this.IDB.get(
      this.dataName,
      this.taskId,
      'id'
    )) as TaskData | null

    if (!taskData) {
      return
    }

    this.IDB.delete(this.dataName, this.taskId)
    this.IDB.delete(this.statesName, this.taskId)
  }

  // 清除过期的数据
  private async clearExired() {
    // 数据的过期时间，设置为 31 天。31*24*60*60*1000
    const expiryTime = 2678400000

    // 每隔一天检查一次数据是否过期
    const nowTime = new Date().getTime()
    let lastCheckTime = 0
    const storeName = 'lastCheckExired'
    const data = localStorage.getItem(storeName)
    if (data === null) {
      localStorage.setItem(storeName, lastCheckTime.toString())
    } else {
      lastCheckTime = Number.parseInt(data)
    }
    if (nowTime - lastCheckTime < 86400000) {
      return
    }
    localStorage.setItem(storeName, nowTime.toString())

    // 检查数据是否过期
    const callback = (item: IDBCursorWithValue | null) => {
      if (item) {
        const data = item.value as TaskData
        if (nowTime - data.date.getTime() > expiryTime) {
          this.IDB.delete(this.dataName, data.url)
          this.IDB.delete(this.statesName, data.id)
        }
        item.continue()
      }
    }

    this.IDB.openCursor(this.dataName, callback)
  }

  // 清空已保存的抓取结果
  private async clearSavedCrawl() {
    await Promise.all([
      this.IDB.clear(this.dataName),
      this.IDB.clear(this.statesName),
    ])
    toast.success(lang.transl('_数据清除完毕'))
  }

  // 处理本页面的 url
  private getURL() {
    return window.location.href.split('#')[0]
  }
}

new Resume()
