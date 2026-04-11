import { useState } from "react";

import { useGetExpenses } from "../hooks/useExpenses";
import ExpensesPagination from "./ExpensesPagination";

function ExpensesList() {
  const [page, setPage] = useState(1);
  const { data, isPending, error } = useGetExpenses(page);

  if (isPending) {
    return (
      <div className="flex justify-center py-8">
        <span className="loading loading-spinner loading-md" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-error">
        <span>Could not load expenses.</span>
      </div>
    );
  }

  const expenses = data?.expenses ?? [];

  return (
    <div className="space-y-4 ">
      <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
        <table className="table">
          <thead>
            <tr>
              <th>Description</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {expenses.length > 0 ? (
              expenses.map((expense) => {
                return (
                  <tr key={expense.id}>
                    <td>{expense.description ?? "-"}</td>
                    <td>{expense.amount}</td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td className="text-base-content/60" colSpan={2}>
                  No expenses found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <ExpensesPagination
        isPending={isPending}
        onPageChange={setPage}
        page={data?.page ?? 1}
        totalPages={data?.totalPages ?? 1}
      />
    </div>
  );
}

export default ExpensesList;
