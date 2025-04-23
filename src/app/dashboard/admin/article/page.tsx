import DashboardTitle from "@/components/atoms/typography/DashboardTitle";
import ArticleAdminContent from "@/components/organism/dashboard/admin/article/ArticleAdminContent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Artikel",
};

export default function DashboardAdminArticlePage() {
  return (
    <>
      <DashboardTitle title="Artikel" />
      <ArticleAdminContent />
    </>
  );
}
