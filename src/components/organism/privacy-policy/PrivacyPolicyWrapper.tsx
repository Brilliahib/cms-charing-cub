import FooterContent from "@/components/atoms/footer/FooterContent";
import Navbar from "../navbar/Navbar";
import PrivacyPolicyContent from "./PrivacyPolicyContent";

export default function PrivacyPolicyWrapper() {
  return (
    <>
      <Navbar />
      <PrivacyPolicyContent />
      <FooterContent />
    </>
  );
}
