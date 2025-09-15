import { productGet } from "../services/product";

export function getProductsQuery() {
    return {
        queryKey: ["products"],
        queryFn: async () => productGet(),
    };
}
