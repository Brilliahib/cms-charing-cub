import DashboardTitle from "@/components/atoms/typography/DashboardTitle";
import ArticleAdminContent from "@/components/organism/dashboard/admin/article/ArticleAdminContent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Article",
};

export default function DashboardAdminArticlePage() {
  return (
    <>
      <DashboardTitle title="Article" />
      <ArticleAdminContent />
    </>
  );
}
