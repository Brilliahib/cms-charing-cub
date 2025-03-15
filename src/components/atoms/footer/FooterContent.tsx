import Image from "next/image";
import Link from "next/link";

export default function FooterContent() {
  return (
    <>
      <footer className="bg-primary text-white mt-16 md:mt-24">
        <div className="pad-x-xl">
          <div className="grid grid-cols-1 gap-12 md:gap-16 py-8 md:grid-cols-4">
            <div className="space-y-2 md:space-y-4">
              <div className="flex items-center gap-2">
                <Image
                  src={"/images/logo.png"}
                  alt="Charing Cub"
                  width={1155}
                  height={404}
                  className="max-w-[60px]"
                />
                <h1 className="font-bold">Charing Cub</h1>
              </div>
              <div>
                <p className="text-sm">
                  Jl. Prof. Soedarto No.13, Tembalang, Kec. Tembalang, Kota
                  Semarang, Jawa Tengah 50275
                </p>
              </div>
            </div>
            <div className="space-y-2 md:space-y-4">
              <h1 className="font-semibold">Fitur Kami</h1>
              <ul className="space-y-6 md:space-y-8 lg:space-y-4 text-sm">
                <li>
                  <Link href={"/cub-location"} className="hover:underline">
                    Cub Location
                  </Link>
                </li>
                <li>
                  <Link href={"/cub-talk"} className="hover:underline">
                    Cub Talk
                  </Link>
                </li>
                <li>
                  <Link href={"/cub-care"} className="hover:underline">
                    Cub Care
                  </Link>
                </li>
                <li>
                  <Link href={"/cub-able"} className="hover:underline">
                    Cub Able
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-2 md:space-y-4">
              <h1 className="font-semibold">Pusat Bantuan</h1>
              <ul className="space-y-6 md:space-y-8 lg:space-y-4 text-sm">
                <li>
                  <Link href={"/privacy-policy"} className="hover:underline">
                    Kebijakan Privasi
                  </Link>
                </li>
                <li>
                  <Link
                    href={"/terms-and-condition"}
                    className="hover:underline"
                  >
                    Syarat dan Ketentuan
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-2 md:space-y-4">
              <h1 className="font-semibold">Ikuti Kami</h1>
              <ul className="space-y-6 md:space-y-8 lg:space-y-4 text-sm">
                <li>
                  <Link
                    href={"https://www.instagram.com/charing.cub"}
                    target="_blank"
                    className="hover:underline"
                  >
                    Instagram
                  </Link>
                </li>
                <li>
                  <Link href={"/articles"} className="hover:underline">
                    Blog
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="py-4 md:py-6 lg:py-8 space-y-6">
            <p className="text-sm">
              © 2025 Charing Cub | One Step to Embrace Love
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
