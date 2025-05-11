import React from "react";

export default function HomeIntroVideo() {
  return (
    <div className="space-y-12 pad-x-xl">
      <div className="md:w-[70rem] w-fit">
        <h1 className="font-paytone tracking-tighter text-3xl sm:text-5xl text-zinc-700 relative z-10">
          Kenali Lebih Dekat!👀
        </h1>
        <span className="md:w-[25rem] w-[20rem] h-[2rem] bg-gradient-to-r from-yellow-500 to-yellow-100 absolute -rotate-2 -translate-y-7 z-0 opacity-30"></span>
      </div>
      <iframe
        className="w-full md:min-h-[500px] min-h-[250px] rounded-3xl"
        src="https://www.youtube.com/embed/jZRR7JKAMxg?si=O-lbRWuQ0wbJqQmm"
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      ></iframe>
    </div>
  );
}
