import { Hono } from "hono";
import { logger } from "hono/logger";
import { serveStatic } from "hono/bun";
import { authRoute } from "./routes/auth";
import { webhookRoute } from "./routes/webhook";

const app = new Hono();

app.use("*", logger());

app.get("/api/test", (c) => {
  return c.text("Hello World!");
});

const apiRoutes = app
  .basePath("/api")
  .route("/", authRoute)
  .route("/", webhookRoute);

app.get("*", serveStatic({ root: "./frontend/dist" }));
app.get("*", serveStatic({ path: "./frontend/dist/index.html" }));

export default app;
export type ApiRoutes = typeof apiRoutes;
