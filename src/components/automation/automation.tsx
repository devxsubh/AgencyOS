"use client"

import DataUnavailable from "@/components/global/data-unavailable";
import React from 'react';
import { useState, useEffect } from 'react';
import {
  Bot, Zap, LineChart, Users, MessageSquare, Rocket, 
  CheckCircle2, ArrowRight, Building2, Brain,
  BarChart4, Target, Settings, RefreshCw,
  PiggyBank, GraduationCap, ShoppingBag, Home, Car,
  ArrowRightIcon, BarChart3, ChevronRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import Container from "@/components/global/container";
import Link from "next/link";
import Image from "next/image";
import { MagicCard } from '../ui/magic-card';
import { Connect } from './Industry';
import { FeatureStepsDemo } from './Why';
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"


// Add Price type definition
type Price = {
  serviceType: string;
  price: string;
  name: string;
  description: string;
  features: string[];
};

function Automation() {
  const features = [
    {
      icon: <Bot className="w-8 h-8" />,
      title: "AI-Powered Automation",
      description: "Leverage advanced AI algorithms to automate your marketing and sales processes"
    },
    {
      icon: <LineChart className="w-8 h-8" />,
      title: "Data-Driven Insights",
      description: "Make informed decisions with real-time analytics and performance metrics"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Lead Management",
      description: "Efficiently track and nurture leads through your sales pipeline"
    },
    {
      icon: <MessageSquare className="w-8 h-8" />,
      title: "Smart Communication",
      description: "Automated messaging and follow-ups to keep your leads engaged"
    }
  ];

  const solutions = [
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Lead Generation",
      description: "AI-powered lead generation and qualification system"
    },
    {
      icon: <Brain className="w-8 h-8" />,
      title: "Smart Automation",
      description: "Intelligent customer relationship management platform"
    },
    {
      icon: <BarChart4 className="w-8 h-8" />,
      title: "Analytics",
      description: "Comprehensive reporting and performance tracking"
    }
  ];

  const caseStudies = [
    {
      title: "E-commerce",
      challenge: "Low conversion rates",
      solution: "AI-powered personalization",
      metric: "150% increase in sales"
    },
    {
      title: "Real Estate",
      challenge: "Manual lead follow-up",
      solution: "Automated nurture sequences",
      metric: "3x more closings"
    },
    {
      title: "SaaS",
      challenge: "High CAC",
      solution: "Smart targeting & automation",
      metric: "45% reduced acquisition cost"
    }
  ];

  const processSteps = [
    {
      icon: <Target className="w-6 h-6" stroke="black" />,
      title: "Strategy Planning",
      description: "Define your goals and create a customized automation strategy",
    },
    {
      icon: <Settings className="w-6 h-6" stroke="black" />,
      title: "Implementation",
      description: "Set up and configure your AI-powered marketing system",
    },
    {
      icon: <RefreshCw className="w-6 h-6" stroke="black" />,
      title: "Optimization",
      description: "Continuous improvement based on data and performance",
    },
  ];

  const [pricingPlans, setPricingPlans] = useState<Price[]>([]);
  const [pricingLoaded, setPricingLoaded] = useState(false);

useEffect(() => {
  const fetchPricingPlans = async () => {
    try {
      const response = await fetch('/api/prices');
      const data = await response.json();
      if (!data.success) throw new Error(data.error || 'Failed to fetch prices');
      setPricingPlans(data.prices
        .filter((data: Price) => data.serviceType === 'automation')
        .sort((a: Price, b: Price) => {
          const priceA = Number(a.price.replace(/[^\d]/g, ""));
          const priceB = Number(b.price.replace(/[^\d]/g, ""));
          return priceA - priceB;
        })
      );
    } catch (error) {
      console.error('Error fetching pricing plans:', error);
    } finally {
      setPricingLoaded(true);
    };
  };

  fetchPricingPlans();
}, []);

  const industries = [
    {
      icon: <ShoppingBag className="w-8 h-8" />,
      title: "E-commerce",
      description: "Boost sales with smart product recommendations and automated follow-ups"
    },
    {
      icon: <Home className="w-8 h-8" />,
      title: "Real Estate",
      description: "Automate lead nurturing and property matching for faster closings"
    },
    {
      icon: <Building2 className="w-8 h-8" />,
      title: "B2B Services",
      description: "Streamline your B2B sales process with intelligent automation"
    },
    {
      icon: <GraduationCap className="w-8 h-8" />,
      title: "Education",
      description: "Enhance student enrollment and engagement with AI-powered communication"
    },
    {
      icon: <Car className="w-8 h-8" />,
      title: "Automotive",
      description: "Accelerate sales with automated lead qualification and follow-up"
    },
    {
      icon: <PiggyBank className="w-8 h-8" />,
      title: "Financial Services",
      description: "Improve client acquisition and retention with smart automation"
    }
  ];
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])


  return (
    <div className="min-h-screen">

      {/* Hero Section */}
      <div className="relative h-screen max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 flex flex-col items-center justify-center">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute" />
          <div className="absolute -inset-x-40 -top-40 -bottom-40 [mask-image:radial-gradient(closest-side,white,transparent)] bg-[#c3ea00]/10" />
        </div>
        <div className="flex flex-col items-center justify-center text-center gap-y-4 bg-background/0">
                    <Container className="relative block overflow-hidden">
                        <button className="group relative grid overflow-hidden rounded-full px-2 py-1 shadow-[0_1000px_0_0_hsl(0_0%_15%)_inset] transition-colors duration-200 mx-auto">
                            <span>
                                <span className="spark mask-gradient absolute inset-0 h-[100%] w-[100%] animate-flip overflow-hidden rounded-full [mask:linear-gradient(white,_transparent_50%)] before:absolute before:aspect-square before:w-[200%] before:rotate-[-90deg] before:animate-rotate before:bg-[conic-gradient(from_0deg,transparent_0_340deg,white_360deg)] before:content-[''] before:[inset:0_auto_auto_50%] before:[translate:-50%_-15%]" />
                            </span>
                            <span className="backdrop absolute inset-[1px] rounded-full bg-background transition-colors duration-200 group-hover:bg-neutral-800" />
                            <span className="z-10 py-0.5 text-sm text-neutral-100 flex items-center">
                                <span className="px-2 py-[0.5px] h-[18px] tracking-wide flex items-center justify-center rounded-full bg-gradient-to-r from-[#C4EA00] to-[#dae6a1] text-[9px] font-medium mr-2 text-gray-700">
                                <Rocket className="w-4 h-4" />
                                </span>
                                AI-Powered Marketing Automation
                            </span>
                        </button>
                    </Container>
                    <Container delay={0.15}>
                        <h1 className="text-3xl md:text-3xl lg:text-5xl font-bold text-center !leading-tight max-w-4xl mx-auto">
                        Automate, Optimize & Scale {" "}
                           <br/>
                            <span className="">
                            Your Business With  {" "}
                            </span>
                            <br/>
                            <span className="">
                            AI-Powered Marketing & Automation{" "}
                            </span>
                        </h1>
                    </Container>
                    <Container delay={0.2}>
                        <p className="max-w-xl mx-auto mt-2 text-base lg:text-base text-center text-muted-foreground">
                        Boost your ROI with AI-driven lead generation, automated follow-ups, and seamless customer management – all in one platform!
                        </p>
                    </Container>
                    <Container delay={0.25} className="z-20">
                        <div className="flex items-center justify-center mt-6 gap-x-4">
                            <Link href="/leadform" className="flex items-center gap-2 group">
                                <Button size="lg" className="bg-[#C4EA00]">
                                Get a Free Strategy Session
                                </Button>
                            </Link>
                        </div>
                    </Container>

                </div>
      </div>

      {/* Features Section */}
      {/* <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              Why Businesses Trust Our{" "}
              <span className="text-[#c3ea00]">AI-Powered Marketing & Automation?</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
               <MagicCard
               key={index}
               gradientFrom="#c4ea00"
               gradientTo="#c4ea00"
               gradientColor="rgba(196, 234, 0, 0.1)"
               className="p-4 lg:p-8 w-full overflow-hidden"
              >
                <div className="relative z-10"></div>
                <div className="text-[#c3ea00] mb-4">
                  {feature.icon}
                </div>

                  <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                  <p className="text-gray-400">{feature.description}</p>
               
              </MagicCard>
            
            ))}
          </div>
        </div>
      </div> */}

         <div className="py-10 bg-[#0a0a0a] relative overflow-hidden">
          <FeatureStepsDemo/>
         </div>
      


      {/* Solutions Section */}
      <div className="py-20 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              End-to-End{" "}
              <span className="text-[#c3ea00]">AI-Driven Marketing & Sales Automation Solutions</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {solutions.map((solution, index) => (
              <MagicCard
              key={index}
              gradientFrom="#c4ea00"
              gradientTo="#c4ea00"
              gradientColor="rgba(196, 234, 0, 0.1)"
              className="p-4 lg:p-8 w-full overflow-hidden"
             >
              <div key={index} className="relative group overflow-hidden rounded-xl p-6">
                <div className="relative z-10">
                  <div className="text-[#c3ea00] mb-4">
                    {solution.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">{solution.title}</h3>
                  <p className="text-gray-400">{solution.description}</p>
                </div>
              </div>
              </MagicCard>
            ))}
          </div>
        </div>
      </div>

      {/* Case Studies */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              How Our{" "}
              <span className="text-[#c3ea00]">AI-Powered Marketing System Transforms Businesses</span>
            </h2>
          </div>
          <MagicCard
              gradientFrom="#c4ea00"
              gradientTo="#c4ea00"
              gradientColor="rgba(196, 234, 0, 0.1)"
              className="p-4 lg:p-8 w-full overflow-hidden"
             >
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Industry</TableHead>
                <TableHead>Challenge</TableHead>
                <TableHead>Solution</TableHead>
                <TableHead>Results</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {caseStudies.map((study, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{study.title}</TableCell>
                  <TableCell>{study.challenge}</TableCell>
                  <TableCell>{study.solution}</TableCell>
                  <TableCell className="text-[#c3ea00]">{study.metric}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          </MagicCard>
        </div>
      </div>

      {/* Process Timeline */}
      {/* <div className="py-20 border-t border-gray-800 bg-[#0e0e10]/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              Our{" "}
              <span className="text-[#c3ea00]">AI-Powered Marketing & Automation Process</span>
            </h2>
          </div>
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-px bg-gray-800" />
            <div className="space-y-12">
              {processSteps.map((step, index) => (
                <div
                  key={index}
                  className={`relative flex items-center ${
                    index % 2 === 0 ? 'justify-start' : 'justify-end'
                  }`}
                >
                  <div className="w-1/2 flex items-center gap-4">
                    <div className="bg-[#c3ea00] rounded-full p-2 z-10">
                      {step.icon}
                    </div>
                    <MagicCard
                      gradientFrom="#c4ea00"
                      gradientTo="#c4ea00"
                      gradientColor="rgba(196, 234, 0, 0.1)"
                      className="p-4 lg:p-8 w-full overflow-hidden bg-[#1a1a1a] rounded-xl"
                    >
                      <h3 className="text-xl font-semibold text-white mb-2">{step.title}</h3>
                      <p className="text-gray-400">{step.description}</p>
                    </MagicCard>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div> */}
      <div className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <h2 className="text-center text-4xl font-bold tracking-tight sm:text-4xl lg:text-5xl mb-16">
          Our <span className="text-[#c3ea00]">AI-Powered Marketing & Automation Process</span>
        </h2>

        <div className="relative">
          {/* Center Timeline Line */}
          <div className="absolute left-8 md:left-[25%] transform -translate-x-1/2 h-full w-[2px] bg-gray-800" />

          {/* Process Steps */}
          <div className="space-y-12">
            {processSteps.map((step, index) => (
              <div key={index} className="relative flex flex-col md:flex-row items-start">
                {/* Timeline Dot */}
                <div className="absolute left-8 md:left-[25%] transform -translate-x-1/2 w-10 h-10 flex items-center justify-center">
                  <div className="w-4 h-4 bg-[#c3ea00] rounded-full shadow-[0_0_0_6px_rgba(196,234,0,0.15)]" />
                </div>

                {/* Title on the Left */}
                <div className="w-full md:w-1/3 text-left md:pr-12 flex items-center gap-4">
                  <div className="bg-[#c3ea00] rounded-full p-2 z-10">{step.icon}</div>
                  <h3 className="text-lg md:text-xl font-semibold text-[#c3ea00]">{step.title}</h3>
                </div>

                {/* Content Card on the Right */}
                <div className="w-full md:w-2/3 flex md:pl-12">
                  <MagicCard
                    gradientFrom="#c4ea00"
                    gradientTo="#c4ea00"
                    gradientColor="rgba(196, 234, 0, 0.1)"
                    className="p-4 bg-[#1a1a1a] rounded-md border border-white/10 shadow-[0_4px_20px_rgba(0,0,0,0.12)] backdrop-blur-sm w-full"
                  >
                    <p className="text-gray-400">{step.description}</p>
                  </MagicCard>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>

      {/* Pricing Section */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              Choose Your{" "}
              <span className="text-[#c3ea00]">AI Marketing & Automation Package</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pricingLoaded && pricingPlans.length === 0 && (
            <DataUnavailable className="col-span-full py-10" message="Pricing is currently not available. Please check back soon." />
          )}
          {pricingPlans.map((plan, index) => (
              <div key={index} className="group cursor-pointer">
                <div className={`relative rounded-2xl p-8 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-[#c3ea00]/10 ${
                  plan.name === "Growth" ? 'bg-gradient-to-br from-[#c3ea00]/20 to-[#1a1a1a]' : 'bg-[#1a1a1a]'
                }`}>
                  {plan.name === "Growth" && (
                    <div className="absolute top-0 right-0 bg-[#c3ea00] text-black px-4 py-1 rounded-bl-xl">
                      Popular
                    </div>
                  )}
                  <h3 className="text-3xl font-bold text-white mb-4">{plan.name}</h3>
                  <div className="flex items-baseline mb-8">
                    <span className="text-4xl font-bold text-[#c3ea00]">{plan.price}</span>
                  </div>
                  <p className="text-gray-400 mb-4">{plan.description}</p>
                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, fIndex) => (
                      <li key={fIndex} className="flex items-center text-gray-300">
                        <CheckCircle2 className="w-5 h-5 text-[#c3ea00] mr-3" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Container delay={0.25} className="z-20">
                    <div className="flex items-center justify-center mt-6 gap-x-4">
                        <Button size="lg" className="bg-[#C4EA00]">
                        Choose {plan.name}
                        </Button>
                    </div>
                  </Container>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Industry Solutions */}
      {/* <div className="py-20 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              AI-Powered Marketing & Automation Solutions for{" "}
              <span className="text-[#c3ea00]">Every Industry</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {industries.map((industry, index) => (
                <MagicCard
                key={index}
                gradientFrom="#c4ea00"
                gradientTo="#c4ea00"
                gradientColor="rgba(196, 234, 0, 0.1)"
                className="p-4 lg:p-8 w-full overflow-hidden bg-[#1a1a1a] rounded-xl"
              >
              <div key={index} className="group relative overflow-hidden rounded-xl p-6 transition-all duration-300">
                <div className="relative z-10">
                  <div className="text-[#c3ea00] mb-4">
                    {industry.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">{industry.title}</h3>
                  <p className="text-gray-400">{industry.description}</p>
                </div>
              </div>
              </MagicCard>
            ))}
          </div>
        </div>
      </div> */}

            <div className="py-20 px-4 bg-[#0a0a0a] relative overflow-hidden">
            <Connect/>
            </div>


      {/* Live Demo Section */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="relative z-10 container mx-auto px-4 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
          transition={{ duration: 0.8 }}
          className="max-w-5xl mx-auto text-center mb-16"
        >
          <Badge variant="outline" className="mb-6 px-4 py-1.5 border-[#c4ea00] text-[#c4ea00]">
            NEXT-GEN MARKETING SOLUTIONS
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
            Experience <span className="text-[#c4ea00]">AI-Powered Marketing</span> Before You Invest
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Discover how our cutting-edge AI technology can transform your marketing strategy, boost ROI, and deliver
            measurable results without any upfront commitment.
          </p>
        </motion.div>

        {/* Feature cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {[
            {
              title: "Interactive Automation Dashboard",
              description:
                "See AI-driven automation in action with our live interactive dashboard. Visualize real-time data and automation workflows.",
              icon: <BarChart3 className="h-10 w-10 text-[#c4ea00]" />,
              delay: 0.2,
            },
            {
              title: "Live Ad Campaign Demo",
              description:
                "Understand how AI enhances ad performance through our guided demo showcasing real campaign optimizations and results.",
              icon: <Zap className="h-10 w-10 text-[#c4ea00]" />,
              delay: 0.4,
            },
            {
              title: "One-on-One Strategy Call",
              description:
                "Discuss your business needs & AI solutions with our experts. Get personalized recommendations for your specific goals.",
              icon: <Bot className="h-10 w-10 text-[#c4ea00]" />,
              delay: 0.6,
            },
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
              transition={{ duration: 0.6, delay: feature.delay }}
            >
              <MagicCard
                  gradientFrom="#c4ea00"
                  gradientTo="#c4ea00"
                  gradientColor="rgba(196, 234, 0, 0.1)"
                  className="p-4 lg:p-8 w-full overflow-hidden bg-[#1a1a1a] rounded-xl"
                  >
                <CardHeader className="pb-2">
                  <div className="mb-4">{feature.icon}</div>
                  <CardTitle className="text-2xl font-bold">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-gray-400">
                  <p>{feature.description}</p>
                </CardContent>
              </MagicCard>
            </motion.div>
          ))}
        </div>



        {/* Stats section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 40 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16 max-w-5xl mx-auto"
        >
          {[
            { value: "93%", label: "Increased ROI" },
            { value: "2.5x", label: "Conversion Rate" },
            { value: "60%", label: "Time Saved" },
            { value: "24/7", label: "AI Optimization" },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-5xl font-bold text-[#c4ea00] mb-2">{stat.value}</div>
              <div className="text-gray-40 text-xl">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* CTA section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0.95 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="max-w-4xl mx-auto text-center"
        >
          <div className="bg-gradient-to-r from-[#111111] to-[#1a1a1a] p-8 rounded-2xl border border-[#333333]">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to see the power of AI marketing?</h2>
            <p className="text-gray-400 mb-6">
              Schedule a free demo today and discover how our AI solutions can transform your marketing strategy.
            </p>
            <div className="flex items-center justify-center mt-6 gap-x-4">
            <Link href="/leadform" className="flex items-center gap-2 group">
            <Button className="bg-[#c4ea00] hover:bg-[#a8e05a] text-black font-medium px-8 py-6 text-lg rounded-full">
              Schedule Your Free Demo Today! <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            </Link>
            </div>
          </div>
        </motion.div>

        </div>
        </div>
      </div>
    </div>
  );
}

export default Automation;