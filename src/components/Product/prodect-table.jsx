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

// import { useForm } from 'react-hook-form';

// const FileUploadForm = () => {
//   const { register, handleSubmit, watch } = useForm();
//   const selectedFile = watch("image");

//   const onSubmit = (data) => {
//     // Handle file upload logic
//     console.log(data.image[0]);
//   };

//   return (
//     <form onSubmit={handleSubmit(onSubmit)}>
//       <input
//         type="file"
//         {...register("image", {
//           required: "Please select an image",
//           validate: {
//             fileSize: (value) => {
//               if (!value[0]) return true;
//               return value[0].size <= 2000000 || "File size must be less than 2MB";
//             },
//             fileType: (value) => {
//               if (!value[0]) return true;
//               return (
//                 ["image/jpeg", "image/png", "image/gif"].includes(value[0].type) ||
//                 "Only JPEG, PNG, and GIF files are allowed"
//               );
//             },
//           },
//         })}
//       />
//       <button type="submit">Upload</button>
//     </form>
//   );
// };
