  import { Button } from '@/components/ui/button'
  import ImageUploadForm from '@/components/ui/imgupload'
  import { Input } from '@/components/ui/input'
  import { Select, SelectContent, SelectItem, SelectTrigger } from '@/components/ui/select'
  import { postemployeeMutation } from '@/queries'
  import { t } from '@/utils/i18n'
  import { SelectGroup, SelectLabel, SelectValue } from '@radix-ui/react-select'
  import { useMutation } from '@tanstack/react-query'
  import React, { useState } from 'react'
  import { Controller, useForm } from 'react-hook-form'
  import { Link, useNavigate } from 'react-router-dom'
  import { toast } from 'react-toastify'

  export default function EmployeesCrud() {
    const nav = useNavigate()
    const { handleSubmit, register, reset, control } = useForm()
    const mutations = useMutation({ mutationFn: (params) => postemployeeMutation(params) });

    // Position ID mapping
    const getPositionId = (positionName) => {
      const positions = {
        "leader": "1",
        "admin": "2",
        "master": "3",
        "attractor": "4"
      };
      return positions[positionName] || "";
    };

    const Submit = (data) => {
      console.log(data);

      const Formdata = new FormData();

      Formdata.append("first_name", data.first_name);
      Formdata.append("last_name", data.last_name);
      Formdata.append("patronymic", data.patronymic);
      Formdata.append("phone", data.phone);
      Formdata.append("passport_series", data.passport_series);
      Formdata.append("position_id", getPositionId(data.position_name));
      Formdata.append("region", data.region);
      Formdata.append("province", data.province);
      Formdata.append("district", data.district);
      Formdata.append("quarter", data.quarter);
      Formdata.append("street", data.street);
      Formdata.append("photo", data.photo[0]);

      // if (data.photo && data.photo[0]) {
      //   Formdata.append("photo", data.photo[0]);
      // }


      mutations.mutate(Formdata, {
        onSuccess: () => {
          toast.success("Employee created successfully")
          reset();
          nav("/employees")
        },
        onError: error => {
          if (error.response?.status === 409) {
            toast.error("Employee already exists!");
          } else {
            toast.error(error.message);
          }
        }
      })

    }


    return (
      <div className='pl-[35px]'>
        <div className='flex justify-between items-center py-5 px-7'>
          {t("employees_crud_page")}
          <Link to={"/employees"} className=' py-[7px] px-5 bg-button text-aside rounded-md'>
            back
          </Link>
        </div>
        <form onSubmit={handleSubmit(Submit)}>
          <div className="flex px-5 py-4 max-w-[800px] justify-between items-center gap-4 flex-wrap">
            <label className="text-active" htmlFor="name">
              {t("name")}
              <Input {...register("first_name")} className="max-w-[400px] transition-all focus:w-64 outline-none text-active" placeholder={t("name")} />
            </label>
            <label className="text-active" htmlFor="name">
              {t("secondy_name")}
              <Input {...register("last_name")} className="max-w-[400px] transition-all focus:w-64 outline-none text-active" placeholder={t("secondy_name")} />
            </label>
            <label className="text-active" htmlFor="name">
              {t("patronymic")}
              <Input {...register("patronymic")} className="max-w-[400px] transition-all focus:w-64 outline-none text-active" placeholder={t("patronymic")} />
            </label>

            <label className="text-active" htmlFor="name">
              {t("phone")}
              <Input {...register("phone")}
                className="max-w-[400px] transition-all focus:w-64 outline-none text-active" placeholder={t("phone")} />
            </label>

            <label className="text-active" htmlFor="name">
              {t("passport_series")}
              <Input {...register("passport_series")} className="max-w-[400px] transition-all focus:w-64 outline-none text-active" placeholder={t("passport_series") + " AA1234567"} />
            </label>
            <div className="w-[200px] mt-4">
              <label htmlFor="">
                {t("position_name")}
                <Controller
                  name="position_name"
                  defaultValue=""
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      onValueChange={field.onChange}
                      value={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder={t("position_name")} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="leader">Leader</SelectItem>
                          <SelectItem value="admin">Admin</SelectItem>
                          <SelectItem value="master">Master</SelectItem>
                          <SelectItem value="attractor">Attractor</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  )}
                />
              </label>
            </div>
            <label className="text-active" htmlFor="name">
              {t("region")}
              <Input {...register("region")} className="max-w-[400px] transition-all focus:w-64 outline-none text-active" placeholder={t("region")} />
            </label>
            <label className="text-active" htmlFor="name">
              {t("province")}
              <Input {...register("province")} className="max-w-[400px] transition-all focus:w-64 outline-none text-active" placeholder={t("province")} />
            </label>
            <label className="text-active" htmlFor="name">
              {t("district")}
              <Input {...register("district")} className="max-w-[400px] transition-all focus:w-64 outline-none text-active" placeholder={t("district")} />
            </label>
            <label className="text-active" htmlFor="name">
              {t("quarter")}
              <Input {...register("quarter")} className="max-w-[400px] transition-all focus:w-64 outline-none text-active" placeholder={t("quarter")} />
            </label>
            <label className="text-active" htmlFor="name">
              {t("street")}
              <Input {...register("street")} className="max-w-[400px] transition-all focus:w-64 outline-none text-active" placeholder={t("street")} />
            </label>
          </div>
          <div className="ml-5">
            <ImageUploadForm register={register} name={"photo"} />
          </div>
          <Button type="submit" className='ml-5 mt-5 transition-all duration-500  bg-button text-aside hover:rounded-[15px] cursor-pointer border-none  '> send</Button>
        </form>
      </div>
    )
  }
