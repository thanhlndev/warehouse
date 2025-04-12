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

interface DeleteSupplierConfirmationProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  supplier: any
}

export default function DeleteSupplierConfirmation({ open, onOpenChange, supplier }: DeleteSupplierConfirmationProps) {
  const { toast } = useToast()

  const handleDelete = () => {
    onOpenChange(false)
    toast({
      title: "Xóa nhà cung cấp thành công",
      description: `Nhà cung cấp ${supplier.name} đã được xóa khỏi hệ thống.`,
      duration: 3000,
    })
  }

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Bạn có chắc chắn muốn xóa?</AlertDialogTitle>
          <AlertDialogDescription>
            Hành động này sẽ xóa vĩnh viễn nhà cung cấp <span className="font-medium">{supplier.name}</span> khỏi hệ
            thống và không thể khôi phục.
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

