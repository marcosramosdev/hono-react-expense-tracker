import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

import NavBar from "@/components/NavBar";

import { sessionQuery } from "../lib/sessionQuery";

export const Route = createFileRoute("/_authenticated")({
  component: RouteComponent,
  beforeLoad: async ({ context }) => {
    // Usa cache do TanStack Query - não faz nova requisição se dados estão frescos
    const session = await context.queryClient.ensureQueryData(sessionQuery());

    if (!session?.data?.user) {
      throw redirect({
        to: "/signin",
      });
    }
  },
});

function RouteComponent() {
  return (
    <div>
      <NavBar authenticated={true} />
      <Outlet />
    </div>
  );
}
