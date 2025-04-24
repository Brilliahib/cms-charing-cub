import Image from "next/image";

export default function HomeSponsorship() {
  return (
    <div className="pad-x-xl">
      <div className="flex flex-col items-center justify-center space-y-12">
        <div className="md:w-[70rem] w-fit relative flex flex-col items-center">
          <h1 className="font-paytone tracking-tighter text-3xl sm:text-5xl text-zinc-700 relative z-10 text-center">
            SPONSORED BY💸
          </h1>
          <span className="absolute left-1/2 -translate-x-1/2 -translate-y-7 w-[16rem] md:w-[26rem] h-[2rem] bg-gradient-to-r from-purple-500 to-purple-100 md:top-10 top-8 -rotate-2 z-0 opacity-30"></span>
        </div>
        <div>
          <div className="flex md:flex-row flex-col items-center gap-12">
            <Image
              src={"/images/sponsor/tmj.png"}
              alt="Transmarga Jateng"
              width={1000}
              height={1000}
              className="md:max-w-[250px] max-w-[200px] w-full object-contain"
            />
            <Image
              src={"/images/sponsor/undip.png"}
              alt="Universitas Diponegoro"
              width={1000}
              height={1000}
              className="md:max-w-[150px] max-w-[150px] w-full object-contain"
            />
            <Image
              src={"/images/sponsor/hk.png"}
              alt="Hutama Karya"
              width={1000}
              height={1000}
              className="md:max-w-[200px] max-w-[150px] w-full object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
