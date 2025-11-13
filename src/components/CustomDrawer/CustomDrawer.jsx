"use client";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
  DialogOverlay,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { t } from "@/utils/i18n";

export default function CustomDrawer({
  title = "Ma’lumot",
  children,
  open,
  onOpenChange,
  showFooter = true,
  onSave,
  saveLabel = t("save"),
  closeLabel = t("close"),
  side = "right",
  size = "md",
  contacts = false,
  edit = false,
  Delete = false,
  path="",
  
}) {
  const sizeClasses = {
    sm: "sm:max-w-[300px]",
    md: "sm:max-w-[400px]",
    lg: "sm:max-w-[650px]",
    xl: "sm:max-w-[800px]",
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogOverlay className="fixed inset-0 bg-black/40 z-40" />
      <DialogContent
        className={cn(
          "fixed inset-y-0 z-50 w-full bg-background text-foreground shadow-lg transition-transform duration-300 ease-in-out data-[state=open]:translate-x-0 flex flex-col",
          side === "right" && "right-0 translate-x-full",
          side === "left" && "left-0 -translate-x-full",
          sizeClasses[size],
          "rounded-none"
        )}
        style={{
          borderRadius: 0,
          top: 0,
          left: side === "left" ? 0 : "auto",
          right: side === "right" ? 0 : "auto",
        }}
      >
        <DialogHeader className="p-3 border-b border-border">
          <DialogTitle className="text-base text-active font-medium">
            {title}
          </DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto p-0">{children}</div>

        {showFooter && (
          <DialogFooter className="p-3 border-t border-border flex justify-end gap-2">

             {Delete == true ?( <Button
                variant="outline"
                className=" border-none w-[50%] text-[#fff]  bg-[red] shadow-sm hover:shadow-lg transition-shadow duration-300 shadow-button"
                size="sm"
              >
                {t("delete")}
              </Button>) : ""}
             {contacts == true ?( <Button
                variant="outline"
                className=" border-none w-[50%] text-[#fff]  bg-button shadow-sm hover:shadow-lg transition-shadow duration-300 shadow-button"
                size="sm"
              >
                contacts
              </Button>) : ""}
              {edit == true ? (
                <Button
                path={path}
                variant="outline"
                className=" w-[50%] border-none text-[#fff] shadow-sm bg-icons hover:shadow-lg transition-shadow duration-300 shadow-icons"
                size="sm"
              >
                {t("edid")}
              </Button>
              ) : ""}
            <DialogClose asChild>
              <Button
                variant="outline"
                className="bg-[#F0F0F0] border-none shadow-sm hover:shadow-lg transition-shadow duration-300 shadow-button"
                size="sm"
              >
                {closeLabel}
              </Button>
            </DialogClose>
            {onSave && (
              <Button
                onClick={onSave}
                className="bg-[#F0F0F0] border-none shadow-sm hover:shadow-lg transition-shadow duration-300 shadow-button"
                size="sm"
              >
                {saveLabel}
              </Button>
            )}
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
}
