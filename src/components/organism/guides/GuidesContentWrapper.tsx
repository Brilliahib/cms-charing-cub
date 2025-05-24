import FooterContent from "@/components/atoms/footer/FooterContent";
import Navbar from "../navbar/Navbar";
import GuidesContent from "./GuidesContent";

export default function GuidesContentWrapper() {
  return (
    <>
      <Navbar />
      <GuidesContent />
      <FooterContent />
    </>
  );
}
