import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";

let token = localStorage.getItem("kuduUserToken");

export function useCart() {
  return useQuery({
    queryKey: ["cart"],
    queryFn: async () => {
      if (token) {
        const response = await axios.get(`/user/cart`);
        return response.data.data;
      }
      return [];
    },
  });
}

export function useAddToCart() {
    const queryClient = useQueryClient();
  
    return useMutation({
      mutationFn: async (payload) => {
        return axios.post(
          `/user/cart/add`, payload
        );
      },
      onSuccess: (response) => {
        queryClient.invalidateQueries(["cart"]);
        toast.success(response.data.message)
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });
  }
  
  export function useRemoveFromCart() {
    const queryClient = useQueryClient();
  
    return useMutation({
      mutationFn: async (cartId) => {
        return axios.delete(
          `/user/cart/remove?cartId=${cartId}`
        );
      },
      onSuccess: (response) => {
        queryClient.invalidateQueries(["cart"]);
        toast.success(response.data.message)
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });
  }

