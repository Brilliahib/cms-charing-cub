"use client";

import { articleColumns } from "@/components/atoms/datacolumn/DataArticle";
import DialogCreateArticle from "@/components/atoms/dialog/DialogCreateArticle";
import { DataTable } from "@/components/molecules/datatable/DataTable";
import { Button } from "@/components/ui/button";
import { useGetArticle } from "@/http/article/get-all-article";
import { useState } from "react";

export default function ArticleAdminContent() {
  const { data, isPending } = useGetArticle();

  const [dialogCreateArticleOpen, setDialogCreateArticleOpen] = useState(false);

  const handleGrowthDialogOpen = () => {
    setDialogCreateArticleOpen(true);
  };
  return (
    <>
      <div className="py-8 space-y-8">
        <div>
          <Button onClick={handleGrowthDialogOpen}>Tambah Artikel</Button>
        </div>
        <DataTable columns={articleColumns} data={data?.data || []} />
      </div>
      <DialogCreateArticle
        open={dialogCreateArticleOpen}
        setOpen={setDialogCreateArticleOpen}
      />
    </>
  );
}
