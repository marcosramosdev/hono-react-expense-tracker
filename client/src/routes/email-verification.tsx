import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/email-verification")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/email-verification"!</div>;
}
