import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { IncomeTotal } from "@/types/daycares/income/income-summary";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
} from "recharts";

interface CardChartTotalIncomeDaycareProps {
  data?: IncomeTotal;
  isLoading: boolean;
}

export default function CardChartTotalIncomeDaycare({
  data,
  isLoading,
}: CardChartTotalIncomeDaycareProps) {
  const chartData =
    data?.daily_income.map((item) => ({
      date: item.date,
      income: Number(item.total),
    })) ?? [];

  const chartConfig = {
    income: {
      label: "Pendapatan",
      color: "hsl(var(--primary))", // Warna yang digunakan di chart
    },
  } satisfies ChartConfig;

  return (
    <Card className="border">
      <CardHeader>
        <CardTitle>Total Pendapatan</CardTitle>
        <CardDescription>Menampilkan grafik total pendapatan</CardDescription>
      </CardHeader>
      <CardContent className="md:p-6 p-4">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto md:h-[400px] h-[200px] w-full"
        >
          {isLoading ? (
            <p>Loading chart...</p>
          ) : (
            <AreaChart
              data={chartData}
              margin={{
                left: 12,
                right: 12,
              }}
            >
              <defs>
                <linearGradient id="fillIncome" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor={chartConfig.income.color}
                    stopOpacity={1}
                  />
                  <stop
                    offset="95%"
                    stopColor={chartConfig.income.color}
                    stopOpacity={0.1}
                  />
                </linearGradient>
              </defs>

              <CartesianGrid vertical={false} strokeDasharray="3 3" />
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => {
                  const date = new Date(value);
                  const day = date.getDate();
                  const month = date.getMonth() + 1;
                  const year = date.getFullYear();
                  return `${day}/${month}/${year}`;
                }}
              />

              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="line" />}
              />
              <Area
                dataKey="income"
                type="natural"
                fill="url(#fillIncome)"
                stroke={chartConfig.income.color}
                stackId="a"
              />
            </AreaChart>
          )}
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
