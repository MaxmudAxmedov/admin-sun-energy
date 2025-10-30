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

export default function CustomDrawer({
    title = "Ma’lumot",
    children,
    open,
    onOpenChange,
    showFooter = true,
    onSave,
    saveLabel = "Saqlash",
    closeLabel = "Yopish",
    side = "right",
    size = "md",
}) {
    const sizeClasses = {
        sm: "sm:max-w-[300px]",
        md: "sm:max-w-[400px]",
        lg: "sm:max-w-[600px]",
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
                    <DialogTitle className="text-base font-medium">
                        {title}
                    </DialogTitle>
                </DialogHeader>

                <div className="flex-1 overflow-y-auto p-0">{children}</div>

                {showFooter && (
                    <DialogFooter className="p-3 border-t border-border flex justify-end gap-2">
                        <DialogClose asChild>
                            <Button variant="outline" size="sm">
                                {closeLabel}
                            </Button>
                        </DialogClose>
                        {onSave && (
                            <Button onClick={onSave} size="sm">
                                {saveLabel}
                            </Button>
                        )}
                    </DialogFooter>
                )}
            </DialogContent>
        </Dialog>
    );
}
