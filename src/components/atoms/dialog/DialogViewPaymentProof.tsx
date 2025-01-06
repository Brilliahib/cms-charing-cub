import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useGetDetailBookingDaycare } from "@/http/daycares/bookings/get-detail-booking-daycare";
import { baseUrl } from "@/utils/app";
import { useSession } from "next-auth/react";
import Image from "next/image";

interface DialogDaycareViewPaymentProofProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  id: string;
}

export default function DialogDaycareViewPaymentProof({
  open,
  setOpen,
  id,
}: DialogDaycareViewPaymentProofProps) {
  const session = useSession();
  const { data, isPending } = useGetDetailBookingDaycare(
    {
      id,
    },
    { enabled: session.status === "authenticated" }
  );
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Payment Proof</DialogTitle>
        </DialogHeader>
        <ScrollArea className="md:max-h-[80vh] max-h-[50vh]">
          <div>
            <Image
              src={`${baseUrl}/${data?.data.payment_proof}`}
              alt="Bukti Pembayaran"
              width={1000}
              height={1000}
              className="w-full rounded-md"
            />
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
