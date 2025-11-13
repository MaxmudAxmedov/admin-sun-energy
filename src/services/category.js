import { request } from "@/config/request";

export const category = (params) => {
    return request({ method: "get", url: "/product-categories", params });
};

export const categorypost = (params) =>{
    return request({method:"post", url:"/product-categories", params})
}