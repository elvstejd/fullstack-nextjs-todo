import { useMutation, useQueryClient } from "@tanstack/react-query";
import { showNotification } from "@mantine/notifications";
import axios, { AxiosError } from "axios";
import { ZodError } from "zod";

interface args {
  id: string;
  title?: string;
  completed?: boolean;
}

async function mutation(data: args) {
  const { data: result } = await axios.patch("/api/tasks", data);
  return result;
}

export function useTaskMutation() {
  const queryClient = useQueryClient();
  return useMutation(mutation, {
    onError(axiosError: AxiosError) {
      const zodError = axiosError.response?.data as ZodError;
      const errors = zodError.issues;

      showNotification({
        color: "red",
        title: "Error",
        message: errors?.[0]?.message,
      });
    },
    onSuccess() {
      queryClient.invalidateQueries(["tasks"]);
    },
  });
}
