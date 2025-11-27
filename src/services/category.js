import { request } from "@/config/request";

export const category = (params) => {
    return request({ method: "get", url: "/product-categories", params });
};

export const categorypost = (params) =>{
    return request({method:"post", url: "/product-category", data:params})
}
export const categoryput = (params)=>{
    return request({method:"put", url:`/product-category`, data:params })
}
export const categorydelete = (id)=>{
    return request({method:"delete", url:`/product-category/${id}`})
}