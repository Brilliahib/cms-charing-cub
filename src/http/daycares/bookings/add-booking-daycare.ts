import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";
import { useSession } from "next-auth/react";
import { DayCare } from "@/types/daycares/daycare";
import { GiveRateDaycareType } from "@/validators/daycares/give-rate-daycare-validator";
import { BookingDaycareType } from "@/validators/daycares/booking-daycare-validator";

interface BookingDaycareResponse {
  data: DayCare;
}

export const addBookingDaycareHandler = async (
  body: BookingDaycareType,
  token: string
): Promise<BookingDaycareResponse> => {
  const { data } = await api.post("/daycares/booking", body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const useAddBookingDaycare = (
  options?: UseMutationOptions<
    BookingDaycareResponse,
    AxiosError<any>,
    BookingDaycareType
  >
) => {
  const { data: sessionData } = useSession();
  return useMutation({
    mutationFn: (body: BookingDaycareType) =>
      addBookingDaycareHandler(body, sessionData?.access_token as string),
    ...options,
  });
};
