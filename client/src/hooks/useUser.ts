import { useQuery } from "@tanstack/react-query";
import { authClient } from "../lib/auth-client";

export function useUser() {
  const { data } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const { data } = await authClient.getSession();
      return data?.user;
    },
  });

  return {
    user: data,
    emailVerified: data?.emailVerified,
  };
}
