import { getContractsQuery } from "@/queries";
import React, { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import DataTable from "@/components/Table/DataTable";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { t } from "@/utils/i18n";
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
    const { data } = useQuery(getContractsQuery(params));
    const contracts = useMemo(
        () => data?.data?.Data?.client_products || [],
        [data]
    );

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
        ],
        [params.is_company]
    );
    return (
        <div>
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
