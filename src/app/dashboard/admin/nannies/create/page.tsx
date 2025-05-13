import DashboardTitle from "@/components/atoms/typography/DashboardTitle";
import NanniesCreateContent from "@/components/organism/dashboard/admin/nannies/NanniesAdminCreateContent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Nannies",
};

export default function DashboardAdminNanniesCreatePage() {
  return (
    <>
      <DashboardTitle title="Tambah Nannies Baru" />
      <NanniesCreateContent />
    </>
  );
}
