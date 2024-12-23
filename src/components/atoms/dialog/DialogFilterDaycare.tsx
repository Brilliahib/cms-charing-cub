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
import { useToast } from "@/hooks/use-toast";
import { useAddGiveRateDaycare } from "@/http/daycares/add-rate-daycare";
import {
  giveRateDaycareSchema,
  GiveRateDaycareType,
} from "@/validators/daycares/give-rate-daycare-validator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Input } from "@/components/ui/input";

interface DialogFilterDaycareProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export default function DialogFilterDaycare({
  open,
  setOpen,
}: DialogFilterDaycareProps) {
  const form = useForm<GiveRateDaycareType>({
    resolver: zodResolver(giveRateDaycareSchema),
    defaultValues: {
      daycare_id: 0,
      rating: 0,
      comment: "",
    },
    mode: "onChange",
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Filter Daycare</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div className="text-left">
          <Form {...form}>
            <form className="space-y-5 pt-4">
              <FormField
                control={form.control}
                name="comment"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Lokasi</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Masukkan lokasi yang diinginkan"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-end">
                <Button type="submit" size={"lg"}>
                  Cari
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
