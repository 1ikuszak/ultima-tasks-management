'use client'
import React from 'react'
import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

const data = [
  {
    name: 'Jan',
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: 'Feb',
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  // {
  //   name: 'Mar',
  //   total: Math.floor(Math.random() * 5000) + 1000,
  // },
  {
    name: 'Apr',
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  // {
  //   name: 'May',
  //   total: Math.floor(Math.random() * 5000) + 1000,
  // },
  {
    name: 'Jun',
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  // {
  //   name: 'Jul',
  //   total: Math.floor(Math.random() * 5000) + 1000,
  // },
  {
    name: 'Aug',
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  // {
  //   name: 'Sep',
  //   total: Math.floor(Math.random() * 5000) + 1000,
  // },
  {
    name: 'Oct',
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  // {
  //   name: 'Nov',
  //   total: Math.floor(Math.random() * 5000) + 1000,
  // },
  {
    name: 'Dec',
    total: Math.floor(Math.random() * 5000) + 1000,
  },
]

export function KpiChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={data}
        margin={{ bottom: -10, left: -20, right: 10, top: 10 }}
      >
        {/* <XAxis
          dataKey="name"
          stroke="#888888"
          fontSize={8}
          tickLine={false}
          axisLine={false}
        /> */}
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value}`}
        />
        <Tooltip
          content={({ active, payload, label }) => {
            if (active && payload && payload.length) {
              return (
                <div className="p-2 border flex items-center gap-2 rounded-lg shadow-sm bg-white">
                  <div className="text-xs font-medium text-gray-500">{`${label}`}</div>
                  <div className="text-sm font-bold">{`${payload[0].value}`}</div>
                </div>
              )
            }

            return null
          }}
        />
        <Line
          type="monotone"
          strokeWidth={2}
          dataKey="total"
          activeDot={{
            r: 8,
            style: { fill: 'var(--primary)', opacity: 0.25 },
          }}
          className="stroke stroke-black"
          // className="stroke stroke-violet_solarized"
          style={{ stroke: 'var(--primary)' }}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}
