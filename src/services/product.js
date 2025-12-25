import { request } from "@/config/request";

export const productGet = (params) => {
    return request({ method: "get", url: "/products", params });
};

export const postproductmutation = (params) => {
    return request({ method: "post", url: "/product-images", data:params });
}
//id
export const productid = (id)=>{
    return request({method:"get", url:`/product/${id}`,})
}
//edit 
export const editMutate = ({ formData, productId })=>{
    return request({method:"put", url:`/product/${productId}/images`, data:formData})
}
//delete 
export const deleteMut = (id)=>{
    return request({method:"delete", url:`product/${id}`})
}