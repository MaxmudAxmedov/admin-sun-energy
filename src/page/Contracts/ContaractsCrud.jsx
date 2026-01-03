import React, { useMemo } from "react";
import ContractSelect from '@/components/contacts/ContractSelect';
import { useForm } from 'react-hook-form'
import { Input } from "@/components/ui/input";
import { useDispatch, useSelector } from "react-redux";
import { kv } from "@/config/store/product-reduser/product-reduser";
import DataTable from "@/components/Table/DataTable";
import Search from "@/components/Search/search";
import { useQuery } from "@tanstack/react-query";
import { getProductQuery } from "@/queries";
import { t } from "@/utils/i18n";
import { formator } from "@/schemas/formator";

export default function ContaractsCrud() {
  const dispatch = useDispatch()
  const kvtlist = useSelector((state) => state.Attractor.kvtlist)
  const { handleSubmit, register, reset, formState: { errors }, } = useForm()

  const [params, setParams] = React.useState({
    limit: "200",
    page: "1",
    search: "",
  });
  const { data: d } = useQuery(getProductQuery(params));
  const categories = useMemo(
    () => d?.data?.Data?.product_categories || [],
    [d]
  );

  const [state, setstate] = React.useState();
  React.useEffect(() => {
    dispatch(kv(state))
  }, [state])


  const Submit = (data) => {
    reset()
  }



  const columns = useMemo(
    () => [
      {
        key: "index",
        label: "№",
        render: (_, __, index) => index + 1,
      },
    ]
  )

  return (
    <div className='pl-35 max-w-[1200px] mt-4'>
      <form onSubmit={handleSubmit(Submit)} >
        <ContractSelect register={register} />
        <div className='max-w-[800px] flex items-center gap-10 my-5'>
          <Input type={"number"}   {...register("kvt", {
            onChange: (e) => {
              setstate(Number(e.target.value));
            },
          })} className="w-[250px]" label={"kvt"} />
          <Input className="w-[250px]" label={"Accessory cost"} readOnly value={kvtlist.acc || ""} />
          <Input className="w-[250px]" label={"Service cost"} readOnly value={kvtlist.cost || ""} />
        </div>
        <div>
          <div>
            <div className="w-[500px] flex items-center  gap-4 py-5  ">
           <div className="min-w-[200px]">
               <Search />
           </div>
              <label> 
                <select
                  // defaultValue={t("text")}
                  {...register("name")}
                  className="w-[250px] h-11 rounded-xl 
               border border-gray-300 
               bg-white px-4 text-sm text-black
               shadow-sm transition-all duration-200
               focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                >
                  {categories.map((item) => (
                    <option className='overflow-hidden' key={item.id} value={item.id} >
                      {item?.name}
                    </option>
                  ))}
                </select>

              </label>
              <div className="flex flex-col  items-center ">
                <h5 className="w-[70px]">{t("acc")}</h5>
                <p>{formator(kvtlist.OllkvtPrise)}</p>
              </div>
            </div>
          </div>
          <DataTable columns={columns} />
        </div>
      </form>
    </div>
  )
}
