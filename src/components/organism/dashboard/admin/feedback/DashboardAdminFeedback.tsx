"use client";

import { feedbackColumns } from "@/components/atoms/datacolumn/DataFeedback";
import DialogDetailFeedback from "@/components/atoms/dialog/DialogDetailFeedback";
import { DataTable } from "@/components/molecules/datatable/DataTable";
import { useGetAllFeedback } from "@/http/admin/feedback/get-all-feedback";
import { Feedback } from "@/types/feedbacks/feedbacks";
import { useSession } from "next-auth/react";
import { useState } from "react";

export default function DashboardAdminFeedbackWrapper() {
  const { data: session, status } = useSession();
  const { data } = useGetAllFeedback(session?.access_token as string, {
    enabled: status === "authenticated",
  });

  const [selectedFeedback, setSelectedFeedback] = useState<Feedback | null>(
    null
  );
  const [openDialogDetailFeedback, setOpenDialogDetailFeedback] =
    useState(false);

  const handleDetailFeedback = (data: Feedback) => {
    setSelectedFeedback(data);
    setOpenDialogDetailFeedback(true);
  };
  return (
    <div className="mt-8">
      <DataTable
        columns={feedbackColumns({
          detailFeedbackHandler: handleDetailFeedback,
        })}
        data={data?.data ?? []}
      />
      {selectedFeedback && (
        <DialogDetailFeedback
          open={openDialogDetailFeedback}
          setOpen={setOpenDialogDetailFeedback}
          id={selectedFeedback.id}
        />
      )}
    </div>
  );
}
