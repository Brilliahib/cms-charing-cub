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
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { useCallback, useEffect, useState } from "react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import "leaflet/dist/leaflet.css";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { toast } from "sonner";
import AlertInformationCreateProfileDaycare from "@/components/atoms/alert/AlertInformationCreateProfileDaycare";
import DashboardTitle from "@/components/atoms/typography/DashboardTitle";

const containerStyle = {
  width: "100%",
  height: "400px",
};

const defaultCenter = { lat: -6.2, lng: 106.816666 };

const libraries: ("places" | "drawing" | "geometry")[] = ["places"];

export default function DaycareCreateProfileContent() {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
    libraries,
  });
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
      is_disability: true,
      longitude: 0,
      latitude: 0,
      bank_account: "",
      bank_account_number: "",
      bank_account_name: "",
      price_lists: [{ age_start: "", age_end: "", price: 0, name: "" }],
    },
    mode: "onChange",
  });

  const queryClient = useQueryClient();
  const router = useRouter();
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [facilityImagesPreview, setFacilityImagesPreview] = useState<string[]>(
    []
  );
  const [open, setOpen] = useState(false);
  const [markerPosition, setMarkerPosition] = useState(defaultCenter);

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "price_lists",
  });

  // Ambil lokasi pengguna
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const newPosition = { lat: latitude, lng: longitude };
          setMarkerPosition(newPosition);
          form.setValue("latitude", latitude);
          form.setValue("longitude", longitude);
        },
        (error) => {
          console.error("Gagal mendapatkan lokasi:", error);
          alert("Gagal mendapatkan lokasi. Pastikan izin lokasi diberikan.");
        }
      );
    }
  }, [form]);

  const { mutate: addDaycareHandler, isPending } = useAddDaycare({
    onError: (error: AxiosError<any>) => {
      toast.error("Failed to create profile daycare!", {
        description: error.response?.data.message,
      });
    },
    onSuccess: () => {
      toast.success("Successfully create profile daycare!");
      queryClient.invalidateQueries({
        queryKey: ["daycare-profile"],
      });
      router.refresh();
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
    console.log(body);
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
    <div className="w-full py-8 space-y-8">
      <DashboardTitle title="Create Profile Daycare" />
      <Card className="shadow-md">
        <CardContent className="py-4 space-y-6">
          <AlertInformationCreateProfileDaycare />
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Deskripsi</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Masukkan deskripsi / pengenalan tentang daycare Anda"
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
                      <FormLabel>Lokasi Daycare</FormLabel>
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
                          placeholder="Contoh: 1 Km dari Universitas Diponegoro"
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
                  name="bank_account"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nama Bank</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Pilih nama bank" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="BRI">BRI</SelectItem>
                            <SelectItem value="BCA">BCA</SelectItem>
                            <SelectItem value="Mandiri">Mandiri</SelectItem>
                            <SelectItem value="BNI">BNI</SelectItem>
                            <SelectItem value="BTN">BTN</SelectItem>
                            <SelectItem value="BSI">BSI</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="bank_account_number"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nomor Rekening</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Masukkan nomor rekening"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="bank_account_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Atas Nama di Bank</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Masukkan atas nama di bank"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
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
              <FormField
                control={form.control}
                name="images"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Logo</FormLabel>
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
                            <p className="text-blue-500">Drop files here..</p>
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
                          className={`border-dashed border-2 rounded-md border-input flex justify-center items-center cursor-pointer ${
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
                                  You can upload 4 files (up to 4 MB each)
                                </p>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="space-y-8">
                {/* Input untuk Latitude */}
                <FormField
                  control={form.control}
                  name="latitude"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Latitude</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          {...field}
                          value={field.value || ""}
                          placeholder="Latitude marker"
                          readOnly
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Input untuk Longitude */}
                <FormField
                  control={form.control}
                  name="longitude"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Longitude</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          {...field}
                          value={field.value || ""}
                          placeholder="Longitude marker"
                          readOnly
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {isLoaded ? (
                  <div style={containerStyle}>
                    <GoogleMap
                      mapContainerStyle={containerStyle}
                      center={markerPosition}
                      zoom={13}
                      onClick={(e) => {
                        if (e.latLng) {
                          const lat = e.latLng.lat();
                          const lng = e.latLng.lng();
                          setMarkerPosition({ lat, lng });
                          form.setValue("latitude", lat);
                          form.setValue("longitude", lng);
                        }
                      }}
                    >
                      <Marker
                        position={markerPosition}
                        draggable
                        onDragEnd={(e) => {
                          const lat = e.latLng?.lat() || markerPosition.lat;
                          const lng = e.latLng?.lng() || markerPosition.lng;
                          setMarkerPosition({ lat, lng });
                          form.setValue("latitude", lat);
                          form.setValue("longitude", lng);
                        }}
                      />
                    </GoogleMap>
                  </div>
                ) : (
                  <p>Memuat peta...</p>
                )}
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <FormLabel>Price List</FormLabel>
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
                              <FormLabel>Keterangan</FormLabel>
                              <FormControl>
                                <Input
                                  type="text"
                                  placeholder="Setengah hari / satu hari"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
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
                                  placeholder="12 Bulan"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
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
                                  placeholder="24 Bulan"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
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
              </div>
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
