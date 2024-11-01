"use client";

import SearchInput from "@/components/atoms/search/SearchInput";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useGetChatRoom } from "@/http/message/get-chat-room";
import { useGetMessages } from "@/http/message/get-message-chat";
import { generateFallbackFromName } from "@/utils/misc";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { MessageCircleMore, Plus, SendHorizonal } from "lucide-react";
import { useSession } from "next-auth/react";
import { useState } from "react";

export default function MessageDashboardContent() {
  const { data: session, status } = useSession();
  const { data, isPending } = useGetChatRoom(session?.access_token as string, {
    enabled: status === "authenticated",
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedChatRoomId, setSelectedChatRoomId] = useState<number | null>(
    null
  );
  const [messageText, setMessageText] = useState("");

  const handleSelectChatRoom = (id: number) => {
    setSelectedChatRoomId(id);
  };

  const { data: message } = useGetMessages(
    session?.access_token as string,
    { id: selectedChatRoomId || 0 },
    {
      enabled: status === "authenticated" && selectedChatRoomId !== null,
    }
  );

  const filteredData =
    data?.data.filter((chatroom) =>
      chatroom.opponent.name.toLowerCase().includes(searchQuery.toLowerCase())
    ) || [];

  const selectedChatRoom = filteredData.find(
    (chatroom) => chatroom.id === selectedChatRoomId
  );

  const handleSendMessage = () => {
    if (!messageText.trim()) return;
    // Send message to the API
    // Reset input field
    setMessageText("");
  };

  return (
    <>
      <div className="py-4 space-y-8">
        <div className="border rounded-xl xl:flex md:flex min-h-[85vh]">
          <div className="md:flex xl:flex hidden border-r w-fit max-w-xl">
            <div className="p-3">
              <div className="p-3">
                <h1 className="font-bold text-xl">Messages</h1>
              </div>
              <div className="p-3 flex justify-between items-center">
                <SearchInput onSearch={setSearchQuery} />
                <Button variant={"outline"} className="p-3">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="space-y-2">
                {filteredData.map((roomchat) => (
                  <div
                    key={roomchat.id}
                    className="hover:bg-secondary p-3 flex justify-between cursor-pointer"
                    onClick={() => handleSelectChatRoom(roomchat.id)}
                  >
                    <div className="flex gap-3 items-center">
                      <Avatar className="border border-muted">
                        <AvatarFallback className="text-gray-700">
                          {generateFallbackFromName(roomchat.opponent.name)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="space-y-1">
                        <h1 className="font-medium text-sm">
                          {roomchat.opponent.name}
                        </h1>
                        <p className="text-muted-foreground text-sm line-clamp-1 max-w-sm">
                          {roomchat.last_chat}
                        </p>
                      </div>
                    </div>
                    <div>
                      <p className="text-muted-foreground text-sm">
                        {format(
                          new Date(roomchat.last_chat_created_at),
                          "HH:mm",
                          {
                            locale: id,
                          }
                        )}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="flex-1 overflow-hidden flex flex-col">
            {selectedChatRoom && (
              <div className="bg-white p-4 border-b flex items-center gap-3">
                <h1 className="font-medium text-sm">
                  {selectedChatRoom.opponent.name}
                </h1>
              </div>
            )}
            {message?.data ? (
              <div className="flex-1 p-4 bg-secondary overflow-auto">
                <div className="space-y-4">
                  {message.data.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex items-start gap-2 ${
                        msg.user_id === session?.user.id
                          ? "justify-end"
                          : "justify-start"
                      }`}
                    >
                      {msg.user_id !== session?.user.id && (
                        <Avatar className="border border-muted">
                          <AvatarFallback className="text-gray-700 bg-white">
                            {generateFallbackFromName(msg.user.name)}
                          </AvatarFallback>
                        </Avatar>
                      )}

                      <div
                        className={`p-3 rounded-lg max-w-xs bg-white border`}
                      >
                        <p className="text-sm">{msg.message}</p>
                        <span className={`text-xs text-muted-foreground`}>
                          {format(new Date(msg.created_at), "HH:mm", {
                            locale: id,
                          })}
                        </span>
                      </div>
                      {msg.user_id === session?.user.id && (
                        <Avatar className="border border-muted">
                          <AvatarFallback className="text-gray-700 bg-white">
                            {generateFallbackFromName(msg.user.name)}
                          </AvatarFallback>
                        </Avatar>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center flex-1">
                <div className="flex flex-col items-center justify-center text-center space-y-4">
                  <MessageCircleMore className="h-24 w-24 text-muted-foreground" />
                  <p className="text-muted-foreground">
                    Select the chat to see messages
                  </p>
                </div>
              </div>
            )}
            <div className="p-4 border-t flex items-center space-x-3 bg-white">
              <Input
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                placeholder="Enter a message"
                className="flex-1"
              />
              <Button
                onClick={handleSendMessage}
                disabled={!messageText.trim()}
                className="font-medium"
              >
                Send <SendHorizonal />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
