import { request } from "@/config/request"

export const getexpresQuery = (params) =>{
    return request({method:"get", url:"/expenses", params})
}