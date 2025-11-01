import React from "react";
import { useQueriyPruuctCategoriya } from "./query/useQueriyPruuctCategoriya";
import { useTranslation } from "react-i18next";
import DataTable from "@/components/Table/DataTable";
import { Button } from "@/components/ui/button";

export default function CategoryTable() {
    const { t } = useTranslation();
    const { data, isLoading, error, isError } = useQueriyPruuctCategoriya();
    const columns = [
        {
            key: "index",
            label: "№",
            render: (_, __, index) => index + 1,
        },

        {
            key: "name",
            label: "Name",
        },
        {
            key: "created_at",
            label: "Created",
        },
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

    if (isError) {
        return <h1>{error.message}</h1>;
    }

    if (isLoading) {
        return <h1>Loading...</h1>;
    }

    return (
        <div className="p-4">
            <h1 className="my-4 text-active">{t("pcategory")}</h1>
            <DataTable columns={columns} data={data} />
        </div>
    );
}