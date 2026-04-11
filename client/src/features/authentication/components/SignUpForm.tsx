import { Link, useRouter } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { authClient } from "../../../lib/auth-client";
import { useState } from "react";

const formSchema = z
  .object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Enter a valid email").min(1, "Email is required"),
    password: z
      .string()
      .min(1, "Password is required")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special character",
      ),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
  });

type FormTypeSignUp = z.infer<typeof formSchema>;

export function SignUpForm() {
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormTypeSignUp>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormTypeSignUp) => {
    setLoading(true);
    await authClient.signUp.email(
      {
        email: data.email,
        password: data.password,
        name: data.name,
      },
      {
        onSuccess: () => {
          router.navigate({
            to: "/signin",
          });
        },
        onError: (ctx) => {
          console.error(ctx.error.message);
        },
      },
    );
    setLoading(false);
  };

  return (
    <div className="flex flex-col gap-4 rounded-box bg-base-200 p-6 max-w-md w-full mx-auto">
      <h1 className="text-3xl font-bold self-center">Create an account</h1>

      <span className="self-center">
        Already have an account?
        <Link className="link link-secondary" to="/signin">
          Log in
        </Link>
      </span>

      <button className="btn btn-neutral" type="button">
        <i className="fa-brands fa-google text-primary"></i>
        Create with Google
      </button>

      <div className="divider my-0">OR</div>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
        <label className="form-control">
          <div className="label">
            <span className="label-text">Name</span>
          </div>

          <input
            className="input input-bordered w-full"
            {...register("name")}
            required
          />
          <div>
            {errors.name && (
              <span className="text-error text-sm">{errors.name.message}</span>
            )}
          </div>
        </label>
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

        <label className="form-control">
          <div className="label">
            <span className="label-text">Confirm password</span>
          </div>

          <input
            type="password"
            className="input input-bordered w-full"
            {...register("confirmPassword")}
            required
          />
          <div>
            {errors.confirmPassword && (
              <span className="text-error text-sm">
                {errors.confirmPassword.message}
              </span>
            )}
          </div>
        </label>

        <div className="form-control">
          <label className="cursor-pointer label self-start gap-2">
            <input type="checkbox" className="checkbox" required />
            <span className="label-text">
              I accept the
              <a
                className="link link-accent"
                href="#"
                target="_blank"
                rel="noopener noreferrer"
              >
                Terms and Conditions
              </a>
            </span>
          </label>
        </div>

        <button
          className="btn btn-primary w-full"
          type="submit"
          disabled={loading}
        >
          {loading ? "Creating..." : "Create"}
        </button>
      </form>
    </div>
  );
}
