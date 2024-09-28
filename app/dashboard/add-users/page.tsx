"use client";

import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
export default function AddUser() {
  const [successMessage, setSuccessMessage] = useState("");
  const [accessToken, setAccessToken] = useState(null);

  //   getting the access token for user
  useEffect(() => {
    const access_token = Cookies.get("Token");
    setAccessToken(access_token);
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    reset,
  } = useForm();

  const submitForm = async (formData) => {
    try {
      const response = await axios.post(
        process.env.NEXT_PUBLIC_BACKEND_API + "/api/users/register",
        formData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (response.status === 200) {
        setSuccessMessage("User Created successful...!");
        reset();
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
    <div className="p-4 sm:ml-64">
      <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
        <div className="flex items-center justify-center mb-4 rounded bg-gray-50 dark:bg-gray-800">
          <div className="px-4 py-8 w-full">
            <form onSubmit={handleSubmit(submitForm)}>
              <div className="mb-5">
                <label
                  htmlFor="Name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  User Name
                </label>
                <input
                  {...register("UserName", {
                    required: "Your must fill User Name...",
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
                  htmlFor="Email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Email
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
                  Password
                </label>
                <input
                  {...register("Password", {
                    required: "You must fill password...",
                    minLength: {
                      value: 8,
                      message: "Your password must be at least 8 characters..",
                    },
                    pattern: {
                      value:
                        /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
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

              <div className="mb-5">
                <label
                  htmlFor="CategoryId"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Select User Role
                </label>
                <select
                  {...register("Role", {
                    required: "You must select an user role...",
                  })}
                  id="Role"
                  name="Role"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option value="Customer">Customer</option>
                  <option value="Admin">Admin</option>
                </select>
                {errors.Role?.message && (
                  <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                    <span className="font-medium">Oh, sorry!</span>{" "}
                    {errors.Role?.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Add User
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
        </div>
      </div>
    </div>
  );
}
