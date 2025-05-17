import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";
import { MonitoringChatDaycare } from "@/types/daycares/monitoring/monitoring-chat-daycare";

interface GetAllMonitoringChatResponse {
  data: MonitoringChatDaycare[];
}

export const GetAllMonitoringChatHandler = async (
  id: string,
  token: string
): Promise<GetAllMonitoringChatResponse> => {
  const { data } = await api.get<GetAllMonitoringChatResponse>(
    `/monitoring-chats/children/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return data;
};

export const useGetAllMonitoringChat = (
  id: string,
  token: string,
  options?: Partial<UseQueryOptions<GetAllMonitoringChatResponse, AxiosError>>
) => {
  return useQuery({
    queryKey: ["chat-monitoring-children", id],
    queryFn: () => GetAllMonitoringChatHandler(id, token),
    ...options,
  });
};
