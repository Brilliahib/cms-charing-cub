"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { useGetDetailUser } from "@/http/admin/users/get-detail-user";
import { generateFallbackFromName } from "@/utils/misc";
import { formatPrice } from "@/utils/price";
import { useSession } from "next-auth/react";

interface UserDetailUserAdminParams {
  id: number;
}

export default function UserDetailUserAdminContent({
  id,
}: UserDetailUserAdminParams) {
  const { data: session, status } = useSession();
  const { data, isPending } = useGetDetailUser(
    { id, token: session?.access_token as string },
    {
      enabled: status === "authenticated",
    }
  );
  return (
    <>
      <div className="py-8 space-y-8">
        <Card className="border shadow">
          <CardContent className="md:p-6 p-4">
            <div className="flex w-full flex-col gap-16 rounded-lg px-12 py-4 xl:flex-row">
              <div className="flex gap-6 md:gap-8 xl:gap-12 items-center">
                <Avatar className="border border-muted h-32 w-32">
                  <AvatarFallback className="text-gray-700 text-3xl font-bold">
                    {generateFallbackFromName(data?.data.name ?? "")}
                  </AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                  <h1 className="text-xl font-semibold">{data?.data.name}</h1>
                  <p className="text-muted-foreground">{data?.data.email}</p>
                </div>
              </div>
              {/* <div
                data-orientation="vertical"
                role="none"
                className="shrink-0 bg-border w-[1px] h-30 hidden xl:block"
              ></div>
              <div className="grid grid-cols-1 gap-2 gap-y-4 text-center text-sm sm:grid-cols-2 sm:gap-y-2 sm:text-start xl:grid-cols-3">
                <p className="text-muted-foreground">Name</p>
                <p className="font-medium xl:col-span-2">{data?.data.name}</p>
                <p className="text-muted-foreground">Email</p>
                <p className="font-medium xl:col-span-2">{data?.data.email}</p>
                <p className="text-muted-foreground">Role</p>
                <p className="font-medium xl:col-span-2">{data?.data.role}</p>
              </div> */}
              <div
                data-orientation="vertical"
                role="none"
                className="shrink-0 bg-border w-[1px] h-30 hidden xl:block"
              ></div>
              {data?.data.role === "nannies" && (
                <div className="grid grid-cols-1 md:gap-x-8 gap-4 gap-y-4 text-center text-sm sm:grid-cols-2 sm:gap-y-2 sm:text-start xl:grid-cols-3">
                  <p className="text-muted-foreground">Gender</p>
                  <p className="font-medium xl:col-span-2">
                    {data?.data.nannies?.gender === "female" ? "Woman" : "Man"}
                  </p>
                  <p className="text-muted-foreground">Age</p>
                  <p className="font-medium xl:col-span-2">
                    {data?.data.nannies?.age ?? "N/A"}
                  </p>
                  <p className="text-muted-foreground">Contact</p>
                  <p className="font-medium xl:col-span-2">
                    {data?.data.nannies?.contact ?? "N/A"}
                  </p>
                  <p className="text-muted-foreground">Price</p>
                  <p className="font-medium xl:col-span-2">
                    {formatPrice(data?.data.nannies?.price_half ?? "N/A")} -{" "}
                    {formatPrice(data?.data.nannies?.price_full ?? "N/A")}
                  </p>
                </div>
              )}
              {data?.data.role === "daycare" && (
                <div className="grid grid-cols-1 gap-2 gap-y-4 text-center text-sm sm:grid-cols-2 sm:gap-y-2 sm:text-start xl:grid-cols-3">
                  <p className="text-muted-foreground">Daycare Name</p>
                  <p className="font-medium xl:col-span-2">
                    {data?.data.daycare?.name ?? "N/A"}
                  </p>
                  <p className="text-muted-foreground">Contact</p>
                  <p className="font-medium xl:col-span-2">
                    {data?.data.daycare?.phone_number ?? "N/A"}
                  </p>
                  <p className="text-muted-foreground">Opening Days</p>
                  <p className="font-medium xl:col-span-2">
                    {data?.data.daycare?.opening_days ?? "N/A"}
                  </p>
                  <p className="text-muted-foreground">Address</p>
                  <p className="font-medium xl:col-span-2">
                    {data?.data.daycare?.location ?? "N/A"}
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
