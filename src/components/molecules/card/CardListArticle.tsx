import { ArticleAdmin } from "@/types/article/article";
import { baseUrl } from "@/utils/app";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import Image from "next/image";
import Link from "next/link";

interface CardListArticleProps {
  data: ArticleAdmin[];
}

export default function CardListArticle({ data }: CardListArticleProps) {
  return (
    <>
      {data.map((article) => (
        <Link
          href={`/articles/${article.id}`}
          key={article.id}
          className="space-y-2 hover:-translate-y-1 transition-transform duration-300 ease-in-out"
        >
          <Image
            src={`${baseUrl}/${article.image}`}
            alt={article.title}
            width={1000}
            height={1000}
            className="h-[180px] md:w-full w-full object-cover rounded-xl"
          />
          <div className="space-y-1">
            <h1 className="font-semibold md:text-md text-base line-clamp-2">
              {article.title}
            </h1>
            <p className="text-sm text-muted-foreground">
              {format(new Date(article.created_at), "d MMMM yyyy", {
                locale: id,
              })}
            </p>
          </div>
        </Link>
      ))}
    </>
  );
}
