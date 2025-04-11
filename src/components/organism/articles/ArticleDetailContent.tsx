"use client";

import { useGetDetailArticle } from "@/http/article/get-detail-article";
import Navbar from "../navbar/Navbar";
import Image from "next/image";
import { baseUrl } from "@/utils/app";
import FooterContent from "@/components/atoms/footer/FooterContent";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";
import { id as idLocal } from "date-fns/locale";
import { useGetArticle } from "@/http/article/get-all-article";
import CardListArticle from "@/components/molecules/card/CardListArticle";

interface ArticleDetailContentParams {
  id: number;
}

export default function ArticleDetailContent({
  id,
}: ArticleDetailContentParams) {
  const { data, isPending } = useGetDetailArticle({ id });
  const { data: articles } = useGetArticle();
  return (
    <>
      <Navbar />
      <div className="pad-x py-8 md:mb-12 mb-12">
        {isPending ? (
          <div className="space-y-6">
            <Skeleton className="h-[400px] w-full rounded-xl" />
            <Skeleton className="h-10 w-3/4 mx-auto" />
            <div className="space-y-3">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <Skeleton className="h-4 w-4/6" />
              <Skeleton className="h-4 w-2/3" />
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <Image
              src={`${baseUrl}/${data?.data.image}`}
              alt={data?.data.title ?? "Article Image"}
              width={1000}
              height={1000}
              className="max-h-[400px] w-full object-cover rounded-xl"
            />
            <div className="space-y-4 text-center">
              <h1 className="md:text-3xl text-2xl font-paytone">
                {data?.data.title}
              </h1>
              {data?.data.created_at && (
                <p className="text-muted-foreground">
                  {format(new Date(data.data.created_at), "EEEE, d MMMM yyyy", {
                    locale: idLocal,
                  })}
                </p>
              )}
            </div>
            <div
              dangerouslySetInnerHTML={{ __html: data?.data.content ?? "" }}
              className="prose text-justify"
            />
          </div>
        )}
      </div>
      <div className="pad-x-xl space-y-6">
        <h1 className="font-paytone text-3xl">Artikel Lain</h1>
        <div className="grid md:grid-cols-4 grid-cols-1 gap-6">
          <CardListArticle data={articles?.data ?? []} />
        </div>
      </div>

      <FooterContent />
    </>
  );
}
