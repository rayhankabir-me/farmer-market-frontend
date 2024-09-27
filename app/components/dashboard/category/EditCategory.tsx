"use client";

import axios from "axios";
// import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
export default function EditCategory({ id }) {
  const [successMessage, setSuccessMessage] = useState("");
  //   const [accessToken, setAccessToken] = useState(null);
  const [currentId, setCurrentId] = useState(id);

  //setting category data in state
  const [categoryData, setCateoryData] = useState("");

  //getting the access token for user
  //   useEffect(() => {
  //     const access_token = Cookies.get("access_token");
  //     setAccessToken(access_token);
  //   }, []);

  //getting the single category data
  useEffect(() => {
    async function fetchCategoryData() {
      try {
        const response = await axios.get(
          process.env.NEXT_PUBLIC_BACKEND_API + "/api/categories/" + currentId
        );
        setCateoryData(response.data);
      } catch (error) {
        console.log(error);
      }
    }

    fetchCategoryData();
  }, [currentId]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  const submitForm = async (formData) => {
    try {
      const response = await axios.put(
        process.env.NEXT_PUBLIC_BACKEND_API + "/api/edit-category/" + currentId,
        formData,
        {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6InJheWhhbiIsInJvbGUiOiJBZG1pbiIsImVtYWlsIjoicmF5aGFua2FiaXIud3BAZ21haWwuY29tIiwiVXNlcklkIjoiMSIsIm5iZiI6MTcyNzQ0MTQxMSwiZXhwIjoxNzI3NDQzMjExLCJpYXQiOjE3Mjc0NDE0MTEsImlzcyI6IkZhcm1lck1hcmtldCIsImF1ZCI6IlVzZXJzIn0.B_qrL3XF36-7-aLKd3_v9UayjTIzRfnNGAZgzwB-goQ`,
          },
        }
      );

      if (response.status === 200) {
        setSuccessMessage("Category updated successfully!");
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || "An error occurred";
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
                  Category Name
                </label>
                <input
                  {...register("Name", {
                    required: "Your must fill Category Name...",
                  })}
                  type="Name"
                  id="Name"
                  name="Name"
                  defaultValue={categoryData.Name}
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
                Update Category
              </button>

              {successMessage && (
                <div className="mt-8 flex items-center">
                  <p className="text-sm text-green-600 dark:text-green-500">
                    <span className="font-medium">Great!</span> {successMessage}
                  </p>
                </div>
              )}

              {errors?.root?.random?.Message && (
                <p className="mt-8 text-sm text-red-600 dark:text-red-500">
                  <span className="font-medium">Oh, sorry!</span>{" "}
                  {errors?.root?.random?.Message}!
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
