import DashboardTitle from "@/components/atoms/typography/DashboardTitle";
import UserCreateAdminContent from "@/components/organism/dashboard/admin/users/UserCreateAdminContent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create User",
};

export default function DashboardAdminCreateUserPage() {
  return (
    <>
      <DashboardTitle title="Create User" />
      <UserCreateAdminContent />
    </>
  );
}
