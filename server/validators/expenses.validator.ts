import { z } from "zod";
import { zValidator } from "@hono/zod-validator";

const createExpenseSchema = z.object({
  amount: z.string().min(1).max(100),
  description: z.string().max(300).optional(),
});

export const createExpenseValidator = zValidator(
  "json",
  createExpenseSchema,
  (result, c) => {
    if (!result.success) {
      return c.json(
        result.error.issues.map((issue) => {
          (issue.path, issue.message);
        }),
        400,
      );
    }
  },
);
