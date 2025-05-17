import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";
import { useSession } from "next-auth/react";
import { DayCare } from "@/types/daycares/daycare";
import { MonitoringChatDaycareType } from "@/validators/daycares/monitoring/monitoring-chat-daycare";

interface ChatMonitoringDaycareResponse {
  data: DayCare;
}

export const addChatMonitoringDaycareHandler = async (
  body: MonitoringChatDaycareType,
  token: string
): Promise<ChatMonitoringDaycareResponse> => {
  const formData = new FormData();

  formData.append("monitoring_children_id", body.monitoring_children_id);
  formData.append("message", body.message);
  formData.append("user_id", body.user_id);
  if (body.image) {
    formData.append("image", body.image as File);
  }

  const { data } = await api.post("/monitoring-chats", formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
  return data;
};

export const useAddChatMonitoringDaycare = (
  options?: UseMutationOptions<
    ChatMonitoringDaycareResponse,
    AxiosError<any>,
    MonitoringChatDaycareType
  >
) => {
  const { data: sessionData } = useSession();
  return useMutation({
    mutationFn: (body: MonitoringChatDaycareType) =>
      addChatMonitoringDaycareHandler(
        body,
        sessionData?.access_token as string
      ),
    ...options,
  });
};
