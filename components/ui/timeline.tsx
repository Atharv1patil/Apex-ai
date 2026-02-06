"use client";

import {
  useScroll,
  useTransform,
  motion,
} from "motion/react";
import React, { useEffect, useRef, useState } from "react";

interface TimelineEntry {
  title: string;
  content: React.ReactNode;
}

export const Timeline = ({ data }: { data: TimelineEntry[] }) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (ref.current) {
      setHeight(ref.current.getBoundingClientRect().height);
    }
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
      className="relative w-full bg-black text-white px-4 md:px-10 py-36"
    >
      <div ref={ref} className="relative max-w-7xl mx-auto">

        {/* CENTER GRADIENT LINE */}
        <div className="absolute left-1/2 top-0 bottom-0 -translate-x-1/2 w-[4px] bg-neutral-800 pointer-events-none">
          <motion.div
            style={{ height: heightTransform, opacity: opacityTransform }}
            className="
              absolute inset-x-0 top-0 w-[4px]
              bg-gradient-to-b from-cyan-400 via-blue-500 to-purple-600
              rounded-full
              shadow-[0_0_30px_rgba(34,211,238,0.7)]
            "
          />
        </div>

        {data.map((item, index) => {
          const isLeft = index % 2 === 0;

          return (
            <div
              key={index}
              className="relative grid grid-cols-1 md:grid-cols-[1fr_60px_1fr] gap-10 py-32 items-start"
            >
              {/* LEFT CONTENT */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                viewport={{ once: true, margin: "-120px" }}
                className={`hidden md:block ${
                  isLeft ? "text-right pr-10" : ""
                }`}
              >
                {isLeft && (
                  <>
                    <h3 className="text-5xl font-extrabold mb-4 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                      {item.title}
                    </h3>

                    <div className="text-xl text-neutral-300 leading-relaxed max-w-xl ml-auto">
                      {item.content}
                    </div>
                  </>
                )}
              </motion.div>

              {/* CENTER DOT */}
              <div className="relative flex justify-center items-start">
                <motion.div
                  className="
                    h-7 w-7 rounded-full
                    bg-gradient-to-r from-cyan-400 to-purple-500
                    border-4 border-black
                    shadow-[0_0_25px_rgba(34,211,238,0.9)]
                    mt-4 z-10
                  "
                  animate={{
                    boxShadow: [
                      "0 0 15px rgba(34,211,238,0.7)",
                      "0 0 30px rgba(168,85,247,0.9)",
                      "0 0 15px rgba(34,211,238,0.7)",
                    ],
                  }}
                  transition={{ duration: 2.5, repeat: Infinity }}
                />
              </div>

              {/* RIGHT CONTENT */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                viewport={{ once: true, margin: "-120px" }}
                className={`${!isLeft ? "text-left pl-10" : ""}`}
              >
                {!isLeft && (
                  <>
                    <h3 className="text-5xl font-extrabold mb-4 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                      {item.title}
                    </h3>

                    <div className="text-xl text-neutral-300 leading-relaxed max-w-xl">
                      {item.content}
                    </div>
                  </>
                )}

                {/* MOBILE VIEW */}
                <div className="md:hidden">
                  <h3 className="text-4xl font-extrabold mb-4 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                    {item.title}
                  </h3>

                  <div className="text-lg text-neutral-300 leading-relaxed">
                    {item.content}
                  </div>
                </div>
              </motion.div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
