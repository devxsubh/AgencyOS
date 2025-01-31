"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion"
import { Monitor, PenTool, Palette, Code, BrainCircuit, Globe, ArrowUpRight } from "lucide-react"
import Container from "../global/container"

interface Service {
  id: string
  title: string
  icon: React.ReactNode
  image: string
  headline: string
  description: string
}

const services: Service[] = [
  {
    id: "website-app",
    title: "WEBSITE & APP DEVELOPMENT",
    icon: <Monitor className="size-5" />,
    image: "/images/WebsiteApp.avif",
    headline: "Build a Digital Experience That Stands Out",
    description:
      "Whether you need a website to showcase your brand or an app to engage your audience, we deliver high-performance digital solutions tailored to your goals [Custom-coded and CMS-based websites, Cross-platform mobile applications, Seamless user experiences with premium designs]",
  },
  {
    id: "ai-sales",
    title: "AI-DRIVEN SALES PROCESSES",
    icon: <BrainCircuit className="size-5" />,
    image: "/images/Ai.avif",
    headline: "Harness AI to Drive More Sales",
    description:
      "Leverage the power of AI to enhance your sales processes. Our solutions include predictive analytics, personalized outreach, and automated follow-ups, ensuring no opportunity is missed",
  },
  {
    id: "branding",
    title: "BRANDING & DESIGN",
    icon: <Palette className="size-5" />,
    image:"/images/Branding.avif",
    headline: "Create a Memorable Brand Identity",
    description:
      "We craft compelling brand identities that leave a lasting impression. From logo design to comprehensive brand guidelines, we ensure your brand stands out and connects with your audience",
  },
  {
    id: "automated",
    title: "AUTOMATED BUSINESS SOLUTIONS",
    icon: <Code className="size-5" />,
    image: "/images/Automated.avif",
    headline: "Streamline Your Operations for Maximum Efficiency",
    description:
      "Save time and resources with our advanced automation tools. From CRM integration to workflow automation, we optimize your business processes to improve productivity and client satisfaction",
  },
  {
    id: "seo",
    title: "SEO OPTIMIZATION",
    icon: <Globe className="size-5" />,
    image: "/images/seo.avif",
    headline: "Rank Higher, Reach Further",
    description:
      "Get discovered by your audience with our SEO services. From on-page optimization to technical SEO and link building, we ensure your website ranks higher and attracts quality traffic",
  },
  {
    id: "performance",
    title: "PERFORMANCE MARKETING",
    icon: <PenTool className="size-5" />,
    image: "/images/Automated.avif",
    headline: "Drive Results with Data-Driven Campaigns",
    description:
      "Our performance marketing solutions are designed to maximize ROI. Using targeted strategies and analytics-driven insights, we help you reach the right audience at the right time",
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

//   const blurIntensity = useTransform([mouseX, mouseY], ([latestX, latestY]) =>
//     Math.abs(Math.sin(latestX * latestY * 0.00001) * 10),
//   )

  return (
    <section className="text-white py-20 overflow-hidden relative">
      <div className="max-w-6xl mx-auto relative" ref={containerRef}>
      <Container>
        <motion.h2
          className="text-4xl md:text-5xl lg:text-6xl mb-6 text-center font-medium"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Our Services
        </motion.h2>
        <motion.p
          className="text-center text-lg text-white/70 mb-16 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Empowering Your Business with Innovative Digital Solutions
          From custom development to AI-driven growth strategies, our services are designed to transform your ideas into impactful, scalable solutions.     
        </motion.p>
      </Container>

        <div className="space-y-8">
          {services.map((service, index) => (
            <Container delay={0.1 + index * 0.1} key={service.id}>
            <motion.div
              key={service.id}
              className="relative flex items-center border-t border-white/10 py-6 cursor-pointer group"
              onMouseEnter={() => setHoveredService(service.id)}
              onMouseLeave={() => setHoveredService(null)}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
            >
              <motion.div
                className="flex items-center gap-4 w-full"
                whileHover={{ x: 20 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <motion.span
                  className="text-white/60"
                  whileHover={{ scale: 1.2, rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  {service.icon}
                </motion.span>
                <div className="flex-grow">
                  <h3 className="text-lg md:text-xl font-medium tracking-wide group-hover:text-white/90 transition-colors">
                    {service.title}
                  </h3>
                  <motion.div
                    className="overflow-hidden"
                    initial={{ height: 0 }}
                    animate={{
                      height: hoveredService === service.id ? "auto" : 0,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <h4 className="text-md font-semibold mt-2 mb-1 text-white/80">{service.headline}</h4>
                    <p className="text-sm text-white/60 max-w-md">{service.description}</p>
                  </motion.div>
                </div>
              </motion.div>

              <AnimatePresence>
                {hoveredService === service.id && (
                  <motion.div
                    className="absolute right-0 w-[300px] h-[200px] rounded-lg overflow-hidden"
                    initial={{ opacity: 0, scale: 0.8, y: 20 }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                      y: 0,
                      x: mouseX.get() > window.innerWidth / 2 ? -350 : 50,
                    }}
                    exit={{ opacity: 0, scale: 0.8, y: 20 }}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 20,
                    }}
                    style={{
                      y: imgY,
                      translateY: "-50%",
                    }}
                  >
                    <motion.div
                      className="w-full h-full bg-cover bg-center relative"
                      style={{
                        backgroundImage: `url(${service.image})`,
                        backgroundPosition: "center",
                      }}
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <div className="absolute inset-0 bg-black/20" />
                    </motion.div>
                  </motion.div>
                  
                  
                )}
                <motion.span
                  key={service.id}
                  className="text-white/60"
                  whileHover={{ scale: 1.2, rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                <ArrowUpRight/>
                </motion.span>
              </AnimatePresence>
            </motion.div>
            </Container>
          ))}
        </div>
      </div>
    </section>
  )
}