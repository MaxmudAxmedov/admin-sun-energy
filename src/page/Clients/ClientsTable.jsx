import React, { useMemo, useState } from "react";
import { getClientBusinessQuery, getClientCustomersQuery } from "@/queries";
import { useQuery } from "@tanstack/react-query";
import DataTable from "@/components/Table/DataTable";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { forceConvertDomain } from "@/lib/forceConvertDomain";
import defaultImg from "@/assets/img/optional-img.jpg";
import { t } from "@/utils/i18n";
import { useDisclosure } from "@/hook/useDisclosure";
import CustomDrawer from "@/components/CustomDrawer/CustomDrawer";

export default function ClientsTable() {
    const [vale,setvalue] = useState(true);
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

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [wiewProduct, setViewProduct] = useState({});

  const handleView = (row) =>{
    setViewProduct(row);
    onOpen()
    console.log(row);
    
  }

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
            src={forceConvertDomain(value) || defaultImg || "/no-image.png"}
            alt="employees"
            className="w-16 h-16 object-cover rounded"
          />
        ),
      },
      {
        key: !isType ? "first_name" : "full_name",
        label: !isType ? t("name") : t("full_name"),
      },
      {
        key: !isType ? "last_name" : "company_name",
        label: !isType ? t("last_name") : t("director"),
      },
      { key: "region", label: t("region") },
      { key: "district", label: t("district") },
      { key: "phone", label: t("phone") },
      {
        key: "actions",
        label: <p className="text-center">{t("actions")}</p>,
        render: (_, row) => (
          <div className="flex justify-evenly gap-2">
            <Button
              variant="outline"
              className="bg-icons text-aside border-none"
              size="sm"
              onClick={() => handleView(row)}
            >
              {t("view")}
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
            {t("natural_person")}
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
            {t("legal_entity")}
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
          setvalue={false}
          className="h-[calc(100vh-150px)] overflow-y-auto"
        >
          <DataTable columns={columns} data={clientBusiness} />
        </TabsContent>
      </Tabs>
       <CustomDrawer
    title={t("info")}
    open={isOpen}
    onOpenChange={(open)=> (open ? onOpen() : onClose())}
    onSave={()=>{
        onClose()
    }}
    side="right"
    size="xl"
    >
<div className="flex flex-col">
  {!isType == true ? <div>
    <div className="flex gap-7">
    <img className="w-[240px] rounded-md h-[200px[" src={wiewProduct.file} alt="" />
    <div>
        <h2 className="text-active mt-2">{wiewProduct.first_name} {wiewProduct.last_name} {wiewProduct.patronymic} </h2>
        <h2 className="text-active mt-2"> +{wiewProduct.phone}</h2>

    </div>
    </div >
        {/* <h3 className="text-active mt-2">{t("contract_date")} : {wiewProduct.created_at}</h3> */}
        {/* <ul className="flex justify-between items-center py-7 ">
          <li className=" text-active py-[6px] pl-2 pr-5  border-[1px]">{wiewProduct.region}</li>
        </ul> */}
        <ul className="flex justify-between items-center py-7">
  <li style={{border:"2px solid grey"}} className="text-active py-[6px] pl-2 pr-5 border-[1px] border-gray-400 rounded-md">
    {wiewProduct.region}
  </li>
</ul>

        <p className="text-active mt-2"> {t("passport_series")} : {wiewProduct.passport_series}</p>
        <p className="text-active mt-2"> {t("employee_name")} :{wiewProduct.employee_name} </p>
        <p className="text-active mt-2"> {t("region")} : </p>
        <p className="text-active mt-2"> {t("district")} : {wiewProduct.district}</p>
        <p className="text-active mt-2"> {t("quarter")} : {wiewProduct.quarter}</p>
        <p className="text-active mt-2"> {t("street")} : {wiewProduct.street}</p>

    </div> : <div>
    <img className="w-[240px] h-[200px[" src={wiewProduct.file} alt="" />
               <h3 className="text-active mt-2">{t("contract_date")} : {wiewProduct.created_at}</h3>
        <h3 className="text-active mt-2">{t("full_name")} : {wiewProduct.full_name} </h3>
        <p className="text-active mt-2">inn {  t("number")} : {wiewProduct.inn_number}</p>
        <p className="text-active mt-2"> info {  t("number")} : {wiewProduct.info_number}</p>
        <p className="text-active mt-2"> {t("employee_name")} : {wiewProduct.employee_name}</p>
        <p className="text-active mt-2"> {t("region")} : {wiewProduct.region}</p>
        <p className="text-active mt-2"> {t("district")} : {wiewProduct.district}</p>
        <p className="text-active mt-2"> {t("quarter")} : {wiewProduct.quarter}</p>
        <p className="text-active mt-2"> {t("street")} : {wiewProduct.street}</p>
        <p className="text-active mt-2"> {t("phone")} : {wiewProduct.phone}</p>     

    </div> }
    
</div>

    </CustomDrawer>
    </div>
  );
}

