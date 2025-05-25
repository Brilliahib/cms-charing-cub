"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import DashboardTitle from "@/components/atoms/typography/DashboardTitle";
import DashboardWrapperContent from "./DashboardContent";

export default function DashboardContent() {
  const { data: session } = useSession();
  const router = useRouter();

  if (!session) {
    router.push("/login");
    return null;
  }

  if (session.user.role === "admin") {
    router.push("/dashboard/admin");
    return null;
  }

  if (session.user.role === "nannies") {
    router.push("/dashboard/nannies");
    return null;
  }

  if (session.user.role === "daycare") {
    router.push("/dashboard/daycares");
    return null;
  }

  if (session.user.role === "psychiatrist") {
    router.push("/dashboard/psychiatrist");
    return null;
  }

  return (
    <>
      <DashboardTitle
        title="Dashboard"
        body="Selamat datang di Charing Cub Parents! Silahkan akses fitur yang tersedia"
      />
      <DashboardWrapperContent />
    </>
  );
}
