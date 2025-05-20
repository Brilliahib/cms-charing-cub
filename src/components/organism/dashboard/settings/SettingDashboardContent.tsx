import { getServerSession } from "next-auth";
import SettingAvatarContent from "./SettingAvatarProfile";
import { authOptions } from "@/lib/auth";
import FormUpdateAccount from "@/components/molecules/form/FormUpdateAccount";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import clsx from "clsx";
import FormUpdateDaycare from "@/components/molecules/form/FormUpdateDaycare";
import FormUpdateNannies from "@/components/molecules/form/FormUpdateNannies";

export default async function SettingDashboardContent() {
  const session = await getServerSession(authOptions);
  const role = session?.user.role;

  const tabCount =
    1 + (role === "daycare" ? 1 : 0) + (role === "nannies" ? 1 : 0);
  const gridColsClass = `grid-cols-${tabCount}`;
  return (
    <>
      <div className="mt-10 flex flex-col items-start gap-12 md:gap-24 md:flex-row">
        <SettingAvatarContent session={session!} />
        <Tabs defaultValue="account" className="w-full">
          <TabsList
            className={clsx(
              "grid gap-4 md:gap-6 mb-4 md:mb-6 w-fit",
              gridColsClass
            )}
          >
            <TabsTrigger value="account">Pengaturan Akun</TabsTrigger>
            {role === "daycare" && (
              <TabsTrigger value="daycares">Pengaturan Daycare</TabsTrigger>
            )}
            {role === "nannies" && (
              <TabsTrigger value="nannies">Pengaturan Nannies</TabsTrigger>
            )}
          </TabsList>

          <TabsContent value="account">
            <FormUpdateAccount session={session!} />
          </TabsContent>

          {role === "daycare" && (
            <TabsContent value="daycares">
              <FormUpdateDaycare session={session!} />
            </TabsContent>
          )}

          {role === "nannies" && (
            <TabsContent value="nannies">
              <FormUpdateNannies session={session!} />
            </TabsContent>
          )}
        </Tabs>
      </div>
    </>
  );
}
