/* eslint-disable @next/next/no-img-element */

"use client";

import ProductImage from "@/public/images/hero-image.webp";
import axios from "axios";
import Cookies from "js-cookie";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProductDetails({ params }) {
  const { id } = params;
  const [productData, setProductData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [accessToken, setAccessToken] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [currentId, setCurrentId] = useState(id);
  const router = useRouter();

  //getting the products data
  useEffect(() => {
    async function fetchProduct() {
      try {
        const response = await axios.get(
          process.env.NEXT_PUBLIC_BACKEND_API + "/api/products/" + currentId
        );
        setProductData(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    }

    fetchProduct();
  }, [currentId]);

  //getting user token
  useEffect(() => {
    const access_token = Cookies.get("Token");
    setAccessToken(access_token);
  }, []);

  const submitForm = async (formData) => {
    try {
      const response = await axios.post(
        process.env.NEXT_PUBLIC_BACKEND_API + "/api/cart/addcart",
        formData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        setSuccessMessage("Product added to the cart successful...!");
      }
    } catch (error) {
      setError("Something went wrong..!");
    }
  };

  if (loading) {
    return (
      <>
        <button
          disabled
          type="button"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center"
        >
          <svg
            aria-hidden="true"
            role="status"
            className="inline w-4 h-4 me-3 text-white animate-spin"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="#E5E7EB"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentColor"
            />
          </svg>
          Loading...
        </button>
      </>
    );
  }

  if (error) {
    return (
      <div
        className="flex items-center p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
        role="alert"
      >
        <svg
          className="flex-shrink-0 inline w-4 h-4 me-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
        </svg>
        <span className="sr-only">Info</span>
        <div>
          <span className="font-medium">Error!</span> {error.message}.
        </div>
      </div>
    );
  }

  return (
    <>
      <main className="pt-8 pb-16 lg:pt-16 lg:pb-24 bg-white dark:bg-gray-900 antialiased">
        <div className="flex justify-between px-4 mx-auto max-w-screen-xl ">
          <article className="mx-auto w-full max-w-2xl format format-sm sm:format-base lg:format-lg format-blue dark:format-invert">
            <header className="mb-4 lg:mb-6 not-format">
              <address className="flex items-center mb-6 not-italic">
                <div className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white">
                  <img
                    className="mr-4 w-16 h-16 rounded-full"
                    src="https://flowbite.com/docs/images/people/profile-picture-2.jpg"
                    alt="Jese Leos"
                  />
                  <div>
                    <a
                      href="#"
                      rel="author"
                      className="text-xl font-bold text-gray-900 dark:text-white"
                    >
                      Product By
                    </a>
                    <p className="text-base text-gray-500 dark:text-gray-400">
                      {productData.User.UserName}
                    </p>
                  </div>
                </div>
              </address>
              <h1 className="mb-4 text-3xl font-extrabold leading-tight text-gray-900 lg:mb-6 lg:text-4xl dark:text-white">
                {productData.Name}
              </h1>
            </header>

            <figure>
              <Image
                className="w-auto"
                src={ProductImage}
                alt="Product Image"
              />
            </figure>
            <div className="mt-8">
              <p>{productData.Description}</p>

              <h3 className="mt-8">
                Price: <strong>{productData.Price}</strong>
              </h3>
              <h4 className="mb-8">
                Category: <strong>{productData.Category.Name}</strong>
              </h4>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const formData = new FormData(e.target);
                  submitForm(formData);
                }}
              >
                <input
                  type="hidden"
                  id="ProductId"
                  name="ProductId"
                  value={productData.ProductId}
                />
                <input
                  className="mt-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  type="submit"
                  value="Add To Cart"
                />
              </form>

              {successMessage && (
                <div className="mt-8 flex items-center">
                  <p className="text-sm text-green-600 dark:text-green-500">
                    <span className="font-medium">Great!</span> {successMessage}
                  </p>
                </div>
              )}

              {error && (
                <p className="mt-8 text-sm text-red-600 dark:text-red-500">
                  <span className="font-medium">Oh, sorry!</span> {error}!
                </p>
              )}
            </div>
          </article>
        </div>
      </main>
    </>
  );
}
