'use client'

import { Milestone } from '@/app/data/schema'
import { calculateDeviation, formatDateString } from '@/lib/utils'
import React from 'react'
import {
  Area,
  AreaChart,
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
} from 'recharts'

type ChartMilestone = Milestone & {
  deviation: number
  offsetY: number
}

interface milestonesProgressChartProps {
  milestones: Milestone[]
  project_start: string | Date
  project_end: string | Date
}

type ChartDataItem = {
  offsetY: number
}

const calculateGradientOffset = (chartData: ChartDataItem[]) => {
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

export function MilestonesProgressChart({
  milestones,
  project_start,
  project_end,
}: milestonesProgressChartProps) {
  let cumulativeDeviation = 0
  const chartMilestones: ChartMilestone[] = milestones.map((milestone) => {
    const deviation =
      milestone.deadline && milestone.completed
        ? calculateDeviation(milestone.completed, milestone.deadline)
        : 0
    cumulativeDeviation += deviation
    return {
      ...milestone,
      deviation: deviation,
      offsetY: cumulativeDeviation,
    }
  })

  // Add project start and end points
  const startAndEndPoints = [
    {
      title: 'Project Start',
      deviation: 0,
      offsetY: 0,
      completed:
        project_start instanceof Date
          ? project_start.toISOString()
          : project_start,
      deadline:
        project_start instanceof Date
          ? project_start.toISOString()
          : project_start,
    },
    {
      title: 'Project End',
      deviation: 0,
      offsetY: cumulativeDeviation, // Reflects the final cumulative deviation at project end
      completed:
        project_end instanceof Date ? project_end.toISOString() : project_end,
      deadline:
        project_end instanceof Date ? project_end.toISOString() : project_end,
    },
  ]

  const chartData = [
    startAndEndPoints[0],
    ...chartMilestones,
    startAndEndPoints[1],
  ]
  const off = calculateGradientOffset(chartData)
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        data={chartData}
        margin={{ bottom: 10, left: 10, right: 10, top: 10 }}
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
        {/* <Line
          type="monotone"
          strokeWidth={2}
          dataKey="offsetY"
          activeDot={{
            r: 8,
            style: { fill: 'var(--primary)', opacity: 0.25 },
          }}
          className="stroke stroke-primary"
          style={{ stroke: 'var(--primary)' }}
        /> */}
        <defs>
          <linearGradient id="splitColor" x1="0" y1="0" x2="0" y2="1">
            <stop offset={off} stopColor="red" stopOpacity={1} />{' '}
            {/* Example of direct color usage */}
            <stop
              offset={off}
              style={{ stopColor: 'var(--destructive)' }}
              stopOpacity={1}
            />{' '}
            {/* Corrected usage of CSS variable */}
          </linearGradient>
        </defs>
        <Area
          type="monotone"
          dataKey="offsetY"
          stroke="#000"
          fill="url(#splitColor)"
        />
        <ReferenceLine
          y={0}
          style={{ stroke: 'var(--primary)' }}
          className="stroke stroke-muted-foreground"
          strokeDasharray="3 3"
        />
        <ReferenceLine
          x={0}
          style={{ stroke: 'var(--primary)' }}
          className="stroke stroke-muted-foreground"
          strokeDasharray="3 3"
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}
