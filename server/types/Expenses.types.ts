import type { InferSelectModel, InferInsertModel } from "drizzle-orm";
import { expenses } from "../db/schema";

export type Expenses = InferSelectModel<typeof expenses>;
export type NewExpenses = InferInsertModel<typeof expenses>;
