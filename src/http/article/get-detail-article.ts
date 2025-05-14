import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { api } from "@/lib/axios";
import { Article, ArticleAdmin } from "@/types/article/article";

interface GetDetailArticleParams {
  id: string;
}

interface GetDetailArticleResponse {
  data: ArticleAdmin;
}

export const getDetailArticleHandler = async ({
  id,
}: GetDetailArticleParams): Promise<GetDetailArticleResponse> => {
  const { data } = await api.get<GetDetailArticleResponse>(`/article/${id}`);

  return data;
};

export const useGetDetailArticle = (
  { id }: GetDetailArticleParams,
  options?: Partial<UseQueryOptions<GetDetailArticleResponse, AxiosError>>
) => {
  return useQuery({
    queryKey: ["article-detail", id],
    queryFn: () => getDetailArticleHandler({ id }),
    ...options,
  });
};
