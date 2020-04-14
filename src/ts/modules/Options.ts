import { form } from './Settings'

// 操作 Setting 表单的选项区域
class Options {
  constructor() {
    this.allOption = form.querySelectorAll('.option')
  }

  private allOption: NodeListOf<HTMLElement>

  // 使用编号获取指定选项的元素
  private getOption(no: number) {
    for (const option of this.allOption) {
      if (option.dataset.no === no.toString()) {
        return option
      }
    }
    throw `Not found this option: ${no}`
  }

  // 显示或隐藏指定的选项
  private setOptionDisplay(no: number[], display: string) {
    for (const number of no) {
      this.getOption(number).style.display = display
    }
  }

  // 显示所有选项
  // 在切换不同页面时使用
  public showAllOption() {
    for (const el of this.allOption) {
      el.style.display = 'block'
    }
  }

  // 隐藏指定的选项。参数是数组，传递设置项的编号。
  public hideOption(no: number[]) {
    this.setOptionDisplay(no, 'none')
  }

  // 显示指定的选项。因为页面无刷新加载，所以一些选项被隐藏后，可能需要再次显示
  public showOption(no: number[]) {
    this.setOptionDisplay(no, 'block')
  }
}

const options = new Options()
export { options }
