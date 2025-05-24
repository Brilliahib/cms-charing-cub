"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAddArticle } from "@/http/article/add-article";
import { useGetAllArticleType } from "@/http/article/type-article/get-all-article-type";
import {
  articleSchema,
  ArticleType,
} from "@/validators/article/article-validator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { Trash2, UploadIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useForm } from "react-hook-form";
import ReactQuill from "react-quill";
import { toast } from "sonner";
import "react-quill/dist/quill.snow.css";

export default function ArticleCreateAdminContent() {
  const form = useForm<ArticleType>({
    resolver: zodResolver(articleSchema),
    defaultValues: {
      article_type_id: "",
      title: "",
      content: "",
      image: null,
      slug: "",
    },
    mode: "onChange",
  });

  const queryClient = useQueryClient();
  const router = useRouter();
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const { mutate: addArticleHandler, isPending } = useAddArticle({
    onError: (error: AxiosError<any>) => {
      toast.error("Failed to add article", {
        description: error.response?.data.message,
      });
    },
    onSuccess: () => {
      toast.success("Successfully added article");
      queryClient.invalidateQueries({
        queryKey: ["article-list"],
      });
      router.push("/dashboard/admin/article");
    },
  });

  const { data: session, status } = useSession();
  const { data } = useGetAllArticleType(session?.access_token as string, {
    enabled: status === "authenticated",
  });

  useEffect(() => {
    const title = form.watch("title");
    const slug = title
      ?.toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");

    form.setValue("slug", slug || "");
  }, [form.watch("title")]);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      form.setValue("image", file);
      setImagePreview(URL.createObjectURL(file));
    },
    [form]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    multiple: false,
  });

  const onSubmit = (body: ArticleType) => {
    addArticleHandler(body);
  };

  const removeImage = () => {
    setImagePreview(null);
    form.setValue("image", null);
  };

  return (
    <>
      <div className="py-8">
        <Form {...form}>
          <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="article_type_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tipe Artikel</FormLabel>
                  <FormControl>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Pilih tipe artikel" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Tipe Artikel</SelectLabel>
                          {data?.data.map((articleTypes) => (
                            <SelectItem
                              key={articleTypes.id}
                              value={articleTypes.id}
                            >
                              {articleTypes.name}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Judul</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Masukkan judul artikel"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="slug"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Slug</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Slug otomatis berdasarkan judul"
                      readOnly
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Konten</FormLabel>
                  <FormControl>
                    <ReactQuill
                      value={field.value}
                      onChange={field.onChange}
                      modules={{
                        toolbar: [
                          [{ header: [1, 2, false] }],
                          ["bold", "italic", "underline"],
                          ["link", "image"],
                          ["clean"],
                        ],
                      }}
                      placeholder="Masukkan konten artikel"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Gambar</FormLabel>
                  <FormControl>
                    <div>
                      <div
                        {...getRootProps()}
                        className={`border rounded-md border-input flex justify-center items-center cursor-pointer ${
                          isDragActive ? "border-gray-300" : "border-gray-300"
                        }`}
                      >
                        <Input {...getInputProps()} />
                        {imagePreview ? (
                          <div className="relative w-full">
                            <Image
                              src={imagePreview}
                              alt="Preview"
                              className="max-h-[200px] w-full object-cover rounded-lg"
                              width={1000}
                              height={1000}
                            />
                            <Button
                              className="absolute top-2 right-2 shadow-lg px-3"
                              variant="destructive"
                              onClick={removeImage}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        ) : isDragActive ? (
                          <p className="text-blue-500">
                            Drop gambar di sini ...
                          </p>
                        ) : (
                          <div className="text-center space-y-4 py-4">
                            <UploadIcon className="mx-auto h-6 w-6 text-muted-foreground" />
                            <p className="text-muted-foreground text-sm">
                              Drag & drop gambar ke sini, atau klik untuk
                              memilih
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end">
              <Button type="submit" disabled={isPending}>
                {isPending ? "Loading..." : "Tambahkan"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </>
  );
}
