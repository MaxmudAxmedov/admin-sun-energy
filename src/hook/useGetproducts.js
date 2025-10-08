import { useQuery } from "@tanstack/react-query";
import { productGet } from "@/services/product";

export const useGetProduct = () => {
  return useQuery({
    queryKey: ["prpoducts"],
    queryFn: productGet,
  });
};
