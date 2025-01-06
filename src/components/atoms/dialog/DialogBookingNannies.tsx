import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
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
import { Textarea } from "@/components/ui/textarea";
import { useAddBookingNannies } from "@/http/nannies/add-booking-nannies";
import {
  bookingNanniesSchema,
  BookingNanniesType,
} from "@/validators/nannies/booking-nannies-validator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface DialogBookingNanniesProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  id: number;
  name: string;
}

export default function DialogBookingNannies({
  open,
  setOpen,
  name,
  id,
}: DialogBookingNanniesProps) {
  const queryClient = useQueryClient();
  const router = useRouter();

  const form = useForm<BookingNanniesType>({
    resolver: zodResolver(bookingNanniesSchema),
    defaultValues: {
      nanny_id: id,
      name_babies: "",
      age_babies: 0,
      special_request: "",
      start_time: "",
      end_time: "",
    },
    mode: "onChange",
  });

  const { mutate: addBookingNanniesHandler, isPending } = useAddBookingNannies({
    onError: (error: AxiosError<any>) => {
      toast.error("Failed to booking nannies", {
        description: error.response?.data.message,
      });
    },
    onSuccess: () => {
      toast.success("Successfully to booking nannies");
      queryClient.invalidateQueries({
        queryKey: ["nannies-list"],
      });
      router.refresh();
    },
  });

  const onSubmit = (body: BookingNanniesType) => {
    addBookingNanniesHandler({ ...body, nanny_id: id });
    setOpen(false);
  };
  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Booking Nannies</DialogTitle>
            <DialogDescription>
              Do you want to book a nannies named {name}?
            </DialogDescription>
          </DialogHeader>
          <div>
            <Form {...form}>
              <form
                className="space-y-5 pt-4"
                onSubmit={form.handleSubmit(onSubmit)}
              >
                <FormField
                  control={form.control}
                  name="name_babies"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Babies Name</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Masukkan nama bayi"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="age_babies"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Age</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Masukkan umur bayi"
                          {...field}
                          className="text-muted-foreground"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="start_time"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Start Time</FormLabel>
                      <FormControl>
                        <Input
                          type="datetime-local"
                          {...field}
                          onChange={(e) => {
                            const dateTime = e.target.value;
                            const formattedDateTime = `${dateTime}:00`;
                            field.onChange(formattedDateTime);
                          }}
                          className="text-muted-foreground"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="end_time"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>End Time</FormLabel>
                      <FormControl>
                        <Input
                          type="datetime-local"
                          {...field}
                          onChange={(e) => {
                            const dateTime = e.target.value;
                            const formattedDateTime = `${dateTime}:00`;
                            field.onChange(formattedDateTime);
                          }}
                          className="text-muted-foreground"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="special_request"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Special Request</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Masukkan special request"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex justify-end">
                  <Button type="submit" disabled={isPending}>
                    {isPending ? "Loading..." : "Booking Now"}
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
