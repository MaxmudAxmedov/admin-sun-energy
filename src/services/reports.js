import { request } from "@/config/request";

export const reportsGet = (params) => {
    return request({ method: "get", url: "reports", params });
};

export const tradesReportsGet = (params) => {
    return request({ method: "get", url: "trades-reports", params });
};

//post
export const posttradesmutations = (data) =>{
    return request({method:"post", url:'trade', data})
}