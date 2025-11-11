import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog"



export default function ChangeModal({}) {
  return (
    <>
    
    <Dialog open={isOpen} onOpenChange={(open) => (open ? onOpen() : onClose())}>
  <DialogContent className="max-w-md">
    <DialogHeader>
      <DialogTitle>{t("edid")}</DialogTitle>
      <DialogDescription>
        {wiewProduct?.name || "Mahsulot ma’lumotlari"}
      </DialogDescription>
    </DialogHeader>

    <p className="my-2 text-sm text-gray-600">
      Lorem ipsum dolor sit amet consectetur adipisicing elit.
    </p>

    <DialogFooter>
      <DialogClose asChild>
        <Button variant="outline">{t("close")}</Button>
      </DialogClose>
    </DialogFooter>
  </DialogContent>
</Dialog>
    

    </>
  )
}
