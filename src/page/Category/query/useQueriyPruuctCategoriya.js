import request from "@/config/request";
import { useQuery } from "@tanstack/react-query";

export const useQueriyPruuctCategoriya = () => {
  return useQuery({
    queryKey: ["ProductCategoriya"],
    queryFn: () =>
      request.get("/product-categories").then((res) => res?.data?.Data?.product_categories),
  });

};
