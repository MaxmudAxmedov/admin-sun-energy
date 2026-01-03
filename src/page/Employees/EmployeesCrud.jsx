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
  const { handleSubmit, register, reset, control, setValue, formState: { errors } } = useForm()


  const queryClient = useQueryClient()
  const nav = useNavigate()
  const { id } = useParams()
  const { data: res, isLoading } = useQuery(getEmployeeIDQuery(id))
  const DD = useMemo(() => res?.data || res)
  const { data } = useQuery(getPositionsQuery({ limit: "200" }))
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
        onError: (error) => {
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
      <div className='flex  py-2 px-7'>
        <h2> {t("employees_crud_page")}</h2>
      </div>
      <form onSubmit={handleSubmit(Submit)} defaultValue={DD}>
        <div className="flex px-5 py-4 max-w-[800px] justify-between items-center gap-4 flex-wrap">
          <label className="text-active" htmlFor="name">
            {t("name")}
            <Input {...register("first_name", {
              required: { value: true, message: t("required") }
            })} placeholder={t("name")} />
            {errors.first_name && (
              <span className="text-red text-sm">{errors.first_name.message}</span>
            )}
          </label>
          <label className="text-active" htmlFor="name">
            {t("secondy_name")}
            <Input {...register("last_name", {
              required: { value: true, message: t("required") }
            })} placeholder={t("secondy_name")} />
            {errors.last_name && (
              <span className="text-red text-sm">{errors.last_name.message}</span>
            )}
          </label>
          <label className="text-active" htmlFor="name">
            {t("patronymic",)}
            <Input {...register("patronymic", { required: { value: true, message: t("required") } })} placeholder={t("patronymic")} />
            {errors.patronymic && (
              <span className="text-red text-sm">{errors.patronymic.message}</span>
            )}
          </label>

          <label className="text-active" htmlFor="name">
            {t("phone")}
            <Input {...register("phone", {
              required: { value: true, message: t("required") }, pattern: {
                value: /^[0-9]+$/,
                message: t("only_numbers")
              }
            })}
              inputMode="numeric"
              onInput={(e) => {
                e.target.value = e.target.value.replace(/\D/g, "");
              }}
              placeholder={t("phone")} />
            {errors.phone && (
              <span className="text-red text-sm">{errors.phone.message}</span>
            )}
          </label>

          <label className="text-active" htmlFor="name">
            {t("passport_series")}
            <Input {...register("passport_series", { required: { value: true, message: t("required") } })} placeholder={t("passport_series") + " AA1234567"} />
            {errors.passport_series && (
              <span className="text-red text-sm">{errors.passport_series.message}</span>
            )}
          </label>
          <div className="w-[200px] ">
            <label htmlFor="">
              {t("position_id")}
              <select
                className='  w-full h-11 rounded-xl 
            border border-gray-300 
            bg-white px-4 text-sm text-active 
            shadow-sm transition-all duration-200
            focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 
            placeholder:text-active
            disabled:opacity-50 disabled:cursor-not-allowed'
                {...register("position_id", {
                  required: { value: true, message: t("required") }
                })}
              >

                {data?.data?.Data?.positions?.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>

              {errors.position_id && (
                <span className="text-red text-sm">{errors.position_id.message}</span>
              )}
            </label>
          </div>
          <label className="text-active" htmlFor="name">
            {t("region")}
            <Input {...register("region", { required: { value: true, message: t("required") } })} placeholder={t("region")} />
            {errors.region && (
              <span className="text-red text-sm">{errors.region.message}</span>
            )}
          </label>
          <label className="text-active" htmlFor="name">
            {t("district")}
            <Input {...register("district", { required: { value: true, message: t("required") } })} placeholder={t("district")} />
            {errors.district && (
              <span className="text-red text-sm">{errors.district.message}</span>
            )}
          </label>
          <label className="text-active" htmlFor="name">
            {t("quarter")}
            <Input {...register("quarter", { required: { value: true, message: t("required") } })} placeholder={t("quarter")} />
            {errors.quarter && (
              <span className="text-red text-sm">{errors.quarter.message}</span>
            )}
          </label>
          <label className="text-active" htmlFor="name">
            {t("street")}
            <Input {...register("street", { required: { value: true, message: t("required") } })} placeholder={t("street")} />
            {errors.street && (
              <span className="text-red text-sm">{errors.street.message}</span>
            )}
          </label>
        </div>
        <div className="ml-5">
          <ImageUploadForm imgs={imgs} register={register} setValue={setValue} name={"photo"} />
        </div>

        <div className='w-[100%] flex justify-center items-center gap-2  '>
          <Link to={"/employees"} className='py-[9px] px-6 bg-button text-aside rounded-md'>
            back
          </Link>
          <Button
            type="submit"
            className=" w-[200px] px-6 py-2 bg-icons text-aside font-semibold rounded-lg shadow-md
                hover:bg-aside  hover:text-black transition-all duration-200
                active:bg-blue-800 active:shadow-sm border-none"
          >
            {mutations.isPending || mut.isPending ? "loading..." : "Send"}
          </Button>
        </div>

      </form>
    </div>
  )
}
