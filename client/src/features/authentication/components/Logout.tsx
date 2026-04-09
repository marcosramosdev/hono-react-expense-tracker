import { useQueryClient } from "@tanstack/react-query";
import { authClient } from "../../../lib/auth-client";
import { useRouter } from "@tanstack/react-router";

export function Logout() {
  const { navigate } = useRouter();

  const logoutUser = async () => {
    const queryClient = useQueryClient();
    const { data } = await authClient.getSession();
    if (!data?.user) {
      return (
        <div className="alert alert-success">
          <span>Message sent successfully.</span>
        </div>
      );
    }
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          console.log("Signed out successfully");
          queryClient.invalidateQueries("user");
          navigate({
            to: "/",
          });
        },
      },
    });
  };

  return (
    <button className="btn" onClick={logoutUser}>
      Logout
    </button>
  );
}
