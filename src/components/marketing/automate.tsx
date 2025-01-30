import React from "react";

export default function Automate() {
    return (
      <section className=" max-w-screen-xl p-4 mt-24 md:mt-0 md:py-36 mx-auto">
        <div className=" flex md:flex-row flex-col justify-between items-center ">
          <div className="flex flex-col gap-6">
            <div className="md:text-[54px] text-[38px] text-nowrap leading-[35px] md:leading-[60px] font-medium">
              Your Partner in
              <br /> the{" "}
              <span className=" bg-clip-text text-transparent  bg-gradient-to-r from-green-400/90 to-blue-500 ">
                {" "}
                Growth & Innovation
              </span>{" "}
            </div>
            <div className=" max-w-[476px] text-[15px] md:text-[18px]  mt-[24px] text-wrap  text-zinc-400/90 leading-6">
              At Wonder Creative Studio, we believe in creating more than just designs and websites; we build relationships and drive results.{" "}
              Our team of experts combines creativity, technology,and strategy to deliver solutions that resonate with your audience and fuel your business growth.
              Founded on the principles of innovation and excellence, Wonder Creative Studio has successfully partnered with over 100+ clients across industries, delivering impactful results every time.
            </div>
          </div>
          <div>
            <video
              className=" aspect-square w-[547px]"
              src="https://cdn.jsdelivr.net/gh/leo-mattar/uplinq/Uplinq-hm-build.mp4"
              muted={true}
              autoPlay
              playsInline
            ></video>
          </div>
        </div>
      </section>
    );
  }