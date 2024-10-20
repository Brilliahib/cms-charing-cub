"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import DashboardTitle from "@/components/atoms/typography/DashboardTitle";
import DashboardWrapper from "@/components/organism/dashboard/DashboardWrapper";

export default function Dashboard() {
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

  return (
    <>
      <DashboardTitle title="Dashboard" />
    </>
  );
}
