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

  static isBeforeNow(date: DateType): boolean {
    const now = dayjs()
    const targetDate = dayjs(date)
    return targetDate.isBefore(now)
  }

  static secondsUntil(date: DateType): number {
    const now = dayjs()
    const targetDate = dayjs(date)

    if (targetDate.isBefore(now)) {
      return 0
    }

    const diffInSeconds = targetDate.diff(now, 'second')
    return diffInSeconds
  }

  static format(date: DateType, format: string = 'DD/MM/YYYY HH:mm:ss'): string {
    return dayjs(date).format(format)
  }

  static formatTimeAgo(dateType: DateType): string {
    const date = dayjs(dateType)
    const now = dayjs()

    const seconds = now.diff(date, 'second')

    if (seconds < 60) {
      return 'just now'
    }

    const minutes = Math.floor(seconds / 60)
    if (minutes < 60) {
      return `${minutes}m`
    }

    const hours = Math.floor(minutes / 60)
    if (hours < 24) {
      return `${hours}h`
    }

    const days = Math.floor(hours / 24)
    if (days < 30) {
      return `${days}d`
    }

    const months = Math.floor(days / 30)
    if (months < 12) {
      return `${months}mo`
    }

    const years = Math.floor(months / 12)
    return `${years}y`
  }
}
