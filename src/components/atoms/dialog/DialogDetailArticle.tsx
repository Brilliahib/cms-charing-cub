import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useGetDetailArticleAdmin } from "@/http/article/get-detail-article-admin";
import { baseUrl } from "@/utils/app";
import Image from "next/image";

interface DialogDetailArticleProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  id: string;
}

export default function DialogDetailArticle({
  open,
  setOpen,
  id,
}: DialogDetailArticleProps) {
  const { data } = useGetDetailArticleAdmin({ id });
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Detail Artikel</DialogTitle>
        </DialogHeader>
        <ScrollArea className="max-h-[80vh]">
          <div className="space-y-4 md:space-y-6">
            <div className="flex flex-col gap-1">
              <h1 className="text-muted-foreground">Judul Artikel</h1>
              <p>{data?.data.title}</p>
            </div>
            <div className="flex flex-col gap-1">
              <h1 className="text-muted-foreground">Foto</h1>
              <Image
                src={`${baseUrl}/${data?.data.image}`}
                alt={data?.data.title ?? "Article Image"}
                width={1000}
                height={1000}
                className="max-h-[400px] w-full object-cover rounded-xl"
              />
            </div>
            <div className="flex flex-col gap-1">
              <h1 className="text-muted-foreground">Konten</h1>
              <div
                dangerouslySetInnerHTML={{ __html: data?.data.content ?? "" }}
                className="prose text-justify"
              />
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
