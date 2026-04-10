import { createFileRoute } from "@tanstack/react-router";

import { SignInForm } from "../../features/authentication/components/SignInForm";

export const Route = createFileRoute("/_public/signin")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <SignInForm />
    </div>
  );
}
