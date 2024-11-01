import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { api } from "@/lib/axios";
import { Message } from "@/types/message/message";

interface ChatMessageParams {
  id: number;
}

interface GetMessagesResponse {
  data: Message[];
}

export const getMessagesHandler = async (
  token: string,
  { id }: ChatMessageParams
): Promise<GetMessagesResponse> => {
  const { data } = await api.get<GetMessagesResponse>(
    `/chat-room/${id}/messages`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return data;
};

export const useGetMessages = (
  token: string,
  { id }: ChatMessageParams,
  options?: Partial<UseQueryOptions<GetMessagesResponse, AxiosError>>
) => {
  return useQuery({
    queryKey: ["message-list", id],
    queryFn: () => getMessagesHandler(token, { id }),
    ...options,
  });
};
