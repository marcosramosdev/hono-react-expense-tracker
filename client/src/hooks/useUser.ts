import { useQuery } from "@tanstack/react-query";
import { authClient } from "../lib/auth-client";

export function useUser() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const { data } = await authClient.getSession();
      return data?.user;
    },
    // Executa imediatamente quando o componente monta
    enabled: true,
    // Recarrega a sessão quando a janela volta ao foco
    refetchOnWindowFocus: true,
    // Se falhar, tenta novamente (útil no primeiro carregamento)
    retry: 1,
    // Sessão deve ser verificada frequentemente
    staleTime: 0,
  });

  return {
    user: data,
    isAuthenticated: !!data && !isError,
    isLoading,
    emailVerified: data?.emailVerified,
  };
}
