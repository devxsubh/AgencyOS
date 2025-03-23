"use client"

import { useState, useEffect, useRef } from "react"
import {
  Calculator,
  Check,
  ChevronDown,
  Code,
  CreditCard,
  Database,
  LineChart,
  Lock,
  MessageSquare,
  ShoppingCart,
  Smartphone,
  User,
  Zap,
  ArrowRight,
  Shield,
  Clock,
  Sparkles,
  Info,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"

type FeaturesType = {
    ecommerce: boolean;
    authentication: boolean;
    payment: boolean;
    crm: boolean;
    chatbot: boolean;
    api: boolean;
  };

type BreakdownType = {
    base: number;
    pages: number;
    design: number;
    features: number;
    hosting: number;
    support: number;
  };

export default function ProjectCostCalculator() {
    const [projectType, setProjectType] = useState<string>("website");
    const [pages, setPages] = useState<string>("5");
    const [designType, setDesignType] = useState<string>("standard");
    const [hostingType, setHostingType] = useState<string>("standard");
    const [supportDuration, setSupportDuration] = useState<string>("3");
    
    const [features, setFeatures] = useState<FeaturesType>({
      ecommerce: false,
      authentication: false,
      payment: false,
      crm: false,
      chatbot: false,
      api: false,
    });
    
    const [totalCost, setTotalCost] = useState<number>(0);
    
    const [breakdown, setBreakdown] = useState<BreakdownType>({
      base: 0,
      pages: 0,
      design: 0,
      features: 0,
      hosting: 0,
      support: 0,
    });
    
    const [progress, setProgress] = useState<number>(0);
    const [activeStep, setActiveStep] = useState<number>(0);
    const [showConfetti, setShowConfetti] = useState<boolean>(false);
    
    const chartRef = useRef<HTMLDivElement | null>(null);

  const baseCosts: Record<string, number> = {
    website: 200000,
    mobileApp: 250000,
    webApp: 300000,
  };
  
  const pageCosts: Record<string, number> = {
    "5": 0,
    "10": 50000,
    "15": 100000,
    "20": 150000,
    "25+": 200000,
  };
  
  const designCosts: Record<string, number> = {
    standard: 0,
    premium: 100000,
    custom: 200000,
  };
  
  const featureCosts: Record<string, number> = {
    ecommerce: 70000,
    authentication: 40000,
    payment: 50000,
    crm: 60000,
    chatbot: 75000,
    api: 65000,
  };
  
  const hostingCosts: Record<string, number> = {
    standard: 20000,
    premium: 50000,
    enterprise: 100000,
  };
  
  const supportCosts: Record<string, number> = {
    "3": 30000,
    "6": 50000,
    "12": 90000,
  };
  
  useEffect(() => {
    // Calculate base cost
    const base = baseCosts[projectType]

    // Calculate pages cost
    const pagesCost = pageCosts[pages]

    // Calculate design cost
    const designCost = designCosts[designType]

    // Calculate features cost
    let featuresCost = 0
    Object.keys(features).forEach((feature) => {
       //@ts-ignore
      if (features[feature]) {
        featuresCost += featureCosts[feature]
      }
    })

    // Calculate hosting cost
    const hostingCost = hostingCosts[hostingType]

    // Calculate support cost
    const supportCost = supportCosts[supportDuration]

    // Calculate total
    const total = base + pagesCost + designCost + featuresCost + hostingCost + supportCost

    // Update state
    setTotalCost(total)
    setBreakdown({
      base,
      pages: pagesCost,
      design: designCost,
      features: featuresCost,
      hosting: hostingCost,
      support: supportCost,
    })

    // Calculate progress for animation
    const maxPossibleCost =
      baseCosts.webApp +
      pageCosts["25+"] +
      designCosts.custom +
      Object.values(featureCosts).reduce((a, b) => a + b, 0) +
      hostingCosts.enterprise +
      supportCosts["12"]

    setProgress((total / maxPossibleCost) * 100)

    // Update chart
    updateChart()
  }, [projectType, pages, designType, features, hostingType, supportDuration])

  useEffect(() => {
    // Initialize chart on component mount
    if (chartRef.current) {
      updateChart()
    }
  }, [])

  const updateChart = () => {
    if (!chartRef.current) return

    //@ts-ignore
    const ctx = chartRef.current.getContext("2d")
    //@ts-ignore
    const width = chartRef.current.width
    //@ts-ignore
    const height = chartRef.current.height

    // Clear canvas
    ctx.clearRect(0, 0, width, height)

    // Draw background
    ctx.fillStyle = "#1f2937"
    ctx.fillRect(0, 0, width, height)

    // Data for pie chart
    const data = [
      { value: breakdown.base, color: "#84cc16", label: "Base" },
      { value: breakdown.pages, color: "#22d3ee", label: "Pages" },
      { value: breakdown.design, color: "#f97316", label: "Design" },
      { value: breakdown.features, color: "#8b5cf6", label: "Features" },
      { value: breakdown.hosting, color: "#ec4899", label: "Hosting" },
      { value: breakdown.support, color: "#f43f5e", label: "Support" },
    ].filter((item) => item.value > 0)

    // Calculate total
    const total = data.reduce((sum, item) => sum + item.value, 0)

    // Draw pie chart
    if (total > 0) {
      let startAngle = 0

      data.forEach((item) => {
        const sliceAngle = (item.value / total) * 2 * Math.PI

        ctx.beginPath()
        ctx.moveTo(width / 2, height / 2)
        ctx.arc(width / 2, height / 2, Math.min(width, height) / 2 - 10, startAngle, startAngle + sliceAngle)
        ctx.closePath()

        ctx.fillStyle = item.color
        ctx.fill()

        startAngle += sliceAngle
      })

      // Draw center circle (donut hole)
      ctx.beginPath()
      ctx.arc(width / 2, height / 2, Math.min(width, height) / 4, 0, 2 * Math.PI)
      ctx.fillStyle = "#1f2937"
      ctx.fill()
    }
  }
  
  const handleFeatureChange = (feature: string) => {
    setFeatures((prev) => ({
      ...prev,
      //@ts-ignore
      [feature]: !prev[feature],
    }))

    // Show confetti animation when a feature is selected
    //@ts-ignore
    if (!features[feature]) {
      setShowConfetti(true)
      setTimeout(() => setShowConfetti(false), 2000)
    }
  }

  const formatCurrency = (amount: string | number | bigint) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
      //@ts-ignore
    }).format(amount)
  }

  const getProjectComplexity = () => {
    if (progress < 30) return { label: "Simple", color: "bg-green-500" }
    if (progress < 60) return { label: "Moderate", color: "bg-yellow-500" }
    return { label: "Complex", color: "bg-red-500" }
  }

  const getEstimatedDeliveryTime = () => {
    let baseTime = projectType === "website" ? 4 : projectType === "mobileApp" ? 8 : 6

    // Add time for pages
    baseTime += pages === "10" ? 1 : pages === "15" ? 2 : pages === "20" ? 3 : pages === "25+" ? 4 : 0

    // Add time for design
    baseTime += designType === "premium" ? 2 : designType === "custom" ? 4 : 0

    // Add time for features
    const featureCount = Object.values(features).filter(Boolean).length
    baseTime += featureCount * 0.5

    return `${baseTime}-${baseTime + 4} weeks`
  }

  const timelineSteps = [
    { title: "Project Planning", duration: "1-2 weeks", icon: Calculator },
    { title: "Design Phase", duration: "2-4 weeks", icon: Sparkles },
    { title: "Development", duration: getEstimatedDeliveryTime(), icon: Code },
    { title: "Testing & QA", duration: "1-2 weeks", icon: Shield },
    { title: "Launch", duration: "1 week", icon: ArrowRight },
  ]

  return (
    <div className="min-h-screen text-white">
      {/* Confetti Animation */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          <div className="confetti-container">
            {[...Array(50)].map((_, i) => (
              <div
                key={i}
                className="confetti"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `-5%`,
                  backgroundColor: `hsl(${Math.random() * 360}, 100%, 50%)`,
                  transform: `rotate(${Math.random() * 360}deg)`,
                  animationDelay: `${Math.random() * 0.5}s`,
                  animationDuration: `${1 + Math.random() * 2}s`,
                }}
              />
            ))}
          </div>
        </div>
      )}

     
      {/* Main Content */}
      <main className="container mx-auto py-12 px-4">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3 mb-8"
          >
            <div className="p-2 bg-lime-400/10 rounded-full">
              <Calculator className="w-8 h-8 text-lime-400" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-lime-400">Project Cost Calculator</h1>
              <p className="text-gray-400 mt-1">Get an instant estimate for your next digital project</p>
            </div>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-4 lg:gap-6">
            {/* Calculator Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="space-y-4"
            >
              {/* Project Type */}
              <Card className="bg-gray-900/50 border border-gray-800 overflow-hidden">
                <CardContent className="p-4">
                  <h2 className="text-lime-400 font-medium flex items-center gap-2 mb-4">
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-lime-400/20 text-lime-400 text-xs font-bold">
                      1
                    </span>
                    Project Type
                  </h2>
                  <Tabs defaultValue="website" value={projectType} onValueChange={setProjectType} className="w-full">
                    <TabsList className="grid grid-cols-3 bg-gray-800/50 border border-gray-700 h-auto">
                      <TabsTrigger
                        value="website"
                        className="data-[state=active]:bg-lime-400 data-[state=active]:text-black text-white"
                      >
                        <div className="flex flex-col items-center gap-2 py-2">
                          <Code className="w-5 h-5" />
                          <span>Website</span>
                          <span className="text-xs">{formatCurrency(baseCosts.website)}</span>
                        </div>
                      </TabsTrigger>
                      <TabsTrigger
                        value="mobileApp"
                        className="data-[state=active]:bg-lime-400 data-[state=active]:text-black text-white"
                      >
                        <div className="flex flex-col items-center gap-2 py-2">
                          <Smartphone className="w-5 h-5" />
                          <span>Mobile App</span>
                          <span className="text-xs">{formatCurrency(baseCosts.mobileApp)}</span>
                        </div>
                      </TabsTrigger>
                      <TabsTrigger
                        value="webApp"
                        className="data-[state=active]:bg-lime-400 data-[state=active]:text-black text-white"
                      >
                        <div className="flex flex-col items-center gap-2 py-2">
                          <LineChart className="w-5 h-5" />
                          <span>Web App</span>
                          <span className="text-xs">{formatCurrency(baseCosts.webApp)}</span>
                        </div>
                      </TabsTrigger>
                    </TabsList>
                  </Tabs>
                </CardContent>
              </Card>

              {/* Number of Pages */}
              <Card className="bg-gray-900/50 border border-gray-800 overflow-hidden">
                <CardContent className="p-4">
                  <h2 className="text-lime-400 font-medium flex items-center gap-2 mb-4">
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-lime-400/20 text-lime-400 text-xs font-bold">
                      2
                    </span>
                    Number of Pages
                  </h2>
                  <Select value={pages} onValueChange={setPages}>
                    <SelectTrigger className="w-full bg-gray-800/50 border-gray-700 focus:ring-lime-400 text-white">
                      <SelectValue placeholder="Select number of pages" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700 text-white">
                      <SelectItem value="5">Up to 5 pages</SelectItem>
                      <SelectItem value="10">6-10 pages (+₹50,000)</SelectItem>
                      <SelectItem value="15">11-15 pages (+₹100,000)</SelectItem>
                      <SelectItem value="20">16-20 pages (+₹150,000)</SelectItem>
                      <SelectItem value="25+">20+ pages (+₹200,000)</SelectItem>
                    </SelectContent>
                  </Select>
                </CardContent>
              </Card>

              {/* Design Type */}
              <Card className="bg-gray-900/50 border border-gray-800 overflow-hidden">
                <CardContent className="p-4">
                  <h2 className="text-lime-400 font-medium flex items-center gap-2 mb-4">
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-lime-400/20 text-lime-400 text-xs font-bold">
                      3
                    </span>
                    Design Type
                  </h2>
                  <div className="grid grid-cols-3 gap-3">
                    <div
                      className={`border rounded-lg p-4 text-center cursor-pointer transition-all ${
                        designType === "standard"
                          ? "border-lime-400 bg-lime-400/10"
                          : "border-gray-700 hover:border-gray-600"
                      }`}
                      onClick={() => setDesignType("standard")}
                    >
                      <div className="flex flex-col items-center gap-2">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            designType === "standard" ? "bg-lime-400 text-black" : "bg-gray-700"
                          }`}
                        >
                          <Check className="w-4 h-4" />
                        </div>
                        <h3 className="font-medium">Standard</h3>
                        <p className="text-xs text-gray-400">Basic design</p>
                        <p className="text-sm font-bold mt-2">Included</p>
                      </div>
                    </div>
                    <div
                      className={`border rounded-lg p-4 text-center cursor-pointer transition-all ${
                        designType === "premium"
                          ? "border-lime-400 bg-lime-400/10"
                          : "border-gray-700 hover:border-gray-600"
                      }`}
                      onClick={() => setDesignType("premium")}
                    >
                      <div className="flex flex-col items-center gap-2">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            designType === "premium" ? "bg-lime-400 text-black" : "bg-gray-700"
                          }`}
                        >
                          <Sparkles className="w-4 h-4" />
                        </div>
                        <h3 className="font-medium">Premium</h3>
                        <p className="text-xs text-gray-400">Enhanced visuals</p>
                        <p className="text-sm font-bold mt-2">+₹100,000</p>
                      </div>
                    </div>
                    <div
                      className={`border rounded-lg p-4 text-center cursor-pointer transition-all ${
                        designType === "custom"
                          ? "border-lime-400 bg-lime-400/10"
                          : "border-gray-700 hover:border-gray-600"
                      }`}
                      onClick={() => setDesignType("custom")}
                    >
                      <div className="flex flex-col items-center gap-2">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            designType === "custom" ? "bg-lime-400 text-black" : "bg-gray-700"
                          }`}
                        >
                          <Zap className="w-4 h-4" />
                        </div>
                        <h3 className="font-medium">Custom</h3>
                        <p className="text-xs text-gray-400">Unique branding</p>
                        <p className="text-sm font-bold mt-2">+₹200,000</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Features */}
              <Card className="bg-gray-900/50 border border-gray-800 overflow-hidden">
                <CardContent className="p-4">
                  <h2 className="text-lime-400 font-medium flex items-center gap-2 mb-4">
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-lime-400/20 text-lime-400 text-xs font-bold">
                      4
                    </span>
                    Features
                    <Badge className="ml-2 bg-lime-400/20 text-lime-400 hover:bg-lime-400/30">
                      {Object.values(features).filter(Boolean).length} selected
                    </Badge>
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <TooltipProvider>
                      <Card
                        className={`bg-gray-800/30 border transition-all feature-card ${
                          features.ecommerce ? "border-lime-400 shadow-glow" : "border-gray-700"
                        }`}
                      >
                        <CardContent className="p-4 flex items-center gap-3">
                          <Checkbox
                            id="ecommerce"
                            checked={features.ecommerce}
                            onCheckedChange={() => handleFeatureChange("ecommerce")}
                            className="border-gray-600 data-[state=checked]:bg-lime-400 data-[state=checked]:border-lime-400"
                          />
                          <div className="flex items-center gap-2">
                            <div>
                              <label htmlFor="ecommerce" className="text-sm font-medium cursor-pointer text-white">
                                E-commerce
                              </label>
                              <p className="text-xs text-gray-400">₹70,000</p>
                            </div>
                          </div>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button variant="ghost" size="icon" className="ml-auto h-6 w-6 text-gray-400">
                                <Info className="h-4 w-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent className="bg-gray-900 border-gray-800 text-white">
                              <p className="text-xs max-w-[200px]">
                                Full e-commerce functionality including product catalog, cart, and checkout
                              </p>
                            </TooltipContent>
                          </Tooltip>
                        </CardContent>
                      </Card>
                    </TooltipProvider>

                    <TooltipProvider>
                      <Card
                        className={`bg-gray-800/30 border transition-all feature-card ${
                          features.authentication ? "border-lime-400 shadow-glow" : "border-gray-700"
                        }`}
                      >
                        <CardContent className="p-4 flex items-center gap-3">
                          <Checkbox
                            id="authentication"
                            checked={features.authentication}
                            onCheckedChange={() => handleFeatureChange("authentication")}
                            className="border-gray-600 data-[state=checked]:bg-lime-400 data-[state=checked]:border-lime-400"
                          />
                          <div className="flex items-center gap-2">
                            <div>
                              <label htmlFor="authentication" className="text-sm font-medium cursor-pointer text-white">
                                Authentication
                              </label>
                              <p className="text-xs text-gray-400">₹40,000</p>
                            </div>
                          </div>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button variant="ghost" size="icon" className="ml-auto h-6 w-6 text-gray-400">
                                <Info className="h-4 w-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent className="bg-gray-900 border-gray-800 text-white">
                              <p className="text-xs max-w-[200px]">
                                Secure login, registration, and user profile management
                              </p>
                            </TooltipContent>
                          </Tooltip>
                        </CardContent>
                      </Card>
                    </TooltipProvider>

                    <TooltipProvider>
                      <Card
                        className={`bg-gray-800/30 border transition-all feature-card ${
                          features.payment ? "border-lime-400 shadow-glow" : "border-gray-700"
                        }`}
                      >
                        <CardContent className="p-4 flex items-center gap-3">
                          <Checkbox
                            id="payment"
                            checked={features.payment}
                            onCheckedChange={() => handleFeatureChange("payment")}
                            className="border-gray-600 data-[state=checked]:bg-lime-400 data-[state=checked]:border-lime-400"
                          />
                          <div className="flex items-center gap-2">
                            <div>
                              <label htmlFor="payment" className="text-sm font-medium cursor-pointer text-white">
                                Payment Gateway
                              </label>
                              <p className="text-xs text-gray-400">₹50,000</p>
                            </div>
                          </div>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button variant="ghost" size="icon" className="ml-auto h-6 w-6 text-gray-400">
                                <Info className="h-4 w-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent className="bg-gray-900 border-gray-800 text-white">
                              <p className="text-xs max-w-[200px]">
                                Integration with payment processors like Stripe, PayPal, etc.
                              </p>
                            </TooltipContent>
                          </Tooltip>
                        </CardContent>
                      </Card>
                    </TooltipProvider>

                    <TooltipProvider>
                      <Card
                        className={`bg-gray-800/30 border transition-all feature-card ${
                          features.crm ? "border-lime-400 shadow-glow" : "border-gray-700"
                        }`}
                      >
                        <CardContent className="p-4 flex items-center gap-3">
                          <Checkbox
                            id="crm"
                            checked={features.crm}
                            onCheckedChange={() => handleFeatureChange("crm")}
                            className="border-gray-600 data-[state=checked]:bg-lime-400 data-[state=checked]:border-lime-400"
                          />
                          <div className="flex items-center gap-2">
                            <div>
                              <label htmlFor="crm" className="text-sm font-medium cursor-pointer text-white">
                                CRM Integration
                              </label>
                              <p className="text-xs text-gray-400">₹60,000</p>
                            </div>
                          </div>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button variant="ghost" size="icon" className="ml-auto h-6 w-6 text-gray-400">
                                <Info className="h-4 w-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent className="bg-gray-900 border-gray-800 text-white">
                              <p className="text-xs max-w-[200px]">
                                Connect with CRM systems like Salesforce, HubSpot, etc.
                              </p>
                            </TooltipContent>
                          </Tooltip>
                        </CardContent>
                      </Card>
                    </TooltipProvider>

                    <TooltipProvider>
                      <Card
                        className={`bg-gray-800/30 border transition-all feature-card ${
                          features.chatbot ? "border-lime-400 shadow-glow" : "border-gray-700"
                        }`}
                      >
                        <CardContent className="p-4 flex items-center gap-3">
                          <Checkbox
                            id="chatbot"
                            checked={features.chatbot}
                            onCheckedChange={() => handleFeatureChange("chatbot")}
                            className="border-gray-600 data-[state=checked]:bg-lime-400 data-[state=checked]:border-lime-400"
                          />
                          <div className="flex items-center gap-2">
                            <div>
                              <label htmlFor="chatbot" className="text-sm font-medium cursor-pointer text-white">
                                AI Chatbot
                              </label>
                              <p className="text-xs text-gray-400">₹75,000</p>
                            </div>
                          </div>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button variant="ghost" size="icon" className="ml-auto h-6 w-6 text-gray-400">
                                <Info className="h-4 w-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent className="bg-gray-900 border-gray-800 text-white">
                              <p className="text-xs max-w-[200px]">
                                AI-powered chatbot for customer support and engagement
                              </p>
                            </TooltipContent>
                          </Tooltip>
                        </CardContent>
                      </Card>
                    </TooltipProvider>

                    <TooltipProvider>
                      <Card
                        className={`bg-gray-800/30 border transition-all feature-card ${
                          features.api ? "border-lime-400 shadow-glow" : "border-gray-700"
                        }`}
                      >
                        <CardContent className="p-4 flex items-center gap-3">
                          <Checkbox
                            id="api"
                            checked={features.api}
                            onCheckedChange={() => handleFeatureChange("api")}
                            className="border-gray-600 data-[state=checked]:bg-lime-400 data-[state=checked]:border-lime-400"
                          />
                          <div className="flex items-center gap-2">
                            <div>
                              <label htmlFor="api" className="text-sm font-medium cursor-pointer text-white">
                                API Integration
                              </label>
                              <p className="text-xs text-gray-400">₹65,000</p>
                            </div>
                          </div>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button variant="ghost" size="icon" className="ml-auto h-6 w-6 text-gray-400">
                                <Info className="h-4 w-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent className="bg-gray-900 border-gray-800 text-white">
                              <p className="text-xs max-w-[200px]">Integration with third-party APIs and services</p>
                            </TooltipContent>
                          </Tooltip>
                        </CardContent>
                      </Card>
                    </TooltipProvider>
                  </div>
                </CardContent>
              </Card>

              {/* Hosting & Security */}
              <Card className="bg-gray-900/50 border border-gray-800 overflow-hidden">
                <CardContent className="p-4">
                  <h2 className="text-lime-400 font-medium flex items-center gap-2 mb-4">
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-lime-400/20 text-lime-400 text-xs font-bold">
                      5
                    </span>
                    Hosting & Security
                  </h2>
                  <div className="grid grid-cols-3 gap-3">
                    <div
                      className={`border rounded-lg p-4 text-center cursor-pointer transition-all ${
                        hostingType === "standard"
                          ? "border-lime-400 bg-lime-400/10"
                          : "border-gray-700 hover:border-gray-600"
                      }`}
                      onClick={() => setHostingType("standard")}
                    >
                      <div className="flex flex-col items-center gap-2">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            hostingType === "standard" ? "bg-lime-400 text-black" : "bg-gray-700"
                          }`}
                        >
                          <Shield className="w-4 h-4" />
                        </div>
                        <h3 className="font-medium">Standard</h3>
                        <p className="text-xs text-gray-400">Basic hosting</p>
                        <p className="text-sm font-bold mt-2">₹20,000/year</p>
                      </div>
                    </div>
                    <div
                      className={`border rounded-lg p-4 text-center cursor-pointer transition-all ${
                        hostingType === "premium"
                          ? "border-lime-400 bg-lime-400/10"
                          : "border-gray-700 hover:border-gray-600"
                      }`}
                      onClick={() => setHostingType("premium")}
                    >
                      <div className="flex flex-col items-center gap-2">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            hostingType === "premium" ? "bg-lime-400 text-black" : "bg-gray-700"
                          }`}
                        >
                          <Shield className="w-4 h-4" />
                        </div>
                        <h3 className="font-medium">Premium</h3>
                        <p className="text-xs text-gray-400">Enhanced security</p>
                        <p className="text-sm font-bold mt-2">₹50,000/year</p>
                      </div>
                    </div>
                    <div
                      className={`border rounded-lg p-4 text-center cursor-pointer transition-all ${
                        hostingType === "enterprise"
                          ? "border-lime-400 bg-lime-400/10"
                          : "border-gray-700 hover:border-gray-600"
                      }`}
                      onClick={() => setHostingType("enterprise")}
                    >
                      <div className="flex flex-col items-center gap-2">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            hostingType === "enterprise" ? "bg-lime-400 text-black" : "bg-gray-700"
                          }`}
                        >
                          <Shield className="w-4 h-4" />
                        </div>
                        <h3 className="font-medium">Enterprise</h3>
                        <p className="text-xs text-gray-400">Advanced protection</p>
                        <p className="text-sm font-bold mt-2">₹100,000/year</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Support & Maintenance */}
              <Card className="bg-gray-900/50 border border-gray-800 overflow-hidden">
                <CardContent className="p-4">
                  <h2 className="text-lime-400 font-medium flex items-center gap-2 mb-4">
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-lime-400/20 text-lime-400 text-xs font-bold">
                      6
                    </span>
                    Support & Maintenance
                  </h2>
                  <div className="grid grid-cols-3 gap-3">
                    <div
                      className={`border rounded-lg p-4 text-center cursor-pointer transition-all ${
                        supportDuration === "3"
                          ? "border-lime-400 bg-lime-400/10"
                          : "border-gray-700 hover:border-gray-600"
                      }`}
                      onClick={() => setSupportDuration("3")}
                    >
                      <div className="flex flex-col items-center gap-2">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            supportDuration === "3" ? "bg-lime-400 text-black" : "bg-gray-700"
                          }`}
                        >
                          <Clock className="w-4 h-4" />
                        </div>
                        <h3 className="font-medium">3 Months</h3>
                        <p className="text-xs text-gray-400">Basic support</p>
                        <p className="text-sm font-bold mt-2">₹30,000</p>
                      </div>
                    </div>
                    <div
                      className={`border rounded-lg p-4 text-center cursor-pointer transition-all ${
                        supportDuration === "6"
                          ? "border-lime-400 bg-lime-400/10"
                          : "border-gray-700 hover:border-gray-600"
                      }`}
                      onClick={() => setSupportDuration("6")}
                    >
                      <div className="flex flex-col items-center gap-2">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            supportDuration === "6" ? "bg-lime-400 text-black" : "bg-gray-700"
                          }`}
                        >
                          <Clock className="w-4 h-4" />
                        </div>
                        <h3 className="font-medium">6 Months</h3>
                        <p className="text-xs text-gray-400">Extended support</p>
                        <p className="text-sm font-bold mt-2">₹50,000</p>
                      </div>
                    </div>
                    <div
                      className={`border rounded-lg p-4 text-center cursor-pointer transition-all ${
                        supportDuration === "12"
                          ? "border-lime-400 bg-lime-400/10"
                          : "border-gray-700 hover:border-gray-600"
                      }`}
                      onClick={() => setSupportDuration("12")}
                    >
                      <div className="flex flex-col items-center gap-2">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            supportDuration === "12" ? "bg-lime-400 text-black" : "bg-gray-700"
                          }`}
                        >
                          <Clock className="w-4 h-4" />
                        </div>
                        <h3 className="font-medium">12 Months</h3>
                        <p className="text-xs text-gray-400">Premium support</p>
                        <p className="text-sm font-bold mt-2">₹90,000</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Cost Summary */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="space-y-8"
            >
              <div className="sticky top-24">
                <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-800 overflow-hidden">
                  <CardContent className="p-6">
                    <div className="space-y-6">
                      <div className="flex justify-between items-center">
                        <h2 className="text-xl font-bold text-white">Project Cost Summary</h2>
                        <div className="flex items-center gap-2">
                          <Lock className="w-4 h-4 text-lime-400" />
                          <span className="text-xs text-gray-300">Secure Estimate</span>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="flex justify-between">
                          <span className="text-gray-300">Base Cost</span>
                          <span className="text-white">{formatCurrency(breakdown.base)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-300">Pages</span>
                          <span className="text-white">{formatCurrency(breakdown.pages)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-300">Design</span>
                          <span className="text-white">{formatCurrency(breakdown.design)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-300">Features</span>
                          <span className="text-white">{formatCurrency(breakdown.features)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-300">Hosting & Security</span>
                          <span className="text-white">{formatCurrency(breakdown.hosting)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-300">Support & Maintenance</span>
                          <span className="text-white">{formatCurrency(breakdown.support)}</span>
                        </div>
                        <div className="h-px bg-gray-700 my-2"></div>
                        <div className="flex justify-between font-bold">
                          <span className="text-white">Total Estimated Cost</span>
                          <span className="text-lime-400 text-xl">{formatCurrency(totalCost)}</span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between text-xs">
                          <span>Project Complexity</span>
                          <div className="flex items-center gap-1">
                            <span
                              className={`inline-block w-2 h-2 rounded-full ${getProjectComplexity().color}`}
                            ></span>
                            <span>{getProjectComplexity().label}</span>
                          </div>
                        </div>
                        <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                          <div
                            className="h-full transition-all duration-500 ease-out"
                            style={{
                              width: `${progress}%`,
                              background: `linear-gradient(90deg, #84cc16 0%, #bef264 100%)`,
                            }}
                          />
                        </div>
                      </div>

                      <div className="flex flex-col items-center ">
                        <canvas
                        //@ts-ignore
                        ref={chartRef} width="200" height="200" className="mb-4"></canvas>
                        <div className="grid grid-cols-3 gap-2 w-full ">
                          {Object.entries(breakdown)
                            .filter(([_, value]) => value > 0)
                            .map(([key, value], index) => (
                              <div key={key} className="flex items-center gap-1 text-xs">
                                <span
                                  className="inline-block w-3 h-3 rounded-full"
                                  style={{
                                    backgroundColor: ["#84cc16", "#22d3ee", "#f97316", "#8b5cf6", "#ec4899", "#f43f5e"][
                                      index % 6
                                    ],
                                  }}
                                ></span>
                                <span className="capitalize">{key}</span>
                              </div>
                            ))}
                        </div>
                      </div>

                      <div className="space-y-4">
                        <Button className="w-full bg-lime-400 text-black hover:bg-lime-500 py-6 font-medium">
                          Get Detailed Quote
                        </Button>
                        <div className="flex items-center justify-center gap-2 text-xs text-gray-400">
                          <Check className="w-4 h-4 text-lime-400" />
                          <span>No commitment, free consultation</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="bg-gray-900/80 p-4 border-t border-gray-800">
                    <div className="w-full">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="text-sm font-medium">Estimated Timeline</h3>
                        <span className="text-xs text-lime-400">{getEstimatedDeliveryTime()}</span>
                      </div>
                      <div className="relative">
                        <div className="absolute left-3 top-0 bottom-0 w-0.5 bg-gray-800"></div>
                        <div className="space-y-4">
                          {timelineSteps.map((step, index) => (
                            <div
                              key={index}
                              className={`relative pl-8 transition-all duration-300 ${
                                index === activeStep ? "opacity-100" : "opacity-60"
                              }`}
                              onMouseEnter={() => setActiveStep(index)}
                            >
                              <div
                                className={`absolute left-0 w-6 h-6 rounded-full flex items-center justify-center ${
                                  index === activeStep ? "bg-lime-400 text-black" : "bg-gray-800 text-gray-400"
                                }`}
                              >
                                <step.icon className="w-3 h-3" />
                              </div>
                              <div className="flex justify-between">
                                <h4 className="font-medium text-sm">{step.title}</h4>
                                <span className="text-xs text-gray-400">{step.duration}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardFooter>
                </Card>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  )
}

