import { request } from "@/config/request"

export const tradesReportsGet = (params)=>{
    return request ({method:"get", url:"/trades", params})
}