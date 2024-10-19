import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import Image from "next/image";
import { Link as NavbarLink } from "@/components/organism/navbar/Navbar";
import NavLink from "./NavLink";

interface NavHeaderProps {
  links: NavbarLink[];
}

export default function NavButton({ links }: NavHeaderProps) {
  return (
    <>
      <div className="hidden items-center gap-4 md:flex">
        <div className="hidden items-center gap-4 md:flex">
          <>
            <Button>
              <Link href="/login">Login</Link>
            </Button>
            <Button variant="outline">
              <Link href="/register">Register</Link>
            </Button>
          </>
        </div>
      </div>
      <div className="md:hidden flex items-center">
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="shrink-0 md:hidden"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>

          <SheetContent className="flex flex-col">
            <div className="mx-auto my-8">
              <Link
                href="/"
                className="flex text-left justify-center items-center gap-2 font-semibold"
              >
                <Image
                  src="/images/logo.png"
                  alt="Charing Cub"
                  width={80}
                  height={80}
                />
              </Link>
            </div>
            <nav className="grid-gap-2 space-y-4 font-poppins">
              {links.map((link) => (
                <NavLink key={link.label} {...link} />
              ))}

              <>
                <div className="flex flex-col space-y-4">
                  <Button>
                    <Link href="/login">Login</Link>
                  </Button>
                  <Button variant="outline">
                    <Link href="/register">Register</Link>
                  </Button>
                </div>
              </>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}
