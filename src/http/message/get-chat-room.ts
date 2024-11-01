import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { api } from "@/lib/axios";
import { ChatRoom } from "@/types/message/message";

interface GetChatRoomResponse {
  data: ChatRoom[];
}

export const getChatRoomHandler = async (
  token: string
): Promise<GetChatRoomResponse> => {
  const { data } = await api.get<GetChatRoomResponse>("/chat-room", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};

export const useGetChatRoom = (
  token: string,
  options?: Partial<UseQueryOptions<GetChatRoomResponse, AxiosError>>
) => {
  return useQuery({
    queryKey: ["chatroom-list"],
    queryFn: () => getChatRoomHandler(token),
    ...options,
  });
};
