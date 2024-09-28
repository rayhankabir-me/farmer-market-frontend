"use client";

import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
export default function CreatePost() {
  const [successMessage, setSuccessMessage] = useState("");
  const [accessToken, setAccessToken] = useState(null);
  //const [categories, setCategories] = useState([]);

  //   getting the access token for user
  useEffect(() => {
    const access_token = Cookies.get("Token");
    setAccessToken(access_token);
  }, []);

  //getting the categories data
  //   useEffect(() => {
  //     async function fetchCategories() {
  //       try {
  //         const response = await axios.get(
  //           process.env.NEXT_PUBLIC_BACKEND_API + "/api/categories"
  //         );
  //         setCategories(response.data);
  //       } catch (error) {
  //         console.log(error);
  //       }
  //     }

  //     fetchCategories();
  //   }, []);

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
        process.env.NEXT_PUBLIC_BACKEND_API + "/api/create-post",
        formData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (response.status === 200) {
        setSuccessMessage("New post added successfully!");
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
                  htmlFor="Title"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Title
                </label>
                <input
                  {...register("Title", {
                    required: "Your must fill in the post title.",
                  })}
                  type="text"
                  id="Title"
                  name="Title"
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                />
                {errors.Title?.message && (
                  <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                    <span className="font-medium">Oh, sorry!</span>{" "}
                    {errors.Title?.message}
                  </p>
                )}
              </div>

              <div className="mb-5">
                <label
                  htmlFor="Description"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Post Description
                </label>
                <textarea
                  {...register("Description", {
                    required: "Your must fill in the post description.",
                  })}
                  id="Description"
                  name="Description"
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                />
                {errors.Description?.message && (
                  <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                    <span className="font-medium">Oh, sorry!</span>{" "}
                    {errors.Description?.message}
                  </p>
                )}
              </div>

              <div className="mb-5">
                <label
                  htmlFor="PostDate"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Created at
                </label>
                <input
                  {...register("PostDate", {
                    required: "Your must fill in the post date.",
                  })}
                  type="text"
                  id="PostDate"
                  name="PostDate"
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                />
                {errors.PostDate?.message && (
                  <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                    <span className="font-medium">Oh, sorry!</span>{" "}
                    {errors.PostDate?.message}
                  </p>
                )}
              </div>

              <div className="mb-5">
                <label
                  htmlFor="ImageUrl"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Image Url
                </label>
                <input
                  {...register("ImageUrl", {
                    required: "Your must provide an image URL",
                  })}
                  type="text"
                  id="ImageUrl"
                  name="ImageUrl"
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                />
                {errors.ImageUrl?.message && (
                  <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                    <span className="font-medium">Oh, sorry!</span>{" "}
                    {errors.ImageUrl?.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Create Post
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
