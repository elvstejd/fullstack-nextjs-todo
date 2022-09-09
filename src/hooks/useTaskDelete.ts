import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

interface args {
  id: string;
}

async function mutation(data: args) {
  const { data: result } = await axios.delete("/api/tasks", { data });
  return result;
}

export function useTaskDelete() {
  const queryClient = useQueryClient();
  return useMutation(mutation, {
    onSuccess() {
      queryClient.invalidateQueries(["tasks"]);
    },
  });
}
