import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowDown, ArrowUp, Clock } from "lucide-react"

export default function RecentActivities() {
  const activities = [
    {
      id: 1,
      type: "import",
      product: "Laptop Dell XPS 13",
      quantity: 20,
      user: "Nguyễn Văn A",
      time: "10:30 AM, 30/06/2023",
    },
    {
      id: 2,
      type: "export",
      product: "Màn hình Dell 27 inch",
      quantity: 5,
      user: "Trần Thị B",
      time: "11:45 AM, 30/06/2023",
    },
    {
      id: 3,
      type: "import",
      product: "Bàn phím cơ Logitech",
      quantity: 50,
      user: "Lê Văn C",
      time: "02:15 PM, 30/06/2023",
    },
    {
      id: 4,
      type: "export",
      product: "Chuột không dây Logitech",
      quantity: 30,
      user: "Phạm Thị D",
      time: "03:30 PM, 30/06/2023",
    },
    {
      id: 5,
      type: "import",
      product: "Tai nghe Sony WH-1000XM4",
      quantity: 15,
      user: "Hoàng Văn E",
      time: "04:45 PM, 30/06/2023",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Hoạt động gần đây</CardTitle>
        <CardDescription>Các hoạt động nhập xuất kho trong 24 giờ qua</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start gap-4 rounded-lg border p-3">
              <div className={`rounded-full p-2 ${activity.type === "import" ? "bg-green-100" : "bg-orange-100"}`}>
                {activity.type === "import" ? (
                  <ArrowDown className={`h-4 w-4 text-green-600`} />
                ) : (
                  <ArrowUp className={`h-4 w-4 text-orange-600`} />
                )}
              </div>
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium leading-none">{activity.product}</p>
                  <Badge variant={activity.type === "import" ? "outline" : "secondary"}>
                    {activity.type === "import" ? "Nhập kho" : "Xuất kho"}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">Số lượng: {activity.quantity}</p>
                <div className="flex items-center pt-2 text-xs text-muted-foreground">
                  <Clock className="mr-1 h-3 w-3" />
                  <span>{activity.time}</span>
                  <span className="mx-1">•</span>
                  <span>{activity.user}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

