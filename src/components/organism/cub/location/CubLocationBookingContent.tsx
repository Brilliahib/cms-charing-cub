"use client";

import RatingStars from "@/components/atoms/rating/RatingStar";
import CardBookingDaycare from "@/components/molecules/card/CardBookingDaycare";
import CardBookingDaycareDetail from "@/components/molecules/card/CardBookingDaycareDetail";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useGetDetailDaycare } from "@/http/daycares/get-detail-daycare";
import { baseUrl } from "@/utils/app";
import { BadgeCheck, Clock, MapPin, Phone } from "lucide-react";
import Image from "next/image";

interface CubLocationBookingParams {
  id: number;
}

export default function CubLocationBookingContent({
  id,
}: CubLocationBookingParams) {
  return (
    <>
      <div className="pad-x-xl py-8 space-y-8">
        <div className="flex md:flex-row flex-col gap-4 md:gap-6">
          <CardBookingDaycare id={id} />
          <CardBookingDaycareDetail id={id} />
        </div>
      </div>
    </>
  );
}
