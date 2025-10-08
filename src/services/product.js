import request from "@/config/request";

export const productGet = () => {
  return request({ method: "get", url: "/products" });
};
