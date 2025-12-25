import { Button } from "@/components/ui/button";
import ImageUploadForm from "@/components/ui/imgupload";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { editProductDAtaMutation, getProductQuery, getproductsidQuery, postProductsMutation } from "@/queries";
import { t } from "@/utils/i18n";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

export default function ProductsCreate() {
    const nav = useNavigate()
    const { handleSubmit, register, reset, setValue } = useForm()

    const { id } = useParams()

    const [params, setparams] = useState(null)
    const [boolean, setboolean] = useState(false);

    const { data: d } = useQuery(getproductsidQuery(id))
    const productId = d?.data?.id?.length === 36 ? d.data.id : id;

    const defaultValues = useMemo(() => d?.data || d);
    const { mutate, isPending } = useMutation({ mutationFn: (params) => postProductsMutation(params) })
    const { data } = useQuery(getProductQuery(params))
    const categories = useMemo(() => data?.data?.Data?.product_categories || [], [data])
    const mut = useMutation({ mutationFn: (params, productId) => editProductDAtaMutation(params, productId) })
    const queryClient = useQueryClient()
    React.useEffect(() => {
        if (defaultValues) reset(defaultValues)
    }, [defaultValues, reset])
    const imgs = d?.data?.photo

    if (isPending) {
        <div>Loading...</div>
    }

    const powerSystems = [
        { id: "on-grid", name: "On-Grid" },
        { id: "off-grid", name: "Off-Grid" },
        { id: "hybrid", name: "Hybrid" },
    ];
    console.log(id);



    const Submit = (data) => {
        const formData = new FormData()
        const { name, count_of_product, watt, price, mark_up, power_system, category_id, description, selling_price, photo } = data

        formData.append("name", name),
            formData.append("count_of_product", Number(count_of_product)),
            formData.append("selling_price", Number(selling_price)),
            formData.append("category_id", category_id),
            formData.append("watt", Number(watt)),
            formData.append("show_on_landing", boolean),
            formData.append("price", Number(price)),
            formData.append("mark_up", Number(mark_up)),
            formData.append("power_system", power_system),
            formData.append("description", description),
            formData.append("photo", photo)
        if (!id) {
            mutate(formData, {
                onSuccess: () => {
                    reset();
                    toast.success("ok create");
                    nav("/products");
                },
                onError: (error) => {
                    toast.error(error.message);
                }
            })
        } else if (id) {
            formData.append("id", productId);
            mut.mutate({ formData, productId }, {
                onSuccess: () => {
                    queryClient.invalidateQueries({ queryKey: "products-all" }),
                        nav("/products")
                    toast("ok edit")
                },
                onError: (error) => {
                    toast.error(error.message)
                }
            })
        }
    }
    return (
   <div className="py-2 overflow-hidden">
  <div className="flex justify-between items-center pr-10">
    <h1>{t("create_product")}</h1>
   
  </div>

  <form onSubmit={handleSubmit(Submit)} defaultValue={defaultValues}>

    <div className="grid grid-cols-4 gap-4 px-5 py-4 max-w-[1100px]">
      <Input
        label={t("product_name")}
        {...register("name")}
        placeholder={t("Enter_Product_name")}
      />

      <Input
        label={t("Count_of_product")}
        {...register("count_of_product")}
        placeholder={t("enter_count_of_product")}
      />

      <Input
        label={t("selling_price")}
        {...register("selling_price")}
        placeholder={t("selling_price")}
      />

      <label className="flex flex-col gap-1">
        {t("category_id")}
        <select
          className="p-3 rounded-xl bg-white text-active border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          {...register("category_id")}
        >
          {categories.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>
      </label>
    </div>

   
    <div className="grid grid-cols-4 gap-4 px-5 py-4 max-w-[1100px]">
      <Input
        label={t("watt")}
        {...register("watt")}
        placeholder={t("watt")}
      />

      <Input
        label={t("price")}
        {...register("price")}
        placeholder={t("price")}
      />

      <Input
        label={t("mark_up")}
        {...register("mark_up")}
        placeholder={t("mark_up")}
      />

      <label className="flex flex-col gap-1">
        {t("power_system")}
        <select
          className="p-3 rounded-xl bg-white text-active border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          {...register("power_system")}
        >
          {powerSystems.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>
      </label>
    </div>

    <div className="flex flex-wrap gap-5">
        <div className="flex gap-4 px-5 py-4 max-w-[1100px] items-start">
      <div className="col-span-3">
        <ImageUploadForm
          register={register}
          name={"photo"}
          setValue={setValue}
          imgs={imgs}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-active">{t("description")}</label>
        <Textarea
          {...register("description")}
          className="h-[170px] text-active resize-none"
          placeholder={t("description")}
        />
      </div>
    </div>
          <div  {...register("show_on_landing")} className="mt-[50px] h-10 inline-flex items-center p-1 rounded-lg gap-1 w-fit bg-shadows dark:bg-gray-800">
  
  <button
    type="button"
         
    onClick={() => setboolean(true)}
    className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all duration-300
      ${boolean
        ? "bg-icons text-[#fff] shadow-sm"
        : "bg-white text-black hover:bg-gray-100 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
      }`}
  >
    {t("show")}
  </button>


  <button
    type="button"
    onClick={() => setboolean(false)}
    className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all duration-300
      ${!boolean
        ? "bg-icons text-[#fff] shadow-sm"
        : "bg-white text-[#fff]hover:bg-gray-100 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
      }`}
  >
    {t("show_not")}
  </button>
</div>
 


<div  className='w-[100%] flex  items-center gap-2  '>

 <Link
      to="/products"className='py-[9px] px-6 bg-button text-aside rounded-md' >
      back
    </Link>
  <Button
      type="submit"
      className=" w-[160px] px-6 py-2 bg-icons text-aside font-semibold rounded-lg shadow-md
                hover:bg-aside  hover:text-black transition-all duration-200
                active:bg-blue-800 active:shadow-sm border-none"
    >
      Send
    </Button>


</div>
    </div>
  </form>
</div>


    );
}