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
import { Textarea } from "@/components/ui/textarea";
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
import { Star } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface DialogGiveRateDaycareProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  id: string;
}

export default function DialogGiveRateDaycare({
  open,
  setOpen,
  id,
}: DialogGiveRateDaycareProps) {
  const queryClient = useQueryClient();
  const router = useRouter();
  const [selectedRating, setSelectedRating] = useState(0);

  const form = useForm<GiveRateDaycareType>({
    resolver: zodResolver(giveRateDaycareSchema),
    defaultValues: {
      daycare_id: id,
      rating: 0,
      comment: "",
    },
    mode: "onChange",
  });

  const { mutate: addBookingNanniesHandler, isPending } = useAddGiveRateDaycare(
    {
      onError: (error: AxiosError<any>) => {
        toast.error("Failed to give rating!", {
          description: error.response?.data.message,
        });
      },
      onSuccess: () => {
        toast.success("Successfully to give rating!");
        queryClient.invalidateQueries({
          queryKey: ["daycare-detail"],
        });
        router.refresh();
      },
    }
  );

  const onSubmit = (body: GiveRateDaycareType) => {
    addBookingNanniesHandler({
      ...body,
      daycare_id: id,
      rating: selectedRating,
    });
    setOpen(false);
  };

  const handleRatingClick = (rating: number) => {
    setSelectedRating(rating);
    form.setValue("rating", rating);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Rating</DialogTitle>
          <DialogDescription>Give a rating for this daycare.</DialogDescription>
        </DialogHeader>
        <div className="text-left">
          <Form {...form}>
            <form
              className="space-y-5 pt-4"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <FormField
                control={form.control}
                name="rating"
                render={() => (
                  <FormItem>
                    <FormLabel>Star</FormLabel>
                    <FormControl>
                      <div className="flex items-center space-x-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`h-5 w-5 cursor-pointer ${
                              selectedRating >= star
                                ? "text-yellow-500"
                                : "text-gray-300"
                            }`}
                            onClick={() => handleRatingClick(star)}
                            fill={
                              selectedRating >= star ? "currentColor" : "none"
                            }
                          />
                        ))}
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="comment"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Comment</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Masukkan komentar Anda"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-end">
                <Button type="submit" disabled={isPending}>
                  {isPending ? "Loading..." : "Submit Now"}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
