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
      href: "/",
      label: "Home",
    },
    {
      href: "/about",
      label: "Help",
    },
    {
      href: "/contact",
      label: "Partnership",
    },
  ];

  return (
    <div className="mx-auto px-4 max-w-[1400px] z-50 sticky top-0 flex md:mb-8 justify-between py-4 bg-white">
      <NavL />
      <nav className="hidden items-center font-semibold md:flex">
        {links.map((link) => (
          <NavLink key={link.label} {...link} />
        ))}
      </nav>
      <NavButton links={links} />
    </div>
  );
}
