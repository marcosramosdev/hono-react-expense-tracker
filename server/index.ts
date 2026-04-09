import { auth } from "./lib/auth";
import { logger } from "hono/logger";
import expensesRoute from "./routes/expenses.route";
import type { Env } from "./types/Env.types";
import { Hono } from "hono";
import cron from "node-cron";
import { db } from "./db/db";
import { user as userTable } from "@/db/schema";

const app = new Hono<Env>();
app.use(logger());

const api = app.basePath("/api");

api.route("/expenses", expensesRoute);

api.on(["POST", "GET"], "/auth/*", (c) => auth.handler(c.req.raw));

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

export default app;
