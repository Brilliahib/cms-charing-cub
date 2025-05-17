import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";
import { Auth } from "@/types/auth/auth";

interface GetAllPaidBookingMonitoringDaycaresResponse {
  data: Auth[];
}

export const GetAllPaidBookingMonitoringDaycaresHandler = async (
  token: string
): Promise<GetAllPaidBookingMonitoringDaycaresResponse> => {
  const { data } = await api.get<GetAllPaidBookingMonitoringDaycaresResponse>(
    `/daycares/booking/monitoring`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return data;
};

export const useGetAllPaidBookingMonitoringDaycares = (
  token: string,
  options?: Partial<
    UseQueryOptions<GetAllPaidBookingMonitoringDaycaresResponse, AxiosError>
  >
) => {
  return useQuery({
    queryKey: ["all-paid-booking-monitoring-daycares"],
    queryFn: () => GetAllPaidBookingMonitoringDaycaresHandler(token),
    ...options,
  });
};
