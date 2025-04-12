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

interface DeleteConfirmationProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  product: any
}

export default function DeleteConfirmation({ open, onOpenChange, product }: DeleteConfirmationProps) {
  const { toast } = useToast()

  const handleDelete = () => {
    onOpenChange(false)
    toast({
      title: "Xóa sản phẩm thành công",
      description: `Sản phẩm ${product.name} đã được xóa khỏi hệ thống.`,
      duration: 3000,
    })
  }

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Bạn có chắc chắn muốn xóa?</AlertDialogTitle>
          <AlertDialogDescription>
            Hành động này sẽ xóa vĩnh viễn sản phẩm <span className="font-medium">{product.name}</span> khỏi hệ thống và
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

