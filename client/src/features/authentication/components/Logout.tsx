import { authClient } from "../../../lib/auth-client";
import { useRouter } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";

export function Logout() {
  const { navigate } = useRouter();
  const queryClient = useQueryClient();

  const logoutUser = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          // Limpa os dados do usuário do cache
          queryClient.removeQueries({ queryKey: ["user"] });
          navigate({
            to: "/",
          });
        },
      },
    });
  };

  return (
    <button type="button" className="btn" onClick={logoutUser}>
      Logout
    </button>
  );
}
