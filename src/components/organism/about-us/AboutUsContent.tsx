import AboutUsIntroduction from "./AboutUsIntroduction";
import AboutUsSponsorship from "./AboutUsSponsorship";
import AboutUsTeam from "./AboutUsTeam";

export default function AboutUsContent() {
  return (
    <div className="mt-8 pad-x-xl space-y-24">
      <AboutUsIntroduction />
      <AboutUsTeam />
      {/* <AboutUsSponsorship /> */}
    </div>
  );
}
