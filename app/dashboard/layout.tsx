"use client";

import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import DashboardSidebar from "../components/dashboard/DashboardSidebar";

export default function Dashboard({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState(null);

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
          setIsAuthenticated(true);
          setUserData(decoded);
        } else {
          router.push("/login");
        }
      } catch (error) {
        router.push("/login");
      }
    };

    verifyToken();

    return () => {};
  }, [router]);

  return isAuthenticated ? (
    <>
      <DashboardSidebar userData={userData} />
      {children}
    </>
  ) : null;
}
