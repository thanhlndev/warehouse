"use client"

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const data = [
  {
    name: "Tháng 1",
    value: 2100000000,
  },
  {
    name: "Tháng 2",
    value: 2200000000,
  },
  {
    name: "Tháng 3",
    value: 2150000000,
  },
  {
    name: "Tháng 4",
    value: 2300000000,
  },
  {
    name: "Tháng 5",
    value: 2280000000,
  },
  {
    name: "Tháng 6",
    value: 2400000000,
  },
]

export default function DynamicInventoryValueChart() {
  const formatYAxis = (value: number) => {
    if (value >= 1000000000) {
      return `${(value / 1000000000).toFixed(1)} tỷ`
    }
    if (value >= 1000000) {
      return `${(value / 1000000).toFixed(0)} tr`
    }
    return value
  }

  return (
    <ResponsiveContainer width="100%" height={350}>
      <LineChart data={data}>
        <XAxis dataKey="name" />
        <YAxis tickFormatter={formatYAxis} />
        <Tooltip
          formatter={(value: number) => {
            return [`${(value / 1000000000).toFixed(2)} tỷ đ`, "Giá trị"]
          }}
        />
        <Line type="monotone" dataKey="value" stroke="#4f46e5" strokeWidth={2} />
      </LineChart>
    </ResponsiveContainer>
  )
}

