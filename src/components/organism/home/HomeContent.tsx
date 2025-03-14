import ButtonBot from "@/components/atoms/button/ButtonBot";
import HomeArticle from "./HomeArticle";
import HomeHero from "./HomeHero";
import HomeIntroVideo from "./HomeIntroVideo";

export default function HomeContent() {
  return (
    <>
      <HomeHero />
      <HomeArticle />
      <HomeIntroVideo />
      <ButtonBot />
    </>
  );
}
