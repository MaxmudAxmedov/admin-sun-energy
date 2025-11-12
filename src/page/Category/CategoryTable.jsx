import React, { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import DataTable from "@/components/Table/DataTable";
import { Button } from "@/components/ui/button";
import { useDisclosure } from "@/hook/useDisclosure";
import { Input } from "@/components/ui/input";
import { Form } from "@/components/ui/form";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { getProductQuery } from "@/queries";
import { useQuery } from "@tanstack/react-query";

export default function CategoryTable() {
  const { t } = useTranslation();
  const [params, useParams] = useState({
    limit: "200",
    page: "1",
  });
  const { data } = useQuery(getProductQuery(params));
  const Productquery = useMemo(
    () => data?.data?.Data?.product_categories || [],
    [data]
  );

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [wiewProduct, setViewProduct] = useState({});
  const [openPopoverId, setOpenPopoverId] = useState(null);
  const handleDelete = (row) => {
    setOpenPopoverId(false);
    console.log(row);
  };
  const handleView = (row) => {
    setViewProduct(row);
    onOpen();
    ChangeProduct(wiewProduct);
  };
  const columns = [
    {
      key: "index",
      label: "№",
      render: (_, __, index) => index + 1,
    },

    {
      key: "name",
      label: t("name"),
    },
    {
      key: "created_at",
      label: t("created"),
    },
    {
      key: "actions",
      label: <p className="text-center">{t("actions")}</p>,
      render: (_, row) => (
        <div className="flex justify-evenly gap-2 ">
          <Button
            variant="outline"
            className="bg-icons text-aside  border-none"
            size="sm"
            onClick={() => handleView(row)}
          >
            {t("edid")}
          </Button>
           <Popover
                      className="transition-all duration-300"
                      open={openPopoverId == row.id}
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

  return (
    <>
      <div className="w-[300px] flex gap-5 ml-auto mr-[30px]">
        <Button className="border-none rounded-4 text-button">+ Create</Button>
        <Form className={"w-100%"}>
          <label id="search">
            <img src="./" alt="" />
            <Input
              type={"text"}
              id="search"
              className={"border-none bg-none"}
            />
          </label>
        </Form>
      </div>

      <div className="p-4">
        <h1 className="my-4 text-active">{t("pcategory")}</h1>
        <DataTable columns={columns} data={Productquery} />
      </div>
    </>
  );
}
