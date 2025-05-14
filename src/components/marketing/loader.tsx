"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useEffect, useState, useRef } from "react"
import { OpacityTransition, Transition } from "@/components/ui/Transitions"
import { useMousePosition } from "@/hooks/use-mouse-position"

interface PageLoadProps {
  setHideLoader: (value: boolean) => void
  title?: string
  description?: string
}

// Loading stages for a more dynamic experience
const loadingStages = ["Initializing...", "Loading assets...", "Preparing canvas...", "Almost there..."]

const Loader = ({
  setHideLoader,
  title = "Wonder",
  description = "We deliver web, marketing, and automation solutions to help businesses grow smarter.",
}: PageLoadProps) => {
  const [counter, setCounter] = useState(0)
  const [currentStage, setCurrentStage] = useState(0)
  const videoRef = useRef<HTMLVideoElement>(null)
  const circumference = 2 * Math.PI * 120 // 120 is the radius of our circle
  const mousePosition = useMousePosition()

  // Generate particles
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; size: number; delay: number }>>(
    [],
  )

  useEffect(() => {
    // Generate particles
    const newParticles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 360 - 180,
      y: Math.random() * 360 - 180,
      size: Math.random() * 4 + 1,
      delay: Math.random() * 2,
    }))
    setParticles(newParticles)

    // Counter logic
    const count = setInterval(() => {
      if (counter < 100) {
        setCounter((prev) => {
          // Update loading stage based on progress
          if (prev < 25 && currentStage !== 0) {
            setCurrentStage(0)
          } else if (prev >= 25 && prev < 50 && currentStage !== 1) {
            setCurrentStage(1)
          } else if (prev >= 50 && prev < 75 && currentStage !== 2) {
            setCurrentStage(2)
          } else if (prev >= 75 && currentStage !== 3) {
            setCurrentStage(3)
          }
          return prev + 1
        })
      } else {
        clearInterval(count)
      }
    }, 25)

    return () => {
      clearInterval(count)
    }
  }, [counter, currentStage])

  // Calculate the stroke-dashoffset based on the loading progress
  const strokeDashoffset = circumference - (counter / 100) * circumference

  // Calculate mouse-based glow position
  const mouseX = mousePosition.x
  const mouseY = mousePosition.y

  return (
    <motion.div
      initial={{ y: 0 }}
      animate={{ y: counter >= 100 ? "-100%" : 0 }}
      transition={{ delay: counter >= 100 ? 0.5 : 0, duration: 1, type: "tween" }}
      onAnimationComplete={() => {
        if (counter >= 100) setHideLoader(false)
      }}
      className="fixed top-0 left-0 z-[9999] w-full h-full overflow-hidden flex items-center justify-center"
      style={{
        background: "radial-gradient(circle at center, #111111 0%, #000000 100%)",
      }}
    >
      {/* Dynamic background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <svg width="100%" height="100%" className="opacity-10">
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#c4ea00" strokeWidth="0.5" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Mouse follower glow */}
      {mouseX && mouseY && (
        <motion.div
          className="fixed w-[300px] h-[300px] rounded-full pointer-events-none"
          style={{
            background: "radial-gradient(circle, rgba(196,234,0,0.15) 0%, rgba(0,0,0,0) 70%)",
            left: mouseX,
            top: mouseY,
            transform: "translate(-50%, -50%)",
          }}
          animate={{
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
          }}
        />
      )}

      <div className="relative flex items-center justify-center">
        {/* Animated particles around the circle */}
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full bg-[#c4ea00]"
            style={{
              width: `${particle.size}px`,
              height: `${particle.size}px`,
            }}
            initial={{
              x: 0,
              y: 0,
              opacity: 0,
            }}
            animate={{
              x: particle.x,
              y: particle.y,
              opacity: [0, 0.8, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Number.POSITIVE_INFINITY,
              delay: particle.delay,
            }}
          />
        ))}

        {/* Outer glow ring */}
        <motion.div
          className="absolute w-[280px] h-[280px] rounded-full"
          style={{
            boxShadow: `0 0 ${counter / 5}px rgba(196, 234, 0, ${counter / 300})`,
          }}
          animate={{
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 3,
            repeat: Number.POSITIVE_INFINITY,
          }}
        />

        {/* Circular progress indicator */}
        <svg width="300" height="300" viewBox="0 0 300 300" className="absolute">
          {/* Background circle */}
          <circle cx="150" cy="150" r="120" fill="none" stroke="#333333" strokeWidth="4" className="opacity-30" />

          {/* Secondary progress circle - subtle accent */}
          <motion.circle
            cx="150"
            cy="150"
            r="128"
            fill="none"
            stroke="rgba(255, 255, 255, 0.1)"
            strokeWidth="1"
            strokeDasharray={2 * Math.PI * 128}
            strokeDashoffset={2 * Math.PI * 128 - (counter / 100) * (2 * Math.PI * 128)}
            transform="rotate(-90 150 150)"
          />

          {/* Main progress circle */}
          <motion.circle
            cx="150"
            cy="150"
            r="120"
            fill="none"
            stroke="url(#progressGradient)"
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            transform="rotate(-90 150 150)"
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 0.1, ease: "easeInOut" }}
          />

          {/* Progress markers */}
          {[25, 50, 75].map((marker) => (
            <motion.circle
              key={marker}
              cx="150"
              cy="150"
              r="120"
              fill="none"
              stroke="#ffffff"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={`1 ${circumference - 1}`}
              strokeDashoffset={circumference - (marker / 100) * circumference}
              transform="rotate(-90 150 150)"
              initial={{ opacity: 0 }}
              animate={{ opacity: counter >= marker ? 1 : 0 }}
              className="opacity-70"
            />
          ))}

          {/* Gradient definition */}
          <defs>
            <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#c4ea00" />
              <stop offset="100%" stopColor="#ffffff" />
            </linearGradient>
          </defs>
        </svg>

        {/* Video in circular container with subtle border */}
        <motion.div
          className="w-[240px] h-[240px] rounded-full overflow-hidden relative z-10"
          style={{
            boxShadow: "inset 0 0 10px rgba(196, 234, 0, 0.3)",
          }}
        //   animate={{
        //     rotate: [0, 360],
        //   }}
          transition={{
            duration: 120,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        >
          <motion.div
            className="absolute inset-0 z-20 rounded-full"
            style={{
              background: "radial-gradient(circle at center, transparent 30%, rgba(0,0,0,0.5) 100%)",
            }}
          />
          <video ref={videoRef} autoPlay loop muted playsInline className="w-full h-full object-cover">
            <source src="/icons/Logo-1-[remix] (1).mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </motion.div>

        {/* Loading stage indicator */}
        <div className="absolute top-[-60px] left-0 right-0 text-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStage}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="text-sm text-white/70 tracking-wider uppercase"
            >
              {loadingStages[currentStage]}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Percentage counter with enhanced styling */}
        <div className="absolute bottom-[-80px] text-center">
          <motion.div
            className="relative"
            animate={{
              scale: counter === 100 ? [1, 1.2, 1] : 1,
            }}
            transition={{
              duration: 0.5,
              times: [0, 0.5, 1],
            }}
          >
            <motion.span
              className="text-6xl font-bold relative z-10"
              style={{
                background: "linear-gradient(90deg, #c4ea00, #ffffff)",
                backgroundSize: "200% auto",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
              animate={{
                backgroundPosition: ["0% center", "200% center"],
                textShadow: counter === 100 ? "0 0 20px rgba(196, 234, 0, 0.7)" : "none",
              }}
              transition={{
                duration: 3,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
              }}
            >
              {counter}%
            </motion.span>

            {/* Completion indicator */}
            {counter === 100 && (
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                <div className="absolute w-full h-full rounded-full bg-[#c4ea00] opacity-20 blur-md" />
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>

      {/* Title with enhanced styling */}
      <div className="absolute top-10 left-10">
        <Transition transition={{ delay: 0.2 }}>
          <motion.div className="flex items-center gap-2">
            {/* <motion.div
              className="w-6 h-6 rounded-full bg-[#c4ea00]"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 3,
                repeat: Number.POSITIVE_INFINITY,
              }}
            /> */}
            <motion.span
              className="font-bold text-xl tracking-wider"
              animate={{
                color: ["rgba(255,255,255,0.8)", "rgba(196,234,0,1)", "rgba(255,255,255,0.8)"],
              }}
              transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
            >
              {title}
            </motion.span>
          </motion.div>
        </Transition>
      </div>

      {/* Description with enhanced styling */}
      <div className="absolute bottom-10 left-10 max-w-md">
        <Transition transition={{ delay: 0.4 }}>
          <div className="text-2xl md:text-3xl whitespace-pre-wrap">
            <OpacityTransition>
              <motion.div
                initial={{ backgroundPosition: "0% 0%" }}
                animate={{ backgroundPosition: "100% 0%" }}
                transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
                style={{
                  backgroundImage: "linear-gradient(90deg, #ffffff, #c4ea00, #ffffff)",
                  backgroundSize: "200% auto",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
                className="font-light"
              >
                {description}
              </motion.div>
            </OpacityTransition>
          </div>
        </Transition>
      </div>
    </motion.div>
  )
}

export default Loader
