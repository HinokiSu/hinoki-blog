interface IFormatedTimeHasMonthDay {
  month: string
  day: string
}
//
/**
 * @description '2022-2-1 12:00' --format-> {month: '2',day: '1'}
 * @param raw raw date, example: '2022-2-1 12:00'
 * @returns An object that has month and day
 */
export const timeHasMonthDay = (raw: string): IFormatedTimeHasMonthDay => {
  const formatedTime = <IFormatedTimeHasMonthDay>{
    month: '',
    day: '',
  }
  const month = raw.split(' ')[0].split('-')[1]
  formatedTime.day = raw.split(' ')[0].split('-')[2]
  const tMonth = month.split('')
  if (tMonth[0] === '0') {
    formatedTime.month = tMonth[1]
  } else {
    formatedTime.month = month
  }
  return formatedTime
}
