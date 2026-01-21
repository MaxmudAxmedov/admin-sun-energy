import { deleteEmployes, editEmployesMutation, employeeIDGet, employeePost, employeesGet, empPositionsGet } from "@/services/employees";
import { deleteMut, editMutate, postproductmutation, productGet, productid } from "../services/product";
import { clientsBusinessGet, clientsBusinessIdGet, clientsCustomersGet, clientsCustomersIDGet, deketebussinmutation, deletecustumersMutation, editBussinesmutations, postbusinesMutation, postcostumerMutations, putcustumersmutation, tradesssquery } from "@/services/clients";
import { contractsGet } from "@/services/contract";
import { deletemutationtrades, posttradesmutations, reportsGet, tradesReportsGet } from "@/services/reports";
import { category, categorydelete, categorypost, categoryput } from "@/services/category";
import { ProductcategoryID } from "@/services/ProductcategoryID";
import { DeletetexpresMutation, getexpresQuery, postexpresMutation } from "@/services/express";

// Reports page
export function getReportsQuery(params) {
  return {
    queryKey: ["reports", params],
    queryFn: async () => reportsGet(params),
  };
}


//trades get
export function getTradesReportsQuery(params) {
  return {
    queryKey: ["trades-reports", params],
    queryFn: async () => tradesReportsGet(params),
  };
}
//trades post

export const postTradesMutation = (data)=>{
  return posttradesmutations(data)
}

// trades delete 

export const deletetradesmutation = (deletes) =>{
  return deletemutationtrades(deletes)
}



// Products page
export function getProductsQuery(params) {
  return {
    queryKey: ["products-all", params],
    queryFn: async () => productGet(params),
  };
}
export function postProductsMutation(params) {
  return  postproductmutation(params)
}

//id
 export function getproductsidQuery(id){
  return {
    queryKey:["products-edit", id],
    queryFn: async ()=> productid(id),
  enabled:!!id,
  }
 }
 //edit 
 export const editProductDAtaMutation = async ({ formData, productId })=>{
  return editMutate({ formData, productId })
 } 
 //delete
 export const deletePoductsMutations = (id)=>{
  return deleteMut(id)
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
    retry: false,
  }
}
//edit
export function editBussinesmutation(params) {
  return editBussinesmutations(params);
}

export function postBusinessMutation(params) {
  return postbusinesMutation(params)
}

export function getClentBusinessTRADESQuery(params) {
  return {
    queryKey: ["tredes", params],
    queryFn: async () => tradesReportsGet(params)
  }
}
// bussines delete 
export async function deletebussinessMutation(id) {
  return deketebussinmutation(id);
}


/// get custumer
export function getClientCustomersQuery(params) {
  return {
    queryKey: ["client-customers", params],
    queryFn: async () => clientsCustomersGet(params),
  };
}
// costumer post
export const postcostumermutaion = async (params) => {
  return postcostumerMutations(params)
}
// costumer by id 
export function getcustomerIdQuery(id) {
  return {
    queryKey: ["custumer-id", id],
    queryFn: async () => clientsCustomersIDGet(id),
    retry: false,
    enabled: !!id,
  }
}
// costumer edit
export const putcustumermMtation = async (formData) => {
  return putcustumersmutation(formData)
}
//custumer delete 
export const deletecustumerMutation = async (id) => {
  return deletecustumersMutation(id)
}

//trades get 
export const tradesquery = async (params) => {
  return {
    queryKey: ["trades", params],
    queryFn: async () => tradesssquery(params)
  }
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

// post
export const postemployeeMutation = async (params) => {
  return employeePost(params)
}

//employe edit 
export const editempMutation = async (params) => {
  return editEmployesMutation(params)
}

// employerss delete
export const deleteEmployess = async (id) => {
  return deleteEmployes(id)
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

///expres get 
export const expresgetUseQuery = (params) =>{
  return {  
      queryKey:["expenses", params],
      queryFn:async()=> getexpresQuery(params)
  }
}
export const postExpressMutation = async (params) =>{
  return  postexpresMutation(params)
}
export const DeleteExpressMutation = async (params) =>{
  return  DeletetexpresMutation(params)
}