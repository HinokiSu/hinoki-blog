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
