import DashboardTitle from "@/components/atoms/typography/DashboardTitle";
import { Card, CardContent } from "@/components/ui/card";
import { formatPrice } from "@/utils/price";

export default function DaycareDashboardContent() {
  return (
    <>
      <DashboardTitle title="Dashboard Daycare" />
      <div className="py-4 space-y-8">
        <div className="grid md:grid-cols-2 grid-cols-1 gap-4 md:gap-6">
          <Card className="border">
            <CardContent className="p-4 md:p-6">
              <div className="space-y-2">
                <span className="text-muted-foreground">Total Pemasukan</span>
                <h1 className="font-bold text-2xl">{formatPrice(1000000)}</h1>
              </div>
            </CardContent>
          </Card>
          <Card className="border">
            <CardContent className="p-4 md:p-6">
              <div className="space-y-2">
                <span className="text-muted-foreground">
                  Pemasukan Hari Ini
                </span>
                <h1 className="font-bold text-2xl">{formatPrice(1000000)}</h1>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
