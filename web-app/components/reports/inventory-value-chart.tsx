"use client"

import dynamic from "next/dynamic"

const DynamicChart = dynamic(() => import("./dynamic-inventory-value-chart"), {
  ssr: false,
  loading: () => <div className="h-[350px] w-full flex items-center justify-center">Đang tải biểu đồ...</div>,
})

export default function InventoryValueChart() {
  return <DynamicChart />
}

