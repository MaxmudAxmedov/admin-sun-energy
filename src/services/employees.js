import { request } from "@/config/request";

export const employeesGet = (params) => {
    return request({ method: "get", url: "/employees", params });
};
