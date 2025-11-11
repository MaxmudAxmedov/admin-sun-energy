import React, { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getEmployeesQuery } from "@/queries";
import { Button } from "@/components/ui/button";
import DataTable from "@/components/Table/DataTable";
import { forceConvertDomain } from "@/lib/forceConvertDomain";
import defaultImg from "@/assets/img/optional-img.jpg";
import { t } from "@/utils/i18n";
import { useDisclosure } from "@/hook/useDisclosure";
import CustomDrawer from "@/components/CustomDrawer/CustomDrawer";

 

export default function Employees() {
  const [params, setParams] = useState({ limit: "200", search: "" });
  const { data } = useQuery(getEmployeesQuery(params));
  const employees = useMemo(() => data?.data?.Data?.employees || [], [data]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [wiewProduct, setViewProduct] = useState({});
  const handleView = (row) => {
    setViewProduct(row);
    onOpen();
    console.log(row);
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


  


  return (
    <div>
      <DataTable columns={columns} data={employees} />

      <CustomDrawer
        title={t("info")}
        open={isOpen}
        onOpenChange={(open) => (open ? onOpen() : onClose())}
        onSave={() => {
          onClose();
        }}
        side="right"
        size="lg"
      >
        <div className="flex flex-col">
          <img src={wiewProduct.photo} alt="" />
          <div>
            <h3 className="text-active mt-2">
              {t("contract_date")} : {wiewProduct.created_at}
            </h3>
            <h3 className="text-active mt-2">
              {t("name")} : {wiewProduct.first_name}{" "}
            </h3>
            <p className="text-active mt-2">
              {" "}
              {t("last_name")} : {wiewProduct.last_name}
            </p>
            <h3 className="text-active mt-2">
              {t("patronymic")} : {wiewProduct.patronymic}
            </h3>
            <p className="text-active mt-2">
              {" "}
              {t("passport_series")} : {wiewProduct.passport_series}
            </p>
            <p className="text-active mt-2">
              {" "}
              {t("employee_name")} : {wiewProduct.employee_name}
            </p>
            <p className="text-active mt-2">
              {" "}
              {t("region")} : {wiewProduct.region}
            </p>
            <p className="text-active mt-2">
              {" "}
              {t("district")} : {wiewProduct.district}
            </p>
            <p className="text-active mt-2">
              {" "}
              {t("quarter")} : {wiewProduct.quarter}
            </p>
            <p className="text-active mt-2">
              {" "}
              {t("street")} : {wiewProduct.street}
            </p>
            <p className="text-active mt-2">
              {" "}
              {t("phone")} : {wiewProduct.phone}
            </p>
          </div>
        </div>
      </CustomDrawer>
      

  
  
 

    </div>
  );
}
