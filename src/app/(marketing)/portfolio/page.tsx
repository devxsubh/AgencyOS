"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, ArrowUpRight, ChevronDown, X } from "lucide-react"
import { cn } from "@/lib"
import Link from "next/link"
import Image from "next/image"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

// Project data
// Define the Project type
type Project = {
  _id: number
  title: string
  description: string
  image: string
  category: string
  agency: string
  url: string
  color: string
  challenge: string
  solution: string
  result: string
}

// Categories for filtering
const categories = ["All", "AI", "App", "Website", "UI/UX", "Portfolio", "Branding", "Ecommerce", "Multi-tenant apps"]

export default function ProjectsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [visibleProjects, setVisibleProjects] = useState<Project[]>([])
  const [currentSection, setCurrentSection] = useState(0)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const sectionsRef = useRef<(HTMLDivElement | null)[]>([])
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const panelsRef = useRef<(HTMLDivElement | null)[]>([])
  const [projects, setProjects] = useState<Project[]>([])

  // Fetch projects from backend API
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const baseUrl = window.location.origin
        const response = await fetch(`${baseUrl}/api/portfolios`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        })

        if (!response.ok) {
          throw new Error("Failed to fetch projects")
        }

        const data = await response.json()
        // Sort projects by displayOrder and createdAt
        const sortedProjects = data.portfolios

        setProjects(sortedProjects)
        setVisibleProjects(sortedProjects)
      } catch (error) {
        console.error("Error fetching projects:", error)
        setProjects([])
        setVisibleProjects([])
      }
    }

    fetchProjects()
  }, [])

  // Initialize GSAP horizontal scroll
  useEffect(() => {
    if (!scrollContainerRef.current || !panelsRef.current.length) return

    const panels = panelsRef.current.filter((panel) => panel !== null)
    const container = scrollContainerRef.current

    // Clear any existing ScrollTriggers
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill())

    // Set up the horizontal scroll with improved configuration
    gsap.to(panels, {
      xPercent: -100 * (panels.length - 1),
      ease: "none",
      scrollTrigger: {
        trigger: container,
        pin: true,
        scrub: 1,
        snap: {
          snapTo: 1 / (panels.length - 1),
          duration: { min: 0.1, max: 0.3 },
          delay: 0.1,
          ease: "power1.inOut",
        },
        end: () => "+=" + container.offsetWidth * (panels.length - 1),
        invalidateOnRefresh: true,
        anticipatePin: 1, // Helps with smoother pin initialization
        fastScrollEnd: true, // Improves behavior when scrolling quickly
      },
    })

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [visibleProjects])

  // Filter projects based on category and search
  useEffect(() => {
    const filtered = projects.filter((project) => {
      const matchesCategory = selectedCategory === "All" || project.category === selectedCategory
      const matchesSearch =
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase())
      return matchesCategory && matchesSearch
    })
    setVisibleProjects(filtered)
  }, [selectedCategory, searchQuery])

  // Get displayed projects based on showAllProjects state
  const displayedProjects = visibleProjects

  // Scroll to section
  const scrollToSection = (index: number) => {
    if (sectionsRef.current[index]) {
      sectionsRef.current[index]?.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <div className="bg-black text-white" ref={containerRef}>
      {/* Hero Section */}
      <section
        ref={(el: HTMLDivElement | null) => {
          sectionsRef.current[0] = el
        }}
        className="min-h-screen flex flex-col justify-center items-center relative snap-start"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 z-0 overflow-hidden -top-20"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80 z-10" />
          <video
            autoPlay
            loop
            muted
            playsInline
            poster="/images/video-poster.jpg"
            className="absolute w-full h-full md:h-auto object-cover opacity-60"
          >
            <source src="/icons/App Intro Show Reel.mp4" type="video/mp4" />
          </video>
        </motion.div>

        <div className="container mx-auto px-4 z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-6"
          >
            <span className="inline-block px-4 py-1 rounded-full bg-white/10 backdrop-blur-sm text-sm font-medium mb-4">
              Our Portfolio
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-5xl md:text-7xl font-bold mb-6 tracking-tight"
          >
            Proven Results <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-100 to-gray-500">
              Across Industries
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-gray-400 max-w-2xl mx-auto mb-12 text-lg"
          >
            Discover how we've helped businesses like yours achieve their goals. Our case studies highlight the
            strategies and solutions that have delivered measurable success.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <button
              onClick={() => scrollToSection(1)}
              className="px-6 py-3 rounded-full bg-[#c4ea00] text-black font-medium hover:bg-gray-200 transition-colors"
            >
              View Projects
            </button>
            <button
              onClick={() => setIsSearchOpen(true)}
              className="px-6 py-3 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors flex items-center justify-center gap-2"
            >
              <Search className="w-4 h-4" />
              Search Projects
            </button>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce"
        >
          <ChevronDown className="w-6 h-6 text-gray-400" />
        </motion.div>
      </section>

      {/* Filter Section */}
      <section
        ref={(el: HTMLDivElement | null) => {
          sectionsRef.current[1] = el
        }}
        className="min-h-screen flex flex-col justify-center items-center relative snap-start py-20" // Increased bottom margin
      >
        <div className="container mx-auto px-4 z-10 relative">
          {" "}
          {/* Added relative positioning */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-12 text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Filter Our Work</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Browse our portfolio by category or search for specific projects.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-3 mb-16"
          >
            {categories.map((category, index) => (
              <motion.button
                key={category}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.1 * index }}
                viewport={{ once: true }}
                onClick={() => setSelectedCategory(category)}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium transition-all duration-300",
                  selectedCategory === category ? "bg-white text-black" : "bg-gray-800 text-gray-300 hover:bg-gray-700",
                )}
              >
                {category}
              </motion.button>
            ))}
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {displayedProjects.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="col-span-full text-center py-20 text-gray-400"
              >
                No projects match your criteria. Try adjusting your filters.
              </motion.div>
            ) : (
              displayedProjects.map((project, index) => (
                <motion.div
                  key={project._id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  whileHover={{ y: -10 }}
                  className="group relative"
                >
                  <Link href={`#project-${project._id}`} onClick={() => scrollToSection(index + 2)}>
                    <div className="relative overflow-hidden rounded-xl aspect-[4/3]">
                      <Image
                        src={project.image || "/placeholder.svg"}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        unoptimized
                      />
                      <div
                        className="absolute inset-0 opacity-60 transition-opacity duration-300 group-hover:opacity-40"
                        style={{ backgroundColor: project.color }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                      <div className="flex justify-between items-end">
                        <div>
                          <span className="inline-block px-2 py-1 rounded-full bg-black/40 backdrop-blur-sm text-xs font-medium mb-2">
                            {project.category}
                          </span>
                          <h3 className="text-xl font-bold mb-1">{project.title}</h3>
                          <p className="text-sm text-gray-300 line-clamp-2">{project.description}</p>
                        </div>
                        <div className="h-10 w-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-300">
                          <ArrowUpRight className="h-5 w-5" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))
            )}
          </div>
          {/* View More Button */}
        </div>
      </section>

      {/* Individual Project Sections */}
      <div
        ref={scrollContainerRef}
        className="overflow-hidden w-full h-screen relative z-10 mt-16" // Added top margin
      >
        <div className="flex w-max">
          {visibleProjects.map((project, index) => (
            <section
              key={project._id}
              id={`project-${project._id}`}
              ref={(el: HTMLDivElement | null) => {
                if (el) {
                  panelsRef.current[index] = el
                  sectionsRef.current[index + 2] = el
                }
              }}
              className="min-h-screen w-screen flex-shrink-0 flex flex-col justify-center items-center relative py-20 px-4" // Added horizontal padding
              style={{
                backgroundColor: `${project.color}10`,
              }}
            >
              <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black z-10" />
              </div>

              <div className="container mx-auto px-4 z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="order-2 lg:order-1"
                  >
                    <span
                      className="inline-block px-3 py-1 rounded-full text-xs font-medium mb-4"
                      style={{ backgroundColor: `${project.color}30`, color: project.color }}
                    >
                      {project.category}
                    </span>
                    <h2 className="text-4xl md:text-5xl font-bold mb-6">{project.title}</h2>
                    <p className="text-gray-300 mb-8 text-lg">{project.description}</p>

                    <div className="space-y-6 mb-8">
                      <div className="flex items-start gap-4">
                        <div
                          className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 mt-1"
                          style={{ backgroundColor: `${project.color}20` }}
                        >
                          <span className="text-xl font-bold" style={{ color: project.color }}>
                            01
                          </span>
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold mb-2">Challenge</h3>
                          <p className="text-gray-400">{project.challenge}</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-4">
                        <div
                          className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 mt-1"
                          style={{ backgroundColor: `${project.color}20` }}
                        >
                          <span className="text-xl font-bold" style={{ color: project.color }}>
                            02
                          </span>
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold mb-2">Solution</h3>
                          <p className="text-gray-400">{project.solution}</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-4">
                        <div
                          className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 mt-1"
                          style={{ backgroundColor: `${project.color}20` }}
                        >
                          <span className="text-xl font-bold" style={{ color: project.color }}>
                            03
                          </span>
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold mb-2">Results</h3>
                          <p className="text-gray-400">{project.result}</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-4">
                      <Link
                        href={project.url}
                        className="px-6 py-3 rounded-full bg-white text-black font-medium hover:bg-gray-200 transition-colors flex items-center gap-2"
                      >
                        View Live Project
                        <ArrowUpRight className="w-4 h-4" />
                      </Link>
                      <button
                        onClick={() => scrollToSection(1)}
                        className="px-6 py-3 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors"
                      >
                        Back to Projects
                      </button>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    viewport={{ once: true }}
                    className="order-1 lg:order-2"
                  >
                    <div className="relative rounded-xl overflow-hidden aspect-[4/3] shadow-2xl">
                      <Image
                        src={project.image || "/placeholder.svg"}
                        alt={project.title}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    </div>
                  </motion.div>
                </div>
              </div>
            </section>
          ))}
        </div>
      </div>

      {/* Search Overlay */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-2xl bg-gray-900 rounded-xl p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold">Search Projects</h3>
                <button
                  onClick={() => setIsSearchOpen(false)}
                  className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gray-700 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="relative mb-6">
                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Type to search projects..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-3 w-full bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600 text-base"
                  autoFocus
                />
              </div>

              <div className="space-y-4 max-h-[50vh] overflow-auto">
                {visibleProjects.length === 0 ? (
                  <p className="text-center py-8 text-gray-400">No projects match your search.</p>
                ) : (
                  visibleProjects.map((project) => (
                    <div
                      key={project._id}
                      className="flex items-center gap-4 p-3 hover:bg-gray-800 rounded-lg transition-colors cursor-pointer"
                      onClick={() => {
                        scrollToSection(projects.findIndex((p) => p._id === project._id) + 2)
                        setIsSearchOpen(false)
                      }}
                    >
                      <div className="relative w-16 h-16 rounded-md overflow-hidden flex-shrink-0">
                        <Image
                          src={project.image || "/placeholder.svg"}
                          alt={project.title}
                          fill
                          className="object-cover"
                          unoptimized
                        />
                      </div>
                      <div>
                        <h4 className="font-medium">{project.title}</h4>
                        <p className="text-sm text-gray-400">{project.category}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
