"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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
import { useAddNewQuestionTalk } from "@/http/cub/talk/create-new-question-talk";
import {
  cubTalkSchema,
  CubTalkType,
} from "@/validators/cub/talk/cub-talk-validator";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function FormCreateNewTalk() {
  const router = useRouter();

  const form = useForm<CubTalkType>({
    resolver: zodResolver(cubTalkSchema),
    defaultValues: {
      question_title: "",
      question_detail: "",
    },
    mode: "onChange",
  });

  const { mutate: addNewQuestionTalkHandler, isPending } =
    useAddNewQuestionTalk({
      onError: (error: AxiosError<any>) => {
        toast.error("Gagal membuat pertanyaan baru!", {
          description: error.response?.data.message,
        });
      },
      onSuccess: () => {
        toast.success("Berhasil membuat pertanyaan baru!");
        router.push("/cub-talk");
      },
    });

  const onSubmit = (body: CubTalkType) => {
    addNewQuestionTalkHandler({ ...body });
  };
  return (
    <div>
      <Card className="shadow-md">
        <CardContent className="py-4">
          <Form {...form}>
            <form className="space-y-5" onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="question_title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Judul Pertanyaan</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Bagaimana cara mengatasi anak yang suka menangis terus?"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="question_detail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Detail Pertanyaan</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Halo dok, jadi belakangan ini anak saya sering menangis terus..."
                        className="min-h-[120px]"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      * Ceritakan detail pertanyaan Anda
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-end py-4">
                <Button type="submit" disabled={isPending}>
                  {isPending ? "Mengirim..." : "Kirim Pertanyaan"}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
