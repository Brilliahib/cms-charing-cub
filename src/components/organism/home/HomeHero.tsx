export default function HomeHero() {
  return (
    <>
      <div
        className="relative min-h-[80vh] rounded-2xl w-full flex flex-col items-center text-center justify-center"
        style={{
          backgroundImage: 'url("/images/background.png")',
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <h1 className="font-bold md:text-6xl text-5xl text-white">
          &quot;One Step to Embrace Love&quot;
        </h1>

        {/* menu */}
        <div className="absolute bottom-[-30px] flex justify-center items-center w-full md:px-0 px-8">
          <div className="relative w-fit p-[2px] bg-gradient-to-r from-[#7E5CBE] via-[#79919A] to-[#EED584] rounded-full flex gap-8">
            <div className="bg-white rounded-full flex gap-8 md:p-4 p-2 px-8">
              <div>
                <h1 className="font-semibold md:text-base text-sm">
                  Cub Location
                </h1>
              </div>
              <div>
                <h1 className="font-semibold md:text-base text-sm">Cub Nest</h1>
              </div>
              <div>
                <h1 className="font-semibold md:text-base text-sm">Cub Care</h1>
              </div>
              <div>
                <h1 className="font-semibold md:text-base text-sm">Cub Able</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
