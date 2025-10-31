import { request } from "@/config/request";

export const reportsGet = (params) => {
    return request({ method: "get", url: "reports", params });
};

export const tradesReportsGet = (params) => {
    return request({ method: "get", url: "trades-reports", params });
};
