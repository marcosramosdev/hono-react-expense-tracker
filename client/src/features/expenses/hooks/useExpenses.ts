import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { Expenses } from "../../../../../server/types/Expenses.types";

type CreateExpenseInput = {
  amount: string;
  description?: string;
};

type PaginatedExpensesResponse = {
  expenses: Expenses[];
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
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

export function useGetExpenses(page: number) {
  const { data, error, isPending } = useQuery({
    queryKey: ["getExpenses", page],
    queryFn: async (): Promise<PaginatedExpensesResponse> => {
      const response = await fetch(`/api/expenses?page=${page}`);

      if (!response.ok) {
        throw new Error("Failed to fetch expenses.");
      }

      return response.json();
    },
  });

  return { data, error, isPending };
}
