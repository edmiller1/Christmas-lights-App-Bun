import { hc } from "hono/client";
//@ts-ignore
import { type ApiRoutes } from "../../../server/app";

const client = hc<ApiRoutes>("/");
console.log(client);

export const api = client.api;
