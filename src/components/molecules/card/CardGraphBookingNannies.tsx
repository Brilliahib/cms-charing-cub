"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useSession } from "next-auth/react";
import { useGetBookingNannies } from "@/http/nannies/get-all-booking-nannies";
import { format } from "date-fns";
import { id } from "date-fns/locale";

ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Title,
  Tooltip,
  Legend
);

export default function CardGraphBookingNannies() {
  const { data: session, status } = useSession();
  const { data, isPending } = useGetBookingNannies(
    session?.access_token as string,
    {
      enabled: status === "authenticated",
    }
  );

  const labels = data?.data.length
    ? data.data.map((item) =>
        format(new Date(item.created_at), "d MMMM yyyy", {
          locale: id,
        })
      )
    : [];

  const bookingCountData = data?.data.length
    ? data.data.reduce((acc, item) => {
        const date = format(new Date(item.created_at), "d MMMM yyyy", {
          locale: id,
        });
        if (!acc[date]) {
          acc[date] = 0;
        }
        acc[date] += 1;
        return acc;
      }, {} as Record<string, number>)
    : {};

  const chartData = {
    labels: Object.keys(bookingCountData),
    datasets: [
      {
        label: "Jumlah Booking",
        data: Object.values(bookingCountData),
        fill: false,
        borderColor: "rgba(75, 192, 192, 1)",
        tension: 0.1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            const label = context.dataset.label || "";
            const value = context.raw;
            return `${label}: ${value} bookings`;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
          callback: function (value: any) {
            return value % 1 === 0 ? value : null;
          },
        },
      },
    },
  };
  return (
    <>
      <Card className="border shadow-sm">
        <CardContent className="p-4">
          <div className="mb-4 space-y-1">
            <h1 className="font-semibold">Booking Activity</h1>
          </div>
          <Line data={chartData} options={options} className="max-h-[300px]" />
        </CardContent>
      </Card>
    </>
  );
}
