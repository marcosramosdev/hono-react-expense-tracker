import { createFileRoute } from "@tanstack/react-router";

import { SignUpForm } from "../../features/authentication/components/SignUpForm";

export const Route = createFileRoute("/_public/signup")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <SignUpForm />
    </div>
  );
}
