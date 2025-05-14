import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useGetDetailArticleType } from "@/http/article/type-article/get-detail-article-type";
import { useSession } from "next-auth/react";

interface DialogDetailArticleTypeProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  id: string;
}

export default function DialogDetailArticleType({
  open,
  setOpen,
  id,
}: DialogDetailArticleTypeProps) {
  const { data: session, status } = useSession();

  const { data } = useGetDetailArticleType(
    id,
    session?.access_token as string,
    {
      enabled: status === "authenticated",
    }
  );
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Detail Tipe Artikel</DialogTitle>
        </DialogHeader>
        <ScrollArea className="max-h-[80vh]">
          <div className="space-y-4 md:space-y-6">
            <div className="flex flex-col gap-1">
              <h1 className="text-muted-foreground">Nama</h1>
              <p>{data?.data.name}</p>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
