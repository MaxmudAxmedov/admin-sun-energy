import axios from "axios";

export const request = axios.create({
    baseURL: "",
    headers: {
        Authorization: "",
    },
});
