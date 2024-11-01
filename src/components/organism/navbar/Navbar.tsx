"use client";

import { useMemo } from "react";
import { usePathname } from "next/navigation";

import NavButton from "@/components/atoms/navbar/NavButton";
import NavL from "@/components/atoms/navbar/NavL";
import NavLink from "@/components/atoms/navbar/NavLink";
import { PropsWithChildren } from "react";
import { Session } from "next-auth";

export interface Link {
  href: string;
  label: string;
  active?: boolean;
}

export default function Navbar() {
  const pathname = usePathname();

  const links = useMemo(
    () => [
      {
        href: "/cub-location",
        label: "Cub Location",
        active: pathname.startsWith("/cub-location"),
      },
      {
        href: "/cub-nest",
        label: "Cub Nest",
        active: pathname.startsWith("/cub-nest"),
      },
      {
        href: "/cub-care",
        label: "Cub Care",
        active: pathname.startsWith("/cub-care"),
      },
      {
        href: "/cub-able",
        label: "Cub Able",
        active: pathname.startsWith("/cub-able"),
      },
    ],
    [pathname]
  );

  return (
    <>
      <div className="w-full bg-background z-50 sticky top-0 md:mb-0 mb-6">
        <div className="flex md:mb-8 justify-between bg-background py-2 mx-auto px-4 max-w-[1400px]">
          <NavL />
          <nav className="hidden items-center font-semibold md:flex">
            {links.map((link) => (
              <NavLink key={link.label} {...link} />
            ))}
          </nav>
          <NavButton links={links} />
        </div>
      </div>
    </>
  );
}
