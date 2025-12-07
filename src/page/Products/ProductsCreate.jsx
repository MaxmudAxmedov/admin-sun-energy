import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import ImageUploadForm from "@/components/ui/imgupload";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { postProductsMutation } from "@/queries";
import { t } from "@/utils/i18n";
import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

export default function ProductsCreate() {
  const [params, setparams] = useState(null)
  // const { mutate } = useMutation(postProductsMutation(params))

  const {handleSubmit, register, reset} = useForm()


  const Submit = (data) => {
console.log(data)
  }

  return (
    <div className="py-2">
      <div className="flex justify-between items-center pr-10 " >
        <h1>{t("create_product")}</h1>
        <Link to="/products" className="py-[7px] px-5 bg-button text-aside rounded-md cursor-pointer ">
          back
        </Link>
      </div>
      <Form onSubmit={handleSubmit(Submit)}>
        <div className="flex px-5 py-4 max-w-[800px] justify-between items-center gap-4 flex-wrap">
          <label className="text-active" htmlFor="name">
            {" "}
            {t("product_name")}*
            <Input
             {...register("name")}
              className="max-w-[400px] transition-all focus:w-64 outline-none text-active"
              placeholder={t("Enter_Product_name")}
            />
          </label>
          <label className="text-active" htmlFor="name">
            {" "}
            {t("Count_of_product")}*
            <Input
             {...register("count_of_product")}
              className="max-w-[400px] transition-all focus:w-64 outline-none text-active"
              placeholder={t("enter_count_of_product")}
            />
          </label>
          <label className="text-active" htmlFor="name">
            {" "}
            {t("pcategory")}*
            <Input
             {...register("pcategory")}
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
             {...register("watt")}
              className="max-w-[400px] transition-all focus:w-64 outline-none text-active"
              placeholder={t("watt")}
            />
          </label>
          <label className="text-active" htmlFor="name">
            {" "}
            {t("price")}*
            <Input
             {...register("price")}
              className="max-w-[400px] transition-all focus:w-64 outline-none text-active"
              placeholder={t("price")}
            />
          </label>
          <label className="text-active" htmlFor="name">
            {" "}
            {t("mark_up")}
            <Input
             {...register("mark_up")}
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
            {...register("power_system")}
              className="max-w-[400px] transition-all focus:w-64 outline-none text-active"
              placeholder={t("power_system")}
            />
          </label>
        </div>
          <div className="grid px-5 w-[400px] gap-2">
            <Label className="text-active" htmlFor="message">
              {t("description")}
            </Label>
            <Textarea
            {...register("description")}
              className="w-[400px] h-[100px] text-active resize-none"
              id="message"
              placeholder={t("description")}
            />
          </div>
        <div className="flex px-5 py-4 max-w-[800px] justify-between items-start gap-4 flex-wrap">
         <ImageUploadForm register={register} name={"photo"}/>
        </div>
        <Button type="submit"> send</Button>
      </Form>
    </div>
  
  );
}