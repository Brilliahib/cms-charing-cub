"use client";

import { useState } from "react";
import DialogChatToBot from "../dialog/DialogChatToBot";
import { MessageSquareText } from "lucide-react";

export default function ButtonBot() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleDialogOpen = () => {
    setIsDialogOpen(true);
  };
  return (
    <>
      <div
        className="fixed bottom-5 right-5 z-50 flex items-center gap-4 cursor-pointer"
        onClick={handleDialogOpen}
      >
        <div className="rounded-full border bg-white px-6 py-2">
          <h1 className="text-sm font-semibold">Butuh bantuan?</h1>
        </div>

        <div className="relative flex items-center justify-center rounded-full bg-primary p-4 text-white shadow-lg ">
          <div className="scale-1 absolute inset-0 animate-ping rounded-full bg-primary opacity-20"></div>
          <MessageSquareText />
        </div>
      </div>
      <DialogChatToBot open={isDialogOpen} setOpen={setIsDialogOpen} />
    </>
  );
}
