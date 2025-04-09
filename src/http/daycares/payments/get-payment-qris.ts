import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { api } from "@/lib/axios";
import { PaymentWithQRIS } from "@/types/daycares/payment/payment";

interface GetPaymentBookingDaycareQRISParams {
  id: string;
  token: string;
}

interface GetPaymentBookingDaycareQRISResponse {
  qr_code_string: string;
  data: PaymentWithQRIS;
}

export const GetPaymentBookingDaycareQRISHandler = async ({
  id,
  token,
}: GetPaymentBookingDaycareQRISParams): Promise<GetPaymentBookingDaycareQRISResponse> => {
  const { data } = await api.get<GetPaymentBookingDaycareQRISResponse>(
    `/daycare/payment/qris/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return data;
};

export const useGetPaymentBookingDaycareQRIS = (
  { id, token }: GetPaymentBookingDaycareQRISParams,
  options?: Partial<
    UseQueryOptions<GetPaymentBookingDaycareQRISResponse, AxiosError>
  >
) => {
  return useQuery({
    queryKey: ["payment-qris"],
    queryFn: () => GetPaymentBookingDaycareQRISHandler({ id, token }),
    ...options,
  });
};
