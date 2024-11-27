import DashboardTitle from "@/components/atoms/typography/DashboardTitle";
import UserDetailUserAdminContent from "@/components/organism/dashboard/admin/users/UserDetailAdminContent";

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
