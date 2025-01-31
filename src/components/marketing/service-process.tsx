'use client'

import { motion } from "framer-motion"
import { Lightbulb, ClipboardList, Rocket, LineChart } from 'lucide-react'

export default function ProcessSection() {
  const steps = [
    {
      icon: Lightbulb,
      title: "DISCOVERY",
      description: "Understanding your goals and audience",
    },
    {
      icon: ClipboardList,
      title: "STRATEGY",
      description: "Developing a tailored plan",
    },
    {
      icon: Rocket,
      title: "EXECUTION",
      description: "Delivering innovative solutions with precision",
    },
    {
      icon: LineChart,
      title: "OPTIMIZATION",
      description: "Continuously improving for better results",
    },
  ]

  return (
    <section className="bg-background text-foreground py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-muted-foreground text-sm font-medium tracking-wider mb-4">
            OUR PROCESS
          </h2>
          <h3 className="text-2xl md:text-4xl lg:text-5xl font-medium leading-tight">
            From Concept to Execution,
            <br />
            We&apos;ve Got You Covered
          </h3>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="relative"
            >
              {/* Connecting line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-14 left-[60%] w-[calc(100%-20px)] h-[2px] bg-muted overflow-hidden">
                  <motion.div
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: index * 0.3 }}
                    className="h-full w-full bg-[#c4ea00] origin-left"
                  />
                </div>
              )}

              {/* Step content */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex flex-col items-center text-center relative z-10"
              >
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="w-20 md:w-28 h-20 md:h-28 rounded-full bg-muted flex items-center justify-center mb-6 relative group"
                >
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <step.icon className="w-8 h-8 text-primary transition-colors duration-300" />
                </motion.div>
                <motion.h4
                  whileHover={{ color: "hsl(var(--primary))" }}
                  className="text-xl font-bold mb-3 transition-colors"
                >
                  {step.title}
                </motion.h4>
                <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
                  {step.description}
                </p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

