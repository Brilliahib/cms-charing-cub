import Image from "next/image";

import { Link as Navbar } from "@/components/organism/navbar/Navbar";

import Link from "next/link";

export default function NavL() {
  return (
    <>
      <div className="flex items-center gap-4">
        <div className="flex items-center">
          <Link href={"/"}>
            <Image
              src={"/images/logo.png"}
              alt="Charing Cub"
              width={1155}
              height={404}
              className="max-w-[60px]"
            />
          </Link>
        </div>
      </div>
    </>
  );
}
