import { auth } from "./lib/auth";
import { logger } from "hono/logger";
import expensesRoute from "./routes/expenses.route";
import type { Env } from "./types/Env.types";
import { Hono } from "hono";
import { serveStatic } from "hono/bun";
import path from "path";

const app = new Hono<Env>();

app.use("*", logger());

// API routes - mounted first
const apiRoutes = new Hono<Env>()
  .on(["POST", "GET"], "/auth/*", (c) => auth.handler(c.req.raw))
  .route("/expenses", expensesRoute);

app.route("/api", apiRoutes);

// Static files - resolve to absolute path (from server/ go up one level to project root)
const staticRoot = path.join(import.meta.dir, "..", "client", "dist");

// Static files - serve from dist folder
app.use("*", serveStatic({ root: staticRoot }));

// SPA fallback - serve index.html for any unmatched routes (client-side routing)
app.get("*", serveStatic({ root: staticRoot, path: "index.html" }));

export default {
  port: Bun.env.PORT || 3000,
  fetch: app.fetch,
};

export type AppType = typeof app;
