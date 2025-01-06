import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";
import { useSession } from "next-auth/react";
import { BookingDaycare } from "@/types/booking/booking";

interface PaymentDaycareResponse {
  data: BookingDaycare;
}

export const approvePaymentDaycareHandler = async (
  id: string,
  token: string
): Promise<PaymentDaycareResponse> => {
  const { data } = await api.post(`/daycares/booking/${id}/paid`, null, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};

export const useApprovePaymentDaycare = (
  options?: UseMutationOptions<PaymentDaycareResponse, AxiosError<any>, string>
) => {
  const { data: sessionData } = useSession();
  return useMutation({
    mutationFn: (id: string) =>
      approvePaymentDaycareHandler(id, sessionData?.access_token as string),
    ...options,
  });
};
