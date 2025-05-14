import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";
import { TypesArticle } from "@/types/article/article";

interface GetDetailArticleTypeResponse {
  data: TypesArticle;
}

export const GetDetailArticleTypeHandler = async (
  id: string,
  token: string
): Promise<GetDetailArticleTypeResponse> => {
  const { data } = await api.get<GetDetailArticleTypeResponse>(
    `/article-types/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return data;
};

export const useGetDetailArticleType = (
  id: string,
  token: string,
  options?: Partial<UseQueryOptions<GetDetailArticleTypeResponse, AxiosError>>
) => {
  return useQuery({
    queryKey: ["article-type-detail", id],
    queryFn: () => GetDetailArticleTypeHandler(id, token),
    ...options,
  });
};
