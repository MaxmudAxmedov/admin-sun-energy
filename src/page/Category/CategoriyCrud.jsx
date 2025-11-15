import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { getProductIdQeriy, postProductCatecoriyes } from "@/queries";
import { t } from "@/utils/i18n";
import { Label } from "@radix-ui/react-label";
import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function CategoriyCrud() {
  const {id} = useParams();

  const {data , isLoading} = useQuery(
    getProductIdQeriy(id))
  const ProductC = useMemo(()=> data?.data?.name, [data])
  // const {mutet} = useMutation(postProductCatecoriyes())


  
  
  
  console.log(ProductC);
  


  const nav = useNavigate();
  const clean = () => {
    nav("/products_category");
  };
  return (
    <div className="text-active py-5 px-10">
      <h1 className="pb-2">Create Product Category</h1>
      <Form >
        <div className="pl-3 w-[500px]">
          <Label htmlFor="id">
            Product category name*
            <Input
            defaultValue={ProductC}
              className="input shadow-lg w-56 transition-all focus:w-64 outline-none"
              type="text"
            />
          </Label>
        </div>
        <div className="pt-[20px] flex gap-3 items-center pl-3 ">
          <Button className="border-none transition-all rounded-md bg-black text-[#fff] hover:rounded-xl ">
            Submit
          </Button>
          <Button
            onClick={clean}
            className="border-none rounded-md bg-button transition-all text-[#fff] hover:rounded-xl hover:bg-[#244344] "
          >
            {t("clean")}
          </Button>
        </div>
      </Form>
    </div>
  );
}
