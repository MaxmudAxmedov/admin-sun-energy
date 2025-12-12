import { Button } from '@/components/ui/button'
import ImageUploadForm from '@/components/ui/imgupload'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger } from '@/components/ui/select'
import { editempMutation, getEmployeeIDQuery, getPositionsQuery, postemployeeMutation } from '@/queries'
import { t } from '@/utils/i18n'
import { SelectValue } from '@radix-ui/react-select'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import React, { useMemo } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

export default function EmployeesCrud() {
  const queryClient = useQueryClient()
  const nav = useNavigate()
  const { id } = useParams()
  const { data: res, isLoading } = useQuery(getEmployeeIDQuery(id))
  const DD = useMemo(() => res?.data || res)
  const { data } = useQuery(getPositionsQuery({ limit: "200" }))
  const { handleSubmit, register, reset, control, setValue } = useForm()
  const mutations = useMutation({ mutationFn: (params) => postemployeeMutation(params) });
  const mut = useMutation({ mutationFn: (params) => editempMutation(params) })
  React.useEffect(() => {
    if (DD) reset(DD)
  }, [DD, reset])
  const imgs = res?.data?.photo;



  const Submit = (data) => {

    const Formdata = new FormData();
    Formdata.append("first_name", String(data.first_name));
    Formdata.append("last_name", String(data.last_name));
    Formdata.append("patronymic", String(data.patronymic));
    Formdata.append("phone", String(data.phone));
    Formdata.append("passport_series", String(data.passport_series));
    Formdata.append("position_id", String(data.position_id));
    Formdata.append("region", String(data.region));
    Formdata.append("district", (String(data.district)));
    Formdata.append("quarter", String(data.quarter));
    Formdata.append("street", String(data.street));
    Formdata.append("photo", data.photo);

    if (id) {
      Formdata.append("id", id)
      mut.mutate(Formdata, {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["employees-all"] })
          nav("/employees");
          toast.success("ok edit")
        },
        onError:(error)=>{
          toast.error(error.message)
        }
      })
    } else {
      mutations.mutate(Formdata, {
        onSuccess: () => {
          toast.success("Employee created successfully")
          reset();
          nav("/employees")
        },
        onError: (error) => {
          toast.error(error.message)
        }
      })
    }

  }


  return (
    <div className='pl-[35px]'>
      <div className='flex justify-between items-center py-5 px-7'>
        {t("employees_crud_page")}
        <Link to={"/employees"} className=' py-[7px] px-5 bg-button text-aside rounded-md'>
          back
        </Link>
      </div>
      <form onSubmit={handleSubmit(Submit)} defaultValue={DD}>
        <div className="flex px-5 py-4 max-w-[800px] justify-between items-center gap-4 flex-wrap">
          <label className="text-active" htmlFor="name">
            {t("name")}
            <Input {...register("first_name")} placeholder={t("name")} />
          </label>
          <label className="text-active" htmlFor="name">
            {t("secondy_name")}
            <Input {...register("last_name")} placeholder={t("secondy_name")} />
          </label>
          <label className="text-active" htmlFor="name">
            {t("patronymic")}
            <Input {...register("patronymic")} placeholder={t("patronymic")} />
          </label>

          <label className="text-active" htmlFor="name">
            {t("phone")}
            <Input {...register("phone")}
              placeholder={t("phone")} />
          </label>

          <label className="text-active" htmlFor="name">
            {t("passport_series")}
            <Input {...register("passport_series")} placeholder={t("passport_series") + " AA1234567"} />
          </label>
          <div className="w-[200px] mt-4">
            <label htmlFor="">
              {t("position_id")}
              <Controller
                name="position_id"
                defaultValue=""
                control={control}
                render={({ field }) => (
                  <Select
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder={t("position_id")} />
                    </SelectTrigger>
                    <SelectContent>
                      {data?.data?.Data?.positions?.map((item) => (
                        <SelectItem key={item.id} value={item.id}>
                          {item.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            </label>
          </div>
          <label className="text-active" htmlFor="name">
            {t("region")}
            <Input {...register("region")} placeholder={t("region")} />
          </label>
          <label className="text-active" htmlFor="name">
            {t("district")}
            <Input {...register("district")} placeholder={t("district")} />
          </label>
          <label className="text-active" htmlFor="name">
            {t("quarter")}
            <Input {...register("quarter")} placeholder={t("quarter")} />
          </label>
          <label className="text-active" htmlFor="name">
            {t("street")}
            <Input {...register("street")} placeholder={t("street")} />
          </label>
        </div>
        <div className="ml-5">
          <ImageUploadForm imgs={imgs} register={register} setValue={setValue} name={"photo"} />
        </div>
        <Button type="submit"> send</Button>
      </form>
    </div>
  )
}
