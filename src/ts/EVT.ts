type eventNames = keyof typeof EVT.list

// 管理自定义事件
class EVENT {
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
    downloadSucccess: 'downloadSucccess',
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
    destroy: 'destroy',
    convertError: 'convertError',
    skipSaveFile: 'skipSaveFile',
    resetSettings: 'resetSettings',
    exportSettings: 'exportSettings',
    importSettings: 'importSettings',
    settingInitialized: 'settingInitialized',
    resetSettingsEnd: 'resetSettingsEnd',
    pageSwitchedTypeChange:'pageSwitchedTypeChange',
    pageSwitchedTypeNotChange:'pageSwitchedTypeNotChange',
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
