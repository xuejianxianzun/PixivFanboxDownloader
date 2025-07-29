import { EVT } from '../EVT'
import { lang } from '../Lang'
import { log } from '../Log'
import { settings } from '../setting/Settings'
import { DonwloadSuccessData } from './DownloadType'
import { IndexedDB } from '../utils/IndexedDB'
import { Utils } from '../utils/Utils'
import { toast } from '../Toast'
import { msgBox } from '../MsgBox'
import { Result } from '../StoreType'

// 使用文件的 url 作为 key。因为抓取结果里的其他字段不具有唯一性
interface Record {
  url: string
}

// 保存下载记录，用来判断重复下载的文件
class DownloadRecord {
  constructor() {
    this.IDB = new IndexedDB()
    this.init()
  }

  private IDB: IndexedDB
  private readonly DBName = 'DLRecord'
  private readonly DBVer = 1
  private readonly storeName = 'record'

  private async init() {
    await this.initDB()
    this.bindEvents()
  }

  // 初始化数据库，获取数据库对象
  private async initDB() {
    // 在升级事件里创建表和索引
    const onUpdate = (db: IDBDatabase) => {
      if (!db.objectStoreNames.contains(this.storeName)) {
        const store = db.createObjectStore(this.storeName, { keyPath: 'url' })
        store.createIndex('url', 'url', { unique: true })
      }
    }

    return new Promise<IDBDatabase>(async (resolve, reject) => {
      resolve(await this.IDB.open(this.DBName, this.DBVer, onUpdate))
    })
  }

  /**去掉文件 url 开头的协议和域名部分，以减少索引字段的长度 */
  private removeHttp(url: string) {
    // url 如：
    // https://downloads.fanbox.cc/files/post/1745346/kDCd7V1aaHQPltLU2ZTxxfuX.jpeg
    return url.replace('https://downloads.fanbox.cc/', '')
  }

  private bindEvents() {
    // 当有文件下载完成时，存储这个任务的记录
    window.addEventListener(EVT.list.downloadSuccess, (ev: CustomEventInit) => {
      const successData = ev.detail.data as DonwloadSuccessData
      // 如果是 Blob URL 则不保存这个下载记录
      // 如果文件名异常，不保存这个下载记录，以便用户之后重新下载这个文件
      if (!successData.url.startsWith('blob') && !successData.uuid) {
        this.addRecord({
          url: this.removeHttp(successData.url),
        })
      }
    })

    // 导入下载记录的按钮
    {
      const btn = document.querySelector('#importDownloadRecord')
      if (btn) {
        btn.addEventListener('click', () => {
          EVT.fire('importDownloadRecord')
        })
      }
    }

    // 监听导入下载记录的事件
    window.addEventListener(EVT.list.importDownloadRecord, () => {
      this.importRecordFromJSON()
    })

    // 导出下载记录的按钮
    {
      const btn = document.querySelector('#exportDownloadRecord')
      if (btn) {
        btn.addEventListener('click', () => {
          EVT.fire('exportDownloadRecord')
        })
      }
    }

    // 监听导出下载记录的事件
    window.addEventListener(EVT.list.exportDownloadRecord, () => {
      this.exportRecord()
    })

    // 清空下载记录的按钮
    {
      const btn = document.querySelector('#clearDownloadRecord')
      if (btn) {
        btn.addEventListener('click', () => {
          EVT.fire('clearDownloadRecord')
        })
      }
    }

    // 监听清空下载记录的事件
    window.addEventListener(EVT.list.clearDownloadRecord, () => {
      this.clearRecords()
    })
  }

  // 添加一条下载记录
  private async addRecord(record: Record) {
    this.IDB.put(this.storeName, record)
  }

  /** 检查一个作品是否是重复下载
   *
   * 返回值 true 表示重复，false 表示不重复
   */
  public async checkDeduplication(result: Result) {
    return new Promise<boolean>(async (resolve, reject) => {
      // 如果未启用去重，直接返回不重复
      if (!settings.deduplication) {
        return resolve(false)
      }
      // 在数据库进行查找
      const data = (await this.IDB.get(
        this.storeName,
        this.removeHttp(result.url)
      )) as Record | null
      return resolve(!!data)
    })
  }

  // 清空下载记录
  private clearRecords() {
    this.IDB.clear(this.storeName)
    toast.success(lang.transl('_下载记录已清除'))
  }

  // 导出下载记录
  private async exportRecord() {
    const record: Record[] = (await this.IDB.getAll(this.storeName)) as Record[]
    const blob = Utils.json2BlobSafe(record)
    const url = URL.createObjectURL(blob)
    Utils.downloadFile(
      url,
      `record-${Utils.replaceUnsafeStr(new Date().toLocaleString())}.json`
    )

    toast.success(lang.transl('_导出成功'))
  }

  // 导入下载记录
  private async importRecord(record: Record[]) {
    log.warning(lang.transl('_导入下载记录'))
    log.log(record.length.toString())

    await this.IDB.batchAddData(this.storeName, record, 'url')

    log.success(lang.transl('_导入成功'))
    toast.success(lang.transl('_导入成功'))
    msgBox.success(lang.transl('_导入成功'), {
      title: lang.transl('_导入下载记录'),
    })
  }

  // 从 json 文件导入
  private async importRecordFromJSON() {
    const record = (await Utils.loadJSONFile().catch((err) => {
      msgBox.error(err)
      return
    })) as Record[]

    if (!record) {
      return
    }

    // 判断格式是否符合要求
    if (Array.isArray(record) === false || record[0].url === undefined) {
      return msgBox.error(lang.transl('_格式错误'))
    }

    this.importRecord(record)
  }
}

const downloadRecord = new DownloadRecord()
export { downloadRecord }
