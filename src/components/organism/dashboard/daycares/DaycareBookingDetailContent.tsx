"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useGetDetailBookingDaycare } from "@/http/daycares/bookings/get-detail-booking-daycare";
import { format } from "date-fns";
import { useSession } from "next-auth/react";
import { id as idLocale } from "date-fns/locale";
import { Button } from "@/components/ui/button";
import { Download, Image } from "lucide-react";
import { useState } from "react";
import DialogDaycareViewPaymentProof from "@/components/atoms/dialog/DialogViewPaymentProof";

interface DaycareBookingDetailProps {
  id: string;
}

export default function DaycareBookingDetailContent({
  id,
}: DaycareBookingDetailProps) {
  const session = useSession();
  const { data, isPending } = useGetDetailBookingDaycare(
    {
      id,
    },
    { enabled: session.status === "authenticated" }
  );

  const [dialogViewPaymentProofOpen, setDialogViewPaymentProofOpen] =
    useState(false);

  const handleDialogViewPaymentProof = () => {
    setDialogViewPaymentProofOpen(true);
  };
  return (
    <>
      <div className="w-full space-y-4 md:space-y-6 py-8">
        <div>
          <Button variant={"outline"}>
            <Download /> Download Invoice
          </Button>
        </div>
        <Card className="border shadow-md">
          <CardContent className="p-4 md:p-6">
            <div className="grid md:grid-cols-3 grid-cols-1 md:gap-10 gap-6">
              <div className="space-y-2">
                <p className="font-semibold">Booking Id</p>
                <p>{data?.data.id}</p>
              </div>
              <div className="space-y-2">
                <p className="font-semibold">Child Name</p>
                <p>{data?.data.name_babies}</p>
              </div>
              <div className="space-y-2">
                <p className="font-semibold">Name</p>
                <p>{data?.data.user.name}</p>
              </div>
              <div className="space-y-2">
                <p className="font-semibold">Daycare Name</p>
                <p>{data?.data.daycares?.name}</p>
              </div>
              <div className="space-y-2">
                <p className="font-semibold">Daycare Location</p>
                <p>{data?.data.daycares?.location}</p>
              </div>
              <div className="space-y-2">
                <p className="font-semibold">Daycare Address</p>
                <p>{data?.data.daycares?.address}</p>
              </div>
              <div className="space-y-2">
                <p className="font-semibold">Payment Status</p>
                <Badge variant={data?.data.is_paid ? "success" : "destructive"}>
                  {data?.data.is_paid ? "PAID" : "Waiting"}
                </Badge>
              </div>
              <div className="space-y-2">
                <p className="font-semibold">Booking Status</p>
                <Badge
                  variant={data?.data.is_approved ? "success" : "destructive"}
                >
                  {data?.data.is_approved ? "APPROVED" : "Waiting"}
                </Badge>
              </div>
              <div className="space-y-2">
                <p className="font-semibold">Payment Proof</p>
                {data?.data.payment_proof ? (
                  <div
                    className="flex items-center gap-2 cursor-pointer"
                    onClick={handleDialogViewPaymentProof}
                  >
                    <Image size={20} />
                    <p className="line-clamp-1">View Payment Proof</p>
                  </div>
                ) : (
                  <p className="text-red-600">Not Paid</p>
                )}
              </div>

              <div className="space-y-2">
                <p className="font-semibold">Special Request</p>
                <p>{data?.data.special_request}</p>
              </div>
              <div className="space-y-2">
                <p className="font-semibold">Start Time</p>
                <p className="md:line-clamp-2 line-clamp-1">
                  {data?.data.start_time
                    ? format(
                        new Date(data.data.start_time),
                        "EEEE, d MMMM yyyy, HH:mm",
                        {
                          locale: idLocale,
                        }
                      )
                    : "Loading"}
                </p>
              </div>
              <div className="space-y-2">
                <p className="font-semibold">End Time</p>
                <p className="md:line-clamp-2 line-clamp-1">
                  {data?.data.end_time
                    ? format(
                        new Date(data.data.end_time),
                        "EEEE, d MMMM yyyy, HH:mm",
                        {
                          locale: idLocale,
                        }
                      )
                    : "Loading"}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      <DialogDaycareViewPaymentProof
        open={dialogViewPaymentProofOpen}
        setOpen={setDialogViewPaymentProofOpen}
        id={id}
      />
    </>
  );
}
