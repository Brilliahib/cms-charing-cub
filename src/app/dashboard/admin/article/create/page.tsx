import DashboardTitle from "@/components/atoms/typography/DashboardTitle";
import ArticleCreateAdminContent from "@/components/organism/dashboard/admin/article/ArticleCreateAdminContent";

export default function ArticleCreateAdminPage() {
  return (
    <>
      <DashboardTitle title="Create Article" />
      <ArticleCreateAdminContent />
    </>
  );
}
