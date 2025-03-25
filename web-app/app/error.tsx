"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center gap-4 text-center">
      <h2 className="text-2xl font-bold">Đã xảy ra lỗi!</h2>
      <p className="text-muted-foreground">Đã có lỗi xảy ra khi tải trang này.</p>
      <Button onClick={() => reset()}>Thử lại</Button>
    </div>
  )
}

