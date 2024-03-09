import { Milestone } from '@/app/data/schema'
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function calculateDaysLeft(deadline: Date | string): number {
  const today = new Date()
  const deadlineDate = new Date(deadline)
  const timeDiff = deadlineDate.getTime() - today.getTime()
  const daysLeft = Math.ceil(timeDiff / (1000 * 3600 * 24))
  return daysLeft > 0 ? daysLeft : 0
}

export function calculateDeviation(
  start_date: Date | string,
  end_date: Date | string
): number {
  if (!start_date || !end_date) return 0 // Return 0 if any date is not provided
  const startDate = new Date(start_date)
  const endDate = new Date(end_date)
  // Set hours to 0 to compare only dates, ignoring times
  startDate.setHours(0, 0, 0, 0)
  endDate.setHours(0, 0, 0, 0)
  const diff = endDate.getTime() - startDate.getTime()
  return Math.ceil(diff / (1000 * 60 * 60 * 24))
}

export function calculateDaysBetween(
  start_date: Date | string,
  end_date: Date | string
): number {
  if (!start_date || !end_date) return 0 // Return 0 if any date is not provided
  const startDate = new Date(start_date)
  const endDate = new Date(end_date)
  // Set hours to 0 to compare only dates, ignoring times
  startDate.setHours(0, 0, 0, 0)
  endDate.setHours(0, 0, 0, 0)
  if (endDate < startDate) return 0 // Ensure start_date is before end_date
  const diff = endDate.getTime() - startDate.getTime()
  return Math.ceil(diff / (1000 * 60 * 60 * 24))
}

export function formatDate(dateString: Date | string | undefined | null) {
  if (dateString) {
    const date = new Date(dateString)
    return date.toLocaleDateString()
  }
}

export function formatDateString(date: Date | string | undefined): string {
  if (date instanceof Date) {
    return date.toDateString()
  } else if (typeof date === 'string') {
    const parsedDate = new Date(date)
    if (!isNaN(parsedDate.getTime())) {
      return parsedDate.toDateString()
    }
  }
  return ''
}

export function cipher(name: string): string {
  const cleanName = name
    .trim()
    .replace(/[^a-zA-Z\s]+/g, '')
    .toUpperCase()

  const words = cleanName.split(/\s+/).filter(Boolean)

  let initials = ''
  if (words.length === 1 && words[0].length > 1) {
    initials = words[0].substring(0, 2)
  } else if (words.length >= 2) {
    initials = words[0][0] + words[1][0]
  } else {
    initials = words[0] || ''
  }

  return initials
}

export function getCurrentMilestone(milestones: Milestone[]) {
  return milestones.find((milestone) => !milestone.checked)
}
