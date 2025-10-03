import request from "@/config/request";

export const login = (data) => {
    return request({ method: "post", url: "verify", data });
};


