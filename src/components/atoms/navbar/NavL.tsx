import Image from "next/image";

import { Link as Navbar } from "@/components/organism/navbar/Navbar";

import Link from "next/link";

export default function NavL() {
  return (
    <>
      <div className="flex items-center gap-4">
        <div className="flex items-center">
          <Link href={"/"} className="flex items-center gap-2">
            <Image
              src={"/images/logo.png"}
              alt="Charing Cub"
              width={1155}
              height={404}
              className="max-w-[60px]"
            />
            <div className="text-sm">
              <h1 className="font-bold">Charing Cub</h1>
              <p>One Step to Embrace Love</p>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
}
