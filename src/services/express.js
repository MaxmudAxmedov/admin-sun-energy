import { request } from "@/config/request"

export const getexpresQuery = (params) =>{
    return request({method:"get", url:"/expenses", params})
}

export const postexpresMutation = (params)=>{
    return request({method:"post", url:"/expense",data:params})
}
export const DeletetexpresMutation = (id)=>{
    return request({method:"delete", url:`/expense/${id}`,})
}