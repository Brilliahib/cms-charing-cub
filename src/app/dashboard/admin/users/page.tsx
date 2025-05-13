import DashboardTitle from "@/components/atoms/typography/DashboardTitle";
import UsersAdminContent from "@/components/organism/dashboard/admin/users/UsersAdminContent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pengguna",
};

export default function DashboardAdminUsersPage() {
  return (
    <>
      <DashboardTitle
        title="Pengguna"
        body="Menampilkan daftar pengguna yang tersedia"
      />
      <UsersAdminContent />
    </>
  );
}
