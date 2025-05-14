import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";
import { ArticleAdmin } from "@/types/article/article";

interface DeleteArticleTypePayload {
  id: string;
  token: string;
}

interface DeleteArticleTypeResponse {
  data: ArticleAdmin;
}

export const DeleteArticleTypeHandler = async ({
  id,
  token,
}: DeleteArticleTypePayload): Promise<DeleteArticleTypeResponse> => {
  const { data } = await api.delete(`/article-types/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};

export const useDeleteArticleType = (
  options?: UseMutationOptions<
    DeleteArticleTypeResponse,
    AxiosError,
    DeleteArticleTypePayload
  >
) => {
  return useMutation({
    mutationFn: DeleteArticleTypeHandler,
    ...options,
  });
};
