"use client"

import { useRef, useEffect, useState } from "react"
import { motion, useScroll, useTransform, useSpring } from "framer-motion"
import { Lightbulb, ClipboardList, Rocket, LineChart } from "lucide-react"

export default function ProcessSection() {
  // Main section reference for scroll calculations
  const sectionRef = useRef<HTMLElement>(null)

  // Define the lime green color
  const limeGreen = "#c4ea00"

  // Scroll progress tracking for the entire section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  // Smoothed scroll progress for more fluid animations
  const smoothScrollProgress = useSpring(scrollYProgress, {
    damping: 20,
    stiffness: 100,
  })

  // Background parallax effects
  const bgCircle1Y = useTransform(smoothScrollProgress, [0, 1], ["-10%", "10%"])
  const bgCircle2Y = useTransform(smoothScrollProgress, [0, 1], ["10%", "-10%"])
  const bgCircle1Opacity = useTransform(smoothScrollProgress, [0, 0.5, 1], [0.03, 0.08, 0.03])
  const bgCircle2Opacity = useTransform(smoothScrollProgress, [0, 0.5, 1], [0.02, 0.06, 0.02])

  // Progress indicator values
  const progressWidth = useTransform(smoothScrollProgress, [0.1, 0.8], ["0%", "100%"])
  const progressOpacity = useTransform(smoothScrollProgress, [0.05, 0.1, 0.8, 0.9], [0, 1, 1, 0])

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

  // Pre-calculate the fill progress for each step and connection line
  const [stepFillProgress, setStepFillProgress] = useState<number[]>([])
  const [connectionFillProgress, setConnectionFillProgress] = useState<number[]>([])

  useEffect(() => {
    const calculateProgress = () => {
      const stepProgressValues: number[] = steps.map((_, index) => {
        const stepStart = 0.1 + index * 0.15
        const stepEnd = stepStart + 0.1
        return smoothScrollProgress.get() <= stepStart
          ? 0
          : smoothScrollProgress.get() >= stepEnd
            ? 1
            : Math.max(0, Math.min(1, (smoothScrollProgress.get() - stepStart) / (stepEnd - stepStart)))
      })

      const connectionProgressValues: number[] = steps.slice(0, -1).map((_, index) => {
        const connectionStart = 0.1 + (index + 1) * 0.15 - 0.05
        const connectionEnd = connectionStart + 0.1
        return smoothScrollProgress.get() <= connectionStart
          ? 0
          : smoothScrollProgress.get() >= connectionEnd
            ? 1
            : Math.max(
                0,
                Math.min(1, (smoothScrollProgress.get() - connectionStart) / (connectionEnd - connectionStart)),
              )
      })

      setStepFillProgress(stepProgressValues)
      setConnectionFillProgress(connectionProgressValues)
    }

    smoothScrollProgress.onChange(calculateProgress)
    calculateProgress() // Initial calculation

    return () => {
      smoothScrollProgress.clearListeners()
    }
  }, [smoothScrollProgress])

  return (
    <section
      ref={sectionRef}
      className="relative py-32 px-4 overflow-hidden bg-gradient-to-b from-background via-background/98 to-background/95"
    >
      {/* Subtle grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.03)_1px,transparent_1px),linear-gradient(to_right,rgba(255,255,255,.03)_1px,transparent_1px)] bg-[size:40px_40px] opacity-20"></div>

      {/* Scroll progress indicator */}
      {/* <motion.div
        className="fixed top-0 left-0 right-0 h-4 origin-left z-50"
        style={{
          scaleX: progressWidth,
          opacity: progressOpacity,
          background: `linear-gradient(to right, ${limeGreen}80, ${limeGreen})`,
        }}
      /> */}

      {/* Background decorative elements with parallax */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-[10%] -right-[10%] w-[40%] h-[40%] rounded-full blur-[120px]"
          style={{
            y: bgCircle1Y,
            opacity: bgCircle1Opacity,
            background: `radial-gradient(circle, ${limeGreen}30 0%, ${limeGreen}05 70%)`,
          }}
        />
        <motion.div
          className="absolute top-[60%] -left-[5%] w-[30%] h-[30%] rounded-full blur-[100px]"
          style={{
            y: bgCircle2Y,
            opacity: bgCircle2Opacity,
            background: `radial-gradient(circle, ${limeGreen}20 0%, ${limeGreen}05 70%)`,
          }}
        />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-28"
        >
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-block text-sm font-medium tracking-wider mb-4 py-1.5 px-4 rounded-full bg-gradient-to-r from-[#c4ea00]/20 to-[#c4ea00]/5 text-[#c4ea00] border border-[#c4ea00]/20"
          >
            OUR PROCESS
          </motion.span>
          <h3 className="text-3xl md:text-5xl lg:text-6xl font-medium leading-tight mt-6">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="block"
            >
              From Concept to Execution,
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="block bg-clip-text text-transparent bg-gradient-to-r from-[#c4ea00] to-[#c4ea00]/70 mt-2"
            >
              We&apos;ve Got You Covered
            </motion.span>
          </h3>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6 relative">
          {/* Connecting flow lines for desktop */}
          <div className="hidden lg:block absolute top-24 left-[14%] right-[14%] h-[2px]">
            {connectionFillProgress.map((progress, index) => (
              <div
                key={`connection-${index}`}
                className="absolute h-[2px] bg-muted-foreground/10"
                style={{
                  left: `${index * 33.3}%`,
                  width: "33.3%",
                }}
              >
                {/* Dashed line background */}
                <div
                  className="absolute inset-0 h-full"
                  style={{
                    backgroundImage: `linear-gradient(to right, ${limeGreen}30 50%, transparent 50%)`,
                    backgroundSize: "8px 1px",
                  }}
                />

                {/* Solid fill line */}
                <motion.div
                  className="h-full"
                  style={{
                    width: `${progress * 100}%`,
                    background: `linear-gradient(to right, ${limeGreen}80, ${limeGreen})`,
                    boxShadow: progress > 0.1 ? `0 0 ${Math.min(progress * 8, 4)}px ${limeGreen}80` : "none",
                  }}
                />

                {/* Animated bubble that follows the fill progress */}
                <motion.div
                  className="absolute -top-2 -translate-y-1/2 w-4 h-4 rounded-full"
                  style={{
                    left: `${progress * 100}%`,
                    opacity: progress > 0 && progress < 1 ? 1 : 0,
                    scale: 1 + Math.sin(progress * Math.PI) * 0.5,
                    background: `radial-gradient(circle, ${limeGreen} 30%, ${limeGreen}80 100%)`,
                    boxShadow: `0 0 10px ${limeGreen}, 0 0 20px ${limeGreen}50`,
                    transform: `translate(-50%, -50%) scale(${1 + Math.sin(progress * Math.PI) * 0.5})`,
                  }}
                />
              </div>
            ))}
          </div>

          {steps.map((step, index) => (
            <div key={step.title} className="relative">
              {/* Step content */}
              <div className="flex flex-col items-center text-center relative z-10 p-6">
                {/* Icon container with liquid fill effect */}
                <div className="relative w-28 h-28 mb-10">
                  {/* Container shadow */}
                  <div
                    className="absolute inset-0 rounded-full blur-[10px] opacity-30"
                    style={{
                      background:
                        stepFillProgress[index] > 0.5
                          ? `radial-gradient(circle, ${limeGreen}50 0%, transparent 70%)`
                          : "none",
                      opacity: stepFillProgress[index] * 0.5,
                    }}
                  />

                  {/* SVG for circular container and fill */}
                  <svg width="100%" height="100%" viewBox="0 0 100 100">
                    {/* Outer circle border */}
                    <circle
                      cx="50"
                      cy="50"
                      r="48"
                      stroke="hsl(var(--muted-foreground) / 0.15)"
                      strokeWidth="1"
                      fill="none"
                    />

                    {/* Outer circle glow that intensifies with fill */}
                    <circle
                      cx="50"
                      cy="50"
                      r="48"
                      stroke={limeGreen}
                      strokeWidth="1"
                      fill="none"
                      style={{
                        opacity: stepFillProgress[index] * 0.8,
                        strokeWidth: 1 + stepFillProgress[index] * 1,
                      }}
                    />

                    {/* Liquid fill container - clipping mask */}
                    <defs>
                      <clipPath id={`fillClip-${index}`}>
                        <circle cx="50" cy="50" r="48" />
                      </clipPath>

                      {/* Gradient for the liquid */}
                      <linearGradient id={`liquidGradient-${index}`} x1="0%" y1="100%" x2="0%" y2="0%">
                        <stop offset="0%" stopColor={limeGreen} stopOpacity="0.8" />
                        <stop offset="100%" stopColor={limeGreen} stopOpacity="0.4" />
                      </linearGradient>
                    </defs>

                    {/* The liquid fill effect with wave pattern */}
                    <g clipPath={`url(#fillClip-${index})`}>
                      {/* Base liquid fill */}
                      <motion.rect
                        x="0"
                        y="0"
                        width="100"
                        height="100"
                        fill={`url(#liquidGradient-${index})`}
                        style={{
                          y: 100 - stepFillProgress[index] * 100,
                        }}
                      />

                      {/* Wave pattern on top of liquid */}
                      <motion.path
                        d="M0,50 Q25,40 50,50 T100,50 V100 H0 Z"
                        fill={limeGreen}
                        fillOpacity="0.3"
                        style={{
                          y: 100 - stepFillProgress[index] * 100 - 10,
                          opacity: stepFillProgress[index] > 0.1 ? 0.3 : 0,
                        }}
                      />
                    </g>

                    {/* Ripple effect on top of the liquid */}
                    <motion.circle
                      cx="50"
                      cy="50"
                      r="30"
                      fill="none"
                      stroke={limeGreen}
                      strokeWidth="1"
                      clipPath={`url(#fillClip-${index})`}
                      style={{
                        opacity:
                          stepFillProgress[index] > 0.1 && stepFillProgress[index] < 0.9
                            ? Math.sin(stepFillProgress[index] * Math.PI) * 0.5
                            : 0,
                        scale: 0.5 + stepFillProgress[index] * 0.5,
                      }}
                    />

                    {/* Inner circle background */}
                    <circle
                      cx="50"
                      cy="50"
                      r="38"
                      fill="hsl(var(--background) / 0.9)"
                      stroke={`${limeGreen}20`}
                      strokeWidth="1"
                    />

                    {/* Inner circle pattern */}
                    <circle
                      cx="50"
                      cy="50"
                      r="38"
                      fill="none"
                      stroke={limeGreen}
                      strokeWidth="0.5"
                      strokeDasharray="2 4"
                      style={{
                        opacity: 0.2 + stepFillProgress[index] * 0.3,
                      }}
                    />
                  </svg>

                  {/* Icon that rises with the liquid */}
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center"
                    style={{
                      y: (1 - stepFillProgress[index]) * 20,
                      opacity: stepFillProgress[index] * 1.5,
                    }}
                  >
                    <step.icon
                      style={{
                        color: limeGreen,
                        filter: stepFillProgress[index] > 0.8 ? `drop-shadow(0 0 8px ${limeGreen}80)` : "none",
                      }}
                      className="w-10 h-10"
                    />
                  </motion.div>

                  {/* Fill percentage indicator */}
                  <motion.div
                    className="absolute -bottom-2 left-1/2 -translate-x-1/2 text-xs font-bold px-2 py-0.5 rounded-full"
                    style={{
                      opacity: stepFillProgress[index] < 1 ? Math.max(0.5, stepFillProgress[index]) : 0,
                      scale: stepFillProgress[index] < 1 ? Math.max(0.8, stepFillProgress[index]) : 0,
                      background: `linear-gradient(to right, ${limeGreen}CC, ${limeGreen})`,
                      color: "#000",
                      boxShadow: `0 2px 10px ${limeGreen}40`,
                    }}
                  >
                    <motion.span>{Math.round(stepFillProgress[index] * 100)}%</motion.span>
                  </motion.div>

                  {/* Completion checkmark that appears when filled */}
                  {stepFillProgress[index] >= 1 && (
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.3, type: "spring" }}
                      className="absolute -top-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center"
                      style={{
                        background: limeGreen,
                        boxShadow: `0 0 15px ${limeGreen}80`,
                      }}
                    >
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="black"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </motion.div>
                  )}
                </div>

                {/* Text content that reveals with the fill */}
                <div className="relative">
                  <motion.h4
                    className="text-xl font-bold mb-4 tracking-wider transition-colors"
                    style={{
                      opacity: 0.3 + stepFillProgress[index] * 0.7,
                      color: stepFillProgress[index] > 0.8 ? limeGreen : "hsl(var(--foreground))",
                      textShadow: stepFillProgress[index] > 0.9 ? `0 0 10px ${limeGreen}40` : "none",
                    }}
                  >
                    {step.title}
                  </motion.h4>

                  <motion.p
                    className="text-muted-foreground leading-relaxed max-w-xs mx-auto"
                    style={{
                      opacity: stepFillProgress[index] > 0.3 ? (stepFillProgress[index] - 0.3) * 1.4 : 0,
                    }}
                  >
                    {step.description}
                  </motion.p>

                  {/* Decorative underline that grows with fill */}
                  <motion.div
                    className="h-[2px] w-16 mx-auto mt-4 origin-left"
                    style={{
                      background: `linear-gradient(to right, ${limeGreen}, ${limeGreen}50)`,
                      scaleX: stepFillProgress[index],
                      opacity: stepFillProgress[index] > 0.5 ? (stepFillProgress[index] - 0.5) * 2 : 0,
                      boxShadow: stepFillProgress[index] > 0.8 ? `0 0 5px ${limeGreen}60` : "none",
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Scroll indicator
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="mt-16 flex flex-col items-center"
          style={{
            opacity: useTransform(smoothScrollProgress, [0, 0.3], [1, 0]),
          }}
        >
          <motion.p
            className="text-sm font-medium mb-2"
            style={{ color: limeGreen }}
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          >
            Scroll to fill the process
          </motion.p>
          <motion.div
            className="w-6 h-10 rounded-full flex justify-center"
            style={{
              border: `2px solid ${limeGreen}40`,
              boxShadow: `0 0 10px ${limeGreen}20`,
            }}
          >
            <motion.div
              className="w-1.5 h-1.5 rounded-full mt-2"
              style={{ backgroundColor: limeGreen }}
              animate={{ y: [0, 15, 0] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            />
          </motion.div>
        </motion.div> */}

        {/* Call to action - appears when all steps are filled */}
        <motion.div
          className="mt-20 text-center"
          style={{
            opacity: useTransform(smoothScrollProgress, [0.6, 0.8], [0, 1]),
            y: useTransform(smoothScrollProgress, [0.6, 0.8], [20, 0]),
          }}
        >
          <motion.button
            whileHover={{
              scale: 1.05,
              boxShadow: `0 10px 30px -5px ${limeGreen}60`,
            }}
            whileTap={{ scale: 0.98 }}
            className="px-8 py-3.5 rounded-full text-black font-medium tracking-wide shadow-lg"
            style={{
              background: `linear-gradient(135deg, ${limeGreen}, ${limeGreen}CC)`,
              boxShadow: `0 5px 20px -5px ${limeGreen}70, inset 0 1px 1px rgba(255,255,255,0.3)`,
            }}
          >
            Start Your Journey
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}
