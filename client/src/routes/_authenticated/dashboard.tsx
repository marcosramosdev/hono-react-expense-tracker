import { createFileRoute } from "@tanstack/react-router";
import CreateExpenseForm from "../../features/expenses/components/CreateExpenseForm";
import ExpensesList from "../../features/expenses/components/ExpensesList";

export const Route = createFileRoute("/_authenticated/dashboard")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <main className="min-h-screen bg-base-200 p-4 md:p-8">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6">
        <section className="hero rounded-box bg-base-100 shadow-sm">
          <div className="hero-content w-full justify-between px-6 py-8 md:px-10">
            <div>
              <h1 className="text-3xl font-bold md:text-4xl">
                Expense Dashboard
              </h1>
              <p className="mt-2 text-base-content/70">
                Track your spending and add new expenses quickly.
              </p>
            </div>
            <div className="badge badge-primary badge-lg">Secure Area</div>
          </div>
        </section>

        <section className="grid grid-cols-1 gap-6 lg:grid-cols-[360px_1fr]">
          <div className="card bg-base-100 shadow-sm">
            <div className="card-body gap-4">
              <div>
                <h2 className="card-title">Create Expense</h2>
                <p className="text-sm text-base-content/70">
                  Fill in the details below to add a new expense.
                </p>
              </div>
              <CreateExpenseForm />
            </div>
          </div>

          <div className="card bg-base-100 shadow-sm">
            <div className="card-body gap-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="card-title">Expenses</h2>
                  <p className="text-sm text-base-content/70">
                    Your most recent expenses are listed here.
                  </p>
                </div>
                <span className="badge badge-outline">Live Data</span>
              </div>
              <ExpensesList />
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
