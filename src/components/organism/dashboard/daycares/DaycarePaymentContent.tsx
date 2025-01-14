"use client";

import DialogPaymentWithQRIS from "@/components/atoms/dialog/DialogPaymentWithQRIS";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useGetDetailBookingFromDaycare } from "@/http/daycares/bookings/get-detail-booking-from-daycare";
import { formatPrice } from "@/utils/price";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";

interface DaycarePaymentProps {
  id: string;
}

export default function DaycarePaymentContent({ id }: DaycarePaymentProps) {
  const { data: session, status } = useSession();
  const { data, isPending } = useGetDetailBookingFromDaycare(
    { id, token: session?.access_token as string },
    { enabled: status === "authenticated" }
  );

  const [dialogPaymentWithQRISOpen, setDialogPaymentWithQRISOpen] =
    useState(false);

  const handleClickPaymentQRIS = () => {
    setDialogPaymentWithQRISOpen(true);
  };
  return (
    <>
      <div className="py-8 space-y-8">
        <Card className="shadow-md border">
          <CardHeader>
            <CardTitle>Payment Details</CardTitle>
            <CardDescription>
              Please complete the payment to proceed. Ensure the amount matches
              the specified total.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 md:space-y-8">
              <h1 className="font-bold text-2xl md:text-4xl">
                {formatPrice(data?.data.price)}
              </h1>
              <Button variant={"default"}>Check Payment Status</Button>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-md border">
          <CardHeader>
            <CardTitle>Payment Method</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-5 grid-cols-2 gap-4 md:gap-6">
              <div className="border rounded-xl w-fit flex items-center p-4">
                <Image
                  src="/images/payment/qris.png"
                  alt="QRIS"
                  width={1000}
                  height={1000}
                  className="max-h-[100px] cursor-pointer"
                  onClick={handleClickPaymentQRIS}
                />
              </div>
              <div className="border rounded-xl w-fit flex items-center p-4">
                <Image
                  src="/images/payment/shopeepay.png"
                  alt="QRIS"
                  width={1000}
                  height={1000}
                  className="max-h-[100px]"
                />
              </div>
              <div className="border rounded-xl w-fit flex items-center p-4">
                <Image
                  src="/images/payment/dana.png"
                  alt="QRIS"
                  width={1000}
                  height={1000}
                  className="max-h-[100px]"
                />
              </div>
              <div className="border rounded-xl w-fit flex items-center p-4">
                <Image
                  src="/images/payment/ovo.png"
                  alt="QRIS"
                  width={1000}
                  height={1000}
                  className="max-h-[100px]"
                />
              </div>
              <div className="border rounded-xl w-fit flex items-center p-4">
                <Image
                  src="/images/payment/bank-tf.png"
                  alt="QRIS"
                  width={1000}
                  height={1000}
                  className="max-h-[100px]"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      <DialogPaymentWithQRIS
        open={dialogPaymentWithQRISOpen}
        setOpen={setDialogPaymentWithQRISOpen}
        id={id}
      />
    </>
  );
}
