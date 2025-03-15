import FooterContent from "@/components/atoms/footer/FooterContent";
import Navbar from "../navbar/Navbar";
import ArticleContent from "./ArticleContent";

export default function ArticleWrapper() {
  return (
    <>
      <Navbar />
      <ArticleContent />
      <FooterContent />
    </>
  );
}
