import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";
import { Pagination } from "@/types/pagination/pagination";
import { DayCare } from "@/types/daycares/daycare";

interface GetAllMonitoringDaycareBookingResponse {
  data: DayCare[];
  pagination: Pagination;
}

export const GetAllMonitoringDaycareBookingHandler = async (
  token: string
): Promise<GetAllMonitoringDaycareBookingResponse> => {
  const { data } = await api.get<GetAllMonitoringDaycareBookingResponse>(
    "/monitoring/daycares",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return data;
};

export const useGetAllMonitoringDaycareBooking = (
  token: string,
  options?: Partial<
    UseQueryOptions<GetAllMonitoringDaycareBookingResponse, AxiosError>
  >
) => {
  return useQuery({
    queryKey: ["booking-daycares-list"],
    queryFn: () => GetAllMonitoringDaycareBookingHandler(token),
    ...options,
  });
};
