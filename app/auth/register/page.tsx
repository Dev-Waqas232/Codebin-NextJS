"use client";

import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Spinner from "@/components/Spinner";
import axios from "axios";

type RegisterFormValues = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  c_password: string;
};

const RegisterPage = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>();

  const onSubmit: SubmitHandler<RegisterFormValues> = async (data) => {
    if (data.firstName.trim() === "") {
      toast.error("Please enter Your first name");
      return;
    }

    if (data.lastName.trim() === "") {
      toast.error("Please enter Your last name");
      return;
    }

    if (data.email.trim() === "") {
      toast.error("Please enter your email");
      return;
    }

    if (data.password !== data.c_password) {
      toast.error("Passwords Must be Same");
      return;
    }
    try {
      setIsLoading(true);
      const res = await axios.post("/api/auth/register", {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password,
      });
      if (res.data.ok) {
        router.push("/auth/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (error: any) {
      toast.error(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="bg-white p-8 rounded shadow-md w-1/2 max-md:w-[90%] mt-20 mb-20">
        <h2 className="text-xl font-bold mb-4">Regsiter</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label htmlFor="firstName" className="block text-gray-700">
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              {...register("firstName", { required: true })}
              className="w-full focus:outline-bgPrimary mt-1 p-2 border rounded"
            />
            {errors.firstName && (
              <span className="text-red-500 text-sm">
                First Name is required
              </span>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="lastName" className="block text-gray-700">
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              {...register("lastName", { required: true })}
              className="w-full focus:outline-bgPrimary mt-1 p-2 border rounded"
            />
            {errors.lastName && (
              <span className="text-red-500 text-sm">
                Last Name is required
              </span>
            )}
          </div>
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
          <div className="mb-4">
            <label htmlFor="c_password" className="block text-gray-700">
              Confirm Password
            </label>
            <input
              type="password"
              id="c_password"
              {...register("c_password", { required: true })}
              className="w-full mt-1 p-2 border rounded focus:outline-bgPrimary"
            />
            {errors.c_password && (
              <span className="text-red-500 text-sm">Password is required</span>
            )}
          </div>
          <button
            className="w-full btn-primary disabled:cursor-not-allowed"
            disabled={isLoading}
          >
            {isLoading ? <Spinner /> : "Register"}
          </button>
        </form>

        <p className="mt-3 text-center text-sm">
          <Link href="/auth/login">
            Already have an account?{" "}
            <span className="italic text-bgPrimary">Login Now</span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
