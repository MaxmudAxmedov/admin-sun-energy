import { request } from "@/config/request"
import { useQuery } from "@tanstack/react-query"

export const useQueriyContacts = ()=>{
    return useQuery({
        queryKey:["Contacts"],
        queryFn:()=>request.get("reports").then((res)=>res?.data)
    })
}
