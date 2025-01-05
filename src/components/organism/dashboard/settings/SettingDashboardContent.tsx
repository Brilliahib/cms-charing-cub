import { getServerSession } from "next-auth";
import SettingAvatarContent from "./SettingAvatarProfile";
import { authOptions } from "@/lib/auth";
import SettingUpdateProfile from "./SettingUpdateProfile";
import FormUpdateAccount from "@/components/molecules/form/FormUpdateAccount";

export default async function SettingDashboardContent() {
  const session = await getServerSession(authOptions);
  return (
    <>
      <div className="mt-10 flex flex-col items-start gap-12 md:gap-24 md:flex-row">
        <SettingAvatarContent session={session!} />
        <FormUpdateAccount session={session!} />
      </div>
    </>
  );
}
