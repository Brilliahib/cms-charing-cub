"use client";

import { useGetProfileNannies } from "@/http/nannies/get-profile-nannies";
import { useSession } from "next-auth/react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { TriangleAlert } from "lucide-react";
import Link from "next/link";
import NanniesCreateProfile from "./NanniesCreateProfile";
import NanniesDashboardwrapper from "./NanniesDashboardWrapper";

export default function NanniesDashboard() {
  const { data: session, status } = useSession();
  const { data, isPending } = useGetProfileNannies(
    session?.access_token as string,
    { enabled: status === "authenticated" }
  );

  if (data?.data === null) return <NanniesCreateProfile />;
  if (data?.data) return <NanniesDashboardwrapper />;
}
