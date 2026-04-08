# Agent Guidelines for hono-react-expenses

## Project Overview

This is a full-stack TypeScript application using:

- **Runtime**: Bun
- **Backend**: Hono
- **Database**: PostgreSQL with Drizzle ORM
- **Auth**: Better Auth
- **Frontend**: React (inferred from project name)

## Commands

### Development

```bash
bun run dev              # Start dev server with hot reload
bun run db:up           # Start PostgreSQL via Docker Compose
bun run db:generate     # Generate Drizzle migrations
bun run db:migrate      # Run pending migrations
bun run db:studio       # Open Drizzle Studio (GUI)
bun run api-docs        # Open OpenAPI documentation
```

### Running a Single Test

This project uses Bun's built-in test runner. Run tests with:

```bash
bun test                 # Run all tests
bun test <file>          # Run specific test file
bun test --watch        # Watch mode
```

## Code Style Guidelines

### TypeScript Conventions

- Use explicit return types for route handlers and utility functions
- Prefer `interface` over `type` for object shapes that may be extended
- Never use `any` — use `unknown` when type is truly unknown
- Use `zod-openapi` for runtime validation and OpenAPI spec generation

### Import Organization

Order imports in this order (separate with blank lines):

1. External libraries (Hono, Drizzle, etc.)
2. Internal packages (`@/`)
3. Local relative imports (`./*`)

Example:

```typescript
import { Hono } from "hono";
import { db } from "@/db/db";
import { expenses } from "../schema";
import type { Env } from "@/types/Env.types";
```

### Path Aliases

Use the `@/` prefix for absolute imports from project root:

```typescript
import { getExpensesQuery } from "@/db/queries/expenses.query";
import { authMiddleware } from "@/middleware/auth.middleware";
```

### Naming Conventions

- **Files**: kebab-case (e.g., `expenses.route.ts`, `auth.middleware.ts`)
- **Types/Interfaces**: PascalCase (e.g., `Expenses`, `Env`)
- **Functions/Variables**: camelCase
- **Constants**: SCREAMING_SNAKE_CASE for config, camelCase for others
- **Routes**: Resource-oriented, plural nouns (e.g., `/expenses`, `/auth`)

### API Routes (Hono + Zod OpenAPI)

Follow this pattern for route definitions:

```typescript
const route = createRoute({
  method: "get" | "post" | "put" | "delete",
  path: "/",
  request: { /* validation schemas */ },
  responses: {
    200: { content: { "application/json": { schema: /* response schema */ } } },
    400: { /* error response */ },
    401: { /* auth error */ },
  },
});
```

Use `openapi()` method on Zod schemas to add examples and descriptions.

### Error Handling

- Always wrap database operations in try/catch blocks
- Return appropriate HTTP status codes (200, 400, 401, 500)
- Use consistent error response format:

```typescript
return c.json({ message: "Descriptive error message" }, <status>);
```

- Log errors with `console.error(error)` before returning 500

### Database (Drizzle)

- Use `.returning()` for INSERT queries that need the created record
- Drizzle's `.returning()` always returns an array — access first element:

```typescript
const result = await insertExpenseQuery(data);
const newExpense = result[0]; // Extract single item
```

- Use `z.string()` for date fields in Zod schemas (Drizzle serializes to ISO strings)

### Authentication

- All protected routes must use `authMiddleware`
- Always check for `c.get("user")` and return 401 if not present
- Extract user ID from `user.id` for database queries

### Validation (Zod + Hono)

- Define request schemas with `createRoute()` for OpenAPI docs
- Use `c.req.valid("json")` to access parsed and validated request body
- Return validation errors as array of [field, message] pairs

### Schema Definitions

- Put database schemas in `server/db/schema.ts`
- Put type definitions in `server/types/*.types.ts`
- Put query functions in `server/db/queries/*.query.ts`
- Put route handlers in `server/routes/*.route.ts`
- Put middleware in `server/middleware/*.middleware.ts`

### Best Practices

- Keep route handlers focused on HTTP concerns (parse, validate, respond)
- Push business logic into query/service functions
- Use environment variables via `Bun.env` (not `process.env`)
- Run `db:generate` and `db:migrate` after schema changes
- Test individual query functions before route handlers
- DONT run any package.json scripts without explicit instructions to do so.

## File Structure

```
server/
├── db/
│   ├── db.ts              # Database connection
│   ├── schema.ts          # Table definitions
│   └── queries/           # Database operations
│       └── *.query.ts
├── middleware/            # Express-style middleware
│   └── *.middleware.ts
├── routes/                # API route handlers
│   └── *.route.ts
├── types/                 # TypeScript types
│   └── *.types.ts
├── validators/            # Zod validation schemas
│   └── *.validator.ts
├── lib/                  # Utilities (email, auth, etc.)
│   └── *.ts
└── index.ts              # App entry point
```
