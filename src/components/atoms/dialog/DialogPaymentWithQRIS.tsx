import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useGetDetailBookingDaycare } from "@/http/daycares/bookings/get-detail-booking-daycare";
import { useGetPaymentBookingDaycareQRIS } from "@/http/daycares/payments/get-payment-qris";
import { baseUrl } from "@/utils/app";
import { useSession } from "next-auth/react";
import Image from "next/image";

interface DialogPaymentWithQRISProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  id: string;
}

export default function DialogPaymentWithQRIS({
  open,
  setOpen,
  id,
}: DialogPaymentWithQRISProps) {
  const session = useSession();
  const { data, isPending } = useGetPaymentBookingDaycareQRIS(
    {
      id,
      token: session.data?.access_token as string,
    },
    { enabled: session.status === "authenticated" }
  );
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Payment QRIS</DialogTitle>
        </DialogHeader>
        <ScrollArea className="md:max-h-[80vh] max-h-[50vh]">
          <div>
            <Image
              src={`${data?.qr_code_string}`}
              alt="QRIS"
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
