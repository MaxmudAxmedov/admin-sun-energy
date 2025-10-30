import React, { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getEmployeesQuery } from "@/queries";
import { Button } from "@/components/ui/button";
import DataTable from "@/components/Table/DataTable";
import { forceConvertDomain } from "@/lib/forceConvertDomain";
import defaultImg from "@/assets/img/optional-img.jpg";
export default function Employees() {
    const [params, setParams] = useState({ limit: "200", search: "" });
    const { data } = useQuery(getEmployeesQuery(params));
    const employees = useMemo(() => data?.data?.Data?.employees || [], [data]);
    const columns = [
        {
            key: "index",
            label: "№",
            render: (_, __, index) => index + 1,
        },
        {
            key: "photo",
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
        { key: "first_name", label: "Ismi" },
        { key: "last_name", label: "Familyasi" },
        { key: "district", label: "Tumani" },
        { key: "quarter", label: "Mahallasi" },
        { key: "phone", label: "Telefon" },
        { key: "position_name", label: "Role" },
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
    ];
    return (
        <div>
            <DataTable columns={columns} data={employees} />
        </div>
    );
}
