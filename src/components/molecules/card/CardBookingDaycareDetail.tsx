import { Card, CardContent } from "@/components/ui/card";
import { useGetDetailDaycare } from "@/http/daycares/get-detail-daycare";
import { formatPrice } from "@/utils/price";

interface CardBookingDaycareDetailProps {
  id: string;
}

export default function CardBookingDaycareDetail({
  id,
}: CardBookingDaycareDetailProps) {
  const { data, isPending } = useGetDetailDaycare({ id });
  return (
    <>
      <div className="w-full">
        <Card className="border shadow">
          <CardContent className="md:p-6 p-4 space-y-4">
            <div>
              <h1 className="text-medium font-bold">Various Price</h1>
            </div>
            <div className="space-y-4">
              <ul className="space-y-2">
                {data?.data.price_lists.map((price) => (
                  <li key={price.id}>
                    Umur {price.age_start} - {price.age_end} dengan harga{" "}
                    {formatPrice(price.price)}
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
