import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { api } from "@/lib/axios";
import { ArticleAdmin } from "@/types/article/article";

interface GetLastestArticleResponse {
  data: ArticleAdmin[];
}

export const GetLastestArticleHandler =
  async (): Promise<GetLastestArticleResponse> => {
    const { data } = await api.get<GetLastestArticleResponse>(
      "/article/lastest"
    );

    return data;
  };

export const useGetLastestArticle = (
  options?: Partial<UseQueryOptions<GetLastestArticleResponse, AxiosError>>
) => {
  return useQuery({
    queryKey: ["article-list-lastest"],
    queryFn: GetLastestArticleHandler,
    ...options,
  });
};
