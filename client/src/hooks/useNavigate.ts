import { useRouter } from "@tanstack/react-router";

export function useNavigate() {
  const { navigate, origin } = useRouter();
  return { navigate, origin };
}
