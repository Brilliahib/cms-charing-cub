import DashboardTitle from "@/components/atoms/typography/DashboardTitle";
import CardChartTotalIncomeDaycare from "@/components/molecules/card/CardChartTotalIncomeDaycare";
import { Card, CardContent } from "@/components/ui/card";
import { useGetIncomeTodayDaycare } from "@/http/daycares/income/get-income-today-daycare";
import { useGetIncomeSummaryTotalDaycare } from "@/http/daycares/income/get-total-income-daycare";
import { formatPrice, formatRupiahString } from "@/utils/price";
import { useSession } from "next-auth/react";

export default function DaycareDashboardContent() {
  const { data: session, status } = useSession();
  const { data, isPending } = useGetIncomeSummaryTotalDaycare(
    session?.access_token as string,
    {
      enabled: status === "authenticated",
    }
  );

  const { data: today } = useGetIncomeTodayDaycare(
    session?.access_token as string,
    {
      enabled: status === "authenticated",
    }
  );
  return (
    <>
      <DashboardTitle title="Dashboard Daycare" />
      <div className="py-4 md:space-y-6 space-y-4">
        <div className="grid md:grid-cols-2 grid-cols-1 gap-4 md:gap-6">
          <Card className="border">
            <CardContent className="p-4 md:p-6">
              <div className="space-y-2">
                <span className="text-muted-foreground">Total Pendapatan</span>
                <h1 className="font-bold text-2xl">
                  {formatRupiahString(data?.data.total_income)}
                </h1>
              </div>
            </CardContent>
          </Card>
          <Card className="border">
            <CardContent className="p-4 md:p-6">
              <div className="space-y-2">
                <span className="text-muted-foreground">
                  Pendapatan Hari Ini
                </span>
                <h1 className="font-bold text-2xl">
                  {formatPrice(today?.data.total_income_today)}
                </h1>
              </div>
            </CardContent>
          </Card>
        </div>
        <CardChartTotalIncomeDaycare data={data?.data} isLoading={isPending} />
      </div>
    </>
  );
}
