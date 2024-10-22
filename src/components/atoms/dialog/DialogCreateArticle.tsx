import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
import { useToast } from "@/hooks/use-toast";
import { useAddArticle } from "@/http/article/add-article";
import {
  articleSchema,
  ArticleType,
} from "@/validators/article/article-validator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Image as ImageIcon, Trash2, Upload as UploadIcon } from "lucide-react";
import Image from "next/image";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";
import { ScrollArea } from "@/components/ui/scroll-area";

interface DialogCreateArticleProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export default function DialogCreateArticle({
  open,
  setOpen,
}: DialogCreateArticleProps) {
  const form = useForm<ArticleType>({
    resolver: zodResolver(articleSchema),
    defaultValues: {
      article_type_id: "",
      title: "",
      content: "",
      image: null,
    },
    mode: "onChange",
  });

  const queryClient = useQueryClient();
  const { toast } = useToast();
  const router = useRouter();
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const { mutate: addArticleHandler, isPending } = useAddArticle({
    onError: (error: AxiosError<any>) => {
      toast({
        title: "Gagal menambahkan artikel!",
        description: error.response?.data.message,
        variant: "destructive",
      });
    },
    onSuccess: () => {
      toast({
        title: "Berhasil menambahkan artikel!",
        variant: "success",
      });
      queryClient.invalidateQueries({
        queryKey: ["article-list"],
      });
      router.refresh();
    },
  });

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
    setOpen(false);
  };

  const removeImage = () => {
    setImagePreview(null);
    form.setValue("image", null);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Tambah Artikel</DialogTitle>
        </DialogHeader>
        <ScrollArea className="max-h-[80vh]">
          <Form {...form}>
            <form
              className="space-y-5 pt-4"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <FormField
                control={form.control}
                name="article_type_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tipe Artikel</FormLabel>
                    <FormControl>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Pilih tipe artikel" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Tipe Artikel</SelectLabel>
                            <SelectItem value="1">Gaya Hidup Sehat</SelectItem>
                            <SelectItem value="2">Kenali Gejala</SelectItem>
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
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
