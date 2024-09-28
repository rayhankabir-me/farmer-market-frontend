"use client";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export default function LoginComponent() {
  const [successMessage, setSuccessMessage] = useState("");
  const router = useRouter();

  useEffect(() => {
    const access_token = Cookies.get("Token");
    if (access_token) {
      router.push("/dashboard");
    }
  }, [router]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  const submitForm = async (formData) => {
    try {
      const response = await axios.post(
        process.env.NEXT_PUBLIC_BACKEND_API + "/api/auth/login",
        formData
      );

      if (response.status === 200) {
        setSuccessMessage("Login successful! We're redirecting you.");

        //access token
        const access_token = response.data.Token;
        const expires = new Date(Date.now() + 30 * 60 * 1000);
        Cookies.set("Token", access_token, {
          expires: expires,
          path: "/",
        });

        setTimeout(() => {
          router.push("/dashboard");
        }, 5000);
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
    <div className="mt-40 px-10 py-10 w-2/5 mx-auto registratio-form dark:bg-gray-700">
      <form onSubmit={handleSubmit(submitForm)}>
        <div className="mb-5">
          <label
            htmlFor="UserName"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Username
          </label>
          <input
            {...register("UserName", {
              required: "Your must fill in the username.",
            })}
            type="text"
            id="UserName"
            name="UserName"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
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
            htmlFor="Password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your password
          </label>
          <input
            {...register("Password", {
              required: "You must fill in the password.",
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
          Login
        </button>

        {successMessage && (
          <div className="mt-8 flex items-center">
            <p className="text-sm text-green-600 dark:text-green-500">
              <span className="font-medium">Great!</span> {successMessage}
            </p>
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
