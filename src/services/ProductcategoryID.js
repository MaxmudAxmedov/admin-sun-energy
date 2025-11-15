import { request } from "@/config/request"

export const  ProductcategoryID = (id)=>{
    return request({method:"get", url:`/product-category/${id}`})
}