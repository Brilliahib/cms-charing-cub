import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";
import { MonitoringChildrenDaycare } from "@/types/daycares/monitoring/monitoring-children-daycare";

interface GetAllMonitoringByDaycareResponse {
  data: MonitoringChildrenDaycare[];
}

export const GetAllMonitoringByDaycareHandler = async (
  id: string,
  token: string
): Promise<GetAllMonitoringByDaycareResponse> => {
  const { data } = await api.get<GetAllMonitoringByDaycareResponse>(
    `/monitoring-children/by-daycare/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return data;
};

export const useGetAllMonitoringByDaycare = (
  id: string,
  token: string,
  options?: Partial<
    UseQueryOptions<GetAllMonitoringByDaycareResponse, AxiosError>
  >
) => {
  return useQuery({
    queryKey: ["monitoring-children-by-daycare", id],
    queryFn: () => GetAllMonitoringByDaycareHandler(id, token),
    ...options,
  });
};
