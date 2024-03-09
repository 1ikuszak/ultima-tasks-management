import { calculateDaysBetween, calculateDaysLeft } from '@/lib/utils'
import { Progress } from './ui/progress'

interface timeProgressBarProps {
  start_date: string | Date
  end_date: string | Date
}

export function TimeProgressBar({
  start_date,
  end_date,
}: timeProgressBarProps) {
  const daysLeft = calculateDaysLeft(end_date)
  const totalDuration = calculateDaysBetween(start_date, end_date)
  const timeBasedProgressPercentage =
    totalDuration > 0 ? 100 - (daysLeft / totalDuration) * 100 : 100

  const clampedProgressPercentage = Math.min(
    Math.max(timeBasedProgressPercentage, 0),
    100
  )
  return <Progress className="h-1.5" value={clampedProgressPercentage} />
}
