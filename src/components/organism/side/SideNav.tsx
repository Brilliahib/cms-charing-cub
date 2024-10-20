"use client";

import { PropsWithChildren, useMemo } from "react";
import { usePathname } from "next/navigation";
import {
  Book,
  CalendarFold,
  ClipboardCheck,
  CircleHelpIcon,
  LayoutDashboardIcon,
  Settings2Icon,
  LucideIcon,
  User,
  TimerReset,
  ChartSpline,
  Gamepad2,
  Camera,
  Newspaper,
  FileType2,
  Gamepad,
  Video,
  BookOpen,
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
              active: pathname === "/dashboard/admin/article",
            },
            {
              href: "/dashboard/admin/article/types",
              label: "Tipe Artikel",
              icon: FileType2,
              active: pathname.startsWith("/dashboard/admin/article/types"),
            },
            {
              href: "/dashboard/admin/games",
              label: "Games",
              icon: Gamepad2,
              active: pathname === "/dashboard/admin/games",
            },
            {
              href: "/dashboard/admin/games/types",
              label: "Tipe Games",
              icon: Gamepad,
              active: pathname.startsWith("/dashboard/admin/games/types"),
            },
            {
              href: "/dashboard/admin/users",
              label: "Pengguna",
              icon: User,
              active: pathname.startsWith("/dashboard/admin/users"),
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
              href: "/dashboard/tracking",
              label: "Tracking",
              icon: ChartSpline,
              active: pathname.startsWith("/dashboard/tracking"),
            },
            {
              href: "/dashboard/games",
              label: "Permainan",
              icon: Gamepad2,
              active: pathname.startsWith("/dashboard/games"),
            },
            {
              href: "/dashboard/studies/speaks",
              label: "Belajar",
              icon: BookOpen,
              active: pathname.startsWith("/dashboard/studies/speaks"),
            },
            {
              href: "/dashboard/videos",
              label: "Video",
              icon: Video,
              active: pathname.startsWith("/dashboard/videos"),
            },
            {
              href: "/dashboard/articles",
              label: "Artikel",
              icon: Newspaper,
              active: pathname.startsWith("/dashboard/articles"),
            },
            {
              href: "/dashboard/detect",
              label: "Deteksi",
              icon: Camera,
              active: pathname.startsWith("/dashboard/detect"),
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
