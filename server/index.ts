import { Hono } from "hono";
import { auth } from "./lib/auth";
import { logger } from "hono/logger";

const app = new Hono().use(logger());

app
  .get("/", (c) => {
    return c.text("Hello Hono!");
  })
  .basePath("/api")
  .on(["POST", "GET"], "/auth/*", (c) => auth.handler(c.req.raw));

export default app;
