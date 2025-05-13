import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useGetDetailFeedback } from "@/http/admin/feedback/get-detail-feedback";
import { useSession } from "next-auth/react";

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
          <div className="space-y-4 md:space-y-6">
            <div className="flex flex-col gap-1">
              <h1 className="text-muted-foreground">Rate</h1>
              <p>{faq?.data.rate}</p>
            </div>
            <div className="flex flex-col gap-1">
              <h1 className="text-muted-foreground">Komentar</h1>
              <p>{faq?.data.comment}</p>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
