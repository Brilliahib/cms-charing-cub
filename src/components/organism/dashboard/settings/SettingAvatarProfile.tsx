"use client";

import DialogUpdatePhotoProfile from "@/components/atoms/dialog/DialogUpdatePhotoProfile";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { buildFromAppURL, generateFallbackFromName } from "@/utils/misc";
import { Session } from "next-auth";
import { useState } from "react";

interface SettingAvatarContentProps {
  session: Session;
}

export default function SettingAvatarContent({
  session,
}: SettingAvatarContentProps) {
  const [dialogUpdateAvatarOpen, setDialogUpdateAvatarOpen] = useState(false);

  const handleButtonClick = () => {
    setDialogUpdateAvatarOpen(true);
  };
  return (
    <>
      <div className="flex w-full flex-col items-center justify-normal gap-3 md:w-1/4">
        <Avatar className="aspect-square h-full max-h-32 max-w-32 md:max-h-64 w-full md:max-w-64 border border-muted">
          <AvatarImage src={buildFromAppURL(session.user.profile)} />
          <AvatarFallback className="text-3xl font-bold md:text-4xl lg:text-5xl">
            {generateFallbackFromName(session.user.name)}
          </AvatarFallback>
        </Avatar>
        <Button variant={"outline"} onClick={handleButtonClick}>
          Ganti Foto
        </Button>
      </div>
      <DialogUpdatePhotoProfile
        open={dialogUpdateAvatarOpen}
        setOpen={setDialogUpdateAvatarOpen}
      />
    </>
  );
}
