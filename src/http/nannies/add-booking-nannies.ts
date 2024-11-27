import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";
import { useSession } from "next-auth/react";
import { Nannies } from "@/types/cub/cub";
import { BookingNanniesType } from "@/validators/nannies/booking-nannies-validator";

interface BookingNanniesResponse {
  data: Nannies;
}

export const addBookingNanniesHandler = async (
  body: BookingNanniesType,
  token: string
): Promise<BookingNanniesResponse> => {
  const { data } = await api.post("/nannies/booking", body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const useAddBookingNannies = (
  options?: UseMutationOptions<
    BookingNanniesResponse,
    AxiosError<any>,
    BookingNanniesType
  >
) => {
  const { data: sessionData } = useSession();
  return useMutation({
    mutationFn: (body: BookingNanniesType) =>
      addBookingNanniesHandler(body, sessionData?.access_token as string),
    ...options,
  });
};
