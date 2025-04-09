"use client";

import SectionTitle from "@/components/atoms/typography/SectionTitle";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetArticle } from "@/http/article/get-all-article";
import { baseUrl } from "@/utils/app";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import Image from "next/image";
import Link from "next/link";

export default function ArticleContent() {
  const { data, isPending } = useGetArticle();
  return (
    <div className="pad-x-xl mt-8 space-y-8">
      <SectionTitle title="Blog" subtitle="" />
      <div className="grid md:grid-cols-4 grid-cols-1 gap-6 md:gap-6">
        {isPending
          ? Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="space-y-2">
                <Skeleton className="h-[200px] w-full md:w-[270px] rounded-xl" />
                <Skeleton className="h-[20px] w-3/4" />
                <Skeleton className="h-[16px] w-1/2" />
              </div>
            ))
          : data?.data.map((article) => (
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
      </div>
    </div>
  );
}
