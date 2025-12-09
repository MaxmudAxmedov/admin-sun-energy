import { employeeIDGet, employeePost, employeesGet, empPositionsGet } from "@/services/employees";
import { postproductmutation, productGet } from "../services/product";
import { clientsBusinessGet, clientsBusinessIdGet, clientsCustomersGet } from "@/services/clients";
import { contractsGet } from "@/services/contract";
import { reportsGet, tradesReportsGet } from "@/services/reports";
import { category, categorydelete, categorypost, categoryput } from "@/services/category";
import { ProductcategoryID } from "@/services/ProductcategoryID";

// Reports page
export function getReportsQuery(params) {
  return {
    queryKey: ["reports", params],
    queryFn: async () => reportsGet(params),
  };
}
export function getTradesReportsQuery(params) {
  return {
    queryKey: ["trades-reports", params],
    queryFn: async () => tradesReportsGet(params),
  };
}

// Products page
export function getProductsQuery(params) {
  return {
    queryKey: ["products-all", params],
    queryFn: async () => productGet(params),
  };
}
export function postProductsMutation(data) {
  return {
    queryKey: ["products-post", data],
    queryFn: async () => postproductmutation(data),
  }
}



// Category
export function getProductQuery(params) {
  return {
    queryKey: ["product-categories", { ...params }],
    queryFn: async () => category(params),
  };
}
/// category getby id
export function getProductIdQeriy(id) {
  return {
    queryKey: ["product-id", id],
    queryFn: async () => ProductcategoryID(id),
    enabled: !!id,
  }
}
/// category Post
export const postProductCatecoriyPost = async (params) => {
  return categorypost(params);
}
////  category edit 
export const editProductcategoryePut = async (params) => {
  return categoryput(params);
}
/// category Delete
export const deleteproductCategoryDelete = async (id) => {
  return categorydelete(id);
}




// Clients page
export function getClientBusinessQuery(params) {
  return {
    queryKey: ["client-business", params],
    queryFn: async () => clientsBusinessGet(params),
  };
}
export function getClientBusinessIdQuery(id) {
  return {
    queryKey: ["client-businnes-id", id],
    queryFn: async () => clientsBusinessIdGet(id),
    enabled: !!id,
  }
}

export function getClentBusinessTRADESQuery(params) {
  return {
    queryKey: ["tredes", params],
    queryFn: async () => tradesReportsGet(params)
  }
}

export function getClientCustomersQuery(params) {
  return {
    queryKey: ["client-customers", params],
    queryFn: async () => clientsCustomersGet(params),
  };
}

// Employees page
export function getEmployeesQuery(params) {
  return {
    queryKey: ["employees-all", params],
    queryFn: async () => employeesGet(params),
  };
}

export function getEmployeeIDQuery(dataid) {
  return {
    queryKey: ["employeeID", dataid],
    queryFn: async () => employeeIDGet(dataid),
    enabled: !!dataid,
  }
}
export const postemployeeMutation = async (params) => {
  return employeePost(params)
}

// positions 
export const getPositionsQuery = (params) => ({
  queryKey: ["positions", params],
  queryFn: () => empPositionsGet(params)
});



// Contracts
export function getContractsQuery(params) {
  return {
    queryKey: ["contracts", params],
    queryFn: async () => contractsGet(params),
  };
}
