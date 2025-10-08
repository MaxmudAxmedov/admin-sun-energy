import { DeleteIcon } from "@/assets/icons/delete-icon";
import { EyeIcons } from "@/assets/icons/eye-icons";
import React from "react";
import { useGetProduct } from "@/hook/useGetproducts";
import DataTable from "@/components/table";

export default function ProductsTable() {
  const { data } = useGetProduct();
  console.log(data);

  const columns = [
    { key: "id", title: "ID" },
    { key: "img", title: "Image" },
    { key: "name", title: "Name" },
    { key: "email", title: "Email" },
    {
      key: "actions",
      title: "Actions",
      render: (row) => (
        <div className="flex gap-2">
          <button
            onClick={() => alert(`Edit user: ${row.id}`)}
            className="px-2 py-1 text-xs bg-blue-500 text-white rounded-md  border-none"
          >
            {EyeIcons()}
          </button>
          <button
            onClick={() => alert(`Delete user: ${row.id}`)}
            className="px-2 py-1 text-xs bg-red-500 text-white rounded-md  border-none"
          >
            {DeleteIcon()}
          </button>
        </div>
      ),
    },
  ];
  return;

  //   <DataTable columns={columns} apiUrl="" />;
}
