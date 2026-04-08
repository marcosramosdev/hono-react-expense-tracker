import { SignInForm } from "../features/authentication/components/SignInForm";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/signin")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <SignInForm />
    </div>
  );
}
