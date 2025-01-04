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
      <div className="pad-x-xl py-8 space-y-8">
        <div className="grid md:grid-cols-2 grid-cols-1 gap-4 md:gap-6">
          <CardBookingDaycare id={id} />
          <CardBookingDaycareDetail id={id} />
        </div>
      </div>
    </>
  );
}
