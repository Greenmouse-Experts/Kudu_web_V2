import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";

let token = localStorage.getItem("kuduUserToken");

export function useConversation() {
  return useQuery({
    queryKey: ["conversations"],
    queryFn: async () => {
      if (token) {
        const response = await axios.get(`/user/conversations`);
        return response.data.data;
      }
      return [];
    },
  });
}

export function getMessage(conversationId) {
  return useQuery({
    queryKey: ["message", conversationId],
    queryFn: async () => {
      const response = await axios.get(
        `/user/messages?conversationId=${conversationId}`
      );
      return response.data.data;
    },
    enabled: !!conversationId,
  });
}

export function sendMessage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data) => {
      const response = await axios.post(`/user/messages`, data);
      return response.data.data;
    },
    onSuccess: () => {
      // toast.success("");
      queryClient.invalidateQueries({ queryKey: ["message"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
}
