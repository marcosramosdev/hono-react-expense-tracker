import { auth } from "./lib/auth";
import { logger } from "hono/logger";
import expensesRoute from "./routes/expenses.route";
import type { Env } from "./types/Env.types";
import { OpenAPIHono } from "@hono/zod-openapi";
import { createFiberplane } from "@fiberplane/hono";

const app = new OpenAPIHono<Env>();
app.use(logger());

const api = app.basePath("/api");

api.route("/expenses", expensesRoute);

api.on(["POST", "GET"], "/auth/*", (c) => auth.handler(c.req.raw));

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

api.doc("/openapi.json", {
  openapi: "3.0.0",
  info: {
    title: "Hono Expenses API",
    version: "1.0.0",
    description: "A simple API to manage expenses",
  },
});

app.use(
  "/fp/*",
  createFiberplane({
    app,
    openapi: { url: "/api/openapi.json" },
  }),
);

export default app;
