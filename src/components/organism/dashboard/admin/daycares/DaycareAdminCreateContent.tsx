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
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
import { useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import { Trash2, UploadIcon } from "lucide-react";
import {
  daycareSchema,
  DaycareType,
} from "@/validators/daycares/daycare-validator";
import { useAddDaycare } from "@/http/daycares/add-daycare";
import { Textarea } from "@/components/ui/textarea";

export default function DaycareCreateContent() {
  const form = useForm<DaycareType>({
    resolver: zodResolver(daycareSchema),
    defaultValues: {
      name: "",
      opening_days: "",
      opening_hours: "",
      closing_hours: "",
      description: "",
      phone_number: "",
      images: null,
      facility_images: undefined,
    },
    mode: "onChange",
  });

  const queryClient = useQueryClient();
  const { toast } = useToast();
  const router = useRouter();
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [facilityImagesPreview, setFacilityImagesPreview] = useState<string[]>(
    []
  );

  const { mutate: addGameHandler, isPending } = useAddDaycare({
    onError: (error: AxiosError<any>) => {
      toast({
        title: "Gagal menambahkan daycare!",
        description: error.response?.data.message,
        variant: "destructive",
      });
    },
    onSuccess: () => {
      toast({
        title: "Berhasil menambahkan daycare!",
        variant: "success",
      });
      queryClient.invalidateQueries({
        queryKey: ["daycare-list"],
      });
      router.push("/dashboard/admin/games");
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

  const onDropFacility = useCallback(
    (acceptedFiles: File[]) => {
      const files = acceptedFiles.map((file) => URL.createObjectURL(file));
      form.setValue("facility_images", acceptedFiles);
      setFacilityImagesPreview((prev) => [...prev, ...files]);
    },
    [form]
  );

  const {
    getRootProps: getFacilityRootProps,
    getInputProps: getFacilityInputProps,
    isDragActive: isFacilityDragActive,
  } = useDropzone({
    onDrop: onDropFacility,
    accept: { "image/*": [] },
    multiple: true,
  });

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    multiple: false,
  });

  const onSubmit = (body: DaycareType) => {
    addGameHandler(body);
  };

  const removeImage = () => {
    setImagePreview(null);
    form.setValue("images", null);
  };

  const removeFacilityImage = (index: number) => {
    setFacilityImagesPreview((prev) => prev.filter((_, i) => i !== index));
    form.setValue(
      "facility_images",
      form.getValues("facility_images").filter((_, i) => i !== index)
    );
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
                    <FormLabel>Nama Daycare</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Masukkan nama daycare"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Deskripsi</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Masukkan deskripsi"
                        {...field}
                        value={field.value ?? ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="opening_days"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Hari Buka</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Contoh: Senin - Jumat"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="opening_hours"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Jam Buka</FormLabel>
                    <FormControl>
                      <Input
                        type="time"
                        placeholder="Masukkan jam buka"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="closing_hours"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Jam Tutup</FormLabel>
                    <FormControl>
                      <Input
                        type="time"
                        placeholder="Masukkan jam tutup"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone_number"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nomor Telepon</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Masukkan nomor telepon"
                        {...field}
                        value={field.value ?? ""}
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

              <FormField
                control={form.control}
                name="facility_images"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Gambar Fasilitas</FormLabel>
                    <FormControl>
                      <div>
                        <div
                          {...getFacilityRootProps()}
                          className={`border rounded-md border-input flex justify-center items-center cursor-pointer ${
                            isFacilityDragActive
                              ? "border-gray-300"
                              : "border-gray-300"
                          }`}
                        >
                          <Input {...getFacilityInputProps()} />
                          {facilityImagesPreview.length > 0 ? (
                            <div className="relative w-full">
                              {facilityImagesPreview.map((preview, index) => (
                                <div key={index} className="relative">
                                  <Image
                                    src={preview}
                                    alt={`Preview ${index}`}
                                    className="max-h-[200px] w-full object-cover rounded-lg"
                                    width={1000}
                                    height={1000}
                                  />
                                  <Button
                                    className="absolute top-2 right-2 shadow-lg px-3"
                                    variant="destructive"
                                    onClick={() => removeFacilityImage(index)}
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </div>
                              ))}
                            </div>
                          ) : isFacilityDragActive ? (
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
                  {isPending ? "Menambahkan..." : "Tambahkan Game"}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
