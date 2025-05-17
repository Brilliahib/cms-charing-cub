import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";
import { useSession } from "next-auth/react";
import { MonitoringChildrenType } from "@/validators/daycares/monitoring/monitoring-children-daycare";
import { MonitoringChildrenDaycare } from "@/types/daycares/monitoring/monitoring-children-daycare";

interface MonitoringChildrenResponse {
  data: MonitoringChildrenDaycare;
}

export const addMonitoringChildrenHandler = async (
  body: MonitoringChildrenType,
  token: string
): Promise<MonitoringChildrenResponse> => {
  const { data } = await api.post("/daycare/monitoring-children", body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const useAddMonitoringChildren = (
  options?: UseMutationOptions<
    MonitoringChildrenResponse,
    AxiosError<any>,
    MonitoringChildrenType
  >
) => {
  const { data: sessionData } = useSession();
  return useMutation({
    mutationFn: (body: MonitoringChildrenType) =>
      addMonitoringChildrenHandler(body, sessionData?.access_token as string),
    ...options,
  });
};
