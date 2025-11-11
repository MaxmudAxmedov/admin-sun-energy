import { request } from "@/config/request";

export const category = (params) => {
    return request({ method: "get", url: "/product-categories", params });
};
