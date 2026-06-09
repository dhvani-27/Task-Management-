"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/validations/loginSchema";
import { loginUser } from "@/services/authService";
import {
  FaGoogle,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import { useState } from "react";

export default function LoginForm() {
  const [showPassword, setShowPassword] =
    useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver:
      zodResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    try {
      const response =
        await loginUser(data);

      localStorage.setItem(
        "token",
        response.data.token
      );

      window.location.href =
        "/dashboard";
    } catch (err) {
      alert(
        "Invalid Email or Password"
      );
    }
  };

  return (
    <div className="min-h-screen flex">

      {/* Left Side */}

      <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-700 text-white p-16 flex-col justify-center">

        <div className="mb-8">

          <div className="flex items-center gap-4">

            <div className="bg-white text-blue-700 p-3 rounded-xl text-2xl font-bold">
              TP
            </div>

            <div>
              <h1 className="text-5xl font-bold">
                TaskFlow Pro
              </h1>

              <p className="text-blue-100 mt-2">
                Smart Project Management
              </p>
            </div>

          </div>

        </div>

        <h2 className="text-4xl font-bold leading-tight">
          Organize work,
          collaborate with teams,
          and achieve goals faster.
        </h2>

        <p className="mt-6 text-lg text-blue-100">
          Manage projects, tasks,
          documents, calendars and
          teams from one platform.
        </p>

        <div className="mt-10 space-y-4">

          <div className="flex items-center gap-3">
            ✅ Kanban Boards
          </div>

          <div className="flex items-center gap-3">
            ✅ Workload Management
          </div>

          <div className="flex items-center gap-3">
            ✅ Team Collaboration
          </div>

          <div className="flex items-center gap-3">
            ✅ Real Time Activity Feed
          </div>

          <div className="flex items-center gap-3">
            ✅ Reports & Analytics
          </div>

        </div>

      </div>

      {/* Right Side */}

      <div className="w-full lg:w-1/2 flex justify-center items-center bg-slate-100">

        <div className="bg-white shadow-2xl rounded-2xl w-[450px] p-10">

          <div className="text-center mb-8">

            <h2 className="text-3xl font-bold">
              Welcome Back 👋
            </h2>

            <p className="text-gray-500 mt-2">
              Login to continue to
              TaskFlow Pro
            </p>

          </div>

          <form
            onSubmit={handleSubmit(
              onSubmit
            )}
          >

            {/* Email */}

            <div className="mb-4">

              <label className="block mb-2 font-medium">
                Email Address
              </label>

              <input
                type="email"
                placeholder="john@example.com"
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                {...register("email")}
              />

              <p className="text-red-500 text-sm mt-1">
                {
                  errors.email
                    ?.message
                }
              </p>

            </div>

            {/* Password */}

            <div className="mb-4">

              <label className="block mb-2 font-medium">
                Password
              </label>

              <div className="relative">

                <input
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  placeholder="********"
                  className="w-full border border-gray-300 rounded-lg p-3"
                  {...register(
                    "password"
                  )}
                />

                <button
                  type="button"
                  className="absolute right-4 top-4"
                  onClick={() =>
                    setShowPassword(
                      !showPassword
                    )
                  }
                >
                  {showPassword ? (
                    <FaEyeSlash />
                  ) : (
                    <FaEye />
                  )}
                </button>

              </div>

              <p className="text-red-500 text-sm mt-1">
                {
                  errors.password
                    ?.message
                }
              </p>

            </div>

            {/* Remember Me */}

            <div className="flex justify-between mb-6">

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                />
                Remember Me
              </label>

              <a
                href="/forgot-password"
                className="text-blue-600"
              >
                Forgot Password?
              </a>

            </div>

            {/* Login Button */}

            <button
              type="submit"
              className="w-full bg-blue-700 text-white p-3 rounded-lg hover:bg-blue-800 transition"
            >
              Login
            </button>

            {/* Divider */}

            <div className="flex items-center my-6">

              <div className="flex-grow border-t"></div>

              <span className="mx-4 text-gray-500">
                OR
              </span>

              <div className="flex-grow border-t"></div>

            </div>

            {/* Google */}

            <button
              type="button"
              className="w-full border p-3 rounded-lg flex justify-center items-center gap-3 hover:bg-gray-50"
            >
              <FaGoogle />
              Continue with Google
            </button>

            <p className="text-center mt-6">

              Don't have an account?

              <a
                href="/signup"
                className="text-blue-700 font-semibold ml-2"
              >
                Create Account
              </a>

            </p>

          </form>

        </div>

      </div>

    </div>
  );
}