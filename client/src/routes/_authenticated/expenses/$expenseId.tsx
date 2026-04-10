import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/expenses/$expenseId")({
  component: RouteComponent,
  beforeLoad: async ({ params }) => {
    console.log(params.expenseId);
  },
});

function RouteComponent() {
  const { expenseId } = Route.useParams();

  return (
    <div>
      Hello "/_authenticated/expenses/$expenseId"! expenseId: {expenseId}
    </div>
  );
}
