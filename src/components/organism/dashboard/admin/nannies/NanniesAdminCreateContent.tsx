"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import {
  Check,
  ChevronsUpDown,
  Plus,
  Trash2,
  Trash2Icon,
  UploadIcon,
} from "lucide-react";
import {
  nanniesSchema,
  NanniesType,
} from "@/validators/nannies/nannies-validator";
import { useAddNannies } from "@/http/cub/care/add-nannies";
import { useGetAllDaycare } from "@/http/daycares/get-all-daycares";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";

export default function NanniesCreateContent() {
  const form = useForm<NanniesType>({
    resolver: zodResolver(nanniesSchema),
    defaultValues: {
      daycare_id: "",
      gender: "",
      age: 0,
      contact: "",
      price_lists: [{ age_start: "", age_end: "", price: 0, name: "" }],
      experience_description: "",
      images: null,
    },
    mode: "onChange",
  });

  const queryClient = useQueryClient();
  const router = useRouter();
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const { data } = useGetAllDaycare();
  const [open, setOpen] = React.useState(false);
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "price_lists",
  });

  const { mutate: addNannyHandler, isPending } = useAddNannies({
    onError: (error: AxiosError<any>) => {
      toast.error("Gagal melengkapi profil nannies!", {
        description: error.response?.data.message,
      });
    },
    onSuccess: () => {
      toast.success("Berhasil melengkapi profil nannies!");
      queryClient.invalidateQueries({
        queryKey: ["nannies-profile"],
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
    <div className="w-full py-8">
      <Card className="shadow-md">
        <CardContent className="py-4">
          <Form {...form}>
            <form className="space-y-5" onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="daycare_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Daycare</FormLabel>
                    <FormControl>
                      <Popover open={open} onOpenChange={setOpen}>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            role="combobox"
                            aria-expanded={open}
                            className="w-full justify-between font-normal"
                          >
                            {field.value
                              ? data?.data.find(
                                  (daycare) =>
                                    daycare.id.toString() === field.value
                                )?.name
                              : "Pilih daycare yang tersedia"}
                            <ChevronsUpDown className="opacity-50" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-full p-0">
                          <Command>
                            <CommandInput placeholder="Cari daycare..." />
                            <CommandList>
                              <CommandEmpty>Tidak ditemukan.</CommandEmpty>
                              <CommandGroup>
                                {data?.data.map((daycare) => (
                                  <CommandItem
                                    key={daycare.id}
                                    value={daycare.id.toString()}
                                    onSelect={() => {
                                      field.onChange(daycare.id.toString());
                                      setOpen(false);
                                    }}
                                    className="font-normal"
                                  >
                                    {daycare.name}
                                    <Check
                                      className={cn(
                                        "ml-auto",
                                        field.value === daycare.id.toString()
                                          ? "opacity-100"
                                          : "opacity-0"
                                      )}
                                    />
                                  </CommandItem>
                                ))}
                              </CommandGroup>
                            </CommandList>
                          </Command>
                        </PopoverContent>
                      </Popover>
                    </FormControl>
                    <FormMessage />
                    <FormDescription>
                      * Jika tidak tergabung / terkait dalam daycare pilih tidak
                      bergabung
                    </FormDescription>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Jenis Kelamin <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih jenis kelamin" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="male">Laki - Laki</SelectItem>
                          <SelectItem value="female">Perempuan</SelectItem>
                        </SelectContent>
                      </Select>
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
                    <FormLabel>
                      Umur <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="18"
                        {...field}
                        onChange={(e) =>
                          field.onChange(parseInt(e.target.value))
                        }
                      />
                    </FormControl>
                    <FormDescription>
                      * Tidak perlu pakai tahun. Contoh: 21
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="contact"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Kontak <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input type="text" placeholder="081327013**" {...field} />
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
                    <FormLabel>
                      Deskripsi Pengalaman{" "}
                      <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        className="leading-relaxed"
                        placeholder="Mempunyai pengalaman selama 2 tahun dalam mengasuh anak"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                    <FormDescription>
                      * Berikan deskripsi pengalaman yang lengkap
                    </FormDescription>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="images"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Foto Formal <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <div>
                        <div
                          {...getRootProps()}
                          className={`border-dashed border-2 rounded-md border-input flex justify-center items-center cursor-pointer ${
                            isDragActive ? "border-gray-300" : "border-gray-300"
                          }`}
                        >
                          <Input {...getInputProps()} />
                          {imagePreview ? (
                            <div className="relative">
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
                            <div className="text-center space-y-4 py-4 flex flex-col items-center justify-center">
                              <div className="border-dashed border-2 p-4 rounded-full w-fit">
                                <UploadIcon className="mx-auto h-6 w-6 text-muted-foreground" />
                              </div>
                              <div className="space-y-2">
                                <p className="text-muted-foreground text-sm">
                                  Drag & drop files here, or click to select
                                  files
                                </p>
                                <p className="text-muted-foreground text-sm">
                                  (max upload files 1 MB)
                                </p>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </FormControl>
                    <FormDescription>
                      * Pakai foto yang formal (tidak bebas)
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <FormLabel>
                    Daftar Harga <span className="text-red-500">*</span>
                  </FormLabel>
                  <Button
                    type="button"
                    onClick={() =>
                      append({
                        age_start: "",
                        age_end: "",
                        price: 0,
                        name: "",
                      })
                    }
                    className="flex items-center gap-2 size-8 p-0"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>

                {fields.map((field, index) => (
                  <div className="flex items-end gap-4" key={index}>
                    <div
                      key={field.id}
                      className="grid md:grid-cols-4 grid-cols-1 gap-4 md:gap-6 w-full"
                    >
                      <FormField
                        control={form.control}
                        name={`price_lists.${index}.name`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Keterangan Harga</FormLabel>
                            <FormControl>
                              <Input
                                type="text"
                                placeholder="Setengah hari / satu hari"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                            <FormDescription>
                              * Contoh: Harga Sehari Penuh
                            </FormDescription>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`price_lists.${index}.age_start`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Umur Awal</FormLabel>
                            <FormControl>
                              <Input
                                type="text"
                                placeholder="3 Tahun"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                            <FormDescription>
                              * Isi menggunakan bulan / tahun
                            </FormDescription>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`price_lists.${index}.age_end`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Umur Akhir</FormLabel>
                            <FormControl>
                              <Input
                                type="text"
                                placeholder="4 Tahun"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                            <FormDescription>
                              * Isi menggunakan bulan / tahun
                            </FormDescription>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`price_lists.${index}.price`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Harga</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                placeholder="0"
                                {...field}
                                onChange={(e) =>
                                  field.onChange(parseInt(e.target.value))
                                }
                              />
                            </FormControl>
                            <FormMessage />
                            <FormDescription>
                              * Isi tanpa Rp. Contoh: 150000
                            </FormDescription>
                          </FormItem>
                        )}
                      />
                    </div>
                    <Button
                      type="button"
                      variant="destructive"
                      onClick={() => remove(index)}
                      className="flex items-center gap-2 size-8 p-0"
                    >
                      <Trash2Icon className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>

              <div className="flex justify-end py-4">
                <Button type="submit" disabled={isPending}>
                  {isPending ? "Menyimpan..." : "Simpan"}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
