import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {  postExpressMutation } from "@/queries";
import { t } from "@/utils/i18n";
import { useMutation } from "@tanstack/react-query";
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function AdditionalCreate() {
    
  const nav = useNavigate();
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm();


  const mutation = useMutation({
    mutationFn: (params) => postExpressMutation(params),
  });

 
 

  const Submit = (data) => {
    const payload = {
      extra_expenses: [
        {
          name: data.name,
          amount: Number(data.amount),
          description: data.description,
        },
      ],
    };

    mutation.mutate(payload, {
      onSuccess: () => {
        reset();
        toast.success("ok create");
        nav("/additional_expense");
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });
  };
  return (
    <div>
      <h2>{t("add_Additional_expense")}</h2>
      <form
        onSubmit={handleSubmit(Submit)}
        className="max-w-[800px] mt-[50px] "
      >
        <div className="flex gap-5 mb-[20px]">
          <div>
            <Input
            type="string"
            label={t("name")}
            plesholder={t("name")}
            {...register("name", {
              required: { value: true, message: t("required") },
            })}
          />
             {errors.name ? <p className="text-red">{errors.name.message}</p>: ""}
          </div>
          <div>
          <Input type="number" label={t("price")} {...register("amount",{
             required: { value: true, message: t("required") },
          })} />
           {errors.amount ? <p className="text-red">{errors.amount.message}</p>: ""}
          </div>
        </div>
        <div>
          <label className="text-active">{t("description")}</label>
          <Textarea
            {...register("description")}
            className="h-[170px] text-active resize-none"
            placeholder={t("description")}
          />
        </div>
        <Button   className=" mt-10 ml-[76%] mr-10 w-[200px] px-6 py-2 bg-icons text-aside font-semibold rounded-lg shadow-md
       hover:bg-aside  hover:text-black transition-all duration-200
       active:bg-blue-800 active:shadow-sm border-none" type="send">
          {mutation.isPending ? "loading ..." : "send"}
        </Button>
      </form>
    </div>
  );
}
