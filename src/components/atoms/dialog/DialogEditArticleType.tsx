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
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "sonner";
import { useEffect } from "react";
import { TypesArticle } from "@/types/article/article";
import {
  typeArticleSchema,
  TypeArticleType,
} from "@/validators/article/article-type-validator";
import { useEditArticleType } from "@/http/article/type-article/update-article-type";

interface DialogEditArticleTypeProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  data: TypesArticle;
  id: string;
}

export default function DialogEditArticleType({
  open,
  setOpen,
  data,
  id,
}: DialogEditArticleTypeProps) {
  const form = useForm<TypeArticleType>({
    resolver: zodResolver(typeArticleSchema),
    defaultValues: {
      name: "",
    },
    mode: "onChange",
  });

  useEffect(() => {
    form.reset({
      name: data.name,
    });
  }, [data, form]);

  const queryClient = useQueryClient();

  const { mutate: editPreTestHandler, isPending } = useEditArticleType({
    onError: () => {
      toast.error("Gagal memperbarui tipe artikel!");
    },
    onSuccess: () => {
      toast.success("Berhasil memperbarui tipe artikel!");
      queryClient.invalidateQueries({
        queryKey: ["article-type-lis"],
      });
      setOpen(false);
    },
  });

  const onSubmit = (body: TypeArticleType) => {
    editPreTestHandler({ body, id });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Tipe Artikel</DialogTitle>
        </DialogHeader>
        <ScrollArea className="max-h-[80vh]">
          <Form {...form}>
            <form
              className="space-y-5 pt-4"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Materi <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input type="text" placeholder="Pertanyaan" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-end">
                <Button type="submit" disabled={isPending}>
                  {isPending ? "Loading..." : "Simpan"}
                </Button>
              </div>
            </form>
          </Form>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
