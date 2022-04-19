export class Debounce {
  private timer: any = ''
  private debounce(data?: any) {
    let that = this
    if (this.timer) {
      clearTimeout(this.timer)
    }
    this.timer = setTimeout(function () {
      //写你需要防抖处理的事件
      // console.log('输入')
      that.timer = undefined
    }, 1000)
  }
}
