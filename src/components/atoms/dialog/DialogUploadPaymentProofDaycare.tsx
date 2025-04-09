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
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useForm } from "react-hook-form";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  uploadPaymentProofDaycareSchema,
  UploadPaymentProofDaycareType,
} from "@/validators/daycares/upload-payment-proof-validator";
import { useAddUploadPaymentProofDaycare } from "@/http/daycares/bookings/add-payment-proof-daycare";
import { useSession } from "next-auth/react";
import { toast } from "sonner";

interface DialogUploadPaymentProofDaycareProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  id: string;
}

export default function DialogUploadPaymentProofDaycareType({
  open,
  setOpen,
  id,
}: DialogUploadPaymentProofDaycareProps) {
  const form = useForm<UploadPaymentProofDaycareType>({
    resolver: zodResolver(uploadPaymentProofDaycareSchema),
    defaultValues: {
      payment_proof: undefined,
    },
    mode: "onChange",
  });

  const queryClient = useQueryClient();
  const session = useSession();

  const { mutate: addUploadPaymentProofDaycareHandler, isPending } =
    useAddUploadPaymentProofDaycare({
      onError: (error: AxiosError<any>) => {
        toast.error("Failed to upload payment proof", {
          description: error.response?.data.message,
        });
      },
      onSuccess: () => {
        toast.success("Successfully to upload payment proof");
        queryClient.invalidateQueries({
          queryKey: ["booking-from-daycares"],
        });
        setOpen(false);
      },
    });

  const onSubmit = (body: UploadPaymentProofDaycareType) => {
    addUploadPaymentProofDaycareHandler({
      params: { id, token: session.data?.access_token as string },
      body,
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Unggah Bukti Pembayaran</DialogTitle>
        </DialogHeader>
        <ScrollArea className="max-h-[80vh]">
          <Form {...form}>
            <form
              className="space-y-5 pt-4"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <FormField
                control={form.control}
                name="payment_proof"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bukti Pembayaran</FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        placeholder="Masukkan bukti pembayaran"
                        onChange={(e) => {
                          // Pastikan file ter-set ke form state
                          const file = e.target.files?.[0] || null;
                          field.onChange(file); // Set file ke form state
                        }}
                        ref={field.ref}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-end">
                <Button type="submit" disabled={isPending}>
                  {isPending ? "Loading..." : "Unggah"}
                </Button>
              </div>
            </form>
          </Form>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
