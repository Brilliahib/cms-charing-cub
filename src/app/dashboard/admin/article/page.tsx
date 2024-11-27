import DashboardTitle from "@/components/atoms/typography/DashboardTitle";
import ArticleAdminContent from "@/components/organism/dashboard/admin/article/ArticleAdminContent";

export default function DashboardAdminArticlePage() {
  return (
    <>
      <DashboardTitle title="Article" />
      <ArticleAdminContent />
    </>
  );
}
