"use client"

import dynamic from 'next/dynamic'

const ActivityLogsContent = dynamic(() => import('./activity-logs-content'), {
  ssr: false,
  loading: () => <div className="flex items-center justify-center h-screen">Đang tải...</div>
})

export default function ActivityLogsPage() {
  return <ActivityLogsContent />
}

