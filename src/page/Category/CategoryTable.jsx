import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React from "react";
import { useQueriyPruuctCategoriya } from "./query/useQueriyPruuctCategoriya";
import { useTranslation } from "react-i18next";


export default function CategoryTable() {
    
  const {t} = useTranslation()
  const { data, isLoading, error, isError } = useQueriyPruuctCategoriya();
  if (isError) {
    return <h1>{error.message}</h1>;
  }

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="p-4">
        <h1 className="my-4 text-active">{t("pcategory")}</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>No</TableHead>
            <TableHead>{t("productName")}</TableHead>
            <TableHead>{t("productCategoriya")}</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {data?.map((item, index) => (
            <TableRow
              key={item.id}
              className="border-b   border-active hover:bg-active  hover:text-background transition-colors duration-600"
            >
              <TableCell className="p-3 rounded-[10px]  ">
                {index + 1}
              </TableCell>
              <TableCell className="p-3 rounded-[10px] ">
                {item.name}
              </TableCell>
              <TableCell className="p-3 rounded-[10px]  ">
                {item.created_at}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
