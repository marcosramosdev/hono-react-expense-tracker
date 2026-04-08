import { Hono } from "hono";
import { auth } from "./lib/auth";
import { logger } from "hono/logger";
import expensesRoute from "./routes/expenses.route";
import type { Env } from "./types/Env.types";

const app = new Hono<Env>().use(logger());

app
  .get("/", (c) => {
    return c.text("Hello Hono!");
  })
  .basePath("/api")
  .on(["POST", "GET"], "/auth/*", (c) => auth.handler(c.req.raw))
  .route("/expenses", expensesRoute);

export default app;
