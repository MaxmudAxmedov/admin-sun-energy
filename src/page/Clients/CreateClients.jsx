import { Button } from '@/components/ui/button'
import ImageUploadForm from '@/components/ui/imgupload'
import { Input } from '@/components/ui/input'
import { getcustomerIdQuery, postcostumermutaion, putcustumermMtation } from '@/queries'
import { t } from '@/utils/i18n'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import React, { useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

export default function CreateClients() {
  const [state, setstate] = React.useState(1)
  const { id } = useParams()
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery(getcustomerIdQuery(id))
  const nav = useNavigate()
  const { handleSubmit, register, reset, setValue } = useForm()
  const DD = useMemo(() => data?.data || data);
  const mutateedit = useMutation({ mutationFn: (params) => putcustumermMtation(params) })
  const mutation = useMutation({ mutationFn: (params) => postcostumermutaion(params) })

  React.useEffect(() => {
    if (DD) reset(DD)
  }, [DD, reset])
  const imgs = data?.data?.file
  const costumer = (data) => {

    const formData = new FormData();
    const {
      first_name, last_name, patronymic, phone, street, region, district, passport_series, quarter, } = data;

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
          toast.success("lorem");
        },
        onError: (error) => {
          toast.error(error.message)
        }
      })
    } else if (id) {
      formData.append("id", id);
      mutateedit.mutate(formData, {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["client-customers",] })
          nav("/clients");
          toast.success("ok edit");
        },
        onError: (error) => {
          toast.error(error.message)
        }
      })
    }
  }
  
  const { handleSubmit:handleSubmitsecond, register:registersecond, reset:resetsecond, setValue:setvaluesecond } = useForm()
const business = (res)=>{
  console.log(res);
  
}

  return (
    <div>
      {isLoading ? <div>LOADING...</div> : <div>
        <div className='flex justify-between items-center py-5 px-7'>
          <h1>
            Edit client
          </h1>
          <Link to={"/clients"} className=' py-[7px] px-5 bg-button  text-aside rounded-md'>
            back
          </Link>
        </div>
        <div className='w-[500px] flex py-2 px-4  bg-shadows justify-between gap-2 rounded-md mb-5'>
          <button onClick={() => setstate(1)} className={`w-[240px] transform-all duration-300 text-center p-1 m-0  ${state == 1 ? `bg-icons ` : "bg-shadows "} text-bll border-none  rounded-md`}>{t("natural_person")}</button>
          <button onClick={() => setstate(2)} className={`w-[240px] transform-all duration-300 text-center p-1 m-0   ${state == 1 ? "bg-shadows " : `bg-icons`} text-bll border-none  rounded-md `}> {t("legal_entity")}</button>
        </div>
        {state == 1 && <form onSubmit={handleSubmit(costumer)} defaultValue={DD} >
          <div className='flex justify-between items-center gap-2 max-w-[800px] '>
            <Input type="text" label={t("name")} {...register("first_name")} placeholder={t("name")} />
            <Input type="text" label={t("last_name")} {...register("last_name")} placeholder={t("last_name")} />
            <Input type="text" label={t("patronymic")} {...register("patronymic")} placeholder={t("patronymic")} />
          </div>
          <div className='flex justify-between items-center gap-2 max-w-[800px] '>
            <Input type="text" label={t("phone")} {...register("phone")} placeholder={t("phone")} />
            <Input type="text" label={t("passport_series")} {...register("passport_series")} placeholder={t("passport_series")} />
            <Input type="text" label={t("region")} {...register("region")} placeholder={t("region")} />
          </div>
          <div className='flex justify-between items-center gap-2 max-w-[800px] '>
            <Input type="text" label={t("district")} {...register("district")} placeholder={t("district")} />
            <Input type="text" label={t("street")} {...register("street")} placeholder={t("street")} />
            <Input type="text" label={t("quarter")} {...register("quarter")} placeholder={t("quarter")} />
          </div>
          <div>
            <ImageUploadForm imgs={imgs} register={register} setValue={setValue} name={"file"} />
          </div>
          <Button className="mt-5" type="submit">{mutateedit.isPending || mutation.isPending ? <div>Loding...</div> : "Send"}</Button>
        </form>}
        {state == 2 && <form onSubmit={handleSubmitsecond(business)}>
          <div className='flex justify-between items-center gap-2 max-w-[800px] '>
            <Input type="text" label={t("full_name")} {...registersecond("full_name")} placeholder={t("full_name")} />
            <Input type="text" label={t("phone")} {...registersecond("phone")} placeholder={t("phone")} />
            <Input type="text" label={t("company_name")} {...registersecond("company_name")} placeholder={t("company_name")} />
          </div>
          <div className='flex justify-between items-center gap-2 max-w-[800px] '>
            <Input type="text" label={t("inn_number")} {...registersecond("inn_number")} placeholder={t("inn_number")} />
            <Input type="text" label={t("account_number")} {...registersecond("account_number")} placeholder={t("account_number")} />
            <Input type="text" label={t("info_number")} {...registersecond("info_number")} placeholder={t("info_number")} />
          </div>
          <div className='flex justify-between items-center gap-2 max-w-[800px] '>
            <Input type="text" label={t("region")} {...registersecond("region")} placeholder={t("region")} />
            <Input type="text" label={t("district")} {...registersecond("district")} placeholder={t("district")} />
            <Input type="text" label={t("street")} {...registersecond("street")} placeholder={t("street")} />
          </div>
          <Input type="text" label={t("quarter")} {...registersecond("quarter")} className="max-w-[800px] my-10" placeholder={t("quarter")} />
          <div>
            <ImageUploadForm register={registersecond} setValue={setValue} name={"file"} />
          </div>
          <Button className="mt-5" type="submit">send</Button>
        </form>
        }
      </div>}

    </div>
  )
}
