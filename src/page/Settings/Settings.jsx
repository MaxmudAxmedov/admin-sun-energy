import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { t } from "@/utils/i18n";
import { useMutation } from "@tanstack/react-query";
import React from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";

export default function Settings() {
  // const nav = useNavigate();

  // const location = useLocation();
  // const { params, page } = location.state || {};
  // const { mutate } = useMutation(postProductCatecoriyes(params));
  // console.log(page);
  // const { handleSubmit, register, reset } = useForm();
  // const submit = (data) => {
  //   mutate(data, {
  //     onSuccess: () => nav("/products_category"),
  //   });
  //   reset();
  // };
  // if (page == "pcategory") {
  //   return (
  //     <div>
  //       <h1 className="my-4 text-active">{t(page)}</h1>
  //       <form onSubmit={handleSubmit(submit)}>
  //         <input type="text" {...register("name")} />
  //         <Button className="bg-active" type="submit">
  //           Send
  //         </Button>
  //       </form>
  //     </div>
  //   );
  // }
  return <div>settings</div>;
}
