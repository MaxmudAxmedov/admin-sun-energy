"use client";
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogOverlay,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { t } from "@/utils/i18n";
import { Link } from "react-router-dom";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";


export default function CustomDrawer({
  title = "Ma’lumot",
  children,
  open,
  onOpenChange,
  showFooter = true,
  onSave,
  lorem,
  side = "right",
  size = "md",
  contacts = false,
  edit = null,
  Delete = "",
  path = "",
  id = "",
  mutation,
  keys
}) {
  const sizeClasses = {
    sm: "sm:max-w-[300px]",
    md: "sm:max-w-[400px]",
    lg: "sm:max-w-[650px]",
    xl: "sm:max-w-[800px]",
  };
  const queryClient = useQueryClient()
  const [openPopoverId, setOpenPopoverId] = useState(null);

  const mut = useMutation({
    mutationFn: (id) => mutation(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [keys] });
      toast.success(t("delete success"));
      setOpenPopoverId(null);
      onOpenChange(false);
      lorem(false)
    }
  })

  const [edits, setedits] = useState("")
  useEffect(() => {
    setedits(edit);
  }, [edit])

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



            {Delete ? (
              <Popover
                className="transition-all duration-300"
                open={openPopoverId == Delete}
                onOpenChange={(isOpen) => setOpenPopoverId(isOpen ? Delete : null)}
              >
                <PopoverTrigger asChild>
                  <Button
                    onClick={() => setOpenPopoverId(Delete)}
                    variant="outline"
                    className=" border-none py-4 px-5 text-[#fff]  bg-[red] shadow-sm hover:shadow-lg transition-shadow duration-300 shadow-[red]"
                    size="sm"
                  >
                    {t("delete")}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-30 bg-[#fff]">
                  <p className="text-[red]">{t("deletes")}</p>
                  <div className="flex justify-end gap-2 mt-3">
                    <Button
                      className="transition-all cursor-pointer duration-300 hover:bg-blue-800 border-none hover:rounded-[10px] text-[#fff] bg-blue-600"
                      onClick={() => setOpenPopoverId(false)}
                    >
                      clean
                    </Button>
                    <Button
                      className="transition-all cursor-pointer duration-300 bg-red text-[#fff] border-none hover:bg-redHover hover:rounded-[10px]"
                      onClick={() => {
                        if (!Delete) {
                          console.error("DELETE ID topilmadi:", Delete)
                          return;
                        }
                        mut.mutate(Delete);
                      }}
                      disabled={mut.isLoading}
                    >
                      {mut.isPending ? <div>Loading...</div> : t("delete")}
                    </Button>
                  </div>
                </PopoverContent>
              </Popover>
            ) : ""}
            {contacts == true ? (<Button
              variant="outline"
              className=" border-none w-[50%] text-[#fff]  bg-button shadow-sm hover:shadow-lg transition-shadow duration-300 shadow-button"
              size="sm"
            >
              contacts
            </Button>) : ""}
            {edit == edits ? (

              <Link className=" w-[50%] border-none text-[#fff] shadow-sm bg-icons hover:shadow-lg transition-shadow duration-300 shadow-icons decoration-none text-center rounded-md" to={path} >
                <Button
                  className=" w-[50%] border-none text-[#fff] shadow-sm bg-icons hover:shadow-lg transition-shadow duration-300 shadow-icons decoration-none "
                  variant="outline"
                  size="sm"
                >
                  {t("edid")}
                </Button>
              </Link>
            ) : ""}
          </DialogFooter>


        )}
      </DialogContent>
    </Dialog>
  );
}
