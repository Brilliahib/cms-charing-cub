"use client";

import { useGetDetailArticle } from "@/http/article/get-detail-article";
import Navbar from "../navbar/Navbar";
import Image from "next/image";
import { baseUrl } from "@/utils/app";

interface ArticleDetailContentParams {
  id: number;
}

export default function ArticleDetailContent({
  id,
}: ArticleDetailContentParams) {
  const { data, isPending } = useGetDetailArticle({ id });
  return (
    <>
      <Navbar />
      <div className="mx-auto px-4 max-w-[1400px]">
        <div className="space-y-6">
          <Image
            src={`${baseUrl}/${data?.data.image}`}
            alt={data?.data.title ?? "Article Image"}
            width={1000}
            height={1000}
            className="max-h-[400px] w-full object-cover rounded-xl"
          />
          <h1 className="font-paytone text-2xl text-center">
            {data?.data.title}
          </h1>
          <div
            dangerouslySetInnerHTML={{ __html: data?.data.content ?? "" }}
            className="prose"
          />
        </div>
      </div>
    </>
  );
}
