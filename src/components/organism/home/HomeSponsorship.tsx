import Image from "next/image";
import Link from "next/link";

const sponsors = [
  {
    name: "Transmarga Jateng",
    href: "https://www.transmargajateng.co.id/",
    image: "/images/sponsor/tmj.png",
  },
  {
    name: "Universitas Diponegoro",
    href: "https://www.undip.ac.id/",
    image: "/images/sponsor/undip.png",
  },
  {
    name: "Hutama Karya",
    href: "https://www.hutamakarya.com/",
    image: "/images/sponsor/hk.png",
  },
];

export default function HomeSponsorship() {
  return (
    <div className="pad-x-xl">
      <div className="flex flex-col space-y-12">
        <div className="md:w-[70rem] w-fit relative flex flex-col">
          <h1 className="font-paytone tracking-tighter text-3xl sm:text-5xl text-zinc-700 relative z-10">
            SPONSORED BY💸
          </h1>
          <span className="absolute -translate-y-7 w-[16rem] md:w-[26rem] h-[2rem] bg-gradient-to-r from-purple-500 to-purple-100 md:top-10 top-8 -rotate-2 z-0 opacity-30"></span>
        </div>
        <div>
          <div className="flex md:flex-row flex-col items-center gap-8">
            {sponsors.map((sponsor, index) => (
              <Link
                href={sponsor.href}
                target="_blank"
                key={index}
                className="relative group w-[250px] h-[150px] flex items-center justify-center"
              >
                <Image
                  src={sponsor.image}
                  alt={sponsor.name}
                  width={250}
                  height={150}
                  className="w-full h-full object-contain"
                />
                <div className="absolute inset-0 bg-white bg-opacity-60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
                  <p className="text-lg font-semibold text-center px-4 font-semibold">
                    {sponsor.name}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
