"use client"

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip, Legend } from "recharts"

const data = [
  { name: "Điện tử", value: 45 },
  { name: "Thực phẩm", value: 25 },
  { name: "Quần áo", value: 15 },
  { name: "Đồ gia dụng", value: 10 },
  { name: "Khác", value: 5 },
]

const COLORS = ["#4f46e5", "#f97316", "#10b981", "#f43f5e", "#8b5cf6"]

export default function DynamicProductCategoryChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={100}
          fill="#8884d8"
          dataKey="value"
          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip formatter={(value) => `${value}%`} />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  )
}

