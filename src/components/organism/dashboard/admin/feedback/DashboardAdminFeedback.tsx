"use client";

import { feedbackColumns } from "@/components/atoms/datacolumn/DataFeedback";
import { DataTable } from "@/components/molecules/datatable/DataTable";
import { useGetAllFeedback } from "@/http/admin/feedback/get-all-feedback";
import { useSession } from "next-auth/react";

export default function DashboardAdminFeedbackWrapper() {
  const { data: session, status } = useSession();
  const { data } = useGetAllFeedback(session?.access_token as string, {
    enabled: status === "authenticated",
  });
  return (
    <div className="mt-8">
      <DataTable columns={feedbackColumns} data={data?.data ?? []} />
    </div>
  );
}
