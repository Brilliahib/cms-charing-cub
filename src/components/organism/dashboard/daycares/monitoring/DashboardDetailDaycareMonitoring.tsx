"use client";

import ChatMonitoringChatDaycare from "@/components/molecules/chat/ChatMonitoringChatDaycare";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useGetAllMonitoringChat } from "@/http/daycares/monitoring/get-all-chat-monitoring-children";
import { baseUrl } from "@/utils/app";
import { buildFromAppURL, generateFallbackFromName } from "@/utils/misc";
import { format, isSameDay } from "date-fns";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { id as IdLocale } from "date-fns/locale";
import { useEffect, useRef } from "react";

interface DashboardDetailDaycareMonitoringProps {
  id: string;
}

export default function DashboardDetailDaycareMonitoringWrapper({
  id,
}: DashboardDetailDaycareMonitoringProps) {
  const { data: session, status } = useSession();

  const { data } = useGetAllMonitoringChat(
    id,
    session?.access_token as string,
    {
      enabled: status === "authenticated",
    }
  );

  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [data]);

  if (status !== "authenticated" || !session) {
    return <div>Loading...</div>;
  }

  let lastDate: Date | null = null;

  return (
    <div className="flex flex-col h-[85vh] space-y-4">
      {/* Chat messages */}
      <ScrollArea className="flex-1 pr-4">
        <div className="space-y-6">
          {data?.data.map((chat) => {
            const isOwnMessage = chat.user.id === session.user.id;
            const chatDate = chat.created_at;

            const showDate = !lastDate || !isSameDay(chatDate, lastDate);

            lastDate = chatDate;

            return (
              <div key={chat.id} className="space-y-2">
                {showDate && (
                  <div className="flex justify-center py-2">
                    <span className="text-xs bg-muted px-3 py-1 rounded-md text-muted-foreground">
                      {(() => {
                        const today = new Date();
                        const yesterday = new Date();
                        yesterday.setDate(today.getDate() - 1);

                        if (isSameDay(chatDate, today)) {
                          return "Hari ini";
                        } else if (isSameDay(chatDate, yesterday)) {
                          return "Kemarin";
                        } else {
                          return format(chatDate, "EEEE, dd MMMM yyyy", {
                            locale: IdLocale,
                          });
                        }
                      })()}
                    </span>
                  </div>
                )}

                <div
                  className={`flex ${
                    isOwnMessage ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`flex gap-4 items-start ${
                      isOwnMessage ? "flex-row-reverse" : "flex-row"
                    }`}
                  >
                    <Avatar className="border border-muted flex-shrink-0">
                      <AvatarImage src={buildFromAppURL(chat.user.profile)} />
                      <AvatarFallback className="text-gray-700">
                        {generateFallbackFromName(chat.user.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col gap-2">
                      <div
                        className={`w-full md:max-w-xl py-5 px-6 rounded-3xl space-y-2 ${
                          isOwnMessage
                            ? "bg-primary/10 text-black"
                            : "bg-secondary"
                        }`}
                      >
                        {!isOwnMessage && (
                          <h1 className="font-medium">{chat.user.name}</h1>
                        )}
                        {chat.image && (
                          <Image
                            src={`${baseUrl}/${chat.image}`}
                            alt={`Pesan dari ${chat.user.name}`}
                            width={1000}
                            height={1000}
                            className="md:h-[350px] h-[150px] w-full object-cover rounded-xl"
                          />
                        )}
                        <p>{chat.message}</p>
                      </div>
                      <p
                        suppressHydrationWarning
                        className={`${
                          isOwnMessage ? "text-right" : "text-left"
                        } md:line-clamp-2 line-clamp-1 text-muted-foreground text-sm`}
                      >
                        {format(chat.created_at, "HH:mm", {
                          locale: IdLocale,
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
          <div ref={bottomRef} />
        </div>
      </ScrollArea>

      {/* Input Chat Box */}
      <div>
        <ChatMonitoringChatDaycare id={id} session={session} />
      </div>
    </div>
  );
}
