import { deletetradesmutation, getContractsQuery } from "@/queries";
import React, { useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import DataTable from "@/components/Table/DataTable";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { t } from "@/utils/i18n";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { formator } from "@/schemas/formator";
import { toast } from "react-toastify";

export default function Contracts() {
  const nav = useNavigate();

  const [deleteId, setDeleteId] = useState(null); // Bu yerda ID saqlaymiz

  const [params, setParams] = useState({
    client_id: "",
    employee_id: "",
    from_date: "",
    to_date: "",
    is_company: false,
    limit: "200",
    page: "1",
  });

  const { data, isLoading: load } = useQuery(getContractsQuery(params));
  const contracts = useMemo(
    () => data?.data?.Data?.client_products || [],
    [data]
  );

  const client = useQueryClient();
  const mutate = useMutation({
    mutationFn: (deletes) => deletetradesmutation(deletes),
  });

  const setdelete = (deletes) => {
    mutate.mutate(deletes, {
      onSuccess: () => {
        client.invalidateQueries(["trades-reports"]);
        toast.success("Muvaffaqiyatli o'chirildi");
        setDeleteId(null); // Dialogni yopamiz
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });
  };

  const columns = useMemo(
    () => [
      {
        key: "index",
        label: "№",
        render: (_, __, index) => index + 1,
      },
      {
        key: "client_name",
        label: params?.is_company ? t("director") : t("name"),
      },
      {
        key: "total_price",
        label: t("total_amount"),
        render: (_, row) => formator(row.total_price),
      },
      { key: "created_at", label: t("contract_date") },
      {
        key: "action",
        label: <p className="text-center">{t("actions")}</p>,
        render: (_, row) => (
          <div className="flex justify-evenly gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="h-8 w-8 p-0 text-[#000] bg-shadow border-none"
                >
                  ...
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end" className="w-32">
                <Link to={row.contract} target="_blank">
                  <DropdownMenuItem className="text-[17px] hover:bg-shadows">
                    {t("view")}
                  </DropdownMenuItem>
                </Link>

                <DropdownMenuItem
                  className="text-red text-[17px] hover:bg-shadows"
                  onClick={() => setDeleteId(row.id)}
                >
                  {t("delete")}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Tasdiqlash modal - DropdownMenu tashqarisida */}
            {deleteId === row.id && (
              <div
                className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
                onClick={() => setDeleteId(null)}
              >
                <div
                  className="bg-white p-6 rounded-lg shadow-xl w-96"
                  onClick={(e) => e.stopPropagation()}
                >
                  <p className="text-red mb-5 text-lg font-semibold">
                    {t("deletes")} - Rostdan ham o'chirmoqchimisiz?
                  </p>
                  <div className="flex justify-end gap-3">
                    <Button
                      className="bg-blue-600 text-white border-none hover:bg-blue-800 px-4 py-2"
                      onClick={() => setDeleteId(null)}
                    >
                      {t("cancel") || "Bekor qilish"}
                    </Button>
                    <Button
                      className="bg-red text-white border-none hover:bg-redHover px-4 py-2"
                      onClick={() => setdelete(row.id)}
                    >
                      {t("delete")}
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        ),
      },
    ],
    [params.is_company, deleteId] // deleteId ni qo'shdik
  );

  return (
    <div>
      <div className="flex justify-between items-center py-5 px-7">
        <h1 className="my-4 text-active">
          {load ? "Yuklanmoqda..." : t("contracts")}
        </h1>
        <Link
          className="py-[7px] px-5 bg-button text-aside rounded-md"
          to={"/Contracts/create"}
        >
          + Create
        </Link>
      </div>
      <Tabs defaultValue="jismoniy" className="w-full">
        <TabsList>
          <TabsTrigger
            onClick={() =>
              setParams((prev) => ({
                ...prev,
                is_company: false,
              }))
            }
            value="jismoniy"
            className="
              data-[state=active]:bg-icons
              data-[state=active]:text-background
              data-[state=active]:shadow-md
              bg-white text-icons transition-all
            "
          >
            {t("natural_person")}
          </TabsTrigger>

          <TabsTrigger
            onClick={() => setParams((prev) => ({ ...prev, is_company: true }))}
            value="yuridik"
            className="
              data-[state=active]:bg-icons
              data-[state=active]:text-background
              data-[state=active]:shadow-md
              bg-white text-icons transition-all
            "
          >
            {t("legal_entity")}
          </TabsTrigger>
        </TabsList>

        <TabsContent
          value="jismoniy"
          className="h-[calc(100vh-150px)] overflow-y-auto"
        >
          <DataTable columns={columns} data={contracts} />
        </TabsContent>

        <TabsContent
          value="yuridik"
          className="h-[calc(100vh-150px)] overflow-y-auto"
        >
          <DataTable columns={columns} data={contracts} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
