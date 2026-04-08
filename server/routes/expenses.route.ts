import { authMiddleware } from "@/middleware/auth.middleware";
import { createExpenseValidator } from "@/validators/expenses.validator";
import {
  getExpensesQuery,
  insertExpenseQuery,
} from "@/db/queries/expenses.query";
import { createRoute, OpenAPIHono, z } from "@hono/zod-openapi";
import { expensesSchema } from "@/types/Expenses.types";
import type { Env } from "@/types/Env.types";

const messageSchema = z.object({
  message: z.string(),
});

const getExpenses = createRoute({
  method: "get",
  path: "/",
  responses: {
    200: {
      content: {
        "application/json": {
          schema: expensesSchema.array(),
        },
      },
      description: "Retrieve the user",
    },
    401: {
      content: {
        "application/json": {
          schema: messageSchema,
          example: {
            message: "You are not authenticated.",
          },
        },
      },
      description: "User is not authenticated",
    },
    500: {
      content: {
        "application/json": {
          schema: messageSchema,
          example: {
            message: "Error getting expenses.",
          },
        },
      },
      description: "Error getting expenses",
    },
  },
});

const expensesRoute = new OpenAPIHono<Env>();

expensesRoute.use(authMiddleware);

expensesRoute
  .openapi(getExpenses, async (c) => {
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
