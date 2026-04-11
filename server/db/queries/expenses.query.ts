import { db } from "@/db/db";
import { expenses as expensesTable } from "../schema";
import { desc, eq, sql } from "drizzle-orm";
import type { NewExpenses } from "@/types/Expenses.types";

const EXPENSES_PER_PAGE = 10;

export async function getExpensesQuery(userId: string, page: number) {
  const safePage = Number.isFinite(page) && page > 0 ? Math.floor(page) : 1;

  const countRows = await db
    .select({ totalCount: sql<number>`count(*)` })
    .from(expensesTable)
    .where(eq(expensesTable.userId, userId));

  const total = Number(countRows[0]?.totalCount ?? 0);
  const totalPages = Math.max(1, Math.ceil(total / EXPENSES_PER_PAGE));
  const currentPage = Math.min(safePage, totalPages);
  const offset = (currentPage - 1) * EXPENSES_PER_PAGE;

  const expenses = await db
    .select()
    .from(expensesTable)
    .where(eq(expensesTable.userId, userId))
    .orderBy(desc(expensesTable.updatedAt))
    .limit(EXPENSES_PER_PAGE)
    .offset(offset);

  return {
    expenses,
    page: currentPage,
    pageSize: EXPENSES_PER_PAGE,
    total,
    totalPages,
  };
}

export function insertExpenseQuery(expense: NewExpenses) {
  const newExpense = db.insert(expensesTable).values(expense).returning();
  return newExpense;
}
