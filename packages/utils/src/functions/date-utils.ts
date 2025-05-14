/* eslint-disable ts/no-require-imports */
import type { Dayjs } from 'dayjs'

const dayjs = require('dayjs')

type DateType = string | Date | Dayjs | number

export class DateUtils {
  static addMinutesFromNow(minutes: number): Date {
    return dayjs().add(minutes, 'minute').toDate()
  }

  static minutesPassedFromNow(date: DateType): number {
    const now = dayjs()
    const targetDate = dayjs(date)

    const diffInMinutes = now.diff(targetDate, 'minute')

    return diffInMinutes
  }

  static format(date: DateType, format: string = 'DD/MM/YYYY HH:mm:ss'): string {
    return dayjs(date).format(format)
  }
}
