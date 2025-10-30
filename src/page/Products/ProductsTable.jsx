import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getProductsQuery } from "@/queries";
import DataTable from "@/components/Table/DataTable";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CustomDrawer from "@/components/CustomDrawer/CustomDrawer";
import { useDisclosure } from "@/hook/useDisclosure";
import { forceConvertDomain } from "@/lib/forceConvertDomain";
import defaultImg from "@/assets/img/optional-img.jpg";
export default function ProductsTable() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [params, setParams] = useState({
        limit: "200",
        search: "",
        page: "1",
    });
    const { data } = useQuery(getProductsQuery(params));
    const products = data?.data?.Data?.products || [];
    const [wiewProduct, setViewProduct] = useState({});

    const handleView = (row) => {
        console.log("View clicked:", row);
        setViewProduct(row);
        onOpen();
    };

    const handleDelete = (id) => {
        console.log("Delete clicked:", id);
    };

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
                    alt="product"
                    className="w-16 h-16 object-cover rounded"
                />
            ),
        },
        { key: "name", label: "Mahsulot nomi" },
        { key: "category_name", label: "Toifa" },
        { key: "price", label: "Tan Narxi" },
        { key: "selling_price", label: "Sotuv Narxi" },
        {
            key: "actions",
            label: <p className="text-center">Actions</p>,
            render: (_, row) => (
                <div className="flex justify-evenly gap-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleView(row)}
                    >
                        View
                    </Button>
                    <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDelete(row.id)}
                    >
                        Delete
                    </Button>
                </div>
            ),
        },
    ];

    const websiteProducts = products.filter((p) => p.show_on_landing === true);
    const adminProducts = products.filter((p) => !p.show_on_landing);

    return (
        <>
            <CustomDrawer
                title="Mahsulot"
                open={isOpen}
                onOpenChange={(open) => (open ? onOpen() : onClose())}
                onSave={() => {
                    console.log("Mahsulot saqlandi!");
                    onClose();
                }}
                side="right"
                size="lg"
            >
                <div className="flex gap-10 ">
                    <img
                        src={wiewProduct?.photo}
                        alt="product"
                        className="w-52 object-cover rounded-md"
                    />

                    <div className="flex flex-col">
                        <h2 className="text-left">{wiewProduct?.name}</h2>
                        <p>{wiewProduct?.count_of_product} dona mavjud</p>
                        <p>{wiewProduct?.power_system}</p>
                    </div>
                </div>

                <div className="flex justify-between">
                    <p>{wiewProduct?.price}</p>
                    <p>{wiewProduct?.mark_up}%</p>
                    <p>{wiewProduct?.selling_price}</p>
                </div>
            </CustomDrawer>
            <div className="px-3">
                <Tabs defaultValue="web-site" className="w-full">
                    <TabsList>
                        <TabsTrigger
                            value="web-site"
                            className="
              data-[state=active]:bg-icons
              data-[state=active]:text-background
              data-[state=active]:shadow-md
              bg-white text-icons transition-all
            "
                        >
                            Web site
                        </TabsTrigger>

                        <TabsTrigger
                            value="admin-panel"
                            className="
              data-[state=active]:bg-icons
              data-[state=active]:text-background
              data-[state=active]:shadow-md
              bg-white text-icons transition-all
            "
                        >
                            Admin panel
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent
                        value="web-site"
                        className="h-[calc(100vh-150px)] overflow-y-auto"
                    >
                        <DataTable columns={columns} data={websiteProducts} />
                    </TabsContent>

                    <TabsContent
                        value="admin-panel"
                        className="h-[calc(100vh-150px)] overflow-y-auto"
                    >
                        <DataTable columns={columns} data={adminProducts} />
                    </TabsContent>
                </Tabs>
            </div>
        </>
    );
}
