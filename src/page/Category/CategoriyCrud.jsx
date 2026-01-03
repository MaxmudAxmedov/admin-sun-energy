import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { editProductcategoryePut, getProductIdQeriy, postProductCatecoriyPost } from "@/queries";
import { t } from "@/utils/i18n";
import { Label } from "@radix-ui/react-label";
import { QueryClient, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { LoaderIcon } from "lucide-react";
import React, { useMemo } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

export default function CategoriyCrud() {
  const queryClient = useQueryClient()
  const { handleSubmit, reset, register, formState:{errors} } = useForm()
  const { id } = useParams();

  const { data, isLoading } = useQuery(getProductIdQeriy(id))
  const ProductC = useMemo(() => data || [data])
  const mut = useMutation({ mutationFn: (params) => editProductcategoryePut(params) })
  const mutation = useMutation({ mutationFn: (params) => postProductCatecoriyPost(params) })
  

  const Defaultvalue = ProductC?.data?.name || "";


  const handelSubmit = (data) => {
    if (id) {
      mut.mutate({ id, ...data }, {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["product-categories", id] });
          console.log(data);

          reset();
          nav("/products_category");
          toast.success("Product category updated successfully")
        },
        onError: (error) => {
          toast.error(error.message)
        }
      })
    } else {
      mutation.mutate(data, {
        onSuccess: () => {
          reset()
          nav("/products_category");
          toast.success("Product category created successfully")
        },
        onError: (error) => {
          toast.error(error.message)
        }
      })

    }
  }


  const nav = useNavigate();
  const clean = () => {
    nav("/products_category");
  };



  if (isLoading || mut.isPending || mutation.isPending) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoaderIcon className="animate-spin h-10 w-10 text-gray-500" />
      </div>
    )
  }
  return (
    <div className="text-active py-5 px-10">
      <h1 className="pb-2">Create Product Category</h1>

      <form onSubmit={handleSubmit(handelSubmit)}>
        <div className="pl-3 w-[500px]">
          <Label htmlFor="id">
            {t("product_category_name")}
            <Input
              defaultValue={Defaultvalue}
              {...register("name",{
                required:{value:true, message:t("required")},
                minLength:{value: 3, message:"min 3 text"}
              })}
              type="text"
            />
            {errors.name ? <p className="text-red">{errors.name.message}</p>: ""}
          </Label>
        </div>
        <div className="pt-[20px] flex gap-3 items-center pl-3 ">
          <Button type="submit" className="border-none transition-all rounded-md bg-black text-[#fff] hover:rounded-xl ">
            Submit
          </Button>
          <Button
            onClick={clean}
            className="border-none rounded-md bg-button transition-all text-[#fff] hover:rounded-xl hover:bg-[#244344] "
          >
            {t("clean")}
          </Button>
        </div>
      </form>
    </div>
  );
}
