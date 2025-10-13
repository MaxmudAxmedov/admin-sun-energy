// src/components/DataTable.jsx
import React from "react";

// export default function DataTable({ columns, query }) {
//   const { data, isLoading, isError } = query;
//   console.log(data);

//   if (isLoading) {
//     return <div className="p-4 text-center text-gray-500">Loading...</div>;
//   }

//   if (isError) {
//     return (
//       <div className="p-4 text-center text-red-500">Error loading data 😢</div>
//     );
//   }

//   return (
//     <div className="w-full p-4 rounded-xl shadow-lg bg-white dark:bg-gray-900">
//       <table className="w-full border-collapse border border-gray-200">
//         <thead className="bg-gray-100 dark:bg-gray-800">
//           <tr>
//             {columns.map((col) => (
//               <th
//                 key={col.key}
//                 className="border border-gray-300 px-4 py-2 text-left text-sm font-medium text-gray-700 dark:text-gray-200"
//               >
//                 {col.title}
//               </th>
//             ))}
//           </tr>
//         </thead>
//         <tbody>
//           {data?.map((row, i) => (
//             <tr key={i} className="hover:bg-gray-50 dark:hover:bg-gray-800">
//               {columns.map((col) => (
//                 <td
//                   key={col.key}
//                   className="border border-gray-200 px-4 py-2 text-sm text-gray-600 dark:text-gray-300"
//                 >
//                   {col.render ? col.render(row) : row[col.key]}
//                 </td>
//               ))}
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

import React from 'react'

export default function table() {
  return (
    <div>lorem</div>
  )
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
