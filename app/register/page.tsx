"use client";

import axios from "axios";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function Register() {
  const [successMessage, setSuccessMessage] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  const submitForm = async (formData) => {
    try {
      formData.role = "Customer";
      const response = await axios.post(
        process.env.NEXT_PUBLIC_BACKEND_API + "/api/users/register",
        formData
      );

      if (response.status === 200) {
        setSuccessMessage("Registration successful...!");
      }
    } catch (error) {
      const errorMessage = error.response?.data?.Message || "An error occurred";
      setError("root.random", {
        message: errorMessage,
        type: "random",
      });
    }
  };

  return (
    <div className="mt-40 mb-40 px-10 py-10 w-2/5 mx-auto registratio-form dark:bg-gray-700">
      <form onSubmit={handleSubmit(submitForm)}>
        <div className="mb-5">
          <label
            htmlFor="UserName"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your Username
          </label>
          <input
            {...register("UserName", {
              required: "Your must fill username...",
            })}
            type="text"
            id="UserName"
            name="UserName"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            placeholder="jhon"
          />
          {errors.UserName?.message && (
            <p className="mt-2 text-sm text-red-600 dark:text-red-500">
              <span className="font-medium">Oh, sorry!</span>{" "}
              {errors.UserName?.message}
            </p>
          )}
        </div>
        <div className="mb-5">
          <label
            htmlFor="Email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your Email
          </label>
          <input
            {...register("Email", {
              required: "Your must need an email..",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Please enter a valid email address...",
              },
            })}
            type="email"
            id="Email"
            name="Email"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            placeholder="example@gmail.com"
          />
          {errors.Email?.message && (
            <p className="mt-2 text-sm text-red-600 dark:text-red-500">
              <span className="font-medium">Oh, sorry!</span>{" "}
              {errors.Email?.message}
            </p>
          )}
        </div>
        <div className="mb-5">
          <label
            htmlFor="Password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your Password
          </label>
          <input
            {...register("Password", {
              required: "You must fill password...",
              minLength: {
                value: 8,
                message: "Your password must be at least 8 characters..",
              },
              pattern: {
                value: /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
                message:
                  "Password too weak. Use numbers, characters, capital and small letters",
              },
            })}
            type="password"
            id="Password"
            name="Password"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
          />
          {errors.Password?.message && (
            <p className="mt-2 text-sm text-red-600 dark:text-red-500">
              <span className="font-medium">Oh, sorry!</span>{" "}
              {errors.Password?.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Register
        </button>

        {successMessage && (
          <div className="mt-8 flex items-center">
            <p className="text-sm text-green-600 dark:text-green-500">
              <span className="font-medium">Great!</span> {successMessage}
            </p>
            <Link
              href="/login"
              className="ml-8 text-white bg-green-500 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 flex-shrink-0"
            >
              Login Now
            </Link>
          </div>
        )}

        {errors?.root?.random?.message && (
          <p className="mt-8 text-sm text-red-600 dark:text-red-500">
            <span className="font-medium">Oh, sorry!</span>{" "}
            {errors?.root?.random?.message}!
          </p>
        )}
      </form>
    </div>
  );
}
