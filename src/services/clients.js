import { request } from "@/config/request";

export const clientsBusinessGet = (params) => {
    return request({ method: "get", url: "/client-businesses", params });
};

export const clientsCustomersGet = (params) => {
    return request({ method: "get", url: "/client-customers", params });
};

// bussiness id
export const clientsBusinessIdGet = (id) => {
    return request({ method: "get", url: `/client-customer/${id}` })
}

// post costumer

export const postcostumerMutations = (params) => {
    return request({ method: "post", url: "client-customer", data: params })
}

//costumer id
export const clientsCustomersIDGet = (id) => {
    return request({ method: "get", url: `client-customer/${id}` })
}

// edit

export const putcustumersmutation = (formData) => {
    return request({ method: "put", url: "client-customer", data: formData })
}

//trades get
export const tradesssquery = (params) => {
    return request({ method: "get", url: "trades", data: params })
}

///delete 
export const deletecustumersMutation = (id) => {
    return request({ method: "delete", url: `client-customer/${id}` })
}