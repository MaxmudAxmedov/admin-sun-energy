import request from "@/config/request";

export const login = () => {
    return request({ method: "post", url: "verify" });
};
