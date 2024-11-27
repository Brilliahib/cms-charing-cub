import DashboardTitle from "@/components/atoms/typography/DashboardTitle";
import UsersAdminContent from "@/components/organism/dashboard/admin/users/UsersAdminContent";

export default function DashboardAdminUsersPage() {
  return (
    <>
      <DashboardTitle title="Users" />
      <UsersAdminContent />
    </>
  );
}
