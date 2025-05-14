import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { api } from "@/lib/axios";
import { Article } from "@/types/article/article";

interface GetDetailArticleAdminParams {
  id: string;
}

interface GetDetailArticleAdminResponse {
  data: Article;
}

export const getDetailArticleAdminHandler = async ({
  id,
}: GetDetailArticleAdminParams): Promise<GetDetailArticleAdminResponse> => {
  const { data } = await api.get<GetDetailArticleAdminResponse>(
    `/article/${id}`
  );

  return data;
};

export const useGetDetailArticleAdmin = (
  { id }: GetDetailArticleAdminParams,
  options?: Partial<UseQueryOptions<GetDetailArticleAdminResponse, AxiosError>>
) => {
  return useQuery({
    queryKey: ["article-detail-admin", id],
    queryFn: () => getDetailArticleAdminHandler({ id }),
    ...options,
  });
};
