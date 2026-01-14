import Search from "@/components/Search/search";
import DataTable from "@/components/Table/DataTable";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { DeleteExpressMutation, expresgetUseQuery } from "@/queries";
import { t } from "@/utils/i18n";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

export default function AdditionalTable() {
  const [params, setParams] = useState({
    limit: "200",
    page: "1",
    search: "",
  });

  const { data } = useQuery(expresgetUseQuery(params));

  const calculate = useMemo(
    () => data?.data?.Data?.extra_expenses || [],
    [data]
  );

  const queryClient = useQueryClient();

  const [openPopoverId, setOpenPopoverId] = useState(null);

  const mut = useMutation({
    mutationFn: (id) => DeleteExpressMutation(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["expenses"] });
      toast.success(t("delete success"));
      setOpenPopoverId(null);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const columns = [
    {
      key: "index",
      label: "№",
      render: (_, __, index) => index + 1,
    },
    { key: "name", label: t("name") },
    { key: "amount", label: t("price") },
    { key: "description", label: t("Additional") },
    { key: "created_at", label: t("created_at") },
    {
      key: "actions",
      label: t("actions"),
      render: (_, row) => (
        <div className="flex justify-center gap-4 ">
          <Popover
            className="transition-all duration-300"
            open={openPopoverId == row.id}
            onOpenChange={(isOpen) => setOpenPopoverId(isOpen ? row.id : null)}
          >
            <PopoverTrigger asChild>
              <Button
                onClick={() => setOpenPopoverId(row.id)}
                className="bg-red cursor-pointer text-[#fff] border-none hover:bg-redHover"
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
                  onClick={() => mut.mutate(row.id)}
                >
                  {mut.isPending ? "loading..." : t("delete")}
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      ),
    },
  ];
  return (
    <div className="w-full pl-7 pr-7">
      <div className="flex justify-between items-center py-5 px-7">
      <h2>{t("additional_expense")}</h2>
        <Link
          className=" py-[7px] px-5 bg-button text-aside rounded-md "
          to={"/additional_expense/create"}
        >
          + Create
        </Link>
      </div>
      <DataTable columns={columns} data={calculate} />
    </div>
  );
}
