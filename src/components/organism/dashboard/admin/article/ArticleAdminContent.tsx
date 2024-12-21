"use client";

import { articleColumns } from "@/components/atoms/datacolumn/DataArticle";
import DialogCreateArticle from "@/components/atoms/dialog/DialogCreateArticle";
import DialogCreateArticleType from "@/components/atoms/dialog/DialogCreateTypeArticle";
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
  const [dialogCreateArticleTypeOpen, setDialogCreateArticleTypeOpen] =
    useState(false);

  const handleArticleDialogOpen = () => {
    setDialogCreateArticleOpen(true);
  };

  const handleArticleTypeDialogOpen = () => {
    setDialogCreateArticleTypeOpen(true);
  };
  return (
    <>
      <div className="py-8 space-y-8">
        <div className="flex justify-between items-center">
          <SearchInput
            onSearch={setSearchQuery}
            props="Search artcle..."
            className="min-w-[250px]"
          />
          <div className="flex gap-4">
            <Button onClick={handleArticleDialogOpen}>Tambah Artikel</Button>
            <Button onClick={handleArticleTypeDialogOpen} variant={"outline"}>
              Tambah Tipe Artikel
            </Button>
          </div>
        </div>
        <DataTable columns={articleColumns} data={filteredData} />
      </div>
      <DialogCreateArticle
        open={dialogCreateArticleOpen}
        setOpen={setDialogCreateArticleOpen}
      />
      <DialogCreateArticleType
        open={dialogCreateArticleTypeOpen}
        setOpen={setDialogCreateArticleTypeOpen}
      />
    </>
  );
}
