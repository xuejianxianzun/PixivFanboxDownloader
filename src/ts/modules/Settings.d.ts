export interface SettingsForm extends HTMLFormElement {
  image: HTMLInputElement
  music: HTMLInputElement
  video: HTMLInputElement
  compressed: HTMLInputElement
  ps: HTMLInputElement
  other: HTMLInputElement
  free: HTMLInputElement
  pay: HTMLInputElement
  feeSwitch: HTMLInputElement
  fee: HTMLInputElement
  idRangeSwitch: HTMLInputElement
  idRange: RadioNodeList
  idRangeInput: HTMLInputElement
  postDate: HTMLInputElement
  postDateStart: HTMLInputElement
  postDateEnd: HTMLInputElement
  saveLink: HTMLInputElement
  saveText: HTMLInputElement
  userSetName: HTMLInputElement
  fileNameSelect: HTMLSelectElement
  quietDownload: HTMLInputElement
  downloadThread: HTMLInputElement
  dateFormat: HTMLInputElement
}
