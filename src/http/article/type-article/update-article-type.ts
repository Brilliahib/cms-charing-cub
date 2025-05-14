import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";
import { useSession } from "next-auth/react";
import { TypesArticle } from "@/types/article/article";
import { TypeArticleType } from "@/validators/article/article-type-validator";

interface EditArticleTypeResponse {
  data: TypesArticle;
}

export const EditArticleTypeHandler = async (
  id: string,
  body: TypeArticleType,
  token: string
): Promise<EditArticleTypeResponse> => {
  const { data } = await api.put(`/article-types/${id}`, body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const useEditArticleType = (
  options?: UseMutationOptions<
    EditArticleTypeResponse,
    AxiosError,
    { id: string; body: TypeArticleType }
  >
) => {
  const { data: sessionData } = useSession();
  return useMutation({
    mutationFn: ({ id, body }) =>
      EditArticleTypeHandler(id, body, sessionData?.access_token as string),
    ...options,
  });
};
