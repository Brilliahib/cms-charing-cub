import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";
import { useSession } from "next-auth/react";
import { Nannies } from "@/types/cub/cub";
import { NanniesType } from "@/validators/nannies/nannies-validator";

interface NanniesResponse {
  data: Nannies;
}

export const addNanniesHandler = async (
  body: NanniesType,
  token: string
): Promise<NanniesResponse> => {
  const formData = new FormData();

  if (body.daycare_id) {
    formData.append("daycare_id", body.daycare_id.toString());
  }

  if (body.age) {
    formData.append("age", body.age.toString());
  }

  formData.append("gender", body.gender);
  formData.append("contact", body.contact);
  formData.append("experience_description", body.experience_description);
  body.price_lists.forEach((priceList, index) => {
    formData.append(`price_lists[${index}][age_start]`, priceList.age_start);
    formData.append(`price_lists[${index}][age_end]`, priceList.age_end);
    formData.append(`price_lists[${index}][price]`, priceList.price.toString());
    formData.append(`price_lists[${index}][name]`, priceList.name);
  });

  if (body.images) {
    formData.append("images", body.images as File);
  }

  const { data } = await api.post("/nannies", formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });

  return data;
};

export const useAddNannies = (
  options?: UseMutationOptions<NanniesResponse, AxiosError<any>, NanniesType>
) => {
  const { data: sessionData } = useSession();
  return useMutation({
    mutationFn: (body: NanniesType) =>
      addNanniesHandler(body, sessionData?.access_token as string),
    ...options,
  });
};
