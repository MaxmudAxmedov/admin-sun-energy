import React from "react";
import { EyeIcon, Trash2Icon } from "lucide-react";
import { useGetProduct } from "@/hook/useGetproducts";
import DataTable from "@/components/table";

export default function ProductsTable() {
  const { data, isLoading, error } = useGetProduct();
  console.log(data);

  // const columns = [
  //   { key: "id", title: "ID" },
  //   {
  //     key: "img",
  //     title: "Image",
  //     render: (row) => (
  //       <img src={row.img} alt={row.name} className="w-10 h-10 rounded" />
  //     ),
  //   },
  //   { key: "name", title: "Name" },
  //   { key: "email", title: "Email" },
  //   {
  //     key: "actions",
  //     title: "Actions",
  //     render: (row) => (
  //       <div className="flex gap-2">
  //         <button
  //           onClick={() => alert(`Edit product: ${row.id}`)}
  //           className="px-2 py-1 text-xs bg-blue-500 text-white rounded-md flex items-center gap-1"
  //         >
  //           <EyeIcon size={14} /> Edit
  //         </button>
  //         <button
  //           onClick={() => alert(`Delete product: ${row.id}`)}
  //           className="px-2 py-1 text-xs bg-red-500 text-white rounded-md flex items-center gap-1"
  //         >
  //           <Trash2Icon size={14} /> Delete
  //         </button>
  //       </div>
  //     ),
  //   },
  // ];

  return (
    <div className="p-4">
      <h1 className="text-lg font-semibold mb-4">Prodvducts111</h1>
      {/* <DataTable columns={columns} query={query} /> */}
    </div>
  );
}
