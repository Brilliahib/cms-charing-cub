import DaycareList from "@/components/organism/daycares/DaycareList";
import HomeContent from "@/components/organism/home/HomeContent";
import Navbar from "@/components/organism/navbar/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <HomeContent />
      <DaycareList />
    </>
  );
}
