"use client";

import { monitoringChildrenDaycareColumns } from "@/components/atoms/datacolumn/DataMonitoringChildrenDaycare";
import { DataTable } from "@/components/molecules/datatable/DataTable";
import { Button } from "@/components/ui/button";
import { useGetOurDaycare } from "@/http/daycares/get-our-daycares";
import { useGetAllMonitoringByDaycare } from "@/http/daycares/monitoring/get-all-monitoring-by-daycare";
import { Plus } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function DashboardDaycareMonitoringWrapper() {
  const { data: session, status } = useSession();

  const { data: daycare } = useGetOurDaycare(session?.access_token as string, {
    enabled: status === "authenticated",
  });

  const { data } = useGetAllMonitoringByDaycare(
    daycare?.data.id.toString() ?? "",
    session?.access_token as string,
    {
      enabled: status === "authenticated" && !!daycare?.data.id,
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
