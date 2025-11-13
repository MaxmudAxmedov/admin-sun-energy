import React, { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getEmployeeIDQuery, getEmployeesQuery } from "@/queries";
import { Button } from "@/components/ui/button";
import DataTable from "@/components/Table/DataTable";
import { forceConvertDomain } from "@/lib/forceConvertDomain";
import defaultImg from "@/assets/img/optional-img.jpg";
import { t } from "@/utils/i18n";
import { useDisclosure } from "@/hook/useDisclosure";
import CustomDrawer from "@/components/CustomDrawer/CustomDrawer";
import { formator } from "@/schemas/formator";
import Search from "@/components/Search/search";

export default function Employees() {
  const [dataid, setdataid] = useState(null);
  const [params, setParams] = useState({ limit: "200", search: "" });
  const { data } = useQuery(getEmployeesQuery(params));
  const { data: emplyData } = useQuery(getEmployeeIDQuery(dataid));
  const employees = useMemo(() => data?.data?.Data?.employees || [], [data]);
  const employee = useMemo(() => emplyData?.data?.payments || [], [emplyData]);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [wiewProduct, setViewProduct] = useState({});
  const handleView = (row) => {
    setViewProduct(row);
    onOpen();
    setdataid(row.id);
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
          alt="employees"
          className="w-16 h-16 object-cover rounded"
        />
      ),
    },
    { key: "first_name", label: t("name") },
    { key: "last_name", label: t("last_name") },
    { key: "district", label: t("region ") },
    { key: "quarter", label: t("quarter") },
    { key: "phone", label: t("phone") },
    { key: "position_name", label: t("role") },
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
  ];

  const handleSearch = (value)=>{
  setParams((p)=>({...p, search:value}))
}
  return (
    <div>
                  <div className="flex justify-between items-center py-5 px-7">
                    <h1 className="my-4 text-active">{t("employees")}</h1>
                    <Search url={handleSearch} />
                  </div>
      <DataTable columns={columns} data={employees} />

      <CustomDrawer
        title={t("info")}
        open={isOpen}
        edit={true}
        Delete={true}
        onOpenChange={(open) => (open ? onOpen() : onClose())}
        onSave={() => {
          onClose();
        }}
        side="right"
        size="lg"
      >
        <div className="flex  gap-4">
          <img
            className="w-[250px] h-[200px]  object-cover rounded-md"
            src={wiewProduct.photo}
            alt=""
          />
          <div>
            <h3 className="text-active mt-2">
              {wiewProduct.last_name} {wiewProduct.first_name}{" "}
              {wiewProduct.patronymic}{" "}
            </h3>
            <h3 className="text-active mt-4">+{wiewProduct.phone}</h3>
            <h3 className="text-active mt-4">{wiewProduct.position_name}</h3>

            <div className="flex items-center mt-2 gap-8">
              <h4 className="text-active mt-2">{wiewProduct.region}</h4>
              <h4 className="text-active mt-2">{wiewProduct.district}</h4>
            </div>
            <div className="flex items-center mt-4 gap-8">
              <h4 className="text-active mt-2">{wiewProduct.quarter}</h4>
              <h4 className="text-active mt-2">{wiewProduct.street}</h4>
            </div>
          </div>
        </div>
        <ul className=" py-7 text-active flex gap-1 flex-wrap justify-between ">
          <li
            style={{ border: "1px solid grey" }}
            className="p-5 border flex justify-between items-center w-[49%]  rounded-md"
          >
            <h3>{t("cashback")}</h3> <h3>{formator(employee.total_cashback)} UZS</h3>
          </li>
          <li
            style={{ border: "1px solid grey" }}
            className="p-5 border flex justify-between items-center w-[49%]  rounded-md"
          >
            <h3>{t("current_status")}</h3> <h3>{formator(employee.balance_due)} UZS</h3>
          </li>{" "}
          <li
            style={{ border: "1px solid grey" }}
            className="p-5 border flex justify-between mt-3 items-center w-[100%]  rounded-md"
          >
            <h3>{t("gross_profit")}</h3> <h3>{formator(employee.total_salary)} UZS</h3>
          </li>
        </ul>
      </CustomDrawer>
    </div>
  );
}
