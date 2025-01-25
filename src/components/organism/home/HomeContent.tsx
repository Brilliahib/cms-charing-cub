import HomeArticle from "./HomeArticle";
import HomeHero from "./HomeHero";
import HomeIntroVideo from "./HomeIntroVideo";
import HomeNearbyDaycare from "./HomeNearbyDaycare";

export default function HomeContent() {
  return (
    <>
      <HomeHero />
      {/* If there are already many daycares */}
      {/* <HomeNearbyDaycare /> */}
      <HomeArticle />
      <HomeIntroVideo />
    </>
  );
}
