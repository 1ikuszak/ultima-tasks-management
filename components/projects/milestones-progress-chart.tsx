'use client'

import { Milestone } from '@/app/data/schema'
import { calculateDeviation, formatDateString } from '@/lib/utils'
import React from 'react'
import {
  Area,
  AreaChart,
  DotProps,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
} from 'recharts'
import { Icons } from '../icons'
import { LucideProps } from 'lucide-react'

type ChartMilestone = Milestone & {
  deviation: number
  offsetY: number
}

interface milestonesProgressChartProps {
  milestones: Milestone[]
  project_start: string | Date
  project_end: string | Date
}

const calculateGradientOffset = (chartData: ChartMilestone[]) => {
  const dataMax = Math.max(...chartData.map((i) => i.offsetY))
  const dataMin = Math.min(...chartData.map((i) => i.offsetY))
  if (dataMax <= 0) {
    return 0
  }
  if (dataMin >= 0) {
    return 1
  }
  return dataMax / (dataMax - dataMin)
}

const CheckedIcon = (props: LucideProps) => <Icons.circleCheck {...props} />
const UnCheckedIcon = (props: LucideProps) => <Icons.circleDashed {...props} />

interface CustomDotProps extends DotProps {
  payload?: { checked: boolean }
}

const CustomDot: React.FC<CustomDotProps> = ({
  cx = 0,
  cy = 0,
  payload = { checked: false },
}) => {
  return payload.checked ? (
    <CheckedIcon x={cx - 10} y={cy - 10} width={20} height={20} />
  ) : (
    <UnCheckedIcon x={cx - 6} y={cy - 6} width={12} height={12} />
  )
}

export function MilestonesProgressChart({
  milestones,
  project_start,
  project_end,
}: milestonesProgressChartProps) {
  const prepareChartData = () => {
    let cumulativeDeviation = 0
    const chartMilestones: ChartMilestone[] = milestones.map((milestone) => {
      const deviation =
        milestone.deadline && milestone.completed
          ? calculateDeviation(milestone.completed, milestone.deadline)
          : 0
      cumulativeDeviation += deviation
      return { ...milestone, deviation, offsetY: cumulativeDeviation }
    })

    return [
      {
        title: 'Project Start',
        deviation: 0,
        checked: false,
        offsetY: 0,
        completed:
          project_start instanceof Date
            ? project_start.toISOString()
            : project_start,
        deadline:
          project_start instanceof Date
            ? project_start.toISOString()
            : project_start,
        project_id: milestones[0].project_id,
      },
      ...chartMilestones,
      {
        title: 'Project End',
        deviation: 0,
        checked: false,
        offsetY: cumulativeDeviation,
        completed:
          project_end instanceof Date ? project_end.toISOString() : project_end,
        deadline:
          project_end instanceof Date ? project_end.toISOString() : project_end,
        project_id: milestones[0].project_id,
      },
    ]
  }

  const chartData = prepareChartData()
  const gradientOffset = calculateGradientOffset(chartData)

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        data={chartData}
        margin={{ bottom: 12, left: 10, right: 10, top: 12 }}
      >
        <Tooltip
          content={({ active, payload }) => {
            if (active && payload && payload.length) {
              const data = payload[0].payload
              return (
                <div className="p-2 border flex flex-col gap-1 rounded-lg shadow-sm bg-background">
                  <div className="flex gap-2">
                    <div className="text-xs font-bold">{data.title}</div>
                    <div className="text-xs font-bold">{data.deviation}</div>
                  </div>
                  <div>
                    <span className="text-xs">
                      date offset : {data.offsetY}
                    </span>
                  </div>
                  <div>
                    <span className="text-xs">
                      completed:{' '}
                      {data.completed
                        ? formatDateString(data.completed)
                        : 'in progress'}
                    </span>
                  </div>
                  <div>
                    <span className="text-xs">
                      deadline: {formatDateString(data.deadline)}
                    </span>
                  </div>
                </div>
              )
            }

            return null
          }}
        />
        <defs>
          <linearGradient id="splitColor" x1="0" y1="0" x2="0" y2="1">
            <stop offset={gradientOffset} stopColor="#2563eb" stopOpacity={1} />{' '}
            <stop offset={gradientOffset} stopColor="#64748b" stopOpacity={1} />{' '}
          </linearGradient>
        </defs>
        <Area
          type="monotone"
          dataKey="offsetY"
          dot={<CustomDot />}
          activeDot={{
            r: 8,
            style: { fill: 'var(--primary)', opacity: 0.25 },
          }}
          fill="url(#splitColor)"
        />
        <ReferenceLine
          y={0}
          style={{ stroke: 'var(--primary)' }}
          className="stroke stroke-muted-foreground"
          strokeDasharray="3 3"
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}
