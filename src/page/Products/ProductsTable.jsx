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
import { t } from "@/utils/i18n";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
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
  const [OpenPopoverId, setOpenPopoverId] = useState(null);

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
          src={forceConvertDomain(value) || defaultImg || "/no-image.png"}
          alt="product"
          className="w-16 h-16 object-cover rounded"
        />
      ),
    },
    { key: "name", label: t("product_name") },
    { key: "category_name", label: t("category") },
    { key: "price", label: t("cost_price") },
    { key: "selling_price", label: t("selling_price") },
    {
      key: "actions",
      label: <p className="text-center">{t("actions")}</p>,
      render: (_, row) => (
        <div className="flex justify-evenly gap-2">
          <Button
            variant="outline"
            className="bg-icons text-[#fff] border-none p-[18px]"
            size="sm"
            onClick={() => handleView(row)}
          >
            {t("view")}
          </Button>
          <Popover
            className="transition-all duration-300"
            open={OpenPopoverId == row.id}
            onOpenChange={(isOpen) => setOpenPopoverId(isOpen ? row.id : null)}
          >
            <PopoverTrigger asChild>
              <Button className="bg-red text-[#fff] border-none hover:bg-redHover">
                {t("delete")}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-30 bg-[#fff]">
              <p className="text-[red]">{t("deletes")}</p>
              <div className="flex justify-end gap-2 mt-3">
                <Button
                  className="transition-all duration-300 hover:bg-blue-800 border-none hover:rounded-[10px] text-[#fff] bg-blue-600"
                  onClick={() => setOpenPopoverId(false)}
                >
                  clean
                </Button>
                <Button
                  className="transition-all duration-300 bg-red text-[#fff] border-none hover:bg-redHover hover:rounded-[10px]"
                  onClick={handleDelete}
                >
                  {t("delete")}
                </Button>
              </div>
            </PopoverContent>
          </Popover>
      
        </div>
      ),
    },
  ];

  const websiteProducts = products.filter((p) => p.show_on_landing === true);
  const adminProducts = products.filter((p) => !p.show_on_landing);
  return (
    <>
      <CustomDrawer
        title={t("product")}
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
            <p>
              {wiewProduct?.count_of_product} {t("stock")}{" "}
            </p>
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
