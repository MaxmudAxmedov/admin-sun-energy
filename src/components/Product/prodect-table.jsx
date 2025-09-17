import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const ProdectTable = ({ colums, data, footer }) => {
  return (
    <div className="rounded-[16px] w-full shadow-[0_0_10px_3px_#ccc] p-4">
      <Table>
        <TableHeader>
          <TableRow>
            {colums.map((item) => (
              <TableHead key={item.key} className={`${item.className}`}>
                {item.title}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoices.map((invoice) => (
            <TableRow key={invoice.invoice}>
              <TableCell className="font-medium">{invoice.invoice}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total</TableCell>
            <TableCell className="text-right">$2,500.00</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
};
