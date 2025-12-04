import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { t } from "@/utils/i18n";
import { Trash2 } from "lucide-react";
export default function ImageUploadForm({ register, name }) {
  const [file, setFile] = useState(null);


  return (
    <div className="flex flex-col gap-4 w-[200px]">
      <Label>{t("Img")}</Label>
      <label className="flex items-center justify-center w-full h-12 px-4 border-2 border-dashed border-gray-400 rounded-md cursor-pointer hover:border-gray-600">
        <span className="text-gray-500">📁 Choose image</span>
        <input
          type="file"
          accept="image/*"
          className="hidden"
          {...register(name, {
            onChange: (e) => {
              setFile(e.target.files[0]);
            }
          })}
        />
      </label>
    {file && (
  <div className="relative w-32 h-32 group ">
    <img
      src={URL.createObjectURL(file)}
      className="w-full h-full object-cover rounded-md"
      alt="preview"
    />

    <button
      onClick={() => setFile(null)}
      className="absolute bg-[red] top-1 right-1 opacity-0 group-hover:opacity-100 transition
         bg-red-500 text-white px-2 py-1 text-xs rounded-md border-none"
    >
      <Trash2 className="h-4 w-4 text-[#fff]" />
    </button>
  </div>
)}

    </div>
  );
}
