"use client";

import { PropsWithChildren, useMemo } from "react";
import { usePathname } from "next/navigation";
import {
  LayoutDashboardIcon,
  Settings2Icon,
  LucideIcon,
  Newspaper,
  Users,
  UserRound,
  HeartHandshake,
  HousePlus,
  Wallet,
  CalendarFold,
  ChartSpline,
  MessageSquareQuote,
  MonitorSmartphone,
  Mail,
} from "lucide-react";
import { Session } from "next-auth";
import SideNavL from "@/components/atoms/sidenav/SideNavL";
import SideNavHeader from "@/components/atoms/sidenav/SideNavHeader";

export interface Link {
  href: string;
  label: string;
  icon?: LucideIcon;
  active?: boolean;
  hide?: boolean;
}

interface SidenavProps extends PropsWithChildren {
  session: Session;
}

export default function Sidenav({ children, session }: SidenavProps) {
  const pathname = usePathname();

  const links = useMemo(
    () => [
      ...(session?.user.role === "admin"
        ? [
            {
              href: "/dashboard/admin",
              label: "Dashboard",
              icon: LayoutDashboardIcon,
              active: pathname === "/dashboard/admin",
            },
            {
              href: "/dashboard/admin/article",
              label: "Artikel",
              icon: Newspaper,
              active: pathname.startsWith("/dashboard/admin/article"),
            },
            {
              href: "/dashboard/admin/daycares",
              label: "Daycares",
              icon: HousePlus,
              active: pathname.startsWith("/dashboard/admin/daycares"),
            },
            {
              href: "/dashboard/admin/nannies",
              label: "Nannies",
              icon: HeartHandshake,
              active: pathname.startsWith("/dashboard/admin/nannies"),
            },
            {
              href: "/dashboard/admin/feedbacks",
              label: "Daftar Masukan",
              icon: Mail,
              active: pathname.startsWith("/dashboard/admin/feedbacks"),
            },
            {
              href: "/dashboard/admin/users",
              label: "Pengguna",
              icon: Users,
              active: pathname.startsWith("/dashboard/admin/users"),
            },
          ]
        : session?.user.role === "daycare"
        ? [
            {
              href: "/dashboard/daycares",
              label: "Dashboard",
              icon: LayoutDashboardIcon,
              active: pathname === "/dashboard/daycares",
            },
            {
              href: "/dashboard/daycares/bookings",
              label: "Daftar Booking",
              icon: CalendarFold,
              active: pathname.startsWith("/dashboard/daycares/bookings"),
            },
            {
              href: "/dashboard/daycares/nannies",
              label: "Nannies",
              icon: UserRound,
              active: pathname.startsWith("/dashboard/daycares/nannies"),
            },
            {
              href: "/dashboard/daycares/income",
              label: "Analisa Pendapatan",
              icon: ChartSpline,
              active: pathname.startsWith("/dashboard/daycares/income"),
            },
            {
              href: "/dashboard/daycares/withdraw",
              label: "Penarikan Dana",
              icon: Wallet,
              active: pathname.startsWith("/dashboard/daycares/withdraw"),
            },
          ]
        : session?.user.role === "nannies"
        ? [
            {
              href: "/dashboard/nannies",
              label: "Dashboard",
              icon: LayoutDashboardIcon,
              active: pathname === "/dashboard/nannies",
            },
            {
              href: "/dashboard/nannies/bookings",
              label: "Daftar Booking",
              icon: CalendarFold,
              active: pathname.startsWith("/dashboard/nannies/bookings"),
            },
          ]
        : [
            {
              href: "/dashboard",
              label: "Dashboard",
              icon: LayoutDashboardIcon,
              active: pathname === "/dashboard",
            },
            {
              href: "/dashboard/bookings/daycares",
              label: "Booking Daycare",
              icon: CalendarFold,
              active: pathname.startsWith("/dashboard/bookings/daycares"),
            },
            {
              href: "/dashboard/bookings/nannies",
              label: "Booking Nannies",
              icon: CalendarFold,
              active: pathname.startsWith("/dashboard/bookings/nannies"),
            },
            {
              href: "/dashboard/monitoring",
              label: "Monitoring Anak",
              icon: MonitorSmartphone,
              active: pathname.startsWith("/dashboard/monitoring"),
            },
            {
              href: "/dashboard/feedbacks",
              label: "Beri Masukan",
              icon: MessageSquareQuote,
              active: pathname.startsWith("/dashboard/feedbacks"),
            },
          ]),
      {
        href: "/dashboard/settings",
        label: "Pengaturan",
        active: pathname.startsWith("/dashboard/settings"),
        icon: Settings2Icon,
      },
    ],
    [session, pathname]
  );

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <SideNavL links={links} />
      <div className="flex w-full flex-col overflow-y-auto">
        <SideNavHeader session={session} links={links} />
        <main className="mt-16 flex flex-1 bg-white flex-col gap-4 p-4 md:px-20 md:py-6 lg:gap-6">
          {children}
        </main>
      </div>
    </div>
  );
}
