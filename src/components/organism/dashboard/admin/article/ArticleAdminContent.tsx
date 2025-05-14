"use client";

import AlertDialogDeleteArticle from "@/components/atoms/alert/AlertDialogDeleteArticle";
import AlertDialogDeleteArticleType from "@/components/atoms/alert/AlertDialogDeleteArticleType";
import { articleColumns } from "@/components/atoms/datacolumn/DataArticle";
import { articleTypeColumns } from "@/components/atoms/datacolumn/DataArticleType";
import DialogCreateArticleType from "@/components/atoms/dialog/DialogCreateTypeArticle";
import DialogDetailArticle from "@/components/atoms/dialog/DialogDetailArticle";
import DialogDetailArticleType from "@/components/atoms/dialog/DialogDetailArticleType";
import DialogEditArticleType from "@/components/atoms/dialog/DialogEditArticleType";
import SearchInput from "@/components/atoms/search/SearchInput";
import { DataTable } from "@/components/molecules/datatable/DataTable";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useDeleteArticleAdmin } from "@/http/admin/article/delete-article-admin";
import { useGetArticle } from "@/http/article/get-all-article";
import { useDeleteArticleType } from "@/http/article/type-article/delete-article-type";
import { useGetAllArticleType } from "@/http/article/type-article/get-all-article-type";
import { ArticleAdmin, TypesArticle } from "@/types/article/article";
import { useQueryClient } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";

export default function ArticleAdminContent() {
  const { data } = useGetArticle();
  const [searchQuery, setSearchQuery] = useState("");
  const [dialogDetailArticleOpen, setDialogDetailArticleOpen] = useState(false);
  const [openAlertDeleteDialog, setOpenAlertDeleteDialog] = useState(false);
  const [selectedArticleId, setSelectedArticleId] =
    useState<ArticleAdmin | null>(null);
  const [selectedArticleTypeId, setSelectedArticleTypeId] =
    useState<TypesArticle | null>(null);
  const [
    openAlertDeleteArticleTypeDialog,
    setOpenAlertDeleteArticleTypeDialog,
  ] = useState(false);
  const [openDialogDetailArticleType, setOpenDialogDetailArticleType] =
    useState(false);
  const [openDialogEditArticleType, setOpenDialogEditArticleType] =
    useState(false);

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

  const [dialogCreateArticleTypeOpen, setDialogCreateArticleTypeOpen] =
    useState(false);

  const handleArticleTypeDialogOpen = () => {
    setDialogCreateArticleTypeOpen(true);
  };

  const handleDetailArticleOpen = (data: ArticleAdmin) => {
    setSelectedArticleId(data);
    setDialogDetailArticleOpen(true);
  };

  const deleteArticleHandler = (data: ArticleAdmin) => {
    setSelectedArticleId(data);
    setOpenAlertDeleteDialog(true);
  };

  const handleArticleTypeDetailOpen = (data: TypesArticle) => {
    setSelectedArticleTypeId(data);
    setOpenDialogDetailArticleType(true);
  };

  const deleteArticleTypeHandler = (data: TypesArticle) => {
    setSelectedArticleTypeId(data);
    setOpenAlertDeleteArticleTypeDialog(true);
  };

  const handleEditArticleTypeOpen = (data: TypesArticle) => {
    setSelectedArticleTypeId(data);
    setOpenDialogEditArticleType(true);
  };

  const queryClient = useQueryClient();

  const { mutate: deleteArticleAdminHandler, isPending: isDeletePending } =
    useDeleteArticleAdmin({
      onError: () => {
        toast.error("Gagal menghapus artikel!");
      },
      onSuccess: () => {
        setSelectedArticleId(null);
        toast.success("Berhasil menghapus artikel!");

        queryClient.invalidateQueries({
          queryKey: ["article-list"],
        });
      },
    });

  const {
    mutate: deleteTypeArticleHandler,
    isPending: isDeleteArticleTypePending,
  } = useDeleteArticleType({
    onError: () => {
      toast.error("Gagal menghapus tipe artikel!");
    },
    onSuccess: () => {
      setSelectedArticleId(null);
      toast.success("Berhasil menghapus tipe artikel!");

      queryClient.invalidateQueries({
        queryKey: ["article-type-list"],
      });
    },
  });

  const handleDeleteArticle = () => {
    if (selectedArticleId?.id) {
      deleteArticleAdminHandler({
        id: selectedArticleId.id,
        token: session?.access_token as string,
      });
    }
  };

  const handleDeleteArticleType = () => {
    if (selectedArticleTypeId?.id) {
      deleteTypeArticleHandler({
        id: selectedArticleTypeId.id,
        token: session?.access_token as string,
      });
    }
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
            <DataTable
              columns={articleColumns({
                deleteArticleHandler: deleteArticleHandler,
                detailArticleHandler: handleDetailArticleOpen,
              })}
              data={filteredArticles}
            />
          </TabsContent>
          <TabsContent value="article-type">
            <DataTable
              columns={articleTypeColumns({
                deleteArticleTypeHandler: deleteArticleTypeHandler,
                detailArticleTypeHandler: handleArticleTypeDetailOpen,
                editArticleTypeHandler: handleEditArticleTypeOpen,
              })}
              data={filteredArticleTypes}
            />
          </TabsContent>
        </Tabs>
      </div>
      <DialogCreateArticleType
        open={dialogCreateArticleTypeOpen}
        setOpen={setDialogCreateArticleTypeOpen}
      />
      {selectedArticleId && (
        <>
          <DialogDetailArticle
            open={dialogDetailArticleOpen}
            setOpen={setDialogDetailArticleOpen}
            id={selectedArticleId.id}
          />
          <AlertDialogDeleteArticle
            open={openAlertDeleteDialog}
            setOpen={setOpenAlertDeleteDialog}
            confirmDelete={handleDeleteArticle}
            data={selectedArticleId}
            isPending={isDeletePending}
          />
        </>
      )}

      {selectedArticleTypeId && (
        <>
          <DialogDetailArticleType
            open={openDialogDetailArticleType}
            setOpen={setOpenDialogDetailArticleType}
            id={selectedArticleTypeId.id}
          />
          <AlertDialogDeleteArticleType
            open={openAlertDeleteArticleTypeDialog}
            setOpen={setOpenAlertDeleteArticleTypeDialog}
            confirmDelete={handleDeleteArticleType}
            data={selectedArticleTypeId}
            isPending={isDeleteArticleTypePending}
          />
          <DialogEditArticleType
            open={openDialogEditArticleType}
            setOpen={setOpenDialogEditArticleType}
            data={selectedArticleTypeId}
            id={selectedArticleTypeId.id}
          />
        </>
      )}
    </>
  );
}
