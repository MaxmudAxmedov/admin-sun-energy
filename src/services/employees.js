import { request } from "@/config/request";

export const employeesGet = (params) => {
    return request({ method: "get", url: "/employees", params });
};

export const employeeIDGet = (dataid) =>{
    return request({method:"get", url:`/employee/${dataid}`})
}
export const employeePost = (params) => {
    return request({ method: "post", url: "/employee", data: params});
}
export const empPositionsGet = (params)=>{
    return request({method:"get", url:"/positions", params})
}
export const deleteEmployes = (id)=>{
    return request ({method:"delete", url:`/employee/${id}`})
}
export const editEmployesMutation = (params) =>{
    return request ({method:"patch", url:"employee", data:params})
}