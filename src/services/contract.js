import { request } from "@/config/request";

export const contractsGet = (params) => {
    return request({ method: "get", url: "/trades", params });
};
