import { auth } from "@/lib/auth";
import type { Env } from "@/types/Env.types";
import { createMiddleware } from "hono/factory";

export const authMiddleware = createMiddleware<Env>(async (c, next) => {
  const session = await auth.api.getSession({ headers: c.req.raw.headers });
  console.log(session?.user.id);

  if (!session) {
    c.set("user", null);
    c.set("session", null);
    c.set("isAuthenticated", false);
    await next();
    return;
  }

  c.set("user", session.user);
  c.set("session", session.session);
  c.set("isAuthenticated", true);
  await next();
});
