import React, { useMemo, useState } from "react";
import {
  getClentBusinessTRADESQuery,
  getClientBusinessIdQuery,
  getClientBusinessQuery,
  getClientCustomersQuery,
} from "@/queries";
import { useQuery } from "@tanstack/react-query";
import DataTable from "@/components/Table/DataTable";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { forceConvertDomain } from "@/lib/forceConvertDomain";
import defaultImg from "@/assets/img/optional-img.jpg";
import { t } from "@/utils/i18n";
import { useDisclosure } from "@/hook/useDisclosure";
import CustomDrawer from "@/components/CustomDrawer/CustomDrawer";
import { formator } from "@/schemas/formator";

export default function ClientsTable() {
  const [params, setParams] = useState({
    limit: "200",
    search: "",
    page: "1",
  });
  const [isType, setIsType] = useState(false);
  const { data: business } = useQuery(getClientBusinessQuery(params));
  const { data: customers } = useQuery(getClientCustomersQuery(params));
  const [clientId, setclientId ] = useState(null);
  const { data: trades } = useQuery(
    getClentBusinessTRADESQuery({
      client_id: clientId,
      employee_id: "",
      from_date: "",
      to_date: "",
      is_company: false,
      page: 1,
      limit: 100,
    })
  );
  const TRADES = useMemo(
    () => trades?.data.Data.client_products || [],
    [trades]
  );

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
  // const [value, setvalue] = useState(null);

  // const { data: clientsId, isLoading } = useQuery(
  //   getClientBusinessIdQuery(value)
  // );

  const handleView = (row) => {
    setViewProduct(row);
    //setvalue(row.id);
    onOpen();
    setclientId(row.id);
  };

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

    const filteredTRADES = useMemo(()=>{
    if(!TRADES || !clientId) return [];
    return TRADES.filter((item)=>item.client_id == clientId)
  },[TRADES,clientId])

  console.log(wiewProduct);
  

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
        contacts={true}
        edit={true}
        onOpenChange={(open) => (open ? onOpen() : onClose())}
        onSave={() => {
          onClose();
        }}
        side="right"
        size="lg"
      >
        <div className="flex flex-col">
          {!isType == true ? (
            <div>
              <div className="flex gap-7">
                <img
                  className="w-[240px] rounded-md h-[200px["
                  src={wiewProduct.file}
                  alt=""
                />
                <div>
                  <h2 className="text-active mt-2">
                    {wiewProduct.first_name} {wiewProduct.last_name}{" "}
                    {wiewProduct.patronymic}{" "}
                  </h2>
                  <h2 className="text-active mt-2"> +{wiewProduct.phone}</h2>
                  
              
                </div>
              </div>
              <ul  className="flex justify-between gap-2 flex-wrap w-[600px] ml-auto mr-auto  border border-indigo-600  items-center py-7">
                <li
                  style={{ border: "1px solid grey" }}
                  className="text-active py-[8px] text-[14px] pl-2 rounded-lg pr-2 "
                >
                  {wiewProduct.region}
                </li>
                <li
                  style={{ border: "1px solid grey" }}
                  className="text-active py-[8px] pl-2 rounded-lg text-[14px] pr-2 "
                >
                  {wiewProduct.district}
                </li>
                <li
                  style={{ border: "1px solid grey" }}
                  className="text-active py-[8px] pl-2 text-[14px] rounded-lg pr-2 "
                >
                  {wiewProduct.quarter}
                </li> 
                <li
                  style={{ border: "1px solid grey" }}
                  className="text-active py-[8px] pl-2 text-[10px] rounded-lg pr-2 "
                >
                  {wiewProduct.street}
                </li>
              </ul>
              <div>
              
                <div>
  {filteredTRADES.length ? (
    filteredTRADES.map((trade, index) => (
      <div className="w-[100%] text-active gap-2 flex justify-between items-center" key={index}>
       <div  style={{ border: "1px solid grey" }} className="w-5/12 border-spacing-10 h-[22px] py-7 px-5 rounded-md flex justify-between items-center ">
        <h3 >
          KV
        </h3>
        
         <h3>{trade.kv}</h3>
       </div>
        <div  style={{ border: "1px solid grey" }} className="w-7/12 border-spacing-10 h-[22px] py-7 px-5 rounded-md flex justify-between items-center ">
        <h3>{t("gross_profit")}</h3>
        <h3>{formator(trade.total_price)} UZS </h3>
        </div>
      </div>
    ))
  ) : (
    <p>No trades found</p>
  )}
</div>
              </div>
            </div>
          ) : (
             <div>
              <div className="flex gap-7">
                <img
                  className="w-[240px] rounded-md h-[200px["
                  src={wiewProduct.file}
                  alt=""
                />
                <div>
                  <h2 className="text-active mt-2">
                    {wiewProduct.company_name} <br /> {wiewProduct.full_name}{" "}
                  </h2>
                  <h3 className="text-active mt-2"> +{wiewProduct.phone}</h3>
                  <h3 className="text-active mt-2"> inn {wiewProduct.inn_number}</h3>
                  
              
                </div>
              </div>
              <ul className="flex justify-between w-[580px] ml-auto mr-auto  border border-indigo-600  items-center py-7">
                <li
                  style={{ border: "1px solid grey" }}
                  className="text-active py-[8px] pl-2 rounded-lg pr-5 "
                >
                  {wiewProduct.region}
                </li>
                <li
                  style={{ border: "1px solid grey" }}
                  className="text-active py-[8px] pl-2 rounded-lg pr-5 "
                >
                  {wiewProduct.district}
                </li>
                <li
                  style={{ border: "1px solid grey" }}
                  className="text-active py-[8px] pl-2 rounded-lg pr-5 "
                >
                  {wiewProduct.quarter}
                </li>
                <li
                  style={{ border: "1px solid grey" }}
                  className="text-active py-[8px] pl-2 rounded-lg pr-5 "
                >
                  {wiewProduct.street}
                </li>
              </ul>
              <div>
              
                <div>
  {filteredTRADES.length ? (
    filteredTRADES.map((trade, index) => (
      <div className="w-[100%] text-active gap-2 flex justify-between items-center" key={index}>
       <div  style={{ border: "1px solid grey" }} className="w-5/12 border-spacing-10 h-[22px] py-7 px-5 rounded-md flex justify-between items-center ">
        <h3 >
          KV
        </h3>
        
         <h3>{trade.kv}</h3>
       </div>
        <div  style={{ border: "1px solid grey" }} className="w-7/12 border-spacing-10 h-[22px] py-7 px-5 rounded-md flex justify-between items-center ">
        <h3>{t("gross_profit")}</h3>
        <h3>{trade.total_price}</h3>
        </div>
      </div>
    ))
  ) : (
    <p>No trades found</p>
  )}
</div>
              </div>
            </div>
          )}
        </div>
      </CustomDrawer>
      
    </div>
  );
}
