"use client"

import React from "react"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Smartphone, Video, MessageCircle, ArrowRight, CheckCircle, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { cn } from "@/lib"

// Enhanced MagicCard component with better hover effects
const EnhancedMagicCard = ({
  children,
  className,
  index = 0,
}: {
  children: React.ReactNode
  className?: string
  index?: number
}) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1 * index }}
      className={cn("relative p-6 rounded-xl overflow-hidden group", className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Animated gradient border */}
      <div
        className={cn(
          "absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700",
          "bg-gradient-to-r from-[#c4ea00] via-[#d8ff4d] to-[#c4ea00] bg-[length:400%_400%]",
        )}
        style={{
          animation: isHovered ? "gradient 8s ease infinite" : "none",
        }}
      />

      {/* Card background with inner border effect */}
      <div className="absolute inset-[1px] bg-[#151515] rounded-[10px] z-10" />

      {/* Content */}
      <div className="relative z-20">{children}</div>
    </motion.div>
  )
}

// Feature list component
const FeatureList = ({ features }: { features: string[] }) => {
  return (
    <ul className="mt-4 space-y-2">
      {features.map((feature, idx) => (
        <motion.li
          key={idx}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 + idx * 0.1 }}
          className="flex items-start text-left"
        >
          <CheckCircle className="h-5 w-5 text-[#c4ea00] mr-2 flex-shrink-0 mt-0.5" />
          <span className="text-gray-400 text-sm">{feature}</span>
        </motion.li>
      ))}
    </ul>
  )
}

export default function AppDemoSection() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const demoCards = [
    {
      icon: <Smartphone />,
      title: "Interactive Prototypes",
      desc: "Experience real app UI/UX before development begins. Test interactions and provide feedback early.",
      features: ["Clickable UI mockups", "Real user flows", "Design iterations based on feedback"],
    },
    {
      icon: <Video />,
      title: "Live App Demos",
      desc: "Explore fully functional versions of past projects with simulated data and real-time interactions.",
      features: ["Functional features demonstration", "Simulated data environment", "Cross-platform testing"],
    },
    {
      icon: <MessageCircle />,
      title: "Real-Time Consultation",
      desc: "Book a screen-sharing session with our experts to discuss your project needs and possibilities.",
      features: ["Expert technical guidance", "Collaborative ideation", "Immediate feedback loop"],
    },
  ]

  return (
    <div className="py-24 bg-[#0a0a0a] relative overflow-hidden">
      {/* Animated background elements */}
      {/* <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-5">
          <div className="absolute top-[20%] left-[10%] w-[40rem] h-[40rem] rounded-full bg-[#c4ea00] blur-[10rem]" />
          <div className="absolute bottom-[10%] right-[10%] w-[30rem] h-[30rem] rounded-full bg-[#c4ea00] blur-[10rem]" />
        </div>

        Grid pattern overlay
        <div
          className="absolute inset-0 bg-[url('/abstract-grid.png')] opacity-5"
          style={{ backgroundSize: "30px 30px" }}
        />

        Decorative elements
        <div className="absolute top-20 left-10 w-32 h-32 border border-[#c4ea00]/10 rounded-full" />
        <div className="absolute bottom-40 right-20 w-24 h-24 border border-[#c4ea00]/10 rounded-full" />
      </div> */}

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <div className="inline-block px-4 py-1.5 mb-6 rounded-full bg-[#c4ea00]/10 border border-[#c4ea00]/20">
            <span className="text-[#c4ea00] text-sm font-medium tracking-wide">INTERACTIVE DEMONSTRATIONS</span>
          </div>

          <h2 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl mb-6">
            Experience Before You Invest
            <span className="block text-[#c4ea00] mt-2">Live App Demos & Prototypes</span>
          </h2>

          <p className="max-w-2xl mx-auto text-gray-400 text-lg">
            See exactly what you're getting before making any commitments. Our interactive demos and prototypes give you
            a hands-on preview of your future application.
          </p>
        </motion.div>

        {/* Demo cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {demoCards.map((demo, index) => (
            <EnhancedMagicCard key={index} index={index + 1} className="h-full">
              <div className="flex flex-col h-full">
                <div className="mb-6 p-4 rounded-full bg-[#c4ea00]/10 w-16 h-16 flex items-center justify-center mx-auto">
                  {React.cloneElement(demo.icon, { className: "w-8 h-8 text-[#c4ea00]" })}
                </div>

                <h3 className="text-2xl font-semibold mb-3">{demo.title}</h3>
                <p className="text-gray-400 mb-6">{demo.desc}</p>

                <FeatureList features={demo.features} />

                <div className="mt-auto pt-6">
                  <Link href="/leadform" className="w-full">
                    <Button
                      size="lg"
                      className="w-full bg-[#1a1a1a] hover:bg-[#c4ea00] hover:text-black border border-[#c4ea00]/30 text-[#c4ea00] hover:border-transparent transition-all duration-300 group"
                    >
                      Book Your Demo
                      <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </div>
              </div>
            </EnhancedMagicCard>
          ))}
        </div>

        {/* CTA section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#c4ea00]/20 to-[#c4ea00]/5 px-6 py-4 rounded-full">
            <span className="text-white">Ready to see your ideas come to life?</span>
            <Link href="/leadform">
              <Button size="sm" className="bg-[#c4ea00] text-black hover:bg-[#d8ff4d]">
                Schedule All 3 Demos <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
