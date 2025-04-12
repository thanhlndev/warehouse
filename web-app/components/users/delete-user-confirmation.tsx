"use client"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { useToast } from "@/components/ui/use-toast"

interface DeleteUserConfirmationProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  user: any
}

export default function DeleteUserConfirmation({ open, onOpenChange, user }: DeleteUserConfirmationProps) {
  const { toast } = useToast()

  const handleDelete = () => {
    onOpenChange(false)
    toast({
      title: "Xóa người dùng thành công",
      description: `Người dùng ${user.name} đã được xóa khỏi hệ thống.`,
      duration: 3000,
    })
  }

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Bạn có chắc chắn muốn xóa?</AlertDialogTitle>
          <AlertDialogDescription>
            Hành động này sẽ xóa vĩnh viễn người dùng <span className="font-medium">{user.name}</span> khỏi hệ thống và
            không thể khôi phục.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Hủy</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            Xóa
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

