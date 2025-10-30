import React, { useMemo, useState } from "react";
import { getClientBusinessQuery, getClientCustomersQuery } from "@/queries";
import { useQuery } from "@tanstack/react-query";
import DataTable from "@/components/Table/DataTable";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { forceConvertDomain } from "@/lib/forceConvertDomain";
import defaultImg from "@/assets/img/optional-img.jpg";

export default function ClientsTable() {
    const [params, setParams] = useState({
        limit: "200",
        search: "",
        page: "1",
    });
    const [isType, setIsType] = useState(false);
    const { data: business } = useQuery(getClientBusinessQuery(params));
    const { data: customers } = useQuery(getClientCustomersQuery(params));

    const clientBusiness = useMemo(
        () => business?.data?.Data?.businesses || [],
        [business]
    );
    const clientJismoniy = useMemo(
        () => customers?.data?.Data?.customers || [],
        [customers]
    );

    const columns = useMemo(
        () => [
            {
                key: "index",
                label: "№",
                render: (_, __, index) => index + 1,
            },
            {
                key: "file",
                label: "Photo",
                render: (value) => (
                    <img
                        src={
                            forceConvertDomain(value) ||
                            defaultImg ||
                            "/no-image.png"
                        }
                        alt="employees"
                        className="w-16 h-16 object-cover rounded"
                    />
                ),
            },
            {
                key: !isType ? "first_name" : "full_name",
                label: !isType ? "Ismi" : "To'liq ismi",
            },
            {
                key: !isType ? "last_name" : "company_name",
                label: !isType ? "Familyasi" : "Direktor",
            },
            { key: "region", label: "Viloyat" },
            { key: "district", label: "Tuman" },
            { key: "phone", label: "Telefon" },
            {
                key: "actions",
                label: <p className="text-center">Actions</p>,
                render: (_, row) => (
                    <div className="flex justify-evenly gap-2">
                        <Button
                            variant="outline"
                            size="sm"
                            // onClick={() => handleView(row)}
                        >
                            View
                        </Button>
                    </div>
                ),
            },
        ],
        [isType]
    );

    return (
        <div>
            <Tabs defaultValue="jismoniy" className="w-full">
                <TabsList>
                    <TabsTrigger
                        onClick={() => setIsType(false)}
                        value="jismoniy"
                        className="
              data-[state=active]:bg-icons
              data-[state=active]:text-background
              data-[state=active]:shadow-md
              bg-white text-icons transition-all
            "
                    >
                        Jismoniy shaxs
                    </TabsTrigger>

                    <TabsTrigger
                        onClick={() => setIsType(true)}
                        value="yuridik"
                        className="
              data-[state=active]:bg-icons
              data-[state=active]:text-background
              data-[state=active]:shadow-md
              bg-white text-icons transition-all
            "
                    >
                        Yuridik shaxs
                    </TabsTrigger>
                </TabsList>

                <TabsContent
                    value="jismoniy"
                    className="h-[calc(100vh-150px)] overflow-y-auto"
                >
                    <DataTable columns={columns} data={clientJismoniy} />
                </TabsContent>

                <TabsContent
                    value="yuridik"
                    className="h-[calc(100vh-150px)] overflow-y-auto"
                >
                    <DataTable columns={columns} data={clientBusiness} />
                </TabsContent>
            </Tabs>
        </div>
    );
}
