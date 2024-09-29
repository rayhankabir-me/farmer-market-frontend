"use client";

import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
export default function AddRequest() {
  const [successMessage, setSuccessMessage] = useState("");
  const [accessToken, setAccessToken] = useState(null);
  //const [categories, setCategories] = useState([]);

  //getting the access token for user
  useEffect(() => {
    const access_token = Cookies.get("Token");
    setAccessToken(access_token);
  }, []);

  //getting the categories data
  // useEffect(() => {
  //   async function fetchCategories() {
  //     try {
  //       const response = await axios.get(
  //         process.env.NEXT_PUBLIC_BACKEND_API + "/api/categories"
  //       );
  //       setCategories(response.data);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }

  //   fetchCategories();
  // }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  const submitForm = async (formData) => {
    formData.UserId = 1;
    try {
      const response = await axios.post(
        process.env.NEXT_PUBLIC_BACKEND_API + "/api/contact/request",
        formData
        // {
        //   headers: {
        //     Authorization: `Bearer ${accessToken}`,
        //   },
        // }
      );

      if (response.status === 200) {
        setSuccessMessage("Contact request has been sent successfully!");
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
    <div className="flex justify-center items-center min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="p-6 w-full max-w-xl bg-white border border-gray-200 rounded-lg shadow-lg dark:bg-gray-800 dark:border-gray-700 ml-16">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
          Submit Your Request
        </h2>

        <form onSubmit={handleSubmit(submitForm)}>
          {/* First Name */}
          <div className="mb-5">
            <label
              htmlFor="FirstName"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              First Name
            </label>
            <input
              {...register("FirstName", {
                required: "You must fill in your first name.",
              })}
              type="text"
              id="FirstName"
              name="FirstName"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            />
            {errors.FirstName?.message && (
              <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                {errors.FirstName?.message}
              </p>
            )}
          </div>

          {/* Last Name */}
          <div className="mb-5">
            <label
              htmlFor="LastName"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Last Name
            </label>
            <input
              {...register("LastName", {
                required: "You must fill in your last name.",
              })}
              type="text"
              id="LastName"
              name="LastName"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            />
            {errors.LastName?.message && (
              <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                {errors.LastName?.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div className="mb-">
            <label
              htmlFor="Email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your valid email
            </label>
            <input
              {...register("Email", {
                required: "You must fill in your email address.",
              })}
              type="email"
              id="Email"
              name="Email"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            />
            {errors.Email?.message && (
              <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                {errors.Email?.message}
              </p>
            )}
          </div>

          {/* Subject */}
          <div className="mb-5">
            <label
              htmlFor="Subject"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Subject of the request
            </label>
            <input
              {...register("Subject", {
                required: "You must fill in the subject field.",
              })}
              type="text"
              id="Subject"
              name="Subject"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            />
            {errors.Subject?.message && (
              <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                {errors.Subject?.message}
              </p>
            )}
          </div>

          {/* Message */}
          <div className="mb-5">
            <label
              htmlFor="Message"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Message body of the request
            </label>
            <textarea
              {...register("Message", {
                required: "You must fill in the message body.",
              })}
              id="Message"
              name="Message"
              rows="4"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            ></textarea>
            {errors.Message?.message && (
              <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                {errors.Message?.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Send Request
          </button>

          {/* Success Message */}
          {successMessage && (
            <div className="mt-4 flex justify-center items-center">
              <p className="text-sm text-green-600 dark:text-green-500">
                {successMessage}
              </p>
            </div>
          )}

          {/* General Error */}
          {errors?.root?.random?.message && (
            <p className="mt-4 text-sm text-red-600 dark:text-red-500">
              {errors?.root?.random?.message}!
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
