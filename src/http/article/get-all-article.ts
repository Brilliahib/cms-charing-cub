import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { api } from "@/lib/axios";
import { Article } from "@/types/article/article";

interface GetArticleResponse {
  data: Article[];
}

export const getArticleHandler = async (): Promise<GetArticleResponse> => {
  const { data } = await api.get<GetArticleResponse>("/article");

  return data;
};

export const useGetArticle = (
  options?: Partial<UseQueryOptions<GetArticleResponse, AxiosError>>
) => {
  return useQuery({
    queryKey: ["article-list"],
    queryFn: getArticleHandler,
    ...options,
  });
};
