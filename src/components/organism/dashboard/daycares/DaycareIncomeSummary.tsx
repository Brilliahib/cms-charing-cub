"use client";

import { TrendingUp } from "lucide-react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
} from "recharts";
import { Card, CardContent } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { useGetIncomeSummaryDaycare } from "@/http/daycares/income/get-income-summary-daycare";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { formatRupiahString } from "@/utils/price";

export default function DaycareIncomeSummary() {
  const { data: session, status } = useSession();
  const [range, setRange] = useState<"weekly" | "monthly" | "yearly">(
    "monthly"
  );

  const { data, isPending } = useGetIncomeSummaryDaycare(
    session?.access_token as string,
    range,
    {
      enabled: status === "authenticated",
    }
  );

  const chartData =
    data?.data?.daily_income.map((item) => ({
      date: item.date,
      income: Number(item.total),
    })) ?? [];

  const chartConfig = {
    income: {
      label: "Pendapatan",
      color: "hsl(var(--primary))",
    },
  } satisfies ChartConfig;

  return (
    <div className="py-8 space-y-6">
      <div>
        <Card className="border">
          <CardContent className="p-4 md:p-6">
            <div className="space-y-2">
              <span className="text-muted-foreground md:text-base text-sm">
                Total Pemasukan
              </span>
              <h1 className="font-bold md:text-2xl text-xl">
                {formatRupiahString(data?.data.total_income)}
              </h1>
            </div>
          </CardContent>
        </Card>
      </div>
      <Card className="border ">
        <CardContent className="md:p-6 p-4">
          <div className="flex justify-end mb-4">
            <Select
              value={range}
              onValueChange={(value) =>
                setRange(value as "weekly" | "monthly" | "yearly")
              }
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Pilih Rentang Waktu" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="weekly">Mingguan</SelectItem>
                <SelectItem value="monthly">Bulanan</SelectItem>
                <SelectItem value="yearly">Tahunan</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <ChartContainer config={chartConfig}>
            {isPending ? (
              <p>Loading chart...</p>
            ) : (
              <ResponsiveContainer width="100%" height={300}>
                <ChartContainer config={chartConfig}>
                  <AreaChart
                    accessibilityLayer
                    data={chartData}
                    margin={{
                      left: 12,
                      right: 12,
                    }}
                  >
                    <CartesianGrid vertical={false} />
                    <XAxis
                      dataKey="date"
                      tickLine={false}
                      axisLine={false}
                      tickMargin={8}
                      tickFormatter={(value) => {
                        const date = new Date(value);
                        if (range === "weekly") {
                          return `${date.getDate()}/${date.getMonth() + 1}`;
                        } else if (range === "monthly") {
                          return `${date.getMonth() + 1}/${date.getFullYear()}`;
                        } else {
                          return `${date.getFullYear()}`;
                        }
                      }}
                    />

                    <ChartTooltip
                      cursor={false}
                      content={<ChartTooltipContent indicator="line" />}
                    />
                    <Area
                      dataKey="income"
                      type="natural"
                      fill={chartConfig.income.color}
                      fillOpacity={0.4}
                      stroke={chartConfig.income.color}
                      stackId="a"
                    />
                  </AreaChart>
                </ChartContainer>
              </ResponsiveContainer>
            )}
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}
