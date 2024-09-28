/* eslint-disable @next/next/no-img-element */

"use client";

import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Profile() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [accessToken, setAccessToken] = useState(null);
  const [userData, setUserData] = useState(null);
  const router = useRouter();

  // Getting user data from token
  useEffect(() => {
    const verifyToken = () => {
      const access_token = Cookies.get("Token");

      if (!access_token) {
        router.push("/login");
        return;
      }

      try {
        const decoded = jwtDecode(access_token);

        if (decoded && decoded.exp) {
          setUserData(decoded);
        } else {
          router.push("/login");
        }
      } catch (error) {
        console.error("Error decoding token:", error);
        setError(error.message);
        router.push("/login");
      }
    };

    verifyToken();
    setLoading(false);

    return () => {};
  }, [router]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error loading profile information: {error}</p>;
  }

  return (
    <main className="pt-8 pb-16 lg:pt-16 lg:pb-24 bg-white dark:bg-gray-900 antialiased">
      <div className="flex justify-between px-4 mx-auto max-w-screen-xl ">
        <article className="mx-auto w-full max-w-2xl format format-sm sm:format-base lg:format-lg format-blue dark:format-invert">
          <header className="mb-4 lg:mb-6 not-format">
            <address className="flex items-center mb-6 not-italic">
              <div className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white">
                <img
                  className="mr-4 w-16 h-16 rounded-full"
                  src="https://flowbite.com/docs/images/people/profile-picture-2.jpg"
                  alt="Profile Image"
                />
                <div>
                  <a
                    href="#"
                    rel="author"
                    className="text-xl font-bold text-gray-900 dark:text-white"
                  >
                    {userData?.unique_name || "User Name"}
                  </a>
                  <p className="text-base text-gray-500 dark:text-gray-400">
                    {userData?.email || "User Email"}
                  </p>
                </div>
              </div>
            </address>
          </header>

          <figure></figure>
          <div className="mt-8">
            <h3 className="mt-8">
              Role: <strong>{userData?.role || "N/A"}</strong>
            </h3>
            <Link
              className="inline-block mt-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              href={`/dashboard/update-profile`}
            >
              Update Profile
            </Link>
          </div>
        </article>
      </div>
    </main>
  );
}
