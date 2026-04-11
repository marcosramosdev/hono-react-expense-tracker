import { useGetExpenses } from "../hooks/useExpenses";

function ExpensesList() {
  const { data: expenses, isPending, error } = useGetExpenses();

  return (
    <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th>Description</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {expenses?.map((expense) => {
            return (
              <tr key={expense.id}>
                <td>{expense.description}</td>
                <td>{expense.amount}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default ExpensesList;
