import React from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

/**
 * @param {Object[]} columns
 * @param {Object[]} data
 */
export default function DataTable({ columns = [], data = [] }) {
    if (!columns.length) return <p>Columns aniqlanmagan.</p>;

    return (
        <div className="max-h-[calc(100vh-200px)] overflow-y-auto border rounded-md">
            <Table className="w-full border-collapse">
                <TableHeader className="sticky top-0 z-10 bg-background shadow-sm">
                    <TableRow>
                        {columns.map((col) => (
                            <TableHead
                                key={col.key}
                                className="capitalize font-semibold text-sm border-b"
                            >
                                {col.label}
                            </TableHead>
                        ))}
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {data.length ? (
                        data.map((row, index) => (
                            <TableRow key={row.id || index}>
                                {columns.map((col, colIndex) => (
                                    <TableCell
                                        key={col.key || colIndex}
                                        className="text-sm"
                                    >
                                        {col.render
                                            ? col.render(
                                                  row[col.key],
                                                  row,
                                                  index
                                              )
                                            : row[col.key]}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell
                                colSpan={columns.length}
                                className="text-center py-6"
                            >
                                Ma'lumot topilmadi
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
}
