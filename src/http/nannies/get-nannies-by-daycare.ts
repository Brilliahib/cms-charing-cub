import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";
import { Nannies } from "@/types/cub/cub";

interface GetNanniesByDaycareResponse {
  data: Nannies[];
}

export const GetNanniesByDaycareHandler = async (
  id: string
): Promise<GetNanniesByDaycareResponse> => {
  const { data } = await api.get<GetNanniesByDaycareResponse>(
    `/nannies/daycare/${id}`
  );

  return data;
};

export const useGetNanniesByDaycare = (
  id: string,
  options?: Partial<UseQueryOptions<GetNanniesByDaycareResponse, AxiosError>>
) => {
  return useQuery({
    queryKey: ["nannies-by-daycare", id],
    queryFn: () => GetNanniesByDaycareHandler(id),
    ...options,
  });
};
