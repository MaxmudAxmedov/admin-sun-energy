import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { t } from "@/utils/i18n";
import React from "react";

export default function ProductsCreate() {
  const handelChange = (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("img", file);

  };
  return (
    <div className="py-2">
      <h1>{t("create_product")}</h1>
      <Form>
        <div className="flex px-5 py-4 max-w-[800px] justify-between items-center gap-4 flex-wrap">
          <label className="text-active" htmlFor="name">
            {" "}
            {t("product_name")}*
            <Input
              className="max-w-[400px] transition-all focus:w-64 outline-none text-active"
              placeholder={t("Enter_Product_name")}
            />
          </label>
          <label className="text-active" htmlFor="name">
            {" "}
            {t("Count_of_product")}*
            <Input
              className="max-w-[400px] transition-all focus:w-64 outline-none text-active"
              placeholder={t("enter_count_of_product")}
            />
          </label>
          <label className="text-active" htmlFor="name">
            {" "}
            {t("pcategory")}*
            <Input
              className="max-w-[400px] transition-all focus:w-64 outline-none text-active"
              placeholder={t("pcategory")}
            />
          </label>
        </div>
        <div className="flex px-5 py-4 max-w-[800px] justify-between items-center gap-4 flex-wrap">
          <label className="text-active" htmlFor="name">
            {" "}
            {t("watt")}
            <Input
              className="max-w-[400px] transition-all focus:w-64 outline-none text-active"
              placeholder={t("watt")}
            />
          </label>
          <label className="text-active" htmlFor="name">
            {" "}
            {t("price")}*
            <Input
              className="max-w-[400px] transition-all focus:w-64 outline-none text-active"
              placeholder={t("price")}
            />
          </label>
          <label className="text-active" htmlFor="name">
            {" "}
            {t("mark_up")}
            <Input
              className="max-w-[400px] transition-all focus:w-64 outline-none text-active"
              placeholder={t("mark_up")}
            />
          </label>
        </div>
        <div className="flex px-5 py-4 max-w-[800px] justify-between items-start gap-4 flex-wrap">
          <label className="text-active pt-3" htmlFor="name">
            {" "}
            {t("power_system")}
            <Input
              className="max-w-[400px] transition-all focus:w-64 outline-none text-active"
              placeholder={t("power_system")}
            />
          </label>
          <div className="grid w-[400px] gap-2">
            <Label className="text-active" htmlFor="message">
              {t("description")}
            </Label>
            <Textarea
              className="w-[400px] h-[100px] text-active resize-none"
              id="message"
              placeholder={t("description")}
            />
          </div>
        </div>
        <div className="flex px-5 py-4 max-w-[800px] justify-between items-start gap-4 flex-wrap">
          <Input type="file" onChange={handelChange} />
          {/* <img
             src={FormData}
             alt="uploaded"
            className="w-full h-[200px] object-cover rounded-md"
          /> */}
        </div>
      </Form>
    </div>
  );
}
