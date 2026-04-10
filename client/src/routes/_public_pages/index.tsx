import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_public_pages/")({
  component: Index,
});

function Index() {
  return <div className="p-2">landing page of the app</div>;
}
