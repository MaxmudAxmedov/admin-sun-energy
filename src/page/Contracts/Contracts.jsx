import { getContractsQuery } from "@/queries";
import React, { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import DataTable from "@/components/Table/DataTable";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { t } from "@/utils/i18n";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function Contracts() {
    const [params, setParams] = useState({
        client_id: "",
        employee_id: "",
        from_date: "",
        to_date: "",
        is_company: false,
        limit: "200",
        page: "1",
    });
    const { data, isLoading:load } = useQuery(getContractsQuery(params));
    const contracts = useMemo(
        () => data?.data?.Data?.client_products || [],
        [data]
    );

    const [open, setopen] = useState(false)
    const handleClick = (row) => {
        console.log(row.id);
        setopen(true)
    }
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
            { key: "total_price", label: t("total_amount") },
            { key: "created_at", label: t("contract_date") },
            {
                key: "action",
                label: <p className="text-center">{t("actions")}</p>,
                render: (_, row) => (
                    <div className="flex justify-evenly gap-2">
                        <Button onClick={() => handleClick(row)} className="bg-background border-none text-active hover:bg-shadows  p-3">...</Button>
                        <div className="relative">

                        </div>

                    </div>

                )
            }
        ],
        [params.is_company]
    );

    return (
        <div>
            <div className="flex justify-between items-center py-5 px-7">
                <h1 className="my-4 text-active">{load ? "loading..." : t("contracts")}</h1>
                <Link className=" py-[7px] px-5 bg-button text-aside rounded-md " to={"/Contracts/create"} >

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
                        onClick={() =>
                            setParams((prev) => ({ ...prev, is_company: true }))
                        }
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
