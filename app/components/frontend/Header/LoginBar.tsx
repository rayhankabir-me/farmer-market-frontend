"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function LoginBar() {
  const pathname = usePathname();

  return (
    <div className="flex space-x-4">
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
      <Link
        href="/dashboard"
        className={`text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium ${
          pathname === "/dashboard" ? "bg-gray-900" : ""
        }`}
      >
        Dashboard
      </Link>
    </div>
  );
}
