"use client";

import { usePathname } from "next/navigation";

import NavButton from "@/components/atoms/navbar/NavButton";
import NavL from "@/components/atoms/navbar/NavL";
import NavLink from "@/components/atoms/navbar/NavLink";

export interface Link {
  href: string;
  label: string;
  active?: boolean;
}

export default function Navbar() {
  const pathname = usePathname();
  const links = [
    {
      href: "/cub-location",
      label: "Cub Location",
    },
    {
      href: "/cub-nest",
      label: "Cub Nest",
    },
    {
      href: "/cub-care",
      label: "Cub Care",
    },
    {
      href: "/cub-able",
      label: "Cub Able",
    },
  ];

  return (
    <>
      <div className="w-full bg-white z-50 sticky top-0">
        <div className="flex md:mb-8 justify-between py-2 bg-white mx-auto px-4 max-w-[1400px]">
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
