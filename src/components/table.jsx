import React, { useEffect, useState } from "react";

export default function DataTable({ columns, apiUrl }) {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  return (
    <div className="w-full p-4 rounded-xl shadow-lg bg-transparent">
      <table className="w-full border-collapse border border-white">
        <thead className="bg-transparent">
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                className="border border-white px-4 py-2 text-left text-sm font-medium text-gray-700"
              >
                {col.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={columns.length} className="text-center py-4">
                Loading...
              </td>
            </tr>
          ) : (
            data.map((row, i) => (
              <tr key={i} className="hover:bg-gray-50">
                {columns.map((col) => (
                  <td
                    key={col.key}
                    className="border border-gray-200 px-4 py-2 text-sm text-gray-600"
                  >
                    {col.render ? col.render(row) : row[col.key]}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

/*

 const columns = [
    { key: "id", title: "ID" },
    { key: "name", title: "Name" },
    { key: "email", title: "Email" },
    {
      key: "actions",
      title: "Actions",
      render: (row) => (
        <div className="flex gap-2">
          <button
            onClick={() => alert(`Edit user: ${row.id}`)}
            className="px-2 py-1 text-xs bg-blue-500 text-white rounded-md"
          >
            Edit
          </button>
          <button
            onClick={() => alert(`Delete user: ${row.id}`)}
            className="px-2 py-1 text-xs bg-red-500 text-white rounded-md"
          >
            Delete
          </button>
        </div>
      ),
    },
  ];



      <DataTable
        columns={columns}
        apiUrl="https://jsonplaceholder.typicode.com/users"
      />

  */
