export interface SettingsForm extends HTMLFormElement {
  setWantPage: HTMLInputElement
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
  postDateInput: HTMLInputElement
  postRange: RadioNodeList
  saveLink: HTMLInputElement
  userSetName: HTMLInputElement
  fileNameSelect: HTMLSelectElement
  quietDownload: HTMLInputElement
  downloadThread: HTMLInputElement
}
