import { db } from "@/db/db";
import { expenses as expensesTable } from "../schema";
import { eq } from "drizzle-orm";
import type { Expenses, NewExpenses } from "@/types/Expenses.types";

export async function getExpensesQuery(userId: string) {
  const expenses = await db
    .select()
    .from(expensesTable)
    .where(eq(expensesTable.userId, userId));
  return expenses;
}

export function insertExpenseQuery(expense: NewExpenses) {
  const newExpense = db.insert(expensesTable).values(expense).returning();
  return newExpense;
}
