import DashboardTitle from "@/components/atoms/typography/DashboardTitle";
import UserCreateAdminContent from "@/components/organism/dashboard/admin/users/UserCreateAdminContent";

export default function DashboardAdminCreateUserPage() {
  return (
    <>
      <DashboardTitle title="Create User" />
      <UserCreateAdminContent />
    </>
  );
}
