"use client";

import RatingStars from "@/components/atoms/rating/RatingStar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton"; // Import Skeleton component
import { useToast } from "@/hooks/use-toast";
import { useGetDetailNannies } from "@/http/nannies/get-detail-nannies";
import { baseUrl } from "@/utils/app";
import { formatPrice } from "@/utils/price";
import { format } from "date-fns";
import { BadgeCheck, Clock, MapPin, Phone } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface CubNestDetailProps {
  id: number;
}

export default function CubCareDetailContent({ id }: CubNestDetailProps) {
  const { data, isPending } = useGetDetailNannies({ id });
  const session = useSession();

  const createdYear = data?.data.created_at
    ? format(new Date(data.data.created_at), "MMMM yyyy")
    : "";

  const { toast } = useToast();
  const router = useRouter();

  const handleBookingClick = () => {
    if (!session.data?.access_token) {
      toast({
        title: "Not logged in yet",
        description: "Please login to continue booking!",
        variant: "destructive",
      });
    } else {
      router.push(`/cub-care/${data?.data.id}/booking`);
    }
  };

  return (
    <div className="mx-auto px-4 max-w-[1400px]">
      <div className="space-y-4 md:space-y-6">
        <Card>
          <CardContent className="p-6 md:p-8">
            <div className="flex md:flex-row flex-col gap-4 md:gap-8">
              <div>
                {isPending ? (
                  <Skeleton className="h-[200px] w-[200px] rounded-full" />
                ) : (
                  <Image
                    src={`${baseUrl}/${data?.data.images}`}
                    alt={data?.data.name ?? "Daycare Facility"}
                    width={1000}
                    height={1000}
                    className="object-cover md:h-[200px] md:w-[200px] w-[150px] h-[150px] rounded-full bg-primary/60"
                  />
                )}
              </div>
              <div className="space-y-4">
                <h1 className="md:text-3xl text-xl font-paytone">
                  {isPending ? (
                    <Skeleton className="h-6 w-40" />
                  ) : (
                    data?.data.name
                  )}
                </h1>
                <div className="flex items-center space-x-2">
                  {isPending ? (
                    <Skeleton className="h-4 w-24" />
                  ) : (
                    <>
                      <RatingStars rating={data?.data.rating || 0} />
                      <span className="text-sm text-muted-foreground">
                        ({data?.data.rating_count})
                      </span>
                    </>
                  )}
                </div>
                <div className="md:text-base text-sm md:space-y-2 space-y-4">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    {isPending ? (
                      <Skeleton className="h-4 w-32" />
                    ) : (
                      <p className="text-muted-foreground">
                        Joined since {createdYear}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    {isPending ? (
                      <Skeleton className="h-4 w-32" />
                    ) : (
                      <p className="text-muted-foreground">
                        {data?.data.contact}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 md:flex hidden" />
                    {isPending ? (
                      <Skeleton className="h-4 w-32" />
                    ) : (
                      <p className="text-muted-foreground">
                        {data?.data.daycare_location}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex md:flex-row flex-col gap-4 md:gap-6">
          <div className="md:w-8/12">
            <Card>
              <CardContent className="p-6 md:p-8 md:space-y-6 space-y-4">
                <div className="space-y-2">
                  <h1 className="font-bold">About Experience</h1>
                  {isPending ? (
                    <Skeleton className="h-4 w-full" />
                  ) : (
                    <p className="text-muted-foreground">
                      {data?.data.experience_description}
                    </p>
                  )}
                </div>
                <div className="space-y-4">
                  <h1 className="font-bold mb-4">Our Daycare</h1>
                  <Link
                    href={`/cub-location/${data?.data.daycare_id}`}
                    className="hover:underline hover:text-primary"
                  >
                    <div className="flex gap-4 items-center">
                      {isPending ? (
                        <Skeleton className="h-[60px] w-[60px] rounded-full" />
                      ) : (
                        <Image
                          src={`${baseUrl}/${data?.data.daycare_profile}`}
                          alt={data?.data.daycare_name ?? "Daycare"}
                          width={1000}
                          height={1000}
                          className="object-cover h-[60px] w-[60px] rounded-full"
                        />
                      )}
                      <div className="space-y-2">
                        <h1 className="font-semibold">
                          {isPending ? (
                            <Skeleton className="h-4 w-32" />
                          ) : (
                            data?.data.daycare_name
                          )}
                        </h1>
                        {isPending ? (
                          <Skeleton className="h-4 w-24" />
                        ) : (
                          <RatingStars rating={data?.data.rating || 0} />
                        )}
                      </div>
                    </div>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="md:w-4/12">
            <Card className="sticky top-24">
              <CardContent className="p-6 md:p-8 md:space-y-8 space-y-6">
                <div className="space-y-4">
                  <h1 className="font-bold">Start from</h1>
                  {isPending ? (
                    <Skeleton className="h-8 w-32" />
                  ) : (
                    <h1 className="text-3xl font-bold">
                      {formatPrice(data?.data.price_half || 0)}
                      <span className="text-sm font-normal">/day</span>
                    </h1>
                  )}
                </div>
                <div className="bg-secondary rounded-xl p-4 space-y-4">
                  <h1 className="font-bold">The benefit you get</h1>
                  <ul className="space-y-4">
                    <li>
                      <div className="flex gap-4 items-center">
                        <BadgeCheck className="text-green-500" />
                        <p>Safe and Comfortable Environment</p>
                      </div>
                    </li>
                    <li>
                      <div className="flex gap-4 items-center">
                        <BadgeCheck className="text-green-500" />
                        <p>Early Learning and Development Programs</p>
                      </div>
                    </li>
                    <li>
                      <div className="flex gap-4 items-center">
                        <BadgeCheck className="text-green-500" />
                        <p>Socialization and Interaction</p>
                      </div>
                    </li>
                    <li>
                      <div className="flex gap-4 items-center">
                        <BadgeCheck className="text-green-500" />
                        <p>Clean and Hygienic Environment</p>
                      </div>
                    </li>
                    <li>
                      <div className="flex gap-4 items-center">
                        <BadgeCheck className="text-green-500" />
                        <p>Trained and Experienced Staff</p>
                      </div>
                    </li>
                  </ul>
                </div>
                <Button
                  className="w-full rounded-full"
                  size={"lg"}
                  disabled={isPending}
                  onClick={handleBookingClick}
                >
                  {isPending ? "Loading..." : "Book Now"}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
