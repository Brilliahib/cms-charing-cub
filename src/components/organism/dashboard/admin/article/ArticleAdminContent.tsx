"use client";

import { articleColumns } from "@/components/atoms/datacolumn/DataArticle";
import { articleTypeColumns } from "@/components/atoms/datacolumn/DataArticleType";
import DialogCreateArticle from "@/components/atoms/dialog/DialogCreateArticle";
import DialogCreateArticleType from "@/components/atoms/dialog/DialogCreateTypeArticle";
import SearchInput from "@/components/atoms/search/SearchInput";
import { DataTable } from "@/components/molecules/datatable/DataTable";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useGetArticle } from "@/http/article/get-all-article";
import { useGetAllArticleType } from "@/http/article/type-article/get-all-article-type";
import { Plus } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";

export default function ArticleAdminContent() {
  const { data, isPending } = useGetArticle();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredArticles =
    data?.data.filter((article) =>
      article.title.toLowerCase().includes(searchQuery.toLowerCase())
    ) || [];

  const { data: session, status } = useSession();
  const { data: articleType } = useGetAllArticleType(
    session?.access_token as string,
    {
      enabled: status === "authenticated",
    }
  );

  const filteredArticleTypes =
    articleType?.data.filter((type) =>
      type.name.toLowerCase().includes(searchQuery.toLowerCase())
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
        <div className="flex md:flex-row flex-col gap-4 justify-between">
          <SearchInput
            onSearch={setSearchQuery}
            props="Cari artikel..."
            className="md:w-[250px] w-full"
          />
          <div className="flex md:flex-row flex-col gap-4">
            <Button>
              <Link
                href={"/dashboard/admin/article/create"}
                className="flex items-center gap-2"
              >
                <Plus /> Tambah Artikel
              </Link>
            </Button>
            <Button onClick={handleArticleTypeDialogOpen} variant={"outline"}>
              <Plus />
              Tambah Tipe Artikel
            </Button>
          </div>
        </div>
        <Tabs defaultValue="article" className="space-y-4">
          <TabsList className="max-w-[200px] grid w-full grid-cols-2">
            <TabsTrigger value="article">Artikel</TabsTrigger>
            <TabsTrigger value="article-type">Tipe Artikel</TabsTrigger>
          </TabsList>
          <TabsContent value="article">
            <DataTable columns={articleColumns} data={filteredArticles} />
          </TabsContent>
          <TabsContent value="article-type">
            <DataTable
              columns={articleTypeColumns}
              data={filteredArticleTypes}
            />
          </TabsContent>
        </Tabs>
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
