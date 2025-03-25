"use client"

import dynamic from "next/dynamic"

const DynamicChart = dynamic(() => import("./dynamic-product-category-chart"), {
  ssr: false,
  loading: () => <div className="h-[300px] w-full flex items-center justify-center">Đang tải biểu đồ...</div>,
})

export default function ProductCategoryChart() {
  return <DynamicChart />
}

