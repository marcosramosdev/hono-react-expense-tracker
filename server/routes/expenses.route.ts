import { authMiddleware } from "@/middleware/auth.middleware";
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

const createExpenseSchema = z.object({
  amount: z.string().min(1).max(100).openapi({
    example: "100",
    description: "The amount of the expense",
  }),
  description: z.string().max(300).optional().openapi({
    example: "Lunch",
    description: "A description of the expense",
  }),
}).openapi("CreateExpenseRequest");

const createExpenseResponseSchema = z.object({
  message: z.string().openapi({
    example: "Expense created successfully.",
  }),
  newExpense: expensesSchema,
}).openapi("CreateExpenseResponse");

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
      description: "Retrieve all expenses for the authenticated user",
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

const createExpense = createRoute({
  method: "post",
  path: "/",
  request: {
    body: {
      content: {
        "application/json": {
          schema: createExpenseSchema,
        },
      },
      required: true,
    },
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: createExpenseResponseSchema,
        },
      },
      description: "Expense created successfully",
    },
    400: {
      content: {
        "application/json": {
          schema: z.array(z.any()),
          example: [
            ["amount", "String must contain at least 1 character(s)"],
          ],
        },
      },
      description: "Validation error",
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
            message: "Error creating expense.",
          },
        },
      },
      description: "Error creating expense",
    },
  },
});

const expensesRoute = new OpenAPIHono<Env>();

expensesRoute.use(authMiddleware);

expensesRoute.openapi(getExpenses, async (c) => {
  const user = c.get("user");
  if (!user) return c.json({ message: "You are not authenticated." }, 401);
  try {
    const expenses = await getExpensesQuery(user.id);
    return c.json(expenses, 200);
  } catch (error) {
    console.error(error);
    return c.json({ message: "Error getting expenses." }, 500);
  }
});

expensesRoute.openapi(createExpense, async (c) => {
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
