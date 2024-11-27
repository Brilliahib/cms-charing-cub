"use client";

import { useGetProfileDaycare } from "@/http/daycares/get-profile-daycare";
import { useSession } from "next-auth/react";
import DaycareCreateProfileContent from "./DaycareCreateProfileContent";
import DaycareDashboardContent from "./DaycareDashboardContent";

export default function DaycareWrapperContent() {
  const { data: session, status } = useSession();
  const { data, isPending } = useGetProfileDaycare(
    session?.access_token as string,
    { enabled: status === "authenticated" }
  );

  if (data?.data === null) return <DaycareCreateProfileContent />;
  if (data?.data) return <DaycareDashboardContent />;
}
