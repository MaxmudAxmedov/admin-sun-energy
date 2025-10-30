import { employeesGet } from "@/services/employees";
import { productGet } from "../services/product";
import { clientsBusinessGet, clientsCustomersGet } from "@/services/clients";
import { contractsGet } from "@/services/contract";

// Products page
export function getProductsQuery(params) {
    return {
        queryKey: ["products-all", params],
        queryFn: async () => productGet(params),
    };
}

// Clients page
export function getClientBusinessQuery(params) {
    return {
        queryKey: ["client-business", params],
        queryFn: async () => clientsBusinessGet(params),
    };
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

// Contracts
export function getContractsQuery(params) {
    return {
        queryKey: ["contracts", params],
        queryFn: async () => contractsGet(params),
    };
}
