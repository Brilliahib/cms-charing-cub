import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";
import { useSession } from "next-auth/react";
import { BookingNannies } from "@/types/booking/booking";

interface BookingResponse {
  data: BookingNannies;
}

export const approveBookingNanniesHandler = async (
  id: string,
  token: string
): Promise<BookingResponse> => {
  const { data } = await api.post(
    `/nannies/booking/${id}/approve`,
    { is_approved: true },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return data;
};

export const useApproveBookingNannies = (
  options?: UseMutationOptions<BookingResponse, AxiosError<any>, string>
) => {
  const { data: sessionData } = useSession();
  return useMutation({
    mutationFn: (id: string) =>
      approveBookingNanniesHandler(id, sessionData?.access_token as string),
    ...options,
  });
};
