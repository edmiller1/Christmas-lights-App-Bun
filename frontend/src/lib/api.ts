import { hc } from "hono/client";
//@ts-ignore
import { type ApiRoutes } from "../../../server/app";
import { queryOptions } from "@tanstack/react-query";

const client = hc<ApiRoutes>("/");
console.log(client);

export const api = client.api;

const getCurrentUser = async () => {
  const res = await api.user.$get();
  if (!res.ok) throw new Error("Failed to get current user");
  const data = await res.json();
  return data;
};

export const userQueryOptions = queryOptions({
  queryKey: ["get-current-user"],
  queryFn: getCurrentUser,
  staleTime: Infinity,
});
