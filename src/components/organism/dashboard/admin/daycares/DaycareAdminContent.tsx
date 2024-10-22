"use client";

import { articleColumns } from "@/components/atoms/datacolumn/DataArticle";
import { daycareColumns } from "@/components/atoms/datacolumn/DataDaycare";
import DialogCreateArticle from "@/components/atoms/dialog/DialogCreateArticle";
import { DataTable } from "@/components/molecules/datatable/DataTable";
import { Button } from "@/components/ui/button";
import { useGetAllDaycare } from "@/http/daycares/get-all-daycares";
import { useState } from "react";

export default function DaycareAdminContent() {
  const { data, isPending } = useGetAllDaycare();

  const [dialogCreateArticleOpen, setDialogCreateArticleOpen] = useState(false);

  const handleGrowthDialogOpen = () => {
    setDialogCreateArticleOpen(true);
  };
  return (
    <>
      <div className="py-8 space-y-8">
        <div>
          <Button onClick={handleGrowthDialogOpen}>Tambah Daycare</Button>
        </div>
        <DataTable columns={daycareColumns} data={data?.data || []} />
      </div>
      <DialogCreateArticle
        open={dialogCreateArticleOpen}
        setOpen={setDialogCreateArticleOpen}
      />
    </>
  );
}
