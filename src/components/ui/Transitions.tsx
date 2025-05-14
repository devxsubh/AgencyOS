"use client"

import { motion } from "framer-motion"
import type { ReactNode } from "react"

interface TransitionProps {
  children: ReactNode
  className?: string
  transition?: {
    delay?: number
    duration?: number
  }
}

export const Transition = ({ children, className, transition = { delay: 0, duration: 0.5 } }: TransitionProps) => {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        delay: transition.delay,
        duration: transition.duration,
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export const OpacityTransition = ({
  children,
  className,
  transition = { delay: 0, duration: 0.5 },
}: TransitionProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        delay: transition.delay,
        duration: transition.duration,
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
