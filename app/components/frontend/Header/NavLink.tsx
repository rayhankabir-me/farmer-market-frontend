"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavLink() {
  const pathname = usePathname();

  return (
    <div className="flex space-x-2">
      <Link
        href="/"
        className={`text-white rounded-md px-3 py-2 text-sm font-medium hover:bg-gray-700 ${
          pathname === "/" ? "bg-gray-900" : ""
        }`}
      >
        Home
      </Link>
      <Link
        href="/products"
        className={`text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium ${
          pathname === "/courses" ? "bg-gray-900" : ""
        }`}
      >
        Products
      </Link>
      <Link
        href="/posts"
        className={`text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium ${
          pathname === "/courses" ? "bg-gray-900" : ""
        }`}
      >
        Blog
      </Link>
      <Link
        href="/dashboard/all-cart"
        className={`text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium ${
          pathname === "/applyinstructor" ? "bg-gray-900" : ""
        }`}
      >
        Cart
      </Link>
      <Link
        href="/become-seller"
        className={`text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium ${
          pathname === "/applyinstructor" ? "bg-gray-900" : ""
        }`}
      >
        Become Seller
      </Link>
      <Link
        href="/contact-request"
        className={`text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium ${
          pathname === "/applyinstructor" ? "bg-gray-900" : ""
        }`}
      >
        Contact Us
      </Link>

      <Link
        href="/request-product"
        className={`text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium ${
          pathname === "/applyinstructor" ? "bg-gray-900" : ""
        }`}
      >
        Request Product
      </Link>
    </div>
  );
}
