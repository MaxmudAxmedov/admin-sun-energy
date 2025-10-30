import { request } from "@/config/request";

export const clientsBusinessGet = (params) => {
    return request({ method: "get", url: "/client-businesses", params });
};

export const clientsCustomersGet = (params) => {
    return request({ method: "get", url: "/client-customers", params });
};
