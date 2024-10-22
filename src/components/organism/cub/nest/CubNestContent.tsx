import Link from "next/link";

export default function CubNestContent() {
  return (
    <>
      <div className="mx-auto px-4 max-w-[1400px]">
        <div
          className="relative min-h-[80vh] rounded-2xl w-full flex flex-col items-center text-center justify-center"
          style={{
            backgroundImage: 'url("/images/background-2.jpg")',
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <h1 className="font-bold md:text-6xl text-5xl text-white">
            Cub Nest
          </h1>

          {/* menu */}
          <div className="absolute bottom-[-30px] flex justify-center items-center w-full md:px-0 px-8">
            <div className="relative w-fit p-[2px] bg-gradient-to-r from-[#7E5CBE] via-[#79919A] to-[#EED584] rounded-full flex gap-8">
              <div className="bg-white rounded-full flex gap-8 md:p-4 md:px-8 p-2 px-8">
                <Link
                  href={"/cub-location"}
                  className="hover:underline hover:text-primary"
                >
                  <h1 className="font-semibold md:text-base text-sm">
                    Cub Location
                  </h1>
                </Link>
                <Link
                  href={"/cub-nest"}
                  className="hover:underline hover:text-primary"
                >
                  <h1 className="font-semibold md:text-base text-sm">
                    Cub Nest
                  </h1>
                </Link>
                <Link
                  href={"/cub-care"}
                  className="hover:underline hover:text-primary"
                >
                  <h1 className="font-semibold md:text-base text-sm">
                    Cub Care
                  </h1>
                </Link>
                <Link
                  href={"/cub-able"}
                  className="hover:underline hover:text-primary"
                >
                  <h1 className="font-semibold md:text-base text-sm">
                    Cub Able
                  </h1>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
