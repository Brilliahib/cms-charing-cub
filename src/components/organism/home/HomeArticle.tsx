"use client";

import { useGetArticle } from "@/http/article/get-all-article";
import { baseUrl } from "@/utils/app";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import Image from "next/image";
import Link from "next/link";

export default function HomeArticle() {
  const { data, isPending } = useGetArticle();
  return (
    <>
      <div className="pad-x md:pt-24 pt-16">
        <div className="grid md:grid-cols-3 xl:grid-cols-4 grid-cols-1 gap-4">
          {data?.data.map((article) => (
            <Link
              href={`/articles/${article.id}`}
              key={article.id}
              className="space-y-2"
            >
              <Image
                src={`${baseUrl}/${article.image}`}
                alt={article.title}
                width={1000}
                height={1000}
                className="max-h-[200px] md:w-fit w-full object-cover rounded-xl"
              />
              <div className="space-y-1">
                <h1 className="font-semibold text-md line-clamp-2">
                  {article.title}
                </h1>
                <p className="text-sm text-muted-foreground">
                  {format(article.created_at, "d MMMM yyyy", {
                    locale: id,
                  })}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
