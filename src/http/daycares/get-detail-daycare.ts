import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { api } from "@/lib/axios";
import { DayCareDetail } from "@/types/daycares/daycare";

interface GetDetailDaycareParams {
  id: number;
}

interface GetDetailDaycareResponse {
  data: DayCareDetail;
}

export const getDetailDaycareHandler = async ({
  id,
}: GetDetailDaycareParams): Promise<GetDetailDaycareResponse> => {
  const { data } = await api.get<GetDetailDaycareResponse>(`/daycares/${id}`);

  return data;
};

export const useGetDetailDaycare = (
  { id }: GetDetailDaycareParams,
  options?: Partial<UseQueryOptions<GetDetailDaycareResponse, AxiosError>>
) => {
  return useQuery({
    queryKey: ["daycare-list"],
    queryFn: () => getDetailDaycareHandler({ id }),
    ...options,
  });
};
