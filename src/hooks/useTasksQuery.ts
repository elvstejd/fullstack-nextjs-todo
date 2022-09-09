import { useQuery } from "@tanstack/react-query";
import axios from "axios";

async function query() {
  const { data } = await axios.get("/api/tasks");
  return data;
}

export function useTasksQuery() {
  return useQuery(["tasks"], query, { initialData: [] });
}
