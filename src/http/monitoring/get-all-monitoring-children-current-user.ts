import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";
import { MonitoringChildrenDaycare } from "@/types/daycares/monitoring/monitoring-children-daycare";

interface GetAllMonitoringChildrenCurrentUserResponse {
  data: MonitoringChildrenDaycare[];
}

export const GetAllMonitoringChildrenCurrentUserHandler = async (
  token: string
): Promise<GetAllMonitoringChildrenCurrentUserResponse> => {
  const { data } = await api.get<GetAllMonitoringChildrenCurrentUserResponse>(
    "/monitoring-children/me",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return data;
};

export const useGetAllMonitoringChildrenCurrentUser = (
  token: string,
  options?: Partial<
    UseQueryOptions<GetAllMonitoringChildrenCurrentUserResponse, AxiosError>
  >
) => {
  return useQuery({
    queryKey: ["my-daycare"],
    queryFn: () => GetAllMonitoringChildrenCurrentUserHandler(token),
    ...options,
  });
};
