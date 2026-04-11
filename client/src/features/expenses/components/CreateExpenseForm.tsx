import { useForm } from "react-hook-form";
import z from "zod/v3";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateExpense } from "../hooks/useExpenses";

const createExpenseSchema = z.object({
  description: z.string().min(1, "Expense title is required"),
  amount: z.string().min(1, "Amount is required"),
});

type FormTypeCreateExpense = z.infer<typeof createExpenseSchema>;

function CreateExpenseForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormTypeCreateExpense>({
    resolver: zodResolver(createExpenseSchema),
  });

  const { mutate, error, isPending } = useCreateExpense();

  const onSubmit = (data: FormTypeCreateExpense) => {
    console.log(data);
    mutate(data);
    if (error) console.log(error);
    reset();
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <fieldset className="fieldset">
          <legend className="fieldset-legend">Expense title</legend>
          <input
            type="text"
            className="input"
            placeholder="My awesome expense"
            required
            {...register("description")}
          />
          <p>{errors.description?.message}</p>
        </fieldset>
        <fieldset className="fieldset">
          <legend className="fieldset-legend">Amount</legend>
          <input
            type="number"
            className="input"
            placeholder="enter expense amount"
            required
            {...register("amount")}
          />
          <p>{errors.description?.message}</p>
        </fieldset>
        <button className="btn btn-primary" type="submit" disabled={isPending}>
          Add expense
        </button>
      </form>
    </div>
  );
}

export default CreateExpenseForm;
