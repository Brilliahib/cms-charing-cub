import ArticleDetailContent from "@/components/organism/articles/ArticleDetailContent";

interface ArticleParams {
  params: { id: number };
}

export default function ArticlePage({ params }: ArticleParams) {
  return (
    <>
      <ArticleDetailContent id={params.id} />
    </>
  );
}
