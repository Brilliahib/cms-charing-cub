"use client";

import CardGraphBookingNannies from "@/components/molecules/card/CardGraphBookingNannies";
import CardSummaryBookingNannies from "@/components/molecules/card/CardSummaryBookingNannies";
import { useGetProfileNannies } from "@/http/nannies/get-profile-nannies";
import { useSession } from "next-auth/react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { TriangleAlert } from "lucide-react";
import Link from "next/link";

export default function NanniesDashboard() {
  const { data: session, status } = useSession();
  const { data, isPending } = useGetProfileNannies(
    session?.access_token as string,
    { enabled: status === "authenticated" }
  );

  return (
    <div className="md:space-y-8 space-y-6 py-8">
      {data?.data === null && (
        <Alert variant="destructive" className="w-fit">
          <TriangleAlert className="h-4 w-4" />
          <AlertTitle>Profile is Incomplete</AlertTitle>
          <AlertDescription>
            Please complete your profile to access all the features{" "}
            <Link href={"/dashboard/settings"} className="underline">
              in here
            </Link>
          </AlertDescription>
        </Alert>
      )}
      <CardSummaryBookingNannies />
      <CardGraphBookingNannies />
    </div>
  );
}
