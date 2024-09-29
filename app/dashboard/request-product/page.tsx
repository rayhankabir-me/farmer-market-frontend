"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

const RequestProductPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [successMessage, setSuccessMessage] = useState("");
  const router = useRouter();

  const submitForm = async (data) => {
    try {
      data.Time = new Date().toISOString();
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_API}/api/requestproduct/addrequest`,
        data
      );
      console.log(response);
      setSuccessMessage("Submission successful!");

      setTimeout(() => {
        alert("Submission successful!");
        router.push("/");
      }, 2000);
    } catch (error) {
      console.error("There was an error submitting the request!", error);
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
                  Your Name
                </label>
                <input
                  {...register("Name", {
                    required: "You must fill in your name.",
                  })}
                  type="text"
                  id="Name"
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                />
                {errors.Name?.message && (
                  <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                    <span className="font-medium">Oh, sorry!</span>{" "}
                    {errors.Name?.message}
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
                    required: "You must fill in your email.",
                    pattern: {
                      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                      message: "Please enter a valid email address.",
                    },
                  })}
                  type="email"
                  id="Email"
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
                  htmlFor="ProductName"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Product Name
                </label>
                <input
                  {...register("ProductName", {
                    required: "You must fill in the product name.",
                  })}
                  type="text"
                  id="ProductName"
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                />
                {errors.ProductName?.message && (
                  <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                    <span className="font-medium">Oh, sorry!</span>{" "}
                    {errors.ProductName?.message}
                  </p>
                )}
              </div>

              <div className="mb-5">
                <label
                  htmlFor="phone"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Phone Number
                </label>
                <input
                  {...register("phone", {
                    required: "You must fill in your phone number.",
                    minLength: {
                      value: 11,
                      message: "Phone number must be 11 digits.",
                    },
                    maxLength: {
                      value: 11,
                      message: "Phone number must be 11 digits.",
                    },
                  })}
                  type="text"
                  id="phone"
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                />
                {errors.phone?.message && (
                  <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                    <span className="font-medium">Oh, sorry!</span>{" "}
                    {errors.phone?.message}
                  </p>
                )}
              </div>

              <div className="mb-5">
                <label
                  htmlFor="Massage"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Message (Optional)
                </label>
                <textarea
                  {...register("Massage")}
                  id="Massage"
                  rows="4"
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                />
              </div>

              <button
                type="submit"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Add Product Request
              </button>

              {successMessage && (
                <div className="mt-8 flex items-center">
                  <p className="text-sm text-green-600 dark:text-green-500">
                    <span className="font-medium">Great!</span> {successMessage}
                  </p>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestProductPage;
