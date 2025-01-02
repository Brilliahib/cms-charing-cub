import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";
import { useSession } from "next-auth/react";
import { DayCare } from "@/types/daycares/daycare";
import { UploadPaymentProofDaycareType } from "@/validators/daycares/upload-payment-proof-validator";

interface UploadPaymentProofDaycareParams {
  id: number;
  token: string;
}

interface UploadPaymentProofDaycareResponse {
  data: DayCare;
}

export const addUploadPaymentProofDaycareHandler = async (
  params: UploadPaymentProofDaycareParams,
  body: UploadPaymentProofDaycareType
): Promise<UploadPaymentProofDaycareResponse> => {
  const { id, token } = params;

  const formData = new FormData();

  if (body.payment_proof) {
    formData.append("payment_proof", body.payment_proof);
  }

  const { data } = await api.post(`/daycares/booking/${id}/payment`, body, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
  return data;
};

export const useAddUploadPaymentProofDaycare = (
  options?: UseMutationOptions<
    UploadPaymentProofDaycareResponse,
    AxiosError<any>,
    {
      params: UploadPaymentProofDaycareParams;
      body: UploadPaymentProofDaycareType;
    }
  >
) => {
  const { data: sessionData } = useSession();

  return useMutation({
    mutationFn: async ({
      params,
      body,
    }: {
      params: UploadPaymentProofDaycareParams;
      body: UploadPaymentProofDaycareType;
    }) =>
      addUploadPaymentProofDaycareHandler(
        { ...params, token: sessionData?.access_token as string },
        body
      ),
    ...options,
  });
};
