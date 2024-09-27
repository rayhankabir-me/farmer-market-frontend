"use client";

import axios from "axios";
// import Cookies from "js-cookie";
import { useState } from "react";
import { useForm } from "react-hook-form";
export default function AddCategory() {
  const [successMessage, setSuccessMessage] = useState("");
  //   const [accessToken, setAccessToken] = useState(null);

  //getting the access token for user
  //   useEffect(() => {
  //     const access_token = Cookies.get("access_token");
  //     setAccessToken(access_token);
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
        process.env.NEXT_PUBLIC_BACKEND_API + "/api/add-category",
        formData,
        {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6InJheWhhbiIsInJvbGUiOiJBZG1pbiIsImVtYWlsIjoicmF5aGFua2FiaXIud3BAZ21haWwuY29tIiwiVXNlcklkIjoiMSIsIm5iZiI6MTcyNzQzODkyMCwiZXhwIjoxNzI3NDQwNzIwLCJpYXQiOjE3Mjc0Mzg5MjAsImlzcyI6IkZhcm1lck1hcmtldCIsImF1ZCI6IlVzZXJzIn0.M3p1yHLH9hmDOJ3g22a5VcfSGXllrWeGrFjWvFZvZTY`,
          },
        }
      );

      if (response.status === 200) {
        setSuccessMessage("Category Created successful...!");
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
                  htmlFor="title"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Category Title
                </label>
                <input
                  {...register("Name", {
                    required: "Your must fill Category title...",
                  })}
                  type="Name"
                  id="Name"
                  name="Name"
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                />
                {errors.Name?.message && (
                  <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                    <span className="font-medium">Oh, sorry!</span>{" "}
                    {errors.Name?.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Add Category
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
