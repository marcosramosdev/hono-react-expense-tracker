import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { Expenses } from "../../../../../server/types/Expenses.types";

type CreateExpenseInput = {
  amount: string;
  description?: string;
};

export function useCreateExpense() {
  const queryClient = useQueryClient();
  const { mutate, error, isPending } = useMutation({
    mutationKey: ["createExpense"],
    mutationFn: async (expense: CreateExpenseInput) => {
      await fetch("/api/expenses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(expense),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getExpenses"] });
    },
  });

  return { mutate, error, isPending };
}

export function useGetExpenses() {
  const { data, error, isPending } = useQuery({
    queryKey: ["getExpenses"],
    queryFn: async (): Promise<Expenses[]> => {
      const response = await fetch("/api/expenses");
      const data = await response.json();
      return data;
    },
  });

  return { data, error, isPending };
}
