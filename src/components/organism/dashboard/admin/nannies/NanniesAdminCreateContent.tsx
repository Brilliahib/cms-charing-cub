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
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import { Trash2, UploadIcon } from "lucide-react";
import {
  nanniesSchema,
  NanniesType,
} from "@/validators/nannies/nannies-validator";
import { useAddNannies } from "@/http/cub/care/add-nannies";

export default function NanniesCreateContent() {
  const form = useForm<NanniesType>({
    resolver: zodResolver(nanniesSchema),
    defaultValues: {
      name: "",
      gender: "",
      age: 0,
      contact: "",
      price_half: 0,
      price_full: 0,
      experience_description: "",
      images: null,
    },
    mode: "onChange",
  });

  const queryClient = useQueryClient();
  const { toast } = useToast();
  const router = useRouter();
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const { mutate: addNannyHandler, isPending } = useAddNannies({
    onError: (error: AxiosError<any>) => {
      toast({
        title: "Gagal menambahkan nanny!",
        description: error.response?.data.message,
        variant: "destructive",
      });
    },
    onSuccess: () => {
      toast({
        title: "Berhasil menambahkan nanny!",
        variant: "success",
      });
      queryClient.invalidateQueries({
        queryKey: ["nannies-list"],
      });
      router.push("/dashboard/admin/nannies");
    },
  });

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      form.setValue("images", file);
      setImagePreview(URL.createObjectURL(file));
    },
    [form]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    multiple: false,
  });

  const onSubmit = (body: NanniesType) => {
    addNannyHandler(body);
  };

  const removeImage = () => {
    setImagePreview(null);
    form.setValue("images", null);
  };

  return (
    <div className="w-full mt-6">
      <Card className="shadow-md">
        <CardContent className="py-4">
          <Form {...form}>
            <form className="space-y-5" onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nama Nanny</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Masukkan nama nanny"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Jenis Kelamin</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Masukkan jenis kelamin"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="age"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Umur</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Masukkan umur nanny"
                        {...field}
                        onChange={(e) =>
                          field.onChange(parseInt(e.target.value))
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="contact"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Kontak</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Masukkan kontak"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="price_half"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Harga Setengah Hari</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Masukkan harga setengah hari"
                        {...field}
                        onChange={(e) =>
                          field.onChange(parseInt(e.target.value))
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="price_full"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Harga Penuh</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Masukkan harga penuh"
                        {...field}
                        onChange={(e) =>
                          field.onChange(parseInt(e.target.value))
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="experience_description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Deskripsi Pengalaman</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Masukkan deskripsi pengalaman"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="images"
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

              <div className="flex justify-end py-4">
                <Button type="submit" disabled={isPending}>
                  {isPending ? "Menambahkan..." : "Tambahkan Nanny"}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
