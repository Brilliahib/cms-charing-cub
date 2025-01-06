import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";
import { useSession } from "next-auth/react";
import { BookingDaycare } from "@/types/booking/booking";

interface BookingDaycareResponse {
  data: BookingDaycare;
}

export const approveBookingDaycareHandler = async (
  id: string,
  token: string
): Promise<BookingDaycareResponse> => {
  const { data } = await api.post(`/daycares/booking/${id}/approve`, null, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};

export const useApproveBookingDaycare = (
  options?: UseMutationOptions<BookingDaycareResponse, AxiosError<any>, string>
) => {
  const { data: sessionData } = useSession();
  return useMutation({
    mutationFn: (id: string) =>
      approveBookingDaycareHandler(id, sessionData?.access_token as string),
    ...options,
  });
};
