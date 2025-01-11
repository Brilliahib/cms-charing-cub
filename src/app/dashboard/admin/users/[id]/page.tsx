import DashboardTitle from "@/components/atoms/typography/DashboardTitle";
import UserDetailUserAdminContent from "@/components/organism/dashboard/admin/users/UserDetailAdminContent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Detail User",
};

interface DashboardAdminDetailUserParams {
  params: { id: number };
}

export default function DashboardAdminDetailUserPage({
  params,
}: DashboardAdminDetailUserParams) {
  return (
    <>
      <DashboardTitle title="User Detail" />
      <UserDetailUserAdminContent id={params.id} />
    </>
  );
}
