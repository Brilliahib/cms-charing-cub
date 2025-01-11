import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { api } from "@/lib/axios";
import { TypesArticle } from "@/types/article/article";

interface GetAllArticleTypeResponse {
  data: TypesArticle[];
}

export const getAllArticleTypeHandler = async (
  token: string
): Promise<GetAllArticleTypeResponse> => {
  const { data } = await api.get<GetAllArticleTypeResponse>("/article-types", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};

export const useGetAllArticleType = (
  token: string,
  options?: Partial<UseQueryOptions<GetAllArticleTypeResponse, AxiosError>>
) => {
  return useQuery({
    queryKey: ["article-type-list"],
    queryFn: () => getAllArticleTypeHandler(token),
    ...options,
  });
};
