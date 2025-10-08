import request from "@/config/request";

export const reportsGet = (date) => {
  return request({ method: "get", url: "reports", date });
};
