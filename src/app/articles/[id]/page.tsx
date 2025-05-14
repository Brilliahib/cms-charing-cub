import ArticleDetailContent from "@/components/organism/articles/ArticleDetailContent";

interface ArticleParams {
  params: { id: string };
}

export default function ArticlePage({ params }: ArticleParams) {
  return (
    <>
      <ArticleDetailContent id={params.id} />
    </>
  );
}
