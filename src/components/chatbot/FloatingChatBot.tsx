"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Send, MessageSquare, X } from "lucide-react"
import { cn } from "@/lib"

// Simple function to format text with basic markdown-like syntax
function formatBotMessage(text: string) {
  if (!text) return ""

  // Process the text line by line
  return text.split("\n").map((line, i) => {
    // Handle headings (# Heading)
    if (line.startsWith("# ")) {
      return (
        <h3 key={i} className="font-bold text-lg mt-2 mb-1">
          {line.substring(2)}
        </h3>
      )
    }

    // Handle subheadings (## Subheading)
    if (line.startsWith("## ")) {
      return (
        <h4 key={i} className="font-bold text-base mt-2 mb-1">
          {line.substring(3)}
        </h4>
      )
    }

    // Handle bullet points (- item or * item)
    if (line.startsWith("- ") || line.startsWith("* ")) {
      return (
        <div key={i} className="flex items-start mb-1">
          <span className="mr-2">•</span>
          <span>{line.substring(2)}</span>
        </div>
      )
    }

    // Handle numbered lists (1. item)
    if (/^\d+\.\s/.test(line)) {
      const number = line.split(".")[0]
      const content = line.substring(number.length + 2)
      return (
        <div key={i} className="flex items-start mb-1">
          <span className="mr-2">{number}.</span>
          <span>{content}</span>
        </div>
      )
    }

    // Empty lines become spacing
    if (line.trim() === "") {
      return <div key={i} className="h-2"></div>
    }

    // Regular paragraph
    return (
      <p key={i} className="mb-2">
        {line}
      </p>
    )
  })
}

