"use client";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Spinner from "@/components/Spinner";

type LoginFormValues = {
  email: string;
  password: string;
};

const Login: React.FC = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>();

  const onSubmit: SubmitHandler<LoginFormValues> = async (data) => {
    try {
      setIsLoading(true);
      const res = await signIn("credentials", {
        redirect: false,
        email: data.email,
        password: data.password,
      });
      if (res?.ok) {
        router.push("/dashboard");
      }
      if (!res?.ok) {
        toast.error("Invalid Credentials");
      }
    } catch (error: any) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignIn = async (provider: string) => {
    await signIn(provider, {
      redirect: false,
      callbackUrl: "/dashboard",
    });
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white p-8 rounded shadow-md w-1/2 max-md:w-[90%]">
        <h2 className="text-xl font-bold mb-4">Login</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              {...register("email", { required: true })}
              className="w-full focus:outline-bgPrimary mt-1 p-2 border rounded"
            />
            {errors.email && (
              <span className="text-red-500 text-sm">Email is required</span>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              {...register("password", { required: true })}
              className="w-full mt-1 p-2 border rounded focus:outline-bgPrimary"
            />
            {errors.password && (
              <span className="text-red-500 text-sm">Password is required</span>
            )}
          </div>
          <button
            className="w-full btn-primary disabled:cursor-not-allowed"
            disabled={isLoading}
          >
            {isLoading ? <Spinner /> : "Login"}
          </button>
        </form>

        <div className="mt-4 gap-2 flex justify-between items-center">
          <button
            onClick={() => handleSignIn("google")}
            className="w-full border py-3 rounded flex gap-4 justify-center items-center"
          >
            <FcGoogle size={28} />
            <span>Login with Google</span>
          </button>
        </div>
        <p className="mt-3 text-center text-sm">
          <Link href="/auth/register">
            Don't have an account?{" "}
            <span className="italic text-bgPrimary">Register Now</span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
