/* eslint-disable @next/next/no-img-element */
import Logo from "@/public/images/Farmers Market.png";
import Image from "next/image";
import Link from "next/link";
import LoginBar from "./LoginBar";
import NavLink from "./NavLink";
export default function NavBar() {
  return (
    <>
      <nav className="bg-gray-800 sticky top-0 left-0 z-40">
        <div className="container pt-2 pb-2">
          <div className="relative flex h-16 items-center justify-center">
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
              <button
                type="button"
                className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                aria-controls="mobile-menu"
                aria-expanded="false"
              >
                <span className="absolute -inset-0.5"></span>
                <span className="sr-only">Open main menu</span>

                <svg
                  className="block h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>

                <svg
                  className="hidden h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
              <div className="flex flex-shrink-0 items-center">
                <Link href="/">
                  <Image
                    className="h-14 w-auto"
                    src={Logo}
                    alt="Company Logo"
                  />
                </Link>
              </div>
              <div className="ml-6 flex items-center">
                <div className="hidden sm:ml-6 sm:block">
                  <NavLink />
                </div>
              </div>
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              <LoginBar />
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
