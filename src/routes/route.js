import { lazy } from "react";

export const route = [
    {
        title: "reports",
        path: "/",
        icon: "",
        element: lazy(() => import("@/page/Reports/ReportsTable")),
    },
    {
        title: "products",
        path: "products",
        icon: "",
        element: lazy(() => import("@/page/Products/ProductsTable")),
        create: lazy(() => import("@/page/Products/ProductsCreate")),
        edit: lazy(() => import("@/page/Products/ProductsCreate")),
    },
    {
        title: "products_category",
        path: "products_category",
        icon: "",
        element: lazy(() => import("@/page/category/CategoryTable")),
        create: lazy(() => import("@/page/category/CategoriyCrud")),
        edit: lazy(() => import("@/page/category/CategoriyCrud")),
    },
    {
        title: "clients",
        path: "clients",
        icon: "",
        element: lazy(() => import("@/page/Clients/ClientsTable")),
        create:lazy(()=> import("@/page/Clients/CreateClients")),
        edit:lazy(()=> import("@/page/Clients/CreateClients")),
    },
    {
        title: "employees",
        path: "employees",
        icon: "",
        element: lazy(() => import("@/page/employees/Employees")),
        create: lazy(() => import("@/page/employees/EmployeesCrud")),
        edit: lazy(() => import("@/page/employees/EmployeesCrud")),
    },
    {
        title: "contracts",
        path: "contracts",
        icon: "",
        element: lazy(() => import("@/page/Contracts/Contracts")),
        create: lazy(() => import("@/page/Contracts/ContaractsCrud")),
        edit: lazy(() => import("@/page/Contracts/ContaractsCrud")),
    },
    {
        title: "additional_expense",
        path: "additional_expense",
        icon: "",
        element: lazy(() => import("@/page/Additional/AdditionalTable")),
    },
    {
        title: "settings",
        path: "settings",
        icon: "",
        element: lazy(() => import("@/page/Settings/Settings")),
    },
    {
        title: "login",
        path: "login",
        icon: "",
        element: lazy(() => import("@/page/Login/Login")),
    },
    {
        title: "Not-found",
        path: "*",
        icon: "",
        element: lazy(() => import("@/page/NotFound/NotFound")),
    },
];