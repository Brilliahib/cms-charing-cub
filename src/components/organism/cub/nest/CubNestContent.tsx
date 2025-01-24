"use client";

import AlertComingSoon from "@/components/atoms/alert/AlertComingSoon";
import SectionTitle from "@/components/atoms/typography/SectionTitle";

export default function CubNestContent() {
  return (
    <div className="pad-x-xl lg:pt-8 md:pt-6 pt-4">
      <div className="space-y-8">
        <SectionTitle
          title="Cub Nest"
          subtitle="Connecting Your Child With Loving Nannies"
        />
        <AlertComingSoon />
      </div>
    </div>
  );
}
