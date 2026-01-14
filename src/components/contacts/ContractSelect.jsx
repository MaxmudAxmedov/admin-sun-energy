import {
  getClientBusinessQuery,
  getClientCustomersQuery,
  getEmployeesQuery,
} from "@/queries";
import { t } from "@/utils/i18n";
import { useQuery } from "@tanstack/react-query";
import React, { useMemo, useState } from "react";
import { useParams } from "react-router-dom";

export default function ContractSelect({ register }) {
  const { id } = useParams();

  const [data, setdata] = useState({});

  const [params, setParams] = useState({
    limit: "200",
    search: "",
    page: "1",
  });
  const { data: business } = useQuery(getClientBusinessQuery(params));
  const { data: customers } = useQuery(getClientCustomersQuery(params));

  const clientBusiness = useMemo(
    () => business?.data?.Data?.businesses || [],
    [business]
  );
  const clientJismoniy = useMemo(
    () => customers?.data?.Data?.customers || [],
    [customers]
  );

  const allClients = useMemo(() => {
    return [...(clientBusiness || []), ...(clientJismoniy || [])];
  }, [clientBusiness, clientJismoniy]);

  const [paramss, setParamss] = useState({
    limit: "200",
    search: "",
  });

  const { data: dd, isLoading: load } = useQuery(getEmployeesQuery(paramss));
  const employees = useMemo(() => dd?.data?.Data?.employees);
  // console.log(dd?.data?.Data?.employees);
  // console.log(employees);

  const selectedClient = useMemo(() => {
    return allClients.find((el) => String(el.id) === String(id));
  }, [allClients, id]);
  return (
    <div>
      <div className="flex  items-center gap-10">
        <label>
          {t("clients")} <br />
          {id ? (
            <select
              disabled
              defaultValue=""
              {...register("client")}
              className="w-[250px]  h-11 rounded-xl 
              cursor-not-allowed
    border border-gray-300 
    bg-white px-4 text-sm text-black
    shadow-sm transition-all duration-200
    focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
            >
              {
                <option
                  className="overflow-hidden"
                  key={selectedClient?.fid}
                  value={selectedClient?.id}
                >
                  {selectedClient?.first_name || selectedClient?.full_name}
                </option>
              }
            </select>
          ) : (
            <select
              defaultValue=""
              {...register("client")}
              className="w-[250px]  h-11 rounded-xl 
    border border-gray-300 
    bg-white px-4 text-sm text-black
    shadow-sm transition-all duration-200
    focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
            >
              <option value="" disabled hidden>
                Tanlang
              </option>
              {allClients.map((item) => (
                <option
                  className="overflow-hidden"
                  key={item.id}
                  value={item.id}
                >
                  {item?.first_name || item?.full_name}
                </option>
              ))}
            </select>
          )}
        </label>

        <label>
          {t("employees")} <br />
          <select
            {...register("employee")}
            defaultValue=""
            className="w-[250px] h-11 rounded-xl 
    border border-gray-300 
    bg-white px-4 text-sm text-black
    shadow-sm transition-all duration-200
    focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
          >
            <option value="" disabled hidden>
              Tanlang
            </option>
            {employees?.map((e) => (
              <option key={e.id} value={e.id}>
                {e.first_name}
              </option>
            ))}
          </select>
        </label>

        <label>
          {t("Attractor")} <br />
          <select
            defaultValue=""
            {...register("attractor")}
            className="w-[250px] h-11 rounded-xl 
    border border-gray-300 
    bg-white px-4 text-sm text-black
    shadow-sm transition-all duration-200
    focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
          >
            <option value="" disabled hidden>
              Tanlang
            </option>
            {employees?.map((e) => (
              <option key={e.id} value={e.id}>
                {e.first_name}
              </option>
            ))}
          </select>
        </label>
      </div>
    </div>
  );
}
