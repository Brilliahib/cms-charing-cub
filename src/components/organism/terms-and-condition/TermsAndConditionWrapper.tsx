import FooterContent from "@/components/atoms/footer/FooterContent";
import Navbar from "../navbar/Navbar";
import TermsAndConditionsContent from "./TermsAndConditionContent";

export default function TermsAndConditionWrapper() {
  return (
    <>
      <Navbar />
      <TermsAndConditionsContent />
      <FooterContent />
    </>
  );
}
