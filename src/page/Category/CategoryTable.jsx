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
import { Link, useNavigate } from "react-router-dom";

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
          <Link to={`/products_category/edit/${row.id}`}>
          <Button
            variant="outline"
            className="bg-icons text-aside cursor-pointer  border-none"
            size="sm"
            onClick={() => handleView(row)}
          >
            {t("edid")}
          </Button>
            </Link>
           <Popover
                      className="transition-all duration-300"
                      open={openPopoverId == row.id}
                      onOpenChange={(isOpen) => setOpenPopoverId(isOpen ? row.id : null)}
                    >
                      <PopoverTrigger asChild>
                        <Button className="bg-red cursor-pointer text-[#fff] border-none hover:bg-redHover">
                          {t("delete")}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-30 bg-[#fff]">
                        <p className="text-[red]">{t("deletes")}</p>
                        <div className="flex justify-end gap-2 mt-3">
                          <Button
                            className="transition-all cursor-pointer duration-300 hover:bg-blue-800 border-none hover:rounded-[10px] text-[#fff] bg-blue-600"
                            onClick={() => setOpenPopoverId(false)}
                          >
                            clean
                          </Button>
                          <Button
                            className="transition-all cursor-pointer duration-300 bg-red text-[#fff] border-none hover:bg-redHover hover:rounded-[10px]"
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
            <div className="flex justify-between items-center py-5 px-7">
          <Search url={handleSearch} />
          
            <Link className=" py-[7px] px-5 bg-button text-aside rounded-md " to={"/products_category/create"} >
                      
                  + Create
                     </Link>
         
      </div>
        <DataTable columns={columns} data={Productquery} />
      </div>
    </>
  );
}
