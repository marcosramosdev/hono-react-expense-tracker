import { Link } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { authClient } from "../../../lib/auth-client";
import { useState } from "react";

const formSchema = z.object({
  email: z.string().email("Enter a valid email").min(1, "Email is required"),
  password: z.string().min(1, "Password is required"),
});

type FormTypeSignUp = z.infer<typeof formSchema>;

export function SignInForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormTypeSignUp>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormTypeSignUp) => {
    setLoading(true);
    setError("");

    try {
      await authClient.signIn.email(
        {
          email: data.email,
          password: data.password,
        },
        {
          onError: (ctx) => {
            setError(ctx.error.message);
          },
          onSuccess: () => {
            window.location.reload();
          },
        },
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-4 rounded-box bg-base-200 p-6 max-w-md w-full mx-auto">
      <h1 className="text-3xl font-bold self-center">Sign In</h1>

      <span className="self-center">
        Don't have an account?
        <Link className="link link-secondary" to="/signup">
          Create an account
        </Link>
      </span>

      <button className="btn btn-neutral" type="button">
        <i className="fa-brands fa-google text-primary"></i>
        Sign in with Google
      </button>

      <div className="divider my-0">OR</div>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
        <label className="form-control">
          <div className="label">
            <span className="label-text">Email</span>
          </div>

          <input
            className="input input-bordered w-full"
            {...register("email")}
            placeholder="email@email.com"
            required
          />
          <div>
            {errors.email && (
              <span className="text-error text-sm">{errors.email.message}</span>
            )}
          </div>
        </label>

        <label className="form-control">
          <div className="label">
            <span className="label-text">Password</span>
          </div>

          <input
            type="password"
            className="input input-bordered w-full"
            {...register("password")}
            required
          />
          <div>
            {errors.password && (
              <span className="text-error text-sm">
                {errors.password.message}
              </span>
            )}
          </div>
        </label>
        {error && <span className="text-error text-sm">{error}</span>}

        <button
          className="btn btn-primary w-full"
          type="submit"
          disabled={loading}
        >
          {loading ? "signing in..." : "Sign in"}
        </button>
      </form>
    </div>
  );
}
