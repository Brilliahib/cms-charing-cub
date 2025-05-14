import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";
import { ArticleAdmin } from "@/types/article/article";

interface DeleteArticleAdminPayload {
  id: string;
  token: string;
}

interface DeleteArticleAdminResponse {
  data: ArticleAdmin;
}

export const DeleteArticleAdminHandler = async ({
  id,
  token,
}: DeleteArticleAdminPayload): Promise<DeleteArticleAdminResponse> => {
  const { data } = await api.delete(`/article/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};

export const useDeleteArticleAdmin = (
  options?: UseMutationOptions<
    DeleteArticleAdminResponse,
    AxiosError,
    DeleteArticleAdminPayload
  >
) => {
  return useMutation({
    mutationFn: DeleteArticleAdminHandler,
    ...options,
  });
};
