import request from "@/config/request";

import { useMutation } from "@tanstack/react-query";

export const login = () => {
  return useMutation({
    mutationFn: (data) => request.post("verify", data).then((res) => res?.data),
  });
};
