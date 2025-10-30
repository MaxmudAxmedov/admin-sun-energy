import { request } from "@/config/request";

export const productGet = (params) => {
    return request({ method: "get", url: "/products", params });
};
