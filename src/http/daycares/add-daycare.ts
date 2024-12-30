import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";
import { useSession } from "next-auth/react";
import { DayCare } from "@/types/daycares/daycare";
import { DaycareType } from "@/validators/daycares/daycare-validator";

interface DaycareResponse {
  data: DayCare;
}

export const addDaycareHandler = async (
  body: DaycareType,
  token: string
): Promise<DaycareResponse> => {
  const formData = new FormData();

  formData.append("name", body.name);
  formData.append("opening_days", body.opening_days);
  formData.append("opening_hours", body.opening_hours);
  formData.append("closing_hours", body.closing_hours);
  formData.append("location", body.location);
  formData.append("address", body.address);
  formData.append("location_tracking", body.location_tracking);
  formData.append("bank_account", body.bank_account);
  formData.append("bank_account_name", body.bank_account_name);
  formData.append("bank_account_number", body.bank_account_number);

  if (body.price_half) {
    formData.append("price_half", body.price_half.toString());
  }

  if (body.price_full) {
    formData.append("price_full", body.price_full.toString());
  }

  if (body.description) {
    formData.append("description", body.description);
  }

  if (body.phone_number) {
    formData.append("phone_number", body.phone_number);
  }

  if (body.is_disability !== undefined) {
    formData.append("is_disability", body.is_disability ? "1" : "0");
  }

  if (body.images) {
    formData.append("images", body.images as File);
  }

  if (body.facility_images && body.facility_images.length > 0) {
    body.facility_images.forEach((image, index) => {
      if (image instanceof File) {
        formData.append(`facility_images[]`, image);
      }
    });
  }

  if (body.longitude) {
    formData.append("longitude", body.longitude.toString());
  }

  if (body.latitude) {
    formData.append("latitude", body.latitude.toString());
  }

  const { data } = await api.post("/daycares", formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });

  return data;
};

export const useAddDaycare = (
  options?: UseMutationOptions<DaycareResponse, AxiosError<any>, DaycareType>
) => {
  const { data: sessionData } = useSession();
  return useMutation({
    mutationFn: (body: DaycareType) =>
      addDaycareHandler(body, sessionData?.access_token as string),
    ...options,
  });
};
