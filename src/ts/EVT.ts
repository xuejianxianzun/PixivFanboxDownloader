type eventNames = keyof typeof EVT.list

// 管理自定义事件
class EVENT {
  private bindOnceFlagList: string[] = []

  // 只绑定某个事件一次，用于防止事件重复绑定
  // 通过 flag 确认是否是同一个事件
  // 可以执行多次，不会自动解绑
  public bindOnce(flag: string, targetEvt: string, evtFun: Function) {
    const query = this.bindOnceFlagList.includes(flag)
    if (!query) {
      this.bindOnceFlagList.push(flag)
      window.addEventListener(targetEvt, function (ev) {
        evtFun(ev)
      })
    }
  }

  public readonly list = {
    crawlStart: 'crawlStart',
    crawlFinish: 'crawlFinish',
    crawlEmpty: 'crawlEmpty',
    crawlError: 'crawlError',
    addResult: 'addResult',
    downloadStart: 'downloadStart',
    downloadPause: 'downloadPause',
    downloadStop: 'downloadStop',
    download: 'download',
    downloadSuccess: 'downloadSuccess',
    downloadError: 'downloadError',
    downloadComplete: 'downloadComplete',
    pageSwitch: 'pageSwitch',
    pageTypeChange: 'pageTypeChange',
    resetOption: 'resetOption',
    convertChange: 'convertChange',
    previewFileName: 'previewFileName',
    output: 'output',
    hideCenterPanel: 'hideCenterPanel',
    showCenterPanel: 'showCenterPanel',
    clearMultiple: 'clearMultiple',
    clearUgoira: 'clearUgoira',
    deleteWork: 'deleteWork',
    worksUpdate: 'worksUpdate',
    settingChange: 'settingChange',
    clickRightIcon: 'clickRightIcon',
    convertError: 'convertError',
    skipDownload: 'skipDownload',
    resetSettings: 'resetSettings',
    exportSettings: 'exportSettings',
    importSettings: 'importSettings',
    settingInitialized: 'settingInitialized',
    resetSettingsEnd: 'resetSettingsEnd',
    pageSwitchedTypeChange: 'pageSwitchedTypeChange',
    pageSwitchedTypeNotChange: 'pageSwitchedTypeNotChange',
    openCenterPanel: 'openCenterPanel',
    closeCenterPanel: 'closeCenterPanel',
    centerPanelOpened: 'centerPanelOpened',
    centerPanelClosed: 'centerPanelClosed',
    showMsg: 'showMsg',
    langChange: 'langChange',
    selectBG: 'selectBG',
    clearBG: 'clearBG',
    wrongSetting: 'wrongSetting',
    clearLog: 'clearLog',
    quickCrawl: 'quickCrawl',
    importDownloadRecord: 'importDownloadRecord',
    exportDownloadRecord: 'exportDownloadRecord',
    clearDownloadRecord: 'clearDownloadRecord',
    resume: 'resume',
    clearSavedCrawl: 'clearSavedCrawl',
  }

  public fire(type: eventNames, data: object | string | number | boolean = '') {
    const event = new CustomEvent(type, {
      detail: { data: data },
    })
    window.dispatchEvent(event)
  }
}
const EVT = new EVENT()
export { EVT }
