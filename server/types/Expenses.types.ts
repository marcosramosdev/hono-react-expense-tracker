import type { InferSelectModel, InferInsertModel } from "drizzle-orm";
import { expenses } from "../db/schema";
import { z } from "@hono/zod-openapi";

export type Expenses = InferSelectModel<typeof expenses>;
export type NewExpenses = InferInsertModel<typeof expenses>;

export const expensesSchema = z
  .object({
    id: z.string().openapi({
      example: "1",
    }),
    userId: z.string().openapi({
      example: "1",
    }),
    description: z.string().nullable().openapi({
      example: "Lunch",
    }),
    amount: z.string().openapi({
      example: "100",
    }),
    createdAt: z.date().openapi({}),
    updatedAt: z.date().openapi({}),
  })
  .openapi("Expenses");
