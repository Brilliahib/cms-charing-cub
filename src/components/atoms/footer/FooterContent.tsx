import Image from "next/image";
import Link from "next/link";

export default function FooterContent() {
  return (
    <>
      <footer className="lg:pt-24 md:pt-18 pt-12">
        <div className="pad-x">
          <hr className="lg:mb-16 md:mb-12 mb-8" />
          <div className="grid md:grid-cols-4 grid-cols-1 lg:gap-12 md:gap-8 gap-6 lg:mb-16 md:mb-12 mb-8">
            <div className="lg:space-y-10 md:space-y-8 space-y-6">
              <div className="space-y-4">
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
                  <p className="text-sm text-muted-foreground">
                    Jl. Prof. Soedarto No.13, Tembalang, Kec. Tembalang, Kota
                    Semarang, Jawa Tengah 50275
                  </p>
                </div>
              </div>
              {/* <div className="space-y-2">
                <h1 className="font-semibold">Sponsor</h1>
                <Image
                  src={"/images/pertamina.jpg"}
                  alt="Pertamina Gas Negara"
                  width={1155}
                  height={404}
                  className="max-w-[60px]"
                />
              </div> */}
            </div>
            <div>
              <ul className="space-y-6 md:space-y-8 lg:space-y-4 text-sm text-muted-foreground">
                <h1 className="font-bold text-xl text-black">
                  One Step to
                  <br />
                  Embrace Love
                </h1>
                <li>
                  <Link href={"/"} className="hover:underline">
                    About Us
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <ul className="space-y-6 md:space-y-8 lg:space-y-4 text-sm text-muted-foreground">
                <li>
                  <Link href={"/"} className="hover:text-primary">
                    Cub Location
                  </Link>
                </li>
                <li>
                  <Link href={"/"} className="hover:text-primary">
                    Cub Nest
                  </Link>
                </li>
                <li>
                  <Link href={"/"} className="hover:text-primary">
                    Cub Care
                  </Link>
                </li>
                <li>
                  <Link href={"/"} className="hover:text-primary">
                    Cub Able
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <ul className="space-y-6 md:space-y-8 lg:space-y-4 text-sm text-muted-foreground">
                <li>
                  <Link href={"/"} className="hover:text-primary">
                    Hubungi Kami
                  </Link>
                </li>
                <li>
                  <Link href={"/"} className="hover:text-primary">
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="py-4 md:py-6 lg:py-8 text-center space-y-6">
            <hr />
            <p className="text-sm text-muted-foreground">
              © 2024 Charing Cub | One Step to Embrace Love
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
