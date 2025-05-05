import { getServerSession } from "next-auth";
import SettingAvatarContent from "./SettingAvatarProfile";
import { authOptions } from "@/lib/auth";
import FormUpdateAccount from "@/components/molecules/form/FormUpdateAccount";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default async function SettingDashboardContent() {
  const session = await getServerSession(authOptions);
  return (
    <>
      <div className="mt-10 flex flex-col items-start gap-12 md:gap-24 md:flex-row">
        <SettingAvatarContent session={session!} />
        <Tabs defaultValue="account" className="w-full">
          <TabsList className="grid grid-cols-3 gap-4 md:gap-6 mb-4 md:mb-6 w-fit">
            <TabsTrigger value="account">Pengaturan Akun</TabsTrigger>
            <TabsTrigger value="daycares">Pengaturan Daycare</TabsTrigger>
            <TabsTrigger value="nannies">Pengaturan Nannies</TabsTrigger>
          </TabsList>
          <TabsContent value="account">
            <FormUpdateAccount session={session!} />
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}
