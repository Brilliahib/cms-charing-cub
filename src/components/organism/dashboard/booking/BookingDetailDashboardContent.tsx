"use client";

import { Card, CardContent } from "@/components/ui/card";
import { useGetDetailBookingNannnies } from "@/http/booking/get-detail-booking-nannies";
import { format, isValid, parseISO } from "date-fns";
import { useSession } from "next-auth/react";
import { id as localeId } from "date-fns/locale";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Mail, Printer } from "lucide-react";
import DashboardTitle from "@/components/atoms/typography/DashboardTitle";

interface BookingDetailDashboardProps {
  id: number;
}

export default function BookingDetailDashboardContent({
  id,
}: BookingDetailDashboardProps) {
  const { data: session, status } = useSession();
  const { data, isPending } = useGetDetailBookingNannnies(
    { id, token: session?.access_token as string },
    { enabled: status === "authenticated" }
  );

  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return "Belum Tersedia";
    const date = parseISO(dateString);
    return isValid(date)
      ? format(date, "EEEE, d MMMM yyyy, HH:mm", { locale: localeId })
      : "Belum Tersedia";
  };
  return (
    <>
      <div className="flex justify-between">
        <DashboardTitle title="Detail Booking" />
        <div className="flex gap-4">
          <Button variant={"outline"}>
            <Printer /> Print Invoice
          </Button>
          <Button>
            <Mail /> Contact Nannies
          </Button>
        </div>
      </div>
      <div className="py-6 md:space-y-6 space-y-4">
        <div className="grid md:grid-cols-2 grid-cols-1 md:gap-6 gap-4">
          <Card className="border shadow">
            <CardContent className="p-4 md:p-6">
              <div className="space-y-4">
                <div>
                  <h1 className="font-semibold text-md">
                    Customer Information
                  </h1>
                </div>
                <div className="space-y-2">
                  <div className="grid grid-cols-2 gap-x-4 items-center">
                    <p className="font-medium text-muted-foreground">
                      Customer Name
                    </p>
                    <p className="text-black font-medium">
                      {data?.data.user.name}
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-x-4 items-center">
                    <p className="font-medium text-muted-foreground">
                      Babies Name
                    </p>
                    <p className="text-black font-medium">
                      {data?.data.name_babies}
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-x-4 items-center">
                    <p className="font-medium text-muted-foreground">
                      Age Babies
                    </p>
                    <p className="text-black font-medium">
                      {data?.data.age_babies} Tahun
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border shadow">
            <CardContent className="p-4 md:p-6">
              <div className="space-y-4">
                <div>
                  <h1 className="font-semibold text-md">Nannies Information</h1>
                </div>
                <div className="space-y-2">
                  <div className="grid grid-cols-2 gap-x-4 items-center">
                    <p className="font-medium text-muted-foreground">
                      Nannies Name
                    </p>
                    <p className="text-black font-medium">
                      {data?.data.nannies?.user.name}
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-x-4 items-center">
                    <p className="font-medium text-muted-foreground">Phone</p>
                    <p className="text-black font-medium">
                      {data?.data.nannies?.contact}
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-x-4 items-center">
                    <p className="font-medium text-muted-foreground">Age</p>
                    <p className="text-black font-medium">
                      {data?.data.nannies?.age} Tahun
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-x-4 items-center">
                    <p className="font-medium text-muted-foreground">Gender</p>
                    <p className="text-black font-medium">
                      {data?.data.nannies?.gender === "female"
                        ? "Perempuan"
                        : "Laki-Laki"}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        <Card className="border shadow">
          <CardContent className="p-4 md:p-6">
            <div className="space-y-4">
              <div>
                <h1 className="font-semibold text-md">Booking Detail</h1>
              </div>
              <div className="grid md:grid-cols-2 grid-cols-1 md:gap-12 gap-8">
                <div className="space-y-2">
                  <div className="grid grid-cols-2 gap-x-4">
                    <p className="font-medium text-muted-foreground">
                      Booking ID
                    </p>
                    <p className="text-black font-medium">#{data?.data.id}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-x-4">
                    <p className="font-medium text-muted-foreground">
                      Start Booking
                    </p>
                    <p className="text-black font-medium">
                      {formatDate(data?.data.start_time)}
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-x-4">
                    <p className="font-medium text-muted-foreground">
                      End Booking
                    </p>
                    <p className="text-black font-medium">
                      {formatDate(data?.data.end_time)}
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-x-4">
                    <p className="font-medium text-muted-foreground">
                      Created At
                    </p>
                    <p className="text-black font-medium">
                      {formatDate(data?.data.created_at)}
                    </p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="grid grid-cols-2 gap-x-4">
                    <p className="font-medium text-muted-foreground">
                      Customer Name
                    </p>
                    <p className="text-black font-medium">
                      {data?.data.user.name}
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-x-4">
                    <p className="font-medium text-muted-foreground">
                      Babies Name
                    </p>
                    <p className="text-black font-medium">
                      {data?.data.name_babies}
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-x-4">
                    <p className="font-medium text-muted-foreground">
                      Age Babies
                    </p>
                    <p className="text-black font-medium">
                      {data?.data.age_babies}
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-x-4">
                    <p className="font-medium text-muted-foreground">
                      Special Request
                    </p>
                    <p className="text-black font-medium">
                      {data?.data.special_request}
                    </p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="grid grid-cols-2 gap-x-4">
                    <p className="font-medium text-muted-foreground">
                      Status Payment
                    </p>
                    <Badge
                      variant={data?.data.is_paid ? "success" : "destructive"}
                      className="w-fit"
                    >
                      {data?.data.is_paid ? "Paid" : "Pending"}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-x-4">
                    <p className="font-medium text-muted-foreground">
                      Status Approve
                    </p>
                    <Badge
                      variant={
                        data?.data.is_approved ? "success" : "destructive"
                      }
                      className="w-fit"
                    >
                      {data?.data.is_approved ? "Approved" : "Pending"}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-x-4">
                    <p className="font-medium text-muted-foreground">
                      Payment Proof
                    </p>
                    <p className="text-black font-medium">
                      {data?.data.payment_proof ?? "Belum dibayar"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
