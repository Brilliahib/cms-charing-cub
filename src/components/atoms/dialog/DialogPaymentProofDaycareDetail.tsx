import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useGetDetailBookingFromDaycare } from "@/http/daycares/bookings/get-detail-booking-from-daycare";
import { baseUrl } from "@/utils/app";
import { useSession } from "next-auth/react";
import Image from "next/image";

interface DialogViewPaymentProofDaycareProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  id: number;
}

export default function DialogViewPaymentProofDaycare({
  open,
  setOpen,
  id,
}: DialogViewPaymentProofDaycareProps) {
  const session = useSession();
  const { data, isPending } = useGetDetailBookingFromDaycare(
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
        <ScrollArea className="max-h-[80vh]">
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
