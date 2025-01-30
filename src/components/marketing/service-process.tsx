"use client"

import { ClipboardCheck, Lightbulb, Rocket, LineChart } from "lucide-react"
import { motion } from "framer-motion"
import { useState } from "react"

export default function ServiceProcess() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  }

  const services = [
    {
      icon: Lightbulb,
      title: "Discovery",
      description: "Understanding your goals and audience",
    },
    {
      icon: ClipboardCheck,
      title: "Strategy",
      description: "Developing a tailored plan",
    },
    {
      icon: Rocket,
      title: "Execution",
      description: "Delivering innovative solutions with precision",
    },
    {
      icon: LineChart,
      title: "Optimization",
      description: "Continuously improving for better results",
    },
  ]

  return (
    <div className="container mx-auto px-4 py-16 max-w-7xl mt-12">
      {/* Header Section */}
      <motion.div
        className="text-center mb-16 space-y-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.h2
          className="text-sm uppercase tracking-wider text-white/70"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Our Process
        </motion.h2>
        <motion.h1
          className="text-3xl md:text-4xl font-samibold text-white tracking-tight"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          From Concept to Execution, We've Got You Covered
        </motion.h1>
      </motion.div>

      {/* Decorative Wave */}


      {/* Service Grid */}
      <motion.div
        className="grid md:grid-cols-4 gap-8 md:gap-12 mt-12"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {services.map((service, index) => (
          <motion.div
            key={service.title}
            className="text-center space-y-4 relative"
            variants={itemVariants}
            onHoverStart={() => setHoveredIndex(index)}
            onHoverEnd={() => setHoveredIndex(null)}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <motion.div
              className="flex justify-center"
              animate={{
                rotate: hoveredIndex === index ? [0, -10, 10, -10, 0] : 0,
              }}
              transition={{ duration: 0.5 }}
            >
              <div className="p-3 rounded-full bg-[#C4EA00]/10 relative overflow-hidden group">
                <motion.div
                  className="absolute inset-0 bg-[#C4EA00]/20"
                  initial={{ scale: 0 }}
                  animate={{
                    scale: hoveredIndex === index ? 1 : 0,
                    opacity: hoveredIndex === index ? 1 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                />
                <service.icon className="w-8 h-8 text-[#C4EA00] relative z-10" />
              </div>
            </motion.div>
            <motion.h3
              className="text-xl font-semibold text-white uppercase tracking-wide"
              animate={{
                scale: hoveredIndex === index ? 1.1 : 1,
              }}
              transition={{ duration: 0.2 }}
            >
              {service.title}
            </motion.h3>
            <p className="text-white/70 leading-relaxed">{service.description}</p>
            {hoveredIndex === index && (
              <motion.div
                className="absolute inset-0 -z-10 rounded-xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                style={{
                  background: "radial-gradient(circle at center, rgba(11,59,117,0.05) 0%, transparent 70%)",
                }}
              />
            )}
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}

