"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { UserSchema } from "../../lib/user.schema";
import { UserInput, UserResponse } from "../api/user/types";
import cookie from "js-cookie";
import { cookieKeys } from "../../config/cookie.config";
import { useRouter } from "next/navigation";
import api from "../helpers/baseApi";

const RegisterForm = () => {
  const {
    handleSubmit,
    register,
    reset,
    setError,
    formState: { errors },
  } = useForm<UserInput>({
    mode: "onSubmit",
    resolver: zodResolver(UserSchema),
  });

  const [isLoading, setIsLoading] = useState(false);

  const route = useRouter();

  return (
    <section className="w-full min-h-dvh flex flex-col items-center justify-center p-5 pb-10 bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="w-full max-w-lg mx-auto bg-white/70 backdrop-blur-md rounded-2xl border border-gray-200/50 p-8 shadow-[0_4px_20px_rgba(0,0,0,0.1)] transition-all duration-300 hover:shadow-[0_6px_30px_rgba(0,0,0,0.2)]">
        <h2 className="text-2xl font-semibold text-gray-900 tracking-tight text-center mb-8">
          Register
        </h2>

        <form
          className="font-semibold flex flex-col w-full space-y-4"
          onSubmit={handleSubmit(async (userData) => {
            try {
              setIsLoading(true);
              const { data: user } = await api.post("user", userData);

              const token = user.token;

              cookie.set(cookieKeys.USER_TOKEN, token);

              console.log({ user });
              reset();

              route.push("/");
            } catch (error) {
              console.log(error);
            } finally {
              setIsLoading(false);
            }
          })}
        >
          <div className="flex flex-row justify-between space-x-4">
            <div className="flex flex-col w-1/2">
              <label
                htmlFor="firstName"
                className="text-sm text-gray-700 font-bold"
              >
                First Name
              </label>
              <input
                id="firstName"
                type="text"
                aria-label="first-name"
                placeholder="Enter your first name"
                className="mt-1 px-3 py-2 bg-white/90 backdrop-blur-sm border border-gray-200/50 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 font-light transition-all duration-300 focus:scale-[1.02] focus:shadow-[0_0_10px_rgba(99,102,241,0.3)]"
                {...register("firstName")}
              />
              {errors.firstName && (
                <span className="text-red-600 text-xs mt-1 font-normal tracking-wide">
                  {errors.firstName.message}
                </span>
              )}
            </div>

            <div className="flex flex-col w-1/2">
              <label
                htmlFor="lastName"
                className="text-sm font-bold text-gray-700"
              >
                Last Name
              </label>
              <input
                id="lastName"
                type="text"
                aria-label="last-name"
                placeholder="Enter your last name"
                className="mt-1 px-3 py-2 bg-white/90 backdrop-blur-sm border border-gray-200/50 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 font-light transition-all duration-300 focus:scale-[1.02] focus:shadow-[0_0_10px_rgba(99,102,241,0.3)]"
                {...register("lastName")}
              />
              {errors.lastName && (
                <span className="text-red-600 text-xs mt-1 font-normal tracking-wide">
                  {errors.lastName.message}
                </span>
              )}
            </div>
          </div>

          <div className="flex flex-col">
            <label htmlFor="email" className="text-sm font-bold text-gray-700">
              Email
            </label>
            <input
              id="email"
              type="email"
              aria-label="email"
              placeholder="Enter your email"
              className="mt-1 px-3 py-2 bg-white/90 backdrop-blur-sm border border-gray-200/50 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 font-light transition-all duration-300 focus:scale-[1.02] focus:shadow-[0_0_10px_rgba(99,102,241,0.3)]"
              {...register("email")}
            />
            {errors.email && (
              <span className="text-red-600 text-xs mt-1 font-normal tracking-wide">
                {errors.email.message}
              </span>
            )}
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="password"
              className="text-sm font-bold text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              aria-label="password"
              placeholder="Enter your password"
              className="mt-1 px-3 py-2 bg-white/90 backdrop-blur-sm border border-gray-200/50 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 font-light transition-all duration-300 focus:scale-[1.02] focus:shadow-[0_0_10px_rgba(99,102,241,0.3)]"
              {...register("password")}
            />
            {errors.password && (
              <span className="text-red-600 text-xs mt-1 font-normal tracking-wide">
                {errors.password.message}
              </span>
            )}
          </div>

          <button
            type="submit"
            className="w-full mt-6 py-3 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-300"
          >
            Register
          </button>
        </form>
      </div>
    </section>
  );
};

export default RegisterForm;
