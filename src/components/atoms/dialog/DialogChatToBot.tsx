import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useMutation } from "@tanstack/react-query";
import { SendHorizonal } from "lucide-react";
import { useEffect, useState } from "react";

interface DialogChatToBotProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export default function DialogChatToBot({
  open,
  setOpen,
}: DialogChatToBotProps) {
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<
    {
      text: string;
      sender: "user" | "bot";
    }[]
  >([]);

  const { mutate, isPending, error } = useMutation({
    mutationFn: async (message: string) => {
      const res = await fetch("/api/bot", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      return data.data;
    },
    onSuccess: (data) => {
      setMessages((prevMessages) => {
        const lastMessage = prevMessages[prevMessages.length - 1];
        if (
          lastMessage &&
          lastMessage.sender === "user" &&
          lastMessage.text === message
        ) {
          return [...prevMessages, { text: data, sender: "bot" }];
        }
        return prevMessages;
      });
      setMessage("");
    },
    onError: (error: any) => {
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: "Error: " + error.message, sender: "bot" },
      ]);
    },
  });

  const handleSend = () => {
    if (message.trim()) {
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: message, sender: "user" },
      ]);
      mutate(message);
    }
  };

  useEffect(() => {
    setMessages([
      {
        text: "👋 Hai Parents! Aku Biwi, asisten virtual CharingCub 😊. Aku siap membantu menjawab pertanyaan seputar layanan daycare dan nanny. Silakan tanyakan apa saja ya! ✨",
        sender: "bot",
      },
    ]);
  }, []);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Tanya Biwi🧸</DialogTitle>
          <DialogDescription>
            Biwi akan menjawab semua pertanyaan Anda
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-[60vh] md:h-[70vh]">
          <div>
            <div className="mb-4">
              <div className="space-y-4">
                {messages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`flex ${
                      msg.sender === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-xs rounded-xl px-4 py-3 text-sm space-y-4 ${
                        msg.sender === "user"
                          ? "bg-zinc-100 dark:bg-zinc-900"
                          : "bg-gray-200 text-black"
                      }`}
                    >
                      {msg.text.split("\n").map((line, i) => (
                        <p key={i}>
                          {line
                            .split(/(\*.*?\*)/g)
                            .map((part, index) =>
                              part.startsWith("*") && part.endsWith("*") ? (
                                <strong key={index}>{part.slice(1, -1)}</strong>
                              ) : (
                                part
                              )
                            )}
                        </p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </ScrollArea>

        <DialogFooter>
          <div className="flex w-full gap-2">
            <Input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message..."
              className="w-full rounded-md border"
            />
            <Button
              onClick={handleSend}
              disabled={isPending}
              size={"sm"}
              className="h-full"
            >
              <SendHorizonal className="h-8 w-8" />
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
