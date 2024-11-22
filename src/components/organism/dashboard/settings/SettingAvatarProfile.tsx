import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { generateFallbackFromName } from "@/utils/misc";
import { Session } from "next-auth";

interface SettingAvatarContentProps {
  session: Session;
}

export default function SettingAvatarContent({
  session,
}: SettingAvatarContentProps) {
  return (
    <>
      <div className="flex w-full flex-col items-center justify-normal gap-3 md:w-1/4">
        <Avatar className="aspect-square h-full max-h-32 max-w-32 md:max-h-64 w-full md:max-w-64 border border-muted">
          <AvatarFallback className="text-3xl font-bold md:text-4xl lg:text-5xl">
            {generateFallbackFromName(session.user.name)}
          </AvatarFallback>
        </Avatar>
      </div>
    </>
  );
}
