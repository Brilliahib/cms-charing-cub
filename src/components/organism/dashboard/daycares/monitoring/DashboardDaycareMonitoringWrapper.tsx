"use client";

import { monitoringChildrenDaycareColumns } from "@/components/atoms/datacolumn/DataMonitoringChildrenDaycare";
import { DataTable } from "@/components/molecules/datatable/DataTable";
import { Button } from "@/components/ui/button";
import { useGetAllMonitoringByDaycare } from "@/http/daycares/monitoring/get-all-monitoring-by-daycare";
import { Plus } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function DashboardDaycareMonitoringWrapper() {
  const { data: session, status } = useSession();

  const { data } = useGetAllMonitoringByDaycare(
    "05bec407-cf32-4f37-a80b-bc2d9dcb8013",
    session?.access_token as string,
    {
      enabled: status === "authenticated",
    }
  );

  return (
    <>
      <div className="mt-8 space-y-6">
        <Link href={"/dashboard/daycares/monitoring/create"}>
          <Button>
            <Plus /> Tambah Monitoring
          </Button>
        </Link>
        <DataTable
          data={data?.data ?? []}
          columns={monitoringChildrenDaycareColumns}
        />
      </div>
    </>
  );
}
