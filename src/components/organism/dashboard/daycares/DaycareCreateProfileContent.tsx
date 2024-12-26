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
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import {
  Check,
  ChevronsUpDown,
  CloudDownload,
  Trash2,
  UploadIcon,
} from "lucide-react";
import {
  daycareSchema,
  DaycareType,
} from "@/validators/daycares/daycare-validator";
import { useAddDaycare } from "@/http/daycares/add-daycare";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
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
import { locations } from "@/utils/location";

export default function DaycareCreateProfileContent() {
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
      facility_images: [],
      location: "",
      location_tracking: "",
      price_half: 0,
      price_full: 0,
      is_disability: true,
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
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState<string>("");

  const { mutate: addDaycareHandler, isPending } = useAddDaycare({
    onError: (error: AxiosError<any>) => {
      toast({
        title: "Gagal menambahkan daycare!",
        description: error.response?.data.message,
        variant: "destructive",
      });
    },
    onSuccess: () => {
      toast({
        title: "Berhasil menambahkan profile daycare!",
        description:
          "Daycare anda otomatis akan dapat dilihat oleh orang lain.",
        variant: "success",
      });
      queryClient.invalidateQueries({
        queryKey: ["daycare-profile"],
      });
      router.push("/dashboard/admin/daycares");
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
      const currentFiles = form.getValues("facility_images") || [];
      const updatedFiles = [...currentFiles, ...acceptedFiles];
      form.setValue("facility_images", updatedFiles);
      setFacilityImagesPreview(
        updatedFiles
          .filter((file): file is File => file instanceof File)
          .map((file) => URL.createObjectURL(file))
      );
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
    addDaycareHandler(body);
  };

  const removeImage = () => {
    setImagePreview(null);
    form.setValue("images", null);
  };

  const removeFacilityImage = (index: number) => {
    const currentFiles = form.getValues("facility_images") || [];
    const updatedFiles = currentFiles.filter((_, i) => i !== index);
    form.setValue("facility_images", updatedFiles);
    setFacilityImagesPreview((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="w-full py-8">
      <Card className="shadow-md">
        <CardContent className="py-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <div className="grid md:grid-cols-2 grid-cols-1 gap-8">
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
                      <FormLabel>Harga Sehari Penuh</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Masukkan harga sehari penuh"
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
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Location</FormLabel>
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
                                ? locations.find(
                                    (location) => location.value === field.value
                                  )?.label
                                : "Select Location..."}
                              <ChevronsUpDown className="opacity-50" />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-full p-0">
                            <Command>
                              <CommandInput
                                placeholder="Search location..."
                                className="h-9"
                              />
                              <CommandList>
                                <CommandEmpty>No city found.</CommandEmpty>
                                <CommandGroup>
                                  {locations.map((location) => (
                                    <CommandItem
                                      key={location.value}
                                      value={location.value}
                                      onSelect={(currentValue) => {
                                        field.onChange(
                                          currentValue === field.value
                                            ? ""
                                            : currentValue
                                        );
                                        setOpen(false);
                                      }}
                                      className="font-normal"
                                    >
                                      {location.label}
                                      <Check
                                        className={`ml-auto ${
                                          field.value === location.value
                                            ? "opacity-100"
                                            : "opacity-0"
                                        }`}
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
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Jalan</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Masukkan jalan di lokasi daycare"
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
                  name="location_tracking"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Location Tracking</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Masukkan lokasi"
                          {...field}
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
                  name="is_disability"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Status Disabilitas</FormLabel>
                      <FormControl>
                        <div className="flex flex-col gap-2 mt-2">
                          <div className="flex items-center gap-2">
                            <Checkbox
                              id="accepts-disability"
                              checked={field.value}
                              onCheckedChange={(checked) =>
                                field.onChange(checked === true)
                              }
                            />
                            <Label
                              htmlFor="accepts-disability"
                              className="text-sm font-medium"
                            >
                              Menerima Disabilitas
                            </Label>
                          </div>
                          <div className="flex items-center gap-2">
                            <Checkbox
                              id="declines-disability"
                              checked={!field.value}
                              onCheckedChange={(checked) =>
                                field.onChange(checked === false)
                              }
                            />
                            <Label
                              htmlFor="declines-disability"
                              className="text-sm font-medium"
                            >
                              Tidak Menerima Disabilitas
                            </Label>
                          </div>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                ;
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
              </div>
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
                              <CloudDownload className="mx-auto h-8 w-8 text-muted-foreground" />
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
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              {facilityImagesPreview.map((preview, index) => (
                                <div key={index} className="relative">
                                  <Image
                                    src={preview}
                                    alt={`Preview ${index}`}
                                    className="max-h-[200px] w-full object-cover rounded-lg"
                                    width={500}
                                    height={500}
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
                              <CloudDownload className="mx-auto h-8 w-8 text-muted-foreground" />
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
                  {isPending ? "Menambahkan..." : "Tambahkan Daycare"}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
