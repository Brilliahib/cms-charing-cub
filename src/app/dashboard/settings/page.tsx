import DashboardTitle from "@/components/atoms/typography/DashboardTitle";
import SettingDashboardContent from "@/components/organism/dashboard/settings/SettingDashboardContent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Settings",
};

export default function DashboardSettingPage() {
  return (
    <>
      <DashboardTitle title="Pengaturan Akun" />
      <SettingDashboardContent />
    </>
  );
}
