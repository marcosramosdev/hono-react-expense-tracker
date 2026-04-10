import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

import NavBar from "../components/NavBar";

import { sessionQuery } from "../lib/sessionQuery";

export const Route = createFileRoute("/_public")({
  component: RouteComponent,
  beforeLoad: async ({ context }) => {
    // Usa cache do TanStack Query - não faz nova requisição se dados estão frescos
    const session = await context.queryClient.ensureQueryData(sessionQuery());

    // Se usuário já está logado, redireciona para dashboard
    if (session?.data?.user) {
      throw redirect({ to: "/dashboard" });
    }
  },
});

function RouteComponent() {
  return (
    <div>
      <NavBar authenticated={false} />
      <main className="max-w-xl mx-auto">
        <Outlet />
      </main>
    </div>
  );
}
