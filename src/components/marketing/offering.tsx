"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion"
import Link from "next/link"
import { Button } from "../ui/button"
import Container from "../global/container"
interface Service {
  id: string
  number: string
  title: string
  image: string
  headline: string
  description: string
  href: string
}

const services: Service[] = [
  {
    id: "branding",
    number: "01",
    title: "Branding",
    image: "/images/Branding.avif",
    href: "/branding",
    headline: "Create a Memorable Brand Identity",
    description:
      "We craft compelling brand identities that leave a lasting impression. From logo design to comprehensive brand guidelines, we ensure your brand stands out and connects with your audience.",
  },
  {
    id: "marketing",
    number: "02",
    title: "Marketing and Automation",
    image: "/images/Automated.avif",
    href: "/automation",
    headline: "Drive Results with Data-Driven Campaigns",
    description:
      "Our performance marketing solutions are designed to maximize ROI. Using targeted strategies and analytics-driven insights, we help you reach the right audience at the right time",
  },
  {
    id: "web",
    number: "03",
    title: "Web & App",
    image: "/images/WebsiteApp.avif",
    href: "/web-and-app",
    headline: "Build a Digital Experience That Stands Out",
    description:
      "Whether you need a website to showcase your brand or an app to engage your audience, we deliver high-performance digital solutions tailored to your goals [Custom-coded and CMS-based websites, Cross-platform mobile applications, Seamless user experiences with premium designs]",
  },
  {
    id: "seo",
    number: "04",
    title: "SEO Optimization",
    image: "/images/seo.avif",
    href: "/seo",
    headline: "Rank Higher, Reach Further",
    description:
      "Get discovered by your audience with our SEO services. From on-page optimization to technical SEO and link building, we ensure your website ranks higher and attracts quality traffic",
  },
  {
    id: "ai",
    number: "05",
    title: "AI-Driven Sales",
    image: "/images/Ai.avif",
    href: "/ai",
    headline: "Harness AI to Drive More Sales",
    description:
      "Leverage the power of AI to enhance your sales processes. Our solutions include predictive analytics, personalized outreach, and automated follow-ups, ensuring no opportunity is missed",
  },
  
]

export default function ServicesSection() {
  const [hoveredService, setHoveredService] = useState<string | null>(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const containerRef = useRef<HTMLDivElement>(null)

  const springConfig = { damping: 25, stiffness: 300 }
  const imgX = useSpring(mouseX, springConfig)
  const imgY = useSpring(mouseY, springConfig)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top
        mouseX.set(x)
        mouseY.set(y)
      }
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [mouseX, mouseY])

  return (
    <section className=" text-white py-20 px-4 md:px-4 lg:px-4 overflow-hidden relative mx-2">
      <div className="max-w-8xl mx-auto relative" ref={containerRef}>
        <motion.h2
          className="text-3xl md:text-4xl lg:text-5xl font-heading font-medium !leading-snug mt-6 mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Our Expertise
        </motion.h2>

        <div className="space-y-16">
          {services.map((service) => (
            <motion.div
              key={service.id}
              className="relative border-t border-zinc-800 pt-8"
              onMouseEnter={() => setHoveredService(service.id)}
              onMouseLeave={() => setHoveredService(null)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
            >
              <Link href={service.href}>
              <div className="flex items-start justify-between group">
                <div className="space-y-4">
                  <span className="text-[#c4ea00] text-lg">{service.number}</span>
                  <motion.h3 className="text-4xl md:text-4xl lg:text-5xl font-normal text-zinc-600 group-hover:text-white transition-colors duration-300">
                    {service.title}
                  </motion.h3>

                  <AnimatePresence>
                    {hoveredService === service.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="max-w-xl"
                      >
                        <h4 className="text-xl font-medium mb-2 text-zinc-200">{service.headline}</h4>
                        <p className="text-zinc-400">{service.description}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <AnimatePresence>
                  {hoveredService === service.id && (
                    <motion.div
                      className="relative w-[300px] h-[180px] rounded-lg overflow-hidden hidden md:block"
                      initial={{ opacity: 0, x: 100 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 100 }}
                      transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    >
                      <motion.img
                        src={service.image}
                        alt={service.title}
                        className="w-full h-full object-cover"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.3 }}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}