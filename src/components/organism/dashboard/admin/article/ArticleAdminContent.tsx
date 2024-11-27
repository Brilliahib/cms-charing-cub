"use client";

import { articleColumns } from "@/components/atoms/datacolumn/DataArticle";
import DialogCreateArticle from "@/components/atoms/dialog/DialogCreateArticle";
import SearchInput from "@/components/atoms/search/SearchInput";
import { DataTable } from "@/components/molecules/datatable/DataTable";
import { Button } from "@/components/ui/button";
import { useGetArticle } from "@/http/article/get-all-article";
import { useState } from "react";

export default function ArticleAdminContent() {
  const { data, isPending } = useGetArticle();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredData =
    data?.data.filter((article) =>
      article.title.toLowerCase().includes(searchQuery.toLowerCase())
    ) || [];

  const [dialogCreateArticleOpen, setDialogCreateArticleOpen] = useState(false);

  const handleGrowthDialogOpen = () => {
    setDialogCreateArticleOpen(true);
  };
  return (
    <>
      <div className="py-8 space-y-8">
        <div className="flex justify-between">
          <SearchInput
            onSearch={setSearchQuery}
            props="Search artcle..."
            className="min-w-[250px]"
          />
          <Button onClick={handleGrowthDialogOpen}>Tambah Artikel</Button>
        </div>
        <DataTable columns={articleColumns} data={filteredData} />
      </div>
      <DialogCreateArticle
        open={dialogCreateArticleOpen}
        setOpen={setDialogCreateArticleOpen}
      />
    </>
  );
}
