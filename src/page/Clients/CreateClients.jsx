import { Button } from "@/components/ui/button";
import ImageUploadForm from "@/components/ui/imgupload";
import { Input } from "@/components/ui/input";
import {
  editBussinesmutation,
  getClientBusinessIdQuery,
  getcustomerIdQuery,
  postBusinessMutation,
  postcostumermutaion,
  putcustumermMtation,
} from "@/queries";
import { t } from "@/utils/i18n";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

export default function CreateClients() {
  const [state, setstate] = React.useState(() => {
    const savedState = localStorage.getItem("client_form_state");
    return savedState ? Number(savedState) : 1;
  });

  const { id } = useParams();
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery(getcustomerIdQuery(id));

  const nav = useNavigate();
  const {
    handleSubmit,
    register,
    reset,
    setValue,
    formState: { errors },
  } = useForm();
  const DD = useMemo(() => data?.data || data);
  const mutateedit = useMutation({
    mutationFn: (params) => putcustumermMtation(params),
  });
  const mutation = useMutation({
    mutationFn: (params) => postcostumermutaion(params),
  });

  const imgs = data?.data?.file;

  const costumer = (data) => {
    const formData = new FormData();
    const {
      first_name,
      last_name,
      patronymic,
      phone,
      street,
      region,
      district,
      passport_series,
      quarter,
    } = data;

    const fullPhoneNumber = `${phone}`;

    formData.append("first_name", first_name);
    formData.append("last_name", last_name);
    formData.append("patronymic", patronymic);
    formData.append("phone", fullPhoneNumber);
    formData.append("passport_series", passport_series);
    formData.append("street", street);
    formData.append("region", region);
    formData.append("district", district);
    formData.append("quarter", quarter);
    formData.append("file", data.file);

    if (!id) {
      mutation.mutate(formData, {
        onSuccess: () => {
          reset();
          nav("/clients");
          toast.success("ok create");
        },
        onError: (error) => {
          toast.error(error.message);
        },
      });
    } else if (id) {
      formData.append("id", id);
      mutateedit.mutate(formData, {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["client-customers"] });
          nav("/clients");
          toast.success("ok edit");
        },
        onError: (error) => {
          toast.error(error.message);
        },
      });
    }
  };

  const {
    handleSubmit: handleSubmitsecond,
    register: registersecond,
    reset: resetsecond,
    setValue: setvaluesecond,
    formState: { errors: errorssecond },
  } = useForm();

  const {
    data: results,
    isLoading: load,
    isError: err,
    error: er,
  } = useQuery(getClientBusinessIdQuery(id));

  const result = useMemo(() => results?.data || null, [results]);

  const imgdata = results?.data?.file;

  const businessmutations = useMutation({
    mutationFn: (params) => postBusinessMutation(params),
  });
  const businessMutation = useMutation({
    mutationFn: (params) => editBussinesmutation(params),
  });

  const business = (res) => {
    const Businessformdata = new FormData();
    const {
      full_name,
      phone,
      company_name,
      account_number,
      inn_number,
      info_number,
      region,
      district,
      street,
      quarter,
    } = res;
    Businessformdata.append("full_name", full_name),
      Businessformdata.append("phone", phone),
      Businessformdata.append("company_name", company_name),
      Businessformdata.append("account_number", Number(account_number)),
      Businessformdata.append("inn_number", Number(inn_number)),
      Businessformdata.append("info_number", Number(info_number)),
      Businessformdata.append("region", region),
      Businessformdata.append("district", district),
      Businessformdata.append("street", street),
      Businessformdata.append("quarter", quarter),
      Businessformdata.append("file", res.file);

    if (!id) {
      businessmutations.mutate(Businessformdata, {
        onSuccess: () => {
          resetsecond();
          nav("/clients"), toast.success("ok create");
        },
        onError: (error) => {
          toast.error(error.message);
        },
      });
    } else if (id) {
      Businessformdata.append("id", id),
        businessMutation.mutate(Businessformdata, {
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["client-business"] });
            nav("/clients");
            toast.success("ok edit");
          },
          onError: (error) => {
            toast.error(error.message);
          },
        });
    }
  };
  React.useEffect(() => {
    if (DD) {
      reset(DD);
    }
    if (results?.data) {
      resetsecond(results?.data);
    }
    localStorage.setItem("client_form_state", state);
  }, [DD, state, resetsecond, results]);

  return (
    <div>
      {isLoading || load ? (
        <div>LOADING...</div>
      ) : (
        <div>
          <div className="py-2 px-7">
            <h2>Edit client</h2>
          </div>
          <div className="w-[500px] flex py-2 px-4  bg-shadows justify-between gap-2 rounded-md mb-5">
            <button
              disabled={!data} 
              onClick={() => setstate(1)}
              className={`w-[240px] transform-all duration-300 text-center p-1 m-0 rounded-md text-bll border-none
    ${
      !data
        ? "bg-gray-300 cursor-not-allowed opacity-50" 
        : state == 1
        ? "bg-icons cursor-pointer"
        : "bg-shadows cursor-pointer" 
    }
  `}
            >
              {t("natural_person")}
            </button>

            <button
              disabled={!results} 
              onClick={() => setstate(2)}
              className={`w-[240px] p-1 rounded-md text-center
    ${
      !results
        ? "bg-gray-300 cursor-not-allowed opacity-50" 
        : state == 1
        ? "bg-shadows cursor-pointer"
        : "bg-icons cursor-pointer"
    }
    text-bll border-none
  `}
            >
              {t("legal_entity")}
            </button>
          </div>
          {state == 1 && (
            // <form onSubmit={handleSubmit(costumer)} defaultValue={DD}>
            //   <div className="flex justify-between items-center gap-2 max-w-[800px] ">
            //     <Input
            //       type="text"
            //       label={t("name")}
            //       {...register("first_name")}
            //       placeholder={t("name")}
            //     />
            //     <Input
            //       type="text"
            //       label={t("last_name")}
            //       {...register("last_name")}
            //       placeholder={t("last_name")}
            //     />
            //     <Input
            //       type="text"
            //       label={t("patronymic")}
            //       {...register("patronymic")}
            //       placeholder={t("patronymic")}
            //     />
            //   </div>
            //   <div className="flex justify-between items-center gap-2 max-w-[800px] ">
            //     <Input
            //       type="text"
            //       label={t("phone")}
            //       {...register("phone")}
            //       placeholder={t("phone")}
            //     />
            //     <Input
            //       type="text"
            //       label={t("passport_series")}
            //       {...register("passport_series")}
            //       placeholder={t("passport_series")}
            //     />
            //     <Input
            //       type="text"
            //       label={t("region")}
            //       {...register("region")}
            //       placeholder={t("region")}
            //     />
            //   </div>
            //   <div className="flex justify-between items-center gap-2 max-w-[800px] ">
            //     <Input
            //       type="text"
            //       label={t("district")}
            //       {...register("district")}
            //       placeholder={t("district")}
            //     />
            //     <Input
            //       type="text"
            //       label={t("street")}
            //       {...register("street")}
            //       placeholder={t("street")}
            //     />
            //     <Input
            //       type="text"
            //       label={t("quarter")}
            //       {...register("quarter")}
            //       placeholder={t("quarter")}
            //     />
            //   </div>
            //   <div>
            //     <ImageUploadForm
            //       imgs={imgs}
            //       register={register}
            //       setValue={setValue}
            //       name={"file"}
            //     />
            //   </div>
            //   <div className="w-[100%] flex justify-center items-center gap-2 ">
            //     <Link
            //       to={"/clients"}
            //       className="py-[9px] px-6 bg-button text-aside rounded-md"
            //     >
            //       back
            //     </Link>
            //     <Button
            //       className="w-[200px] px-6 py-2 bg-icons text-aside font-semibold rounded-lg shadow-md
            //  hover:bg-aside  hover:text-black transition-all duration-200
            //  active:bg-blue-800 active:shadow-sm border-none"
            //       type="submit"
            //     >
            //       {mutateedit.isPending || mutation.isPending ? (
            //         <div>Loding...</div>
            //       ) : (
            //         "Send"
            //       )}
            //     </Button>
            //   </div>
            // </form>
            <form onSubmit={handleSubmit(costumer)} defaultValue={DD}>
              <div className="flex justify-between gap-2 max-w-[800px]">
                {/* FIRST NAME */}
                <div>
                  <Input
                    type="text"
                    label={t("name")}
                    {...register("first_name", {
                      required: { value: true, message: t("required") },
                    })}
                    placeholder={t("name")}
                  />
                  {errors.first_name && (
                    <span className="text-red text-sm">
                      {errors.first_name.message}
                    </span>
                  )}
                </div>

                {/* LAST NAME */}
                <div>
                  <Input
                    type="text"
                    label={t("last_name")}
                    {...register("last_name", {
                      required: { value: true, message: t("required") },
                    })}
                    placeholder={t("last_name")}
                  />
                  {errors.last_name && (
                    <span className="text-red text-sm">
                      {errors.last_name.message}
                    </span>
                  )}
                </div>

                {/* PATRONYMIC */}
                <div>
                  <Input
                    type="text"
                    label={t("patronymic")}
                    {...register("patronymic", {
                      required: { value: true, message: t("required") },
                    })}
                    placeholder={t("patronymic")}
                  />
                  {errors.patronymic && (
                    <span className="text-red text-sm">
                      {errors.patronymic.message}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex justify-between gap-2 max-w-[800px]">
                {/* PHONE */}
                <div>
                  <Input
                    type="text"
                    label={t("phone")}
                    {...register("phone", {
                      required: { value: true, message: t("required") },
                      pattern: {
                        value: /^[0-9]+$/,
                        message: t("only_numbers"),
                      },
                    })}
                    onInput={(e) => {
                      e.target.value = e.target.value.replace(/\+/g, "");
                    }}
                    placeholder={t("phone")}
                  />
                  {errors.phone && (
                    <span className="text-red text-sm">
                      {errors.phone.message}
                    </span>
                  )}
                </div>

                {/* PASSPORT */}
                <div>
                  <Input
                    type="text"
                    label={t("passport_series")}
                    {...register("passport_series", {
                      required: { value: true, message: t("required") },
                      pattern: {
                        value: /^[A-Z]{2}[0-9]{7}$/,
                        message: "AA1234567 formatida bo‘lishi kerak",
                      },
                      minLength: {
                        value: 9,
                        message: "9 ta belgi bo‘lishi kerak",
                      },
                      maxLength: {
                        value: 9,
                        message: "9 ta belgi bo‘lishi kerak",
                      },
                    })}
                    onInput={(e) => {
                      e.target.value = e.target.value.toUpperCase();
                    }}
                    placeholder="AA1234567"
                  />
                  {errors.passport_series && (
                    <span className="text-red text-sm">
                      {errors.passport_series.message}
                    </span>
                  )}
                </div>

                {/* REGION */}
                <div>
                  <Input
                    type="text"
                    label={t("region")}
                    {...register("region", {
                      required: { value: true, message: t("required") },
                    })}
                    placeholder={t("region")}
                  />
                  {errors.region && (
                    <span className="text-red text-sm">
                      {errors.region.message}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex justify-between gap-2 max-w-[800px]">
                {/* DISTRICT */}
                <div>
                  <Input
                    type="text"
                    label={t("district")}
                    {...register("district", {
                      required: { value: true, message: t("required") },
                    })}
                    placeholder={t("district")}
                  />
                  {errors.district && (
                    <span className="text-red text-sm">
                      {errors.district.message}
                    </span>
                  )}
                </div>

                {/* STREET */}
                <div>
                  <Input
                    type="text"
                    label={t("street")}
                    {...register("street", {
                      required: { value: true, message: t("required") },
                    })}
                    placeholder={t("street")}
                  />
                  {errors.street && (
                    <span className="text-red text-sm">
                      {errors.street.message}
                    </span>
                  )}
                </div>

                {/* QUARTER */}
                <div>
                  <Input
                    type="text"
                    label={t("quarter")}
                    {...register("quarter", {
                      required: { value: true, message: t("required") },
                    })}
                    placeholder={t("quarter")}
                  />
                  {errors.quarter && (
                    <span className="text-red text-sm">
                      {errors.quarter.message}
                    </span>
                  )}
                </div>
              </div>

              {/* IMAGE */}
              <ImageUploadForm
                imgs={imgs}
                register={register}
                setValue={setValue}
                name="file"
              />

              <div className="flex justify-center gap-2 mt-4">
                <Link
                  to={"/clients"}
                  className="py-[9px] px-6 bg-button text-aside rounded-md"
                >
                  back
                </Link>
                <Button
                  className="w-[200px] px-6 py-2 bg-icons text-aside font-semibold rounded-lg shadow-md
 hover:bg-aside  hover:text-black transition-all duration-200
 active:bg-blue-800 active:shadow-sm border-none"
                  type="submit"
                >
                  {mutateedit.isPending || mutation.isPending ? (
                    <div>Loding...</div>
                  ) : (
                    "Send"
                  )}
                </Button>
              </div>
            </form>
          )}
          {state == 2 && (
            //             <form onSubmit={handleSubmitsecond(business)} defaultValue={result}>
            //               <div className="flex justify-between items-center gap-2 max-w-[800px] ">
            //                 <div>
            //                   <Input
            //                     type="text"
            //                     label={t("full_name")}
            //                     {...registersecond("full_name",{
            //                       required: { value: true, message: t("required") },

            //                     })}
            //                     placeholder={t("full_name")}
            //                   />
            //                   {errorssecond.full_name && (
            //                     <span className="text-red text-sm">
            //                       {errorssecond.full_name.message}
            //                     </span>
            //                   )}
            //                 </div>

            //                 <div>
            //                   <Input
            //                   type="text"
            //                   label={t("phone")}
            //                   {...registersecond("phone",{
            //                     required:{value:true,message:t("required")},
            //                   })}
            //                   placeholder={t("phone")}
            //                 />
            //                 {errorssecond.phone && (
            //                   <span className="text-red text-sm">
            //                     {errorssecond.phone.message}
            //                   </span>
            //                 )}
            //                 </div>
            //                 <div>
            //                   <Input
            //                   type="text"
            //                   label={t("company_name")}
            //                   {...registersecond("company_name",{
            //                     required:{value:true,message:t("required")},
            //                   })}
            //                   placeholder={t("company_name")}
            //                 />
            //                 {errorssecond.company_name && (
            //                   <span className="text-red text-sm">
            //                     {errorssecond.company_name.message}
            //                   </span>
            //                 )}
            //                 </div>
            //               </div>
            //               <div className="flex justify-between items-center gap-2 max-w-[800px] ">
            //               <div>
            //                   <Input
            //                   type="text"
            //                   label={t("inn_number")}
            //                   {...registersecond("inn_number",{
            //                     required:{value:true,message:t("required")},
            //                   })}
            //                   placeholder={t("inn_number")}
            //                   {errorssecond.inn_number && (
            //                     <span className="text-red text-sm">
            //                       {errorssecond.inn_number.message}
            //                     </span>
            //                   )}
            //                 />
            //               </div>
            //                 <div>
            //                   <Input
            //                   type="text"
            //                   label={t("account_number")}
            //                   {...registersecond("account_number",{
            //                     required:{value:true,message:t("required")},
            //                   })}
            //                   placeholder={t("account_number")}
            //                 />
            //                 {errorssecond.account_number && (
            //                   <span className="text-red text-sm">
            //                     {errorssecond.account_number.message}
            //                   </span>
            //                 )}
            //                 </div>
            //                <div>
            //                  <Input
            //                   type="text"
            //                   label={t("info_number")}
            //                   {...registersecond("info_number")}
            //                   placeholder={t("info_number",{
            //                     required:{value:true,message:t("required")},
            //                   })}
            //                 />
            //                 {errorssecond.info_number && (
            //                   <span className="text-red text-sm">
            //                     {errorssecond.info_number.message}
            //                   </span>
            //                 )}
            //                </div>
            //               </div>
            //               <div className="flex justify-between items-center gap-2 max-w-[800px] ">
            //                 <div>
            //                   <Input
            //                   type="text"
            //                   label={t("region")}
            //                   {...registersecond("region",{
            //                     required:{value:true,message:t("required")},
            //                   })}
            //                   placeholder={t("region")}
            //                 />
            //                 {errorssecond.region && (
            //                   <span className="text-red text-sm">
            //                     {errorssecond.region.message}
            //                   </span>
            //                 )}
            //                 </div>
            //               <div>
            //                   <Input
            //                   type="text"
            //                   label={t("district")}
            //                   {...registersecond("district",{
            //                     required:{value:true,message:t("required")},
            //                   })}
            //                   placeholder={t("district")}
            //                 />
            //                 {errorssecond.district && (
            //                   <span className="text-red text-sm">
            //                     {errorssecond.district.message}
            //                   </span>
            //                 )}
            //               </div>
            //                 <div>
            //                   <Input
            //                   type="text"
            //                   label={t("street")}
            //                   {...registersecond("street",{
            //                     required:{value:true,message:t("required")},
            //                   })}
            //                   placeholder={t("street")}
            //                 />
            //                 {errorssecond.street && (
            //                   <span className="text-red text-sm">
            //                     {errorssecond.street.message}
            //                   </span>
            //                 )}
            //                 </div>
            //               </div>
            //              <div>

            //  <Input
            //                 type="text"
            //                 label={t("quarter")}
            //                 {...registersecond("quarter",{
            //                   required:{value:true,message:t("required")},
            //                 })}
            //                 className="max-w-[800px] my-10"
            //                 placeholder={t("quarter")}
            //               />{errorssecond.quarter && (
            //                 <span className="text-red text-sm">
            //                   {errorssecond.quarter.message}
            //                 </span>
            //               )}
            //              </div>
            //               <div>
            //                 <ImageUploadForm
            //                   imgs={imgdata}
            //                   register={registersecond}
            //                   setValue={setvaluesecond}
            //                   name={"file"}
            //                 />
            //               </div>
            //               <div className="w-[100%] flex justify-center items-center gap-2 ">
            //                 <Link
            //                   to={"/clients"}
            //                   className="py-[9px] px-6 bg-button text-aside rounded-md"
            //                 >
            //                   back
            //                 </Link>
            //                 <Button
            //                   className=" w-[200px] px-6 py-2 bg-icons text-aside font-semibold rounded-lg shadow-md
            //              hover:bg-aside  hover:text-black transition-all duration-200
            //              active:bg-blue-800 active:shadow-sm border-none"
            //                   type="submit"
            //                 >
            //                   {businessmutations.isPending || businessMutation.isPending
            //                     ? "loading..."
            //                     : "send"}
            //                 </Button>
            //               </div>
            //             </form>
            <form onSubmit={handleSubmitsecond(business)} defaultValue={result}>
              <div className="flex justify-between gap-2 max-w-[800px]">
                {/* FULL NAME */}
                <div>
                  <Input
                    type="text"
                    label={t("full_name")}
                    {...registersecond("full_name", {
                      required: { value: true, message: t("required") },
                    })}
                    placeholder={t("full_name")}
                  />
                  {errorssecond.full_name && (
                    <span className="text-red text-sm">
                      {errorssecond.full_name.message}
                    </span>
                  )}
                </div>

                {/* PHONE */}
                <div>
                  <Input
                    type="text"
                    label={t("phone")}
                    {...registersecond("phone", {
                      required: { value: true, message: t("required") },
                      pattern: {
                        value: /^[0-9]+$/,
                        message: t("only_numbers"),
                      },
                    })}
                    onInput={(e) => {
                      e.target.value = e.target.value.replace(/\+/g, "");
                    }}
                    placeholder={t("phone")}
                  />
                  {errorssecond.phone && (
                    <span className="text-red text-sm">
                      {errorssecond.phone.message}
                    </span>
                  )}
                </div>

                {/* COMPANY NAME */}
                <div>
                  <Input
                    type="text"
                    label={t("company_name")}
                    {...registersecond("company_name", {
                      required: { value: true, message: t("required") },
                    })}
                    placeholder={t("company_name")}
                  />
                  {errorssecond.company_name && (
                    <span className="text-red text-sm">
                      {errorssecond.company_name.message}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex justify-between gap-2 max-w-[800px]">
                {/* INN NUMBER (9 ta raqam) */}
                <div>
                  <Input
                    type="text"
                    label={t("inn_number")}
                    {...registersecond("inn_number", {
                      required: { value: true, message: t("required") },
                    })}
                    placeholder={t("inn_number")}
                  />
                  {errorssecond.inn_number && (
                    <span className="text-red text-sm">
                      {errorssecond.inn_number.message}
                    </span>
                  )}
                </div>

                {/* ACCOUNT NUMBER (20 ta raqam) */}
                <div>
                  <Input
                    type="text"
                    label={t("account_number")}
                    {...registersecond("account_number", {
                      required: { value: true, message: t("required") },
                    })}
                    placeholder={t("account_number")}
                  />
                  {errorssecond.account_number && (
                    <span className="text-red text-sm">
                      {errorssecond.account_number.message}
                    </span>
                  )}
                </div>

                {/* INFO NUMBER */}
                <div>
                  <Input
                    type="text"
                    label={t("info_number")}
                    {...registersecond("info_number", {
                      required: { value: true, message: t("required") },
                    })}
                    placeholder={t("info_number")}
                  />
                  {errorssecond.info_number && (
                    <span className="text-red text-sm">
                      {errorssecond.info_number.message}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex justify-between gap-2 max-w-[800px]">
                {/* REGION */}
                <div>
                  <Input
                    type="text"
                    label={t("region")}
                    {...registersecond("region", {
                      required: { value: true, message: t("required") },
                    })}
                    placeholder={t("region")}
                  />
                  {errorssecond.region && (
                    <span className="text-red text-sm">
                      {errorssecond.region.message}
                    </span>
                  )}
                </div>

                {/* DISTRICT */}
                <div>
                  <Input
                    type="text"
                    label={t("district")}
                    {...registersecond("district", {
                      required: { value: true, message: t("required") },
                    })}
                    placeholder={t("district")}
                  />
                  {errorssecond.district && (
                    <span className="text-red text-sm">
                      {errorssecond.district.message}
                    </span>
                  )}
                </div>

                {/* STREET */}
                <div>
                  <Input
                    type="text"
                    label={t("street")}
                    {...registersecond("street", {
                      required: { value: true, message: t("required") },
                    })}
                    placeholder={t("street")}
                  />
                  {errorssecond.street && (
                    <span className="text-red text-sm">
                      {errorssecond.street.message}
                    </span>
                  )}
                </div>
              </div>

              {/* QUARTER */}
              <div>
                <Input
                  type="text"
                  label={t("quarter")}
                  {...registersecond("quarter", {
                    required: { value: true, message: t("required") },
                  })}
                  className="max-w-[800px] my-6"
                  placeholder={t("quarter")}
                />
                {errorssecond.quarter && (
                  <span className="text-red text-sm">
                    {errorssecond.quarter.message}
                  </span>
                )}
              </div>

              {/* IMAGE */}
              <ImageUploadForm
                imgs={imgdata}
                register={registersecond}
                setValue={setvaluesecond}
                name="file"
              />

              <div className="flex justify-center gap-2 mt-[-65px]">
                <Link
                  to={"/clients"}
                  className="py-[9px] px-6 bg-button text-aside rounded-md"
                >
                  back
                </Link>
                <Button
                  className=" w-[200px] px-6 py-2 bg-icons text-aside font-semibold rounded-lg shadow-md
       hover:bg-aside  hover:text-black transition-all duration-200
       active:bg-blue-800 active:shadow-sm border-none"
                  type="submit"
                >
                  {businessmutations.isPending || businessMutation.isPending
                    ? "loading..."
                    : "send"}
                </Button>
              </div>
            </form>
          )}
        </div>
      )}
    </div>
  );
}
