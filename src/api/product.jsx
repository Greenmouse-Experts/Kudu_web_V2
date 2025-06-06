import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export function useProductById(id) {
  return useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      const response = await axios.get(`/product?productId=${id}`);
      return response.data.data;
    },
    enabled: !!id,
  });
}
