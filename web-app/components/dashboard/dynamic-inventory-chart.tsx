"use client"

import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const data = [
  {
    name: "01/06",
    "Nhập kho": 4000,
    "Xuất kho": 2400,
  },
  {
    name: "05/06",
    "Nhập kho": 3000,
    "Xuất kho": 1398,
  },
  {
    name: "10/06",
    "Nhập kho": 2000,
    "Xuất kho": 9800,
  },
  {
    name: "15/06",
    "Nhập kho": 2780,
    "Xuất kho": 3908,
  },
  {
    name: "20/06",
    "Nhập kho": 1890,
    "Xuất kho": 4800,
  },
  {
    name: "25/06",
    "Nhập kho": 2390,
    "Xuất kho": 3800,
  },
  {
    name: "30/06",
    "Nhập kho": 3490,
    "Xuất kho": 4300,
  },
]

export default function DynamicInventoryChart() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="Nhập kho" fill="#4f46e5" />
        <Bar dataKey="Xuất kho" fill="#f97316" />
      </BarChart>
    </ResponsiveContainer>
  )
}

