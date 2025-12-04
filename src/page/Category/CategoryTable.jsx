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
import { deleteproductCategoryDelete, getProductQuery } from "@/queries";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Search from "@/components/Search/search";
import { Link } from "react-router-dom";
import { LoaderIcon } from "lucide-react";
import { toast } from "react-toastify";

export default function CategoryTable() {
  // const nav = useNavigate()
  const { t } = useTranslation();
  const [params, setParams] = useState({
    limit: "200",
    page: "1",
    search: "",
  });
  const { data, isLoading } = useQuery(getProductQuery(params));
  const Productquery = useMemo(
    () => data?.data?.Data?.product_categories || [],
    [data]
  );

  const queryClient = useQueryClient()


  const { isOpen, onOpen, onClose } = useDisclosure();
  const [wiewProduct, setViewProduct] = useState();
  const [openPopoverId, setOpenPopoverId] = useState(null);
  


 const mutation = useMutation({mutationFn: (id)=>deleteproductCategoryDelete(id), 
  onSuccess:()=>{
     queryClient.invalidateQueries({ queryKey: ["product-categories"] });
    toast.success(t("delete success"))
    setOpenPopoverId(null);
  },
  onError: (error) => {
    toast.error(error.message)
  },
  });
  const handleClick = ()=>{
     setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000); 
  }


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
          <Link onClick={handleClick} to={`/products_category/edit/${row.id}`}>
            <Button
              variant="outline"
              className="bg-icons text-aside cursor-pointer  border-none"
              size="sm"

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
              <Button onClick={() => setViewProduct(row.id)} className="bg-red cursor-pointer text-[#fff] border-none hover:bg-redHover">
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
                  onClick={()=> mutation.mutate(row.id)}
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

  const handleSearch = (value) => {
    setParams((prev) => ({ ...prev, search: value }))

  }

  // const handleCreate = () =>{

  //  nav("/settings",{state:{params:mutet, page:"pcategory"}})
  // }

  if ( mutation.isPending) {
  return (
    <div className="flex justify-center items-center h-screen"> 
      <LoaderIcon className="animate-spin h-10 w-10 text-gray-500" />
    </div>
  )
}
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
