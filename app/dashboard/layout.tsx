"use client";


import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import DashboardSidebar from "@/app/components/dashboard/DashboardSidebar";

export default function Dashboard({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    return (
        <>
          <DashboardSidebar />
          {children}
        </>
      );


}
