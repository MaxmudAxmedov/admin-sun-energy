import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Trash2, UploadCloud } from "lucide-react";
import { t } from "@/utils/i18n";
import { request } from "@/config/request";

export default function ImageUploadForm({ register, name, setValue, imgs }) {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);

  React.useEffect(() => {
    if (imgs) {
      setPreview(imgs)
      setFile(null)
    }
  }, [imgs])

  const handelchange = (e) => {
    const data = e.target.files[0]
    if (data) {
      setFile(data)
      const url = URL.createObjectURL(data);
      setPreview(url)
      setValue(name, data);
    }
  } 
  const handleDelete = () => {
    setFile(null)
    setPreview(null);
    setValue(name, null);
  }

  return (
    <div className="flex flex-col gap-3 w-[180px]">
      <Label>{t("Img")}</Label>

      {preview ? <div>
        <div className="relative w-full h-[170px] rounded-xl overflow-hidden group border">

          <img
            src={preview}
            className="w-full h-full object-cover"
            alt="preview"
          />


          <button
            type="button"

            onClick={handleDelete}
            className="absolute bg-[red] top-1 right-1 opacity-0 group-hover:opacity-100 transition
          bg-red-500 text-white px-2 py-1 text-xs rounded-md border-none"
          >
            <Trash2 className="h-4 w-4 text-[#fff]" />
          </button>
        </div>

      </div> : <div>
        <label className="flex flex-col items-center justify-center gap-2
            w-full h-[170px] border-2 border-dashed border-gray-500
            rounded-xl cursor-pointer bg-bacground
            transition text-gray-400">

          <UploadCloud size={36} />
          <p className="text-sm">Drag and Drop</p>
          <span className="text-xs text-gray-500">or</span>

          <div className="px-4 py-1 bg-gray-600 text-white text-xs rounded-md">
            Browse file
          </div>

          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handelchange}
          />
        </label>
      </div>}

    </div>
  );
}