export default function FloatingChatBot() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([
    {
      from: "bot",
      text: "Hi! 👋 I'm WonderBot. Ask me anything about Wonder Creative Studios!\n\n# Our Services\n- App & Web Development\n- Automation\n- Digital Marketing\n- Brand Strategy\n\nHow can I help you today?",
    },
  ])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (open) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages, open])

  const sendMessage = async () => {
    if (!input.trim()) return
    const userMessage = { from: "user", text: input }
    setMessages((msgs) => [...msgs, userMessage])
    setInput("")
    setLoading(true)

    try {
      const res = await fetch("/api/chatbot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      })

      if (!res.ok) {
        throw new Error("Network response was not ok")
      }

      const data = await res.json()
      setMessages((msgs) => [...msgs, { from: "bot", text: data.reply || "Sorry, I couldn't answer that!" }])
    } catch (e) {
      console.error(e)
      setMessages((msgs) => [...msgs, { from: "bot", text: "Oops! Something went wrong. Try again." }])
    }
    setLoading(false)
  }

  return (
    <>
      {/* Floating Button */}
      <motion.button
        className="fixed z-50 bottom-6 right-6 w-16 h-16 flex items-center justify-center"
        onClick={() => setOpen((o) => !o)}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        aria-label="Open chat"
      >
        <motion.div
          className="absolute inset-0 rounded-full bg-[#c4ea00]/80 backdrop-blur-sm shadow-lg border border-white/10"
          animate={{
            boxShadow: open
              ? ["0 0 20px rgba(196, 234, 0, 0.3)", "0 0 20px rgba(196, 234, 0, 0.3)"]
              : ["0 0 20px rgba(196, 234, 0, 0.3)", "0 0 30px rgba(196, 234, 0, 0.5)"],
          }}
          transition={{
            duration: 1.5,
            repeat: open ? 0 : Number.POSITIVE_INFINITY,
            repeatType: "loop",
          }}
        />
        <div className="absolute inset-2 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center border border-white/10">
          <motion.div
            animate={{
              rotate: open ? 90 : 0,
            }}
            transition={{ duration: 0.3 }}
          >
            {open ? <X className="w-6 h-6 text-[#c4ea00]" /> : <MessageSquare className="w-6 h-6 text-[#c4ea00]" />}
          </motion.div>
        </div>
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed z-40 bottom-28 right-6 w-[380px] max-w-[95vw] h-[520px] max-h-[80vh]"
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {/* Glass Container */}
            <div className="relative h-full rounded-3xl overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.5)]">
              {/* Background Elements */}
              <div className="absolute inset-0 backdrop-blur-xl bg-black/40 z-10" />
              <div className="absolute inset-0 bg-gradient-to-b from-[#c4ea00]/20 to-transparent opacity-70 blur-3xl z-0" />

              {/* Content Container */}
              <div className="relative flex flex-col h-full z-20">
                {/* Header */}
                <motion.div
                  className="relative px-6 py-4 backdrop-blur-md bg-white/5 border-b border-white/10"
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div className="w-12 h-12 rounded-full bg-[#c4ea00]/80 backdrop-blur-md flex items-center justify-center border border-white/10 shadow-[0_0_15px_rgba(196,234,0,0.3)]">
                        <motion.div
                          className="absolute inset-0 rounded-full bg-[#c4ea00]/30"
                          animate={{ scale: [1, 1.4, 1] }}
                          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                        />
                        <div className="w-10 h-10 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center border border-white/10">
                          <MessageSquare className="w-5 h-5 text-[#c4ea00]" />
                        </div>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-bold text-2xl text-[#c4ea00]">WonderBot</h3>
                      <p className="text-xs text-white/70">Wonder Creative Studios</p>
                    </div>
                  </div>
                </motion.div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto px-5 pt-5 pb-0 space-y-6" aria-live="polite" role="log">
                  {messages.map((msg, i) => (
                    <motion.div
                      key={i}
                      className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}
                      initial={{ opacity: 0, y: 20, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ delay: i * 0.05 }}
                    >
                      {msg.from === "bot" ? (
                        <div className="relative max-w-[85%]">
                          <div className="px-4 py-3 rounded-2xl rounded-tl-none bg-[#c4ea00]/90 backdrop-blur-md text-black shadow-lg border border-[#c4ea00]/50">
                            {formatBotMessage(msg.text)}
                          </div>
                          <motion.div
                            className="absolute -inset-0.5 rounded-2xl rounded-tl-none bg-[#c4ea00]/30 blur-md z-[-1]"
                            animate={{ opacity: [0.3, 0.5, 0.3] }}
                            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                          />
                        </div>
                      ) : (
                        <div className="relative max-w-[85%]">
                          <div className="px-4 py-3 rounded-2xl rounded-tr-none bg-white/10 backdrop-blur-md border border-white/10 text-white shadow-lg">
                            {msg.text}
                          </div>
                          <motion.div
                            className="absolute -inset-0.5 rounded-2xl rounded-tr-none bg-white/5 blur-md z-[-1]"
                            animate={{ opacity: [0.1, 0.2, 0.1] }}
                            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                          />
                        </div>
                      )}
                    </motion.div>
                  ))}

                  {loading && (
                    <motion.div
                      className="flex justify-start"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <div className="relative max-w-[85%]">
                        <div className="px-4 py-3 rounded-2xl rounded-tl-none bg-[#c4ea00]/90 backdrop-blur-md text-black shadow-lg border border-[#c4ea00]/50 flex items-center gap-3">
                          <div className="flex space-x-1">
                            {[0, 1, 2].map((i) => (
                              <motion.div
                                key={i}
                                className="w-2 h-2 rounded-full bg-black/80"
                                animate={{ y: [0, -6, 0] }}
                                transition={{
                                  duration: 0.6,
                                  repeat: Number.POSITIVE_INFINITY,
                                  delay: i * 0.1,
                                }}
                              />
                            ))}
                          </div>
                          <span>Thinking...</span>
                        </div>
                        <motion.div
                          className="absolute -inset-0.5 rounded-2xl rounded-tl-none bg-[#c4ea00]/30 blur-md z-[-1]"
                          animate={{ opacity: [0.3, 0.5, 0.3] }}
                          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                        />
                      </div>
                    </motion.div>
                  )}
                  <div ref={messagesEndRef} className="h-0" />
                </div>

                {/* Input */}
                <motion.form
                  className="p-3 pt-2 backdrop-blur-md bg-white/5 border-t border-white/10 bottom-0"
                  onSubmit={(e) => {
                    e.preventDefault()
                    sendMessage()
                  }}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="relative">
                    <div className="flex items-center gap-2 bg-white/5 backdrop-blur-lg rounded-full p-1 pl-5 border border-white/10 shadow-inner">
                      <input
                        className="flex-1 bg-transparent text-white focus:outline-none placeholder-white/50 min-w-0"
                        placeholder="Type your message..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        disabled={loading}
                        autoFocus
                        aria-label="Message input"
                      />
                      <motion.button
                        type="submit"
                        className={cn(
                          "rounded-full p-3 text-black bg-[#c4ea00]/90 backdrop-blur-sm border border-[#c4ea00]/50 shadow-lg",
                          loading ? "opacity-50 cursor-not-allowed" : "",
                        )}
                        disabled={loading}
                        aria-label="Send"
                        whileHover={{ scale: loading ? 1 : 1.05 }}
                        whileTap={{ scale: loading ? 1 : 0.95 }}
                      >
                        <Send className="w-5 h-5" />
                      </motion.button>
                    </div>
                  </div>
                </motion.form>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
