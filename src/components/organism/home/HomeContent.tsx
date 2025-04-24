import ButtonBot from "@/components/atoms/button/ButtonBot";
import HomeArticle from "./HomeArticle";
import HomeHero from "./HomeHero";
import HomeIntroVideo from "./HomeIntroVideo";
import HomeSponsorship from "./HomeSponsorship";

export default function HomeContent() {
  return (
    <>
      <HomeHero />
      <HomeArticle />
      <HomeIntroVideo />
      <HomeSponsorship />
      <ButtonBot />
    </>
  );
}
