import DashboardTitle from "@/components/atoms/typography/DashboardTitle";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard Admin",
};

export default function DashboardAdminPage() {
  return (
    <>
      <DashboardTitle title="Dashboard Admin" />
    </>
  );
}
