import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useAddChatMonitoringDaycare } from "@/http/daycares/monitoring/create-chat-monitoring-children";
import {
  monitoringChatDaycareSchema,
  MonitoringChatDaycareType,
} from "@/validators/daycares/monitoring/monitoring-chat-daycare";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { ArrowUp, FileImage, Paperclip, X } from "lucide-react";
import { Session } from "next-auth";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface ChatMonitoringChatDaycareProps {
  id: string;
  session: Session;
}

export default function ChatMonitoringChatDaycare({
  id,
  session,
}: ChatMonitoringChatDaycareProps) {
  const form = useForm<MonitoringChatDaycareType>({
    resolver: zodResolver(monitoringChatDaycareSchema),
    defaultValues: {
      monitoring_children_id: id,
      user_id: session.user.id,
      image: undefined,
      message: "",
    },
    mode: "onChange",
  });

  const [fileName, setFileName] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFileName(file.name);
      form.setValue("image", file);
    }
  };

  const handleClickPaperclip = () => {
    fileInputRef.current?.click();
  };
  const queryClient = useQueryClient();

  const { mutate: addHDHandler, isPending } = useAddChatMonitoringDaycare({
    onError: () => {
      toast.error("Gagal mengirim pesan baru!");
    },
    onSuccess: () => {
      toast.success("Berhasil mengirim pesan baru!");
      queryClient.invalidateQueries({
        queryKey: ["chat-monitoring-children"],
      });
      form.reset();
      setFileName(null);
    },
  });

  const onSubmit = (body: MonitoringChatDaycareType) => {
    const payload = {
      ...body,
    };

    addHDHandler(payload);
  };
  return (
    <div className="w-full">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-y-2 rounded-xl border p-4"
        >
          {fileName && (
            <div className="bg-primary/10 flex items-center justify-between gap-x-2 rounded-md border p-2 text-sm text-gray-600">
              <div className="flex items-center gap-x-2">
                <FileImage className="h-5 w-5" />
                {fileName}
              </div>
              <button
                type="button"
                onClick={() => {
                  setFileName(null);
                  form.setValue("image", undefined);
                }}
              >
                <X className="text-muted-foreground h-4 w-4 cursor-pointer" />
              </button>
            </div>
          )}

          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem className="flex-grow">
                <FormControl>
                  <Textarea
                    placeholder="Tulis pesan disini..."
                    className="resize-none border-0 p-0 shadow-none text-sm leading-tight h-8"
                    rows={1}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex items-end justify-between">
            <div className="flex w-full items-center justify-end gap-x-2">
              <button type="button" onClick={handleClickPaperclip}>
                <Paperclip className="text-muted-foreground h-6 w-6 cursor-pointer" />
              </button>

              <Button
                type="submit"
                disabled={isPending}
                className="rounded-full"
                size={"icon"}
              >
                <ArrowUp className="h-8 w-8" />
              </Button>
            </div>
          </div>

          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
          />
        </form>
      </Form>
    </div>
  );
}
