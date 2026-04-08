import { createFileRoute } from "@tanstack/react-router";
import { SignUpForm } from "../features/authentication/components/SignUpForm";

export const Route = createFileRoute("/signup")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex justify-center mt-10">
      <SignUpForm />
    </div>
  );
}
