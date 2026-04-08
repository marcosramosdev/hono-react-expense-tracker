import { authMiddleware } from "@/middleware/auth.middleware";
import {
  getExpensesQuery,
  insertExpenseQuery,
} from "@/db/queries/expenses.query";
import { Hono } from "hono";
import { createExpenseValidator } from "@/validators/expenses.validator";

const expensesRoute = new Hono()
  .use(authMiddleware)
  .get("/", async (c) => {
    const user = c.get("user");
    if (!user) return c.json({ message: "You are not authenticated." }, 401);
    try {
      const expenses = await getExpensesQuery(user.id);
      return c.json(expenses, 200);
    } catch (error) {
      console.error(error);
      return c.json({ message: "Error getting expenses." }, 500);
    }
  })
  .post("/", createExpenseValidator, async (c) => {
    const user = c.get("user");
    const expenses = c.req.valid("json");

    if (!user) return c.json({ message: "You are not authenticated." }, 401);

    try {
      const newExpense = await insertExpenseQuery({
        ...expenses,
        userId: user.id,
      });
      return c.json(
        {
          message: "Expense created successfully.",
          newExpense,
        },
        200,
      );
    } catch (error) {
      console.error(error);
      return c.json({ message: "Error creating expense." }, 500);
    }
  });

export default expensesRoute;
