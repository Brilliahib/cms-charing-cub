"use client";

import CardBookingDaycare from "@/components/molecules/card/CardBookingDaycare";
import CardBookingDaycareDetail from "@/components/molecules/card/CardBookingDaycareDetail";

interface CubLocationBookingParams {
  id: string;
}

export default function CubLocationBookingContent({
  id,
}: CubLocationBookingParams) {
  return (
    <>
      <div className="pad-x py-8 space-y-8">
        <CardBookingDaycare id={id} />
      </div>
    </>
  );
}
