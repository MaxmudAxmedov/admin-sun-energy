import React, { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import DataTable from "@/components/Table/DataTable";
import { Button } from "@/components/ui/button";
import { useDisclosure } from "@/hook/useDisclosure";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { getProductQuery, postProductCatecoriyes } from "@/queries";
import { useMutation, useQuery } from "@tanstack/react-query";
import Search from "@/components/Search/search";
import { useNavigate } from "react-router-dom";

export default function CategoryTable() {
  // const nav = useNavigate()
  const { t } = useTranslation();
  const [params, setParams] = useState({
    limit: "200",
    page: "1",
    search: "",
  });
  const { data } = useQuery(getProductQuery(params));
    // const {mutet}= useMutation(postProductCatecoriyes(params))
  const Productquery = useMemo(
    () => data?.data?.Data?.product_categories || [],
    [data]
  );


  const { isOpen, onOpen, onClose } = useDisclosure();
  const [wiewProduct, setViewProduct] = useState({});
  const [openPopoverId, setOpenPopoverId] = useState(null);
console.log(Productquery);

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
        <div className="flex justify-center gap-4 ">
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

const handleSearch = (value)=>{
  console.log(value);
  setParams((prev)=>({...prev, search:value}))
  
}

// const handleCreate = () =>{
  
//  nav("/settings",{state:{params:mutet, page:"pcategory"}})
// }

  return (
    <>

      <div className="p-4">
            <div className="flex justify-between items-center py-1 px-4">
                    <h1 className="my-4 text-active">{t("pcategory")}</h1>
                    <div className="flex gap-2 items-center">
                      <Button onClick={()=>handleCreate()} className="p-[10px]">+ Create</Button>
                    <Search url={handleSearch}/>
                    </div>
                    </div>
        <DataTable columns={columns} data={Productquery} />
      </div>
    </>
  );
}
