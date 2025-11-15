import { employeeIDGet, employeesGet } from "@/services/employees";
import { productGet } from "../services/product";
import { clientsBusinessGet, clientsBusinessIdGet, clientsCustomersGet } from "@/services/clients";
import { contractsGet } from "@/services/contract";
import { reportsGet, tradesReportsGet } from "@/services/reports";
import { category, categorypost } from "@/services/category";
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



// Category
export function getProductQuery(params) {
  return {
    queryKey: ["product-categories", params],
    queryFn: async () => category(params),
  };
}
export function getProductIdQeriy(id){
  return{
    queryKey:["product-id", id],
    queryFn : ()=> async ()=> ProductcategoryID(id)
  }
}

export function postProductCatecoriyes(params){
  return{
    queryFn:async ()=> categorypost(params)
  }
}


// Clients page
export function getClientBusinessQuery(params) {
  return {
    queryKey: ["client-business", params],
    queryFn: async () => clientsBusinessGet(params),
  };
}
export function getClientBusinessIdQuery(id){
  return {
    queryKey:["client-businnes-id", id],
    queryFn: async ()=> clientsBusinessIdGet(id),
     enabled: !!id,
  }
}

export function getClentBusinessTRADESQuery(params){
  return {
    queryKey:["tredes", params],
    queryFn: async ()=> tradesReportsGet(params)
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

export function getEmployeeIDQuery(dataid){
  return{
    queryKey:["employeeID",dataid],
    queryFn : async ()=> employeeIDGet(dataid),
    enabled: !!dataid,
  }
}

// Contracts
export function getContractsQuery(params) {
  return {
    queryKey: ["contracts", params],
    queryFn: async () => contractsGet(params),
  };
}
