"use client"

import { TextReveal } from "@/components/ui/text-reveal";


export default function ScrollReveal() {

  return (
    <div className="max-w-7xl mx-auto grid lg:grid-cols-[1fr,2fr] items-start justify-center ">
    <div
      className="md:sticky top-24 px-12 md:py-40"
    >
    <h1 className="text-[#CCFF00] font-bold text-4xl md:text-5xl lg:text-6xl leading-tight">
      About Wonder&apos;s
    </h1>
    </div>
    <TextReveal text="At Wonder Creative Studio, we believe in creating more than just designs and websites; we build relationships and drive results. Our team of experts combines creativity, technology, and strategy to deliver solutions that resonate with your audience and fuel your business growth. Founded on the principles of innovation and excellence, Wonder Creative Studio has successfully partnered with over 250+ clients across industries, delivering impactful results every time." className="text-2xl md:text-3xl lg:text-4xl font-light leading-relaxed tracking-wide"/>
  </div>
  )
}

