"use client"

import type React from "react"
import dynamic from "next/dynamic"

// Dynamic imports with ssr: false in a client component
const DynamicSidebar = dynamic(() => import("@/components/sidebar"), {
  ssr: false,
  loading: () => <div className="w-64 border-r bg-card" />,
})

const DynamicHeader = dynamic(() => import("@/components/header"), {
  ssr: false,
  loading: () => <div className="h-16 border-b bg-background" />,
})

interface LayoutWrapperProps {
  children: React.ReactNode
}

export default function LayoutWrapper({ children }: LayoutWrapperProps) {
  return (
    <div className="flex h-screen overflow-hidden">
      <DynamicSidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <DynamicHeader />
        <div className="flex-1 overflow-y-auto bg-background p-4 md:p-6">{children}</div>
      </div>
    </div>
  )
}

