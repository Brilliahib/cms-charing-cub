"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { Textarea } from "@/components/ui/textarea";
import { useAddNewFeedback } from "@/http/feedbacks/create-feedbacks";
import {
  feedbacksSchema,
  FeedbacksType,
} from "@/validators/feedbacks/feedbacks-validator";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function FormCreateFeedback() {
  const router = useRouter();

  const form = useForm<FeedbacksType>({
    resolver: zodResolver(feedbacksSchema),
    defaultValues: {
      rate: "",
      comment: "",
    },
    mode: "onChange",
  });

  const { mutate: addNewQuestionTalkHandler, isPending } = useAddNewFeedback({
    onError: (error: AxiosError<any>) => {
      toast.error("Gagal memberi masukan!", {
        description: error.response?.data.message,
      });
    },
    onSuccess: () => {
      toast.success("Berhasil memberi masukan!");
      router.push("/dashboard/feedbacks");
    },
  });

  const onSubmit = (body: FeedbacksType) => {
    addNewQuestionTalkHandler({ ...body });
  };
  return (
    <div>
      <Card className="border shadow-none">
        <CardHeader>
          <CardTitle>Berikan Pengalaman dan Saran!👋</CardTitle>
          <CardDescription>
            Kami senang mendengar kabar dari Anda! Bagaimana pengalaman Anda
            dengan Charging Cub?
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form className="space-y-5" onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="rate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bagaimana Tingkat Kepuasan Anda?</FormLabel>
                    <FormControl>
                      <div className="grid grid-cols-1 gap-2">
                        {[
                          {
                            emoji: "😍",
                            label: "Luar biasa!",
                            value: "fantastic",
                          },
                          { emoji: "🙂", label: "Baik.", value: "good" },
                          { emoji: "😐", label: "Biasa saja.", value: "fine" },
                          {
                            emoji: "🙁",
                            label: "Kurang baik.",
                            value: "not so great",
                          },
                          {
                            emoji: "😡",
                            label: "Perlu perbaikan.",
                            value: "improvements needed",
                          },
                        ].map((item) => {
                          const selected = field.value === item.value;
                          return (
                            <button
                              key={item.value}
                              type="button"
                              onClick={() => field.onChange(item.value)}
                              className={`w-full text-left rounded-lg border px-4 py-2 flex items-center gap-3 text-sm transition
                  ${
                    selected
                      ? "border-primary bg-primary/10"
                      : "hover:bg-gray-50"
                  }
                `}
                            >
                              <span className="text-xl">{item.emoji}</span>
                              <span>{item.label}</span>
                            </button>
                          );
                        })}
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
                    <FormLabel>Komentar (Opsional)</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Apakah ada komentar atau saran untuk kami?"
                        className="min-h-[120px]"
                        {...field}
                        value={field.value ?? ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-end py-4">
                <Button type="submit" disabled={isPending}>
                  {isPending ? "Mengirim..." : "Kirim"}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
