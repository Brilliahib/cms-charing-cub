"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useAddQuestionAnswer } from "@/http/cub/talk/create-question-answer";
import {
  questionAnswerSchema,
  QuestionAnswerType,
} from "@/validators/cub/talk/cub-talk-answer-validator";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import ReactQuill from "react-quill";
import { toast } from "sonner";
import "react-quill/dist/quill.snow.css";

interface FormQuestionAnswerProps {
  id: string;
}

export default function FormQuestionAnswer({ id }: FormQuestionAnswerProps) {
  const router = useRouter();

  const form = useForm<QuestionAnswerType>({
    resolver: zodResolver(questionAnswerSchema),
    defaultValues: {
      talk_id: id,
      answer: "",
    },
    mode: "onChange",
  });

  const { mutate: addQuestionAnswerHandler, isPending } = useAddQuestionAnswer({
    onError: (error: AxiosError<any>) => {
      toast.error("Gagal menjawab pertanyaan!", {
        description: error.response?.data.message,
      });
    },
    onSuccess: () => {
      toast.success("Berhasil menjawab pertanyaan!");
      router.push("/cub-talk");
    },
  });

  const onSubmit = (body: QuestionAnswerType) => {
    addQuestionAnswerHandler({ ...body });
  };

  return (
    <div>
      <Card className="shadow-md">
        <CardContent className="py-4">
          <Form {...form}>
            <form className="space-y-5" onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="answer"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Jawaban</FormLabel>
                    <FormControl>
                      <ReactQuill
                        value={field.value}
                        onChange={field.onChange}
                        modules={{
                          toolbar: [
                            [{ header: [1, 2, false] }],
                            ["bold", "italic", "underline"],
                            ["link", "image"],
                            ["clean"],
                          ],
                        }}
                        placeholder="Masukkan jawaban disini"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-end py-4">
                <Button type="submit" disabled={isPending}>
                  {isPending ? "Mengirim..." : "Kirim Jawaban"}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
