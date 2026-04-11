import { auth } from "./lib/auth";
import { logger } from "hono/logger";
import expensesRoute from "./routes/expenses.route";
import type { Env } from "./types/Env.types";
import { Hono } from "hono";

const app = new Hono<Env>();

app.use(logger());

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

const router = app
  .basePath("/api")
  .on(["POST", "GET"], "/auth/*", (c) => auth.handler(c.req.raw))
  .route("/expenses", expensesRoute);

export default router;

export type AppType = typeof router;
