"use client";

import { PropsWithChildren, useMemo } from "react";
import { usePathname } from "next/navigation";
import {
  LayoutDashboardIcon,
  Settings2Icon,
  LucideIcon,
  Newspaper,
  Handshake,
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
              label: "Article",
              icon: Newspaper,
              active: pathname === "/dashboard/admin/article",
            },
            {
              href: "/dashboard/admin/partner",
              label: "Partnership",
              icon: Handshake,
              active: pathname === "/dashboard/admin/partner",
            },
          ]
        : [
            {
              href: "/dashboard",
              label: "Dashboard",
              icon: LayoutDashboardIcon,
              active: pathname === "/dashboard",
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
      <div className="flex max-h-screen flex-col overflow-y-auto">
        <SideNavHeader session={session} links={links} />
        <main className="mt-16 flex flex-1 flex-col gap-4 p-4 md:px-20 md:py-6 lg:gap-6">
          {children}
        </main>
      </div>
    </div>
  );
}
