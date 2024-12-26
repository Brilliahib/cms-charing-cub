import RatingStars from "@/components/atoms/rating/RatingStar";
import { Card, CardContent } from "@/components/ui/card";
import { useGetDetailDaycare } from "@/http/daycares/get-detail-daycare";
import { baseUrl } from "@/utils/app";
import { formatPrice } from "@/utils/price";
import { Clock, MapPin, Phone } from "lucide-react";
import Image from "next/image";

interface CardBookingDaycareDetailProps {
  id: number;
}

export default function CardBookingDaycareDetail({
  id,
}: CardBookingDaycareDetailProps) {
  const { data, isPending } = useGetDetailDaycare({ id });
  return (
    <>
      <div className="max-w-sm w-full">
        <Card className="border shadow">
          <CardContent className="md:p-6 p-4 space-y-4">
            <div>
              <h1 className="text-medium font-bold">Booking Summary</h1>
            </div>
            <div className="space-y-4 p-3 border rounded-md">
              <div className="flex items-center justify-between text-sm">
                <h1 className="text-muted-foreground text-sm">Bank Name</h1>
                <h1 className="font-semibold">BRI</h1>
              </div>
              <div className="flex items-center justify-between text-sm">
                <h1 className="text-muted-foreground text-sm">Bank Account</h1>
                <h1 className="font-semibold">{data?.data.name}</h1>
              </div>
              <div className="flex items-center justify-between text-sm">
                <h1 className="text-muted-foreground">Bank Number</h1>
                <h1 className="font-semibold">34048374530</h1>
              </div>
            </div>
            <div>
              <h1 className="text-medium font-bold">Price Summary</h1>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between md:text-lg text-base text-red-500">
                <h1 className="font-semibold">Total Price</h1>
                <h1 className="font-bold">
                  {formatPrice(data?.data.price_full ?? 0)}
                </h1>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
