//
/**
 * @description '2022-2-1 12:00' --format-> '2022年2月1日'
 * @param raw raw date, example: '2022-2-1 12:00'
 * @returns An object that has month and day
 */
export const timeFormatToCNTime = (raw: string): string => {
  let formatedTime = ''
  const time = raw.split(' ')[0].split('-')
  formatedTime = `${time[0]}年${time[1]}月${time[2]}日`
  return formatedTime
}

import dayjs from 'dayjs'
import { Ref } from 'vue'

/**
 * 获取实时时间
 * @param val Proxy 实时的时间
 * @param delay 实时时间的更新间隔
 * @param format 时间的格式,default:'YYYY-MM-DD hh:mm:ss'
 * @returns intervalId，用于清除定时器
 */
export function getRealTime(val: Ref, delay: number, format: string = 'YYYY-MM-DD HH:mm') {
  return setInterval(
    (val: { value: string }, format: string) => {
      const time = dayjs().format(format)
      val.value = `${timeFormatToCNTime(time)} ${time.split(' ')[1]}`
    },
    delay,
    val,
    format
  )
}
