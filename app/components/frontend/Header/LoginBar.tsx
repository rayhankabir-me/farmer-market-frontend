"use client";

import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function LoginBar() {
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const checkUserLoggedIn = () => {
      const access_token = Cookies.get("Token");

      if (!access_token) {
        setUserLoggedIn(false);
      } else {
        const decoded = jwtDecode(access_token);

        if (decoded && decoded.exp) {
          setUserLoggedIn(true);
        }
      }
    };

    checkUserLoggedIn();
  }, [router]);

  return (
    <div className="flex space-x-4">
      {!userLoggedIn && (
        <>
          <Link
            href="/login"
            className={`text-white rounded-md px-3 py-2 text-sm font-medium hover:bg-gray-700 ${
              pathname === "/login" ? "bg-gray-900" : ""
            }`}
          >
            Login
          </Link>
          <Link
            href="/register"
            className={`text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium ${
              pathname === "/register" ? "bg-gray-900" : ""
            }`}
          >
            Register
          </Link>
        </>
      )}

      {userLoggedIn && (
        <>
          <Link
            href="/dashboard"
            className={`text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium ${
              pathname === "/dashboard" ? "bg-gray-900" : ""
            }`}
          >
            Dashboard
          </Link>
        </>
      )}
    </div>
  );
}
