import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

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
    onSuccess() {
      queryClient.invalidateQueries(["tasks"]);
    },
  });
}
