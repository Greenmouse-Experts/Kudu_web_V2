import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";

let token = localStorage.getItem("kuduUserToken");

export function useNotification() {
  return useQuery({
    queryKey: ["notification"],
    queryFn: async () => {
      if (token) {
        const response = await axios.get(`/user/notifications`);
        return response.data.data;
      }
      return [];
    },
  });
}

export function useMarkNotificationAsRead() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (notificationId) => {
      return axios.patch(
        `/user/mark/notification/as/read?notificationId=${notificationId}`
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["notification"]);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
}
