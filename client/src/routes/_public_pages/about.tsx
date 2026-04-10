import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_public_pages/about")({
  component: About,
});

function About() {
  return <div className="p-2">About page content</div>;
}
