import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

interface args {
  id?: string;
  title: string;
  completed?: string;
}

async function mutation(data: args) {
  const { data: result } = await axios.post("/api/tasks", data);
  return result;
}

export function useTasksMutation() {
  const queryClient = useQueryClient();
  return useMutation(mutation, {
    onSuccess() {
      queryClient.invalidateQueries(["tasks"]);
    },
  });
}
