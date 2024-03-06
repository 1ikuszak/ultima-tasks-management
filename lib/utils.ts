import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function calculateDaysRemaining(deadline: Date | undefined) {
  if (!deadline) {
    return 0
  }

  const currentDate = new Date()
  currentDate.setHours(0, 0, 0, 0)
  const deadlineDate = new Date(deadline)
  deadlineDate.setHours(0, 0, 0, 0)

  const diff = deadlineDate.getTime() - currentDate.getTime()
  return Math.ceil(diff / (1000 * 60 * 60 * 24))
}

export function formatDate(dateString: string) {
  const date = new Date(dateString)
  return date.toLocaleDateString()
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
