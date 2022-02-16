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
  formatedTime.month = raw.split(' ')[0].split('-')[1]
  formatedTime.day = raw.split(' ')[0].split('-')[2]
  return formatedTime
}


