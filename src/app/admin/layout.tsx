"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import SideNav from "@/components/ui/SideNav";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    const token = Cookies.get("accessToken");
    const role = Cookies.get("role");

    if (!token || !role || role !== "ADMIN") {
      router.replace("/login");
    } else {
      setAuthChecked(true);
    }
  }, [router]);

  if (!authChecked) {
    return null;
  }
  return (
    <div className="bg-white flex h-screen flex-col md:flex-row md:overflow-hidden">
      <div className="w-full flex-none md:w-64">
        <SideNav />
      </div>
      <div className="flex-grow p-6 md:overflow-y-auto md:p-12">{children}</div>
    </div>
  );
}
