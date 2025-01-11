import DashboardTitle from "@/components/atoms/typography/DashboardTitle";
import NanniesAdminContent from "@/components/organism/dashboard/admin/nannies/NanniesAdminContent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nannies",
};

export default function DashboardAdminNanniesPage() {
  return (
    <>
      <DashboardTitle title="Nannies" />
      <NanniesAdminContent />
    </>
  );
}
