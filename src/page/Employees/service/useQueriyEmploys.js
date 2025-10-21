import { request } from '@/config/request'
import { useQuery } from '@tanstack/react-query'

export default function useQueryEmploys() {
  return useQuery({
    queryKey:["employs"],
    queryFn:()=>request.get("employee-payments",{
      
    }).then((res)=>res?.data.data)
    })
}
