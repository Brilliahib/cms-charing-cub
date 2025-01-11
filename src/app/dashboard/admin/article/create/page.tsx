import DashboardTitle from "@/components/atoms/typography/DashboardTitle";
import ArticleCreateAdminContent from "@/components/organism/dashboard/admin/article/ArticleCreateAdminContent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Article",
};

export default function ArticleCreateAdminPage() {
  return (
    <>
      <DashboardTitle title="Create Article" />
      <ArticleCreateAdminContent />
    </>
  );
}
