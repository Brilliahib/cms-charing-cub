import ButtonBot from "@/components/atoms/button/ButtonBot";
import HomeArticle from "./HomeArticle";
import HomeHero from "./HomeHero";
import HomeIntroVideo from "./HomeIntroVideo";
import HomeSponsorship from "./HomeSponsorship";
import HomePsychology from "./HomePsychology";

export default function HomeContent() {
  return (
    <>
      <HomeHero />
      <div className="md:space-y-24 space-y-16">
        <HomeArticle />
        <HomeIntroVideo />
        <HomePsychology />
        <HomeSponsorship />
        <ButtonBot />
      </div>
    </>
  );
}
