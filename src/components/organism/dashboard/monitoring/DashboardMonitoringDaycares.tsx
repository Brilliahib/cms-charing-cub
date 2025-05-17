"use client";

import CardListDaycareMonitoring from "@/components/molecules/card/CardListDaycareMonitoring";
import { useGetAllMonitoringChildrenCurrentUser } from "@/http/monitoring/get-all-monitoring-children-current-user";
import { useSession } from "next-auth/react";

export default function DashboardMonitoringDaycaresWrapper() {
  const { data: session, status } = useSession();

  const { data, isPending } = useGetAllMonitoringChildrenCurrentUser(
    session?.access_token as string,
    {
      enabled: status === "authenticated",
    }
  );

  return (
    <section className="mt-7">
      <CardListDaycareMonitoring data={data?.data} isLoading={isPending} />
    </section>
  );
}
