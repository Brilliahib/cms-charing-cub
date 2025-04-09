"use client";

import { Card, CardContent } from "@/components/ui/card";
import { useGetDetailBookingFromDaycare } from "@/http/daycares/bookings/get-detail-booking-from-daycare";
import { formatPrice } from "@/utils/price";
import { useSession } from "next-auth/react";

interface CubLocationPaymentProps {
  id: string;
}

export default function CubLocationPaymentContent({
  id,
}: CubLocationPaymentProps) {
  const { data: session, status } = useSession();
  const { data, isPending } = useGetDetailBookingFromDaycare(
    { id, token: session?.access_token as string },
    { enabled: status === "authenticated" }
  );
  return (
    <>
      <div className="py-8 pad-x-xl">
        <Card>
          <CardContent className="p-6">
            <div className="space-y-8">
              <div className="space-y-2">
                <h1 className="text-xl md:text-2xl font-bold">Pembayaran</h1>
                <p className="text-muted-foreground">
                  Cek pembayaran booking anda disini.
                </p>
              </div>
              <div>
                <h1 className="font-bold text-2xl md:text-4xl">
                  {formatPrice(data?.data.price)}
                </h1>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
