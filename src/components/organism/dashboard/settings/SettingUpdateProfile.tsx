import FormUpdateAccount from "@/components/molecules/form/FormUpdateAccount";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

export default async function SettingUpdateProfile() {
  const session = await getServerSession(authOptions);
  return (
    <>
      <div className="w-full">
        <FormUpdateAccount session={session!} />
      </div>
    </>
  );
}
