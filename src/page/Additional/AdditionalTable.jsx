import Search from '@/components/Search/search';
import DataTable from '@/components/Table/DataTable'
import { expresgetUseQuery } from '@/queries';
import { t } from '@/utils/i18n';
import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react'
import { Link } from 'react-router-dom';

export default function AdditionalTable() {

   const [params, setParams] = useState({
      limit: "200",
      page: "1",
      search: "",
    });

    const {data,  isLoading} = useQuery(expresgetUseQuery(params))

    console.log(data);
    

   const columns = [
      {
        key: "index",
        label: "№",
        render: (_, __, index) => index + 1,
      },
    ];
  return (
    <div className='w-full pl-7 pr-7'>
      <h3>{t("additional_expense")}</h3>
   <div className="flex justify-between items-center py-5 px-7">
        <Search  width={"400px"} />

        <Link
          className=" py-[7px] px-5 bg-button text-aside rounded-md "
          to={"/products/create"}
        >
          + Create
        </Link>
      </div>
      <DataTable columns={columns}  />
    </div>
  )
}
