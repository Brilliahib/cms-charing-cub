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
  typeArticleSchema,
  TypeArticleType,
} from "@/validators/article/article-type-validator";
import { useAddTypeArticle } from "@/http/article/add-type-article";
import { toast } from "sonner";

interface DialogCreateArticleProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export default function DialogCreateArticleType({
  open,
  setOpen,
}: DialogCreateArticleProps) {
  const form = useForm<TypeArticleType>({
    resolver: zodResolver(typeArticleSchema),
    defaultValues: {
      name: "",
    },
    mode: "onChange",
  });

  const queryClient = useQueryClient();

  const { mutate: addTypeArticleHandler, isPending } = useAddTypeArticle({
    onError: (error: AxiosError<any>) => {
      toast.error("Failed to add article types", {
        description: error.response?.data.message,
      });
    },
    onSuccess: () => {
      toast.success("Successfully to add article types");
      queryClient.invalidateQueries({
        queryKey: ["article-list"],
      });
      setOpen(false);
    },
  });

  const onSubmit = (body: TypeArticleType) => {
    addTypeArticleHandler(body);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Tambah Artikel</DialogTitle>
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
                    <FormLabel>Nama Tipe Artikel</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Masukkan nama tipe artikel"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-end">
                <Button type="submit" disabled={isPending}>
                  {isPending ? "Loading..." : "Tambahkan"}
                </Button>
              </div>
            </form>
          </Form>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
