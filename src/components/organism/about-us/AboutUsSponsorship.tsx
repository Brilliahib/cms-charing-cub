import Image from "next/image";

export default function AboutUsSponsorship() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-primary bg-clip-text text-center font-paytone text-4xl">
          Didukung Oleh
        </h1>
      </div>
      <div className="flex justify-center gap-12 items-center">
        <Image
          src={"/images/sponsor/undip.png"}
          alt="Undip"
          width={1000}
          height={1000}
          className="max-w-[100px]"
        />
        <Image
          src={"/images/sponsor/tmj.png"}
          alt="Undip"
          width={1000}
          height={1000}
          className="max-w-[100px]"
        />
        <Image
          src={"/images/sponsor/innopa.png"}
          alt="Undip"
          width={1000}
          height={1000}
          className="max-w-[100px]"
        />
      </div>
    </div>
  );
}
