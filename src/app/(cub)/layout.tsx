import FooterContent from "@/components/atoms/footer/FooterContent";
import Navbar from "@/components/organism/navbar/Navbar";
import { PropsWithChildren } from "react";

export default function CubLayout({ children }: PropsWithChildren) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <FooterContent />
    </>
  );
}
