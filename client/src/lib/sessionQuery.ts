import { authClient } from "./auth-client";

export function sessionQuery() {
  return {
    queryKey: ["session"],
    queryFn: async () => {
      const session = await authClient.getSession();
      return session ?? null;
    },
    staleTime: 1000 * 60 * 5,
  };
}
