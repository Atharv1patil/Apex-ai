"use client";

import { useScroll, useTransform, motion } from "motion/react";
import React, { useEffect, useRef, useState } from "react";

interface TimelineEntry {
  title: string;
  date: string;
  content: React.ReactNode;
}

export const Time = ({ data }: { data: TimelineEntry[] }) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  // ✅ FIXED height calculation
  useEffect(() => {
    if (!ref.current) return;

    const resizeObserver = new ResizeObserver(() => {
      setHeight(ref.current!.getBoundingClientRect().height);
    });

    resizeObserver.observe(ref.current);

    return () => resizeObserver.disconnect();
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 80%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <section
      ref={containerRef}
      className="relative w-full text-white px-4 md:px-10 py-36  overflow-hidden"
    >
      <h2 className="flex items-center w-full text-4xl font-joffrey font-bold text-white mb-12">
             <span className="flex-grow h-1 bg-gray-100"></span>
             <span className="mx-6 text-6xl">TIMELINE</span>
             <span className="flex-grow h-1 bg-gray-100"></span>
             </h2>
      {/* ✅ Sparkles safely in background */}
      <div className="absolute inset-0 sparkles-bg opacity-40 pointer-events-none -z-10" />

      <div ref={ref} className="relative z-10 max-w-7xl mx-auto">

        {/* CENTER LINE */}
        <div className="absolute left-1/2 top-0 bottom-0 -translate-x-1/2 w-[4px] bg-neutral-800">
          <motion.div
            style={{ height: heightTransform, opacity: opacityTransform }}
            className="absolute top-0 w-[4px] bg-gradient-to-b from-cyan-400 via-blue-500 to-purple-600 rounded-full"
          />
        </div>

        {/* ✅ NO FILTER – show all data */}
        {data.map((item, index) => {
          const isLeft = index % 2 === 0;

          return (
            <div
              key={index}
              className="relative grid grid-cols-1 md:grid-cols-[1fr_60px_1fr] gap-10 py-32"
            >
              {/* LEFT */}
              <div className={`hidden md:block ${isLeft ? "text-right pr-10" : ""}`}>
                {isLeft && (
                  <>
                    <p className="font-joffrey text-sm tracking-[0.25em] text-white/60 mb-2">
                      {item.date}
                    </p>
                    <h3 className="font-joffrey text-5xl mb-4 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent tracking-wider">
                      {item.title}
                    </h3>
                    <div className="text-xl text-neutral-300 max-w-xl ml-auto">
                      {item.content}
                    </div>
                  </>
                )}
              </div>

              {/* DOT */}
              <div className="flex justify-center">
                <div className="h-7 w-7 rounded-full bg-gradient-to-r from-cyan-400 to-purple-500 border-4 border-black" />
              </div>

              {/* RIGHT */}
              <div className={`${!isLeft ? "pl-10" : ""}`}>
                {!isLeft && (
                  <>
                    <p className="font-joffrey text-sm tracking-[0.25em] text-white/60 mb-2">
                      {item.date}
                    </p>
                    <h3 className="font-joffrey text-5xl mb-4 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent tracking-wider">
                      {item.title}
                    </h3>
                    <div className="text-xl text-neutral-300 max-w-xl">
                      {item.content}
                    </div>
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
