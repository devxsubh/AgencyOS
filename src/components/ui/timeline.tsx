"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Container from "../global/container";
import Link from "next/link";
import { Button } from "./button";

interface TimelineItem {
  title: string;
  content: React.ReactNode;
}

interface TimelineProps {
  data: TimelineItem[];
}

export const Timeline: React.FC<TimelineProps> = ({ data }) => {
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
    offset: ["start 10%", "end 50%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div className="w-full font-sans md:px-10" ref={containerRef}>
      <div className="max-w-7xl mx-auto py-20 px-4 md:px-8 lg:px-10">
      <h2 className="text-4xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
          Our Proven <span className="text-[#c3ea00]">6-Step App Development Process</span>
        </h2>
      </div>

      <div ref={ref} className="relative max-w-7xl mx-auto pb-20">
        {data.map((item, index) => (
          <div key={index} className="flex justify-start pt-10 md:pt-40 md:gap-10">
            {/* Sticky Year Title */}
            <div className="sticky flex flex-col md:flex-row z-40 items-center top-40 self-start max-w-xs lg:max-w-sm md:w-full">
              <div className="h-10 absolute left-3 w-10 rounded-full bg-white dark:bg-black flex items-center justify-center">
                <div className="h-4 w-4 rounded-full bg-[#c3ea00] border border-[#a4c800] p-2" />
              </div>
              <h3 className="hidden md:block text-xl md:pl-20 md:text-2xl font-bold text-[#c3ea00]">
                {item.title}
              </h3>
            </div>

            {/* Timeline Content */}
            <div className="relative pl-20 pr-4 md:pl-4 w-full">
              <h3 className="md:hidden block text-2xl mb-4 text-left font-bold text-[#c3ea00]">
                {item.title}
              </h3>
              <motion.div
                className="p-4 bg-[#1a1a1a] rounded-md border border-white/10 shadow-lg backdrop-blur-sm w-full"
                whileHover={{
                  scale: 1.02,
                  boxShadow: "0 8px 32px rgba(0,0,0,0.15)",
                }}
                transition={{ duration: 0.2 }}
              >
                {item.content}
              </motion.div>
            </div>
          </div>
        ))}

        {/* Timeline Vertical Line */}
        <div
          style={{ height: height + "px" }}
          className="absolute md:left-8 left-8 top-0 overflow-hidden w-[2px] bg-gradient-to-b from-transparent via-[#c3ea00] to-transparent"
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0 w-[2px] bg-gradient-to-t from-[#c3ea00] to-transparent rounded-full"
          />
        </div>
      </div>

      {/* CTA Section */}
      <Container delay={0.25} className="z-20">
            <div className="flex items-center justify-center mt-6 gap-x-4">
              <Link href="/leadform" className="flex items-center gap-2 group">
                <Button size="lg" className="bg-[#C4EA00]">
                Get a Personalized Development Plan
                </Button>
              </Link>
            </div>
          </Container>
    </div>
  );
};
