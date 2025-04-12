"use client"

import dynamic from "next/dynamic"

// Sử dụng dynamic import với ssr: false để đảm bảo component chỉ được render ở client
const DynamicChart = dynamic(() => import("./dynamic-inventory-chart"), {
  ssr: false,
  loading: () => <div className="h-[350px] w-full flex items-center justify-center">Đang tải biểu đồ...</div>,
})

export default function InventoryChart() {
  return <DynamicChart />
}

