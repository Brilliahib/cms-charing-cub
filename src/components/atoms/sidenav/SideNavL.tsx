import Image from "next/image";
import Link from "next/link";

import { Link as NavLink } from "@/components/organism/side/SideNav";
import SideNavLink from "./SideNavLink";

interface SideNavLProps {
  links: NavLink[];
}

export default function SideNavL({ links }: SideNavLProps) {
  return (
    <div className="relative z-50 hidden overflow-hidden bg-[#f9f9f9] p-10 md:block">
      <div className="z-10 flex h-full max-h-screen flex-col gap-12">
        <div>
          <Link
            href="/"
            className="flex text-left justify-center items-center gap-2 font-semibold"
          >
            <Image
              src="/images/logo_full.png"
              alt="Tumbuh Sahabat"
              width={100}
              height={100}
            />
          </Link>
        </div>
        <div className="flex-1">
          <nav className="grid items-start gap-5 font-medium">
            {links
              .filter((link) => !link.hide)
              .map((link) => (
                <SideNavLink key={link.label} {...link} />
              ))}
          </nav>
        </div>
      </div>

      {/* <div className="absolute -bottom-24 -right-12 -z-10 h-64 w-64 rounded-full bg-gradient-to-tr from-primary/20 to-primary/10 blur-xl"></div>
      <div className="absolute -left-36 bottom-36 -z-10 h-64 w-64 rounded-full bg-gradient-to-tr from-primary/20 to-primary/10 blur-xl"></div>
      <div className="absolute -right-36 top-36 -z-10 h-64 w-64 rounded-full bg-gradient-to-tr from-primary/20 to-primary/10 blur-xl"></div>
      <div className="absolute -left-36 top-2 -z-10 h-64 w-64 rounded-full bg-gradient-to-tr from-primary/20 to-primary/10 blur-xl"></div> */}
    </div>
  );
}
