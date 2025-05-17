"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useGetMyDaycare } from "@/http/daycares/get-my-daycare";
import { useAddMonitoringChildren } from "@/http/daycares/monitoring/create-monitoring-children";
import { useGetAllPaidBookingMonitoringDaycares } from "@/http/daycares/monitoring/get-all-paid-booking-monitoring-daycare";
import {
  monitoringChildrenSchema,
  MonitoringChildrenType,
} from "@/validators/daycares/monitoring/monitoring-children-daycare";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { Check, ChevronsUpDown } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function FormCreateMonitoringChildren() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [open, setOpen] = useState(false);

  const { data: daycare } = useGetMyDaycare(session?.access_token as string, {
    enabled: status === "authenticated",
  });

  const form = useForm<MonitoringChildrenType>({
    resolver: zodResolver(monitoringChildrenSchema),
    defaultValues: {
      daycare_id: "",
      user_id: "",
    },
    mode: "onChange",
  });

  useEffect(() => {
    if (daycare?.data.id) {
      form.setValue("daycare_id", daycare.data.id);
    }
  }, [daycare?.data.id]);

  const { data } = useGetAllPaidBookingMonitoringDaycares(
    session?.access_token as string,
    {
      enabled: status === "authenticated",
    }
  );

  const { mutate: addNewMonitoringChildrenHandler, isPending } =
    useAddMonitoringChildren({
      onError: (error: AxiosError<any>) => {
        toast.error("Gagal membuat monitoring anak baru!", {
          description: error.response?.data.message,
        });
      },
      onSuccess: () => {
        toast.success("Berhasil membuat monitoring anak baru!");
        router.push("/dashboard/daycares/monitoring");
      },
    });

  const onSubmit = (body: MonitoringChildrenType) => {
    addNewMonitoringChildrenHandler({ ...body });
  };
  return (
    <Card className="border shadow-none">
      <CardContent className="p-6">
        <Form {...form}>
          <form className="space-y-5" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="user_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Pengguna</FormLabel>
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
                            ? data?.data.find((user) => user.id === field.value)
                                ?.name
                            : "Pilih pengguna yang akan dimonitoring"}
                          <ChevronsUpDown className="opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-full p-0">
                        <Command>
                          <CommandInput
                            placeholder="Cari pengguna..."
                            className="h-9"
                          />
                          <CommandList>
                            <CommandEmpty>
                              Pengguna tidak ditemukan.
                            </CommandEmpty>
                            <CommandGroup>
                              {data?.data.map((user) => (
                                <CommandItem
                                  key={user.id}
                                  value={user.id}
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
                                  {user.name}
                                  <Check
                                    className={`ml-auto ${
                                      field.value === user.id
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
                  <FormDescription>
                    * Pilihan pengguna tersebut adalah pengguna yang sudah
                    membayar booking.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end py-4">
              <Button type="submit" disabled={isPending}>
                {isPending ? "Loading..." : "Tambahkan"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
