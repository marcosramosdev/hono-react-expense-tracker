# Agent Guidelines for hono-react-expenses

## Project Overview

Full-stack TypeScript monorepo with separate client and server packages:

- **Runtime**: Bun (root + server), Node (client via Vite)
- **Backend**: Hono at `server/` (port 3000)
- **Frontend**: React 19 + Vite + TanStack Router + TanStack Query at `client/` (port 5173)
- **Database**: PostgreSQL with Drizzle ORM
- **Auth**: Better Auth with email verification via Mailgun

## Commands

```bash
# Development (runs both server and client)
bun run dev              # Concurrently runs `bun run server` and `bun run web`
bun run server           # Hono server with hot reload (port 3000)
bun run web              # Vite dev server (port 5173)

# Database
bun run db:up           # Start PostgreSQL via Docker Compose
bun run db:generate     # Generate Drizzle migrations → `./server/drizzle/`
bun run db:migrate      # Run pending migrations
bun run db:studio       # Drizzle Studio GUI

# Docs
bun run api-docs        # Opens Better Auth OpenAPI reference

# Testing (no tests exist yet)
bun test <file>         # Bun's built-in test runner
```

## Architecture

### Server Entry Points
- **`server/index.ts`**: Hono app, routes mounted at `/api`, Better Auth handlers at `/api/auth/*`
- **`server/lib/auth.ts`**: Better Auth config with Drizzle adapter, Mailgun email verification
- **`drizzle.config.ts`**: Migrations output to `./server/drizzle/`, schema at `./server/db/schema.ts`

### Client Entry Points
- **`client/src/main.tsx`**: React app mount
- **`client/src/routes/`**: TanStack Router file-based routes (see `.tanstack/`)

### Path Aliases
- Server: `@/` → `./server/*` (tsconfig paths)
- Client: Standard Vite aliases

## Conventions

### Import Order
Separate with blank lines:
1. External libraries
2. `@/` internal imports
3. Relative imports (`./`, `../`)

### File Naming
- **Files**: kebab-case (`expenses.route.ts`, `auth.middleware.ts`)
- **Types**: PascalCase (`Env.types.ts`)
- Routes: Resource-oriented plural nouns (`/expenses`, `/auth`)

### Code Patterns

**Route handlers** (`server/routes/*.route.ts`):
```typescript
const route = new Hono()
  .use(authMiddleware)
  .get("/", async (c) => { ... })
```

**Auth middleware** sets context vars (`user`, `session`, `isAuthenticated`) — always check `c.get("user")` and return 401 if null.

**Database queries**:
- Use `.returning()` for INSERTs that need the record
- `.returning()` always returns an array — access with `[0]`
- Use `z.string()` for date fields (Drizzle serializes to ISO strings)

**Environment**: Use `Bun.env` (not `process.env`) in server code.

### Directory Ownership
```
server/
├── db/
│   ├── db.ts              # Database connection (Postgres pool)
│   ├── schema.ts          # Table definitions + relations
│   └── queries/           # Query functions (*.query.ts)
├── middleware/            # Hono middleware (*.middleware.ts)
├── routes/                # API routes (*.route.ts)
├── types/                 # TypeScript types (*.types.ts)
├── validators/            # Zod schemas (*.validator.ts)
└── lib/                   # Utilities (auth.ts, email.ts)
```

## Gotchas

- **Better Auth trusted origins**: Configured for `http://localhost:5173` — update `server/lib/auth.ts` if client port changes
- **Migrations location**: `drizzle.config.ts` outputs to `./server/drizzle/` (not `./drizzle/`)
- **No CI/tests**: No `.github/workflows` or test files exist yet
- **Mailgun**: Email verification requires valid `MAILGUN_API_KEY` and `MAILGUN_DOMAIN` in `.env`
