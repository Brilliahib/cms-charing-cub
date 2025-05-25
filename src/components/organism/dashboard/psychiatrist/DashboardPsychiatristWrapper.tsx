"use client";

import { cubTalkColumns } from "@/components/atoms/datacolumn/DataCubTalk";
import { DataTable } from "@/components/molecules/datatable/DataTable";
import { useGetAllQuestionTalk } from "@/http/cub/talk/get-all-question-talk";

export default function DashboardPsychiatristWrapper() {
  const { data } = useGetAllQuestionTalk();
  return (
    <div className="md:py-8 space-y-8">
      <DataTable columns={cubTalkColumns} data={data?.data ?? []} />
    </div>
  );
}
