import Image from "next/image";

export default function HomePsychology() {
  const psikolog = [
    {
      id: 1,
      name: "Dini Asih Febriyanti, S.Psi, M.Psi",
      image: "/images/psikolog/dini-asih.png",
    },
    {
      id: 2,
      name: "Adi Dinardinata, S.Psi, M.Psi",
      image: "/images/psikolog/adi.png",
    },
    {
      id: 3,
      name: "Aldani Putri Wijayanti, S.Psi., M.Sc",
      image: "/images/psikolog/aldani.png",
    },
    {
      id: 4,
      name: "Hasan Fahrur Rozi, S.Psi., M.Psi., Psikolog",
      image: "/images/psikolog/hasan-fahrur.png",
    },
  ];
  return (
    <div className="space-y-12 pad-x-xl">
      <div className="md:w-[70rem] w-fit">
        <h1 className="font-paytone tracking-tighter text-3xl sm:text-5xl text-zinc-700 relative z-10">
          <span className="block md:hidden">Kolaborasi Psikolog🤝</span>
          <span className="hidden md:block">Kolaborasi dengan Psikolog🤝</span>
        </h1>
        <span className="md:w-[40rem] w-[20rem] h-[2rem] bg-gradient-to-r from-yellow-500 to-yellow-100 absolute -rotate-2 -translate-y-7 z-0 opacity-30"></span>
      </div>
      <div className="grid md:grid-cols-4 grid-cols-2 gap-6">
        {psikolog.map((psikolog) => (
          <div key={psikolog.id} className="flex flex-col gap-4">
            <Image
              src={psikolog.image}
              alt={psikolog.name}
              width={400}
              height={400}
              className="w-full md:h-[300px] h-[180px] object-cover rounded-xl bg-primary/90"
            />
            <h1 className="font-semibold md:text-lg text-sm text-center">
              {psikolog.name}
            </h1>
          </div>
        ))}
      </div>
    </div>
  );
}
