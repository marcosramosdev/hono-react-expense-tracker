import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

import NavBar from "../components/NavBar";

import { sessionQuery } from "../lib/sessionQuery";

export const Route = createFileRoute("/_public_pages")({
  component: RouteComponent,
  loader: async ({ context }) => {
    // Usa cache do TanStack Query - não faz nova requisição se dados estão frescos
    const session = await context.queryClient.ensureQueryData(sessionQuery());
    return { user: session?.data?.user ?? null };
  },
  beforeLoad: async ({ context }) => {
    // Usa cache do TanStack Query - não faz nova requisição se dados estão frescos
    const session = await context.queryClient.ensureQueryData(sessionQuery());

    if (session?.data?.user) {
      throw redirect({
        to: "/dashboard",
      });
    }
  },
});

function RouteComponent() {
  const { user } = Route.useLoaderData();

  return (
    <div>
      <NavBar authenticated={!!user} />
      <main className="max-w-xl mx-auto">
        <Outlet />
      </main>
    </div>
  );
}
