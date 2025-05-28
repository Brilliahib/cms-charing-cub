import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useGetDetailFeedback } from "@/http/admin/feedback/get-detail-feedback";
import { format } from "date-fns";
import { useSession } from "next-auth/react";
import { id as IdLocale } from "date-fns/locale";

interface DialogDetailFeedbackProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  id: string;
}

export default function DialogDetailFeedback({
  open,
  setOpen,
  id,
}: DialogDetailFeedbackProps) {
  const { data: session, status } = useSession();

  const { data: faq } = useGetDetailFeedback(
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
          <DialogTitle>Detail Masukan</DialogTitle>
        </DialogHeader>
        <ScrollArea className="max-h-[80vh]">
          <div className="space-y-4">
            <div className="flex flex-col gap-1">
              <h1 className="text-muted-foreground">Nama Pengguna</h1>
              <p>{faq?.data.user.name}</p>
            </div>
            <div className="flex flex-col gap-1">
              <h1 className="text-muted-foreground">Rate</h1>
              <p className="capitalize">{faq?.data.rate}</p>
            </div>
            <div className="flex flex-col gap-1">
              <h1 className="text-muted-foreground">Komentar</h1>
              <p>{faq?.data.comment}</p>
            </div>
            <div className="flex flex-col gap-1">
              <h1 className="text-muted-foreground">Tanggal Dibuat</h1>
              <p>
                {faq?.data.created_at
                  ? format(
                      new Date(faq.data.created_at),
                      "EEEE, d MMMM yyyy HH:mm:ss",
                      {
                        locale: IdLocale,
                      }
                    )
                  : "Tanggal tidak tersedia"}
              </p>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
