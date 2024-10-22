import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";
import { useSession } from "next-auth/react";
import { Article } from "@/types/article/article";
import { ArticleType } from "@/validators/article/article-validator";

interface ArticleResponse {
  data: Article;
}

export const addArticleHandler = async (
  body: ArticleType,
  token: string
): Promise<ArticleResponse> => {
  const formData = new FormData();

  formData.append("article_type_id", body.article_type_id);
  formData.append("title", body.title);
  formData.append("content", body.content);

  if (body.image) {
    formData.append("image", body.image);
  }

  const { data } = await api.post("/article", formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });

  return data;
};

export const useAddArticle = (
  options?: UseMutationOptions<ArticleResponse, AxiosError<any>, ArticleType>
) => {
  const { data: sessionData } = useSession();
  return useMutation({
    mutationFn: (body: ArticleType) =>
      addArticleHandler(body, sessionData?.access_token as string),
    ...options,
  });
};
