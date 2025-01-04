import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { api } from "@/lib/axios";
import { Nannies } from "@/types/cub/cub";

interface GetDetailNanniesParams {
  id: string;
}

interface GetDetailNanniesResponse {
  data: Nannies;
}

export const getDetailNanniesHandler = async ({
  id,
}: GetDetailNanniesParams): Promise<GetDetailNanniesResponse> => {
  const { data } = await api.get<GetDetailNanniesResponse>(`/nannies/${id}`);

  return data;
};

export const useGetDetailNannies = (
  { id }: GetDetailNanniesParams,
  options?: Partial<UseQueryOptions<GetDetailNanniesResponse, AxiosError>>
) => {
  return useQuery({
    queryKey: ["nannies-detail"],
    queryFn: () => getDetailNanniesHandler({ id }),
    ...options,
  });
};
