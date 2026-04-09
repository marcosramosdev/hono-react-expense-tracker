import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./global.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Refetcha quando a janela volta ao foco (usuário retorna à aba)
      refetchOnWindowFocus: true,
      // Tenta novamente se falhar (útil se o cookie ainda está sendo setado)
      retry: 1,
      // Tempo que os dados ficam "frescos" antes de refetchar
      staleTime: 5 * 60 * 1000, // 5 minutos
    },
  },
});

const router = createRouter({ routeTree });

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>,
);
