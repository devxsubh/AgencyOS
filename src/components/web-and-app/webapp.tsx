"use client"

import React, { useState } from 'react';
import {
  Rocket, CheckCircle2, Smartphone, Globe, Cog, ShoppingCart, MessageCircle, Shield, Users, BarChart4,
  Book, Building2, Car, Video, Lock, Briefcase, GraduationCap,
  ChevronDown,
} from 'lucide-react';
import { useForm } from "react-hook-form";
import { Button } from '../ui/button';
import Link from 'next/link';
import Container from "@/components/global/container";
import { MagicCard } from '../ui/magic-card';
import { Timeline } from '../ui/timeline';
import { motion } from 'framer-motion';

function WebApp() {
  const plans = [
    {
      name: "Growth Plan",
      features: ["CRM Integration", "Basic Support"],
      price: "₹4,49,999",
    },
    {
      name: "Elite Plan",
      features: ["AI Engagement Tools", "Advanced Automation", "Premium Support"],
      price: "₹5,49,999",
    },
  ];
  const features = [
    { icon: <Smartphone />, title: "Custom-Tailored Solutions", desc: "Designed to fit your business needs" },
    { icon: <BarChart4 />, title: "AI-Powered Optimization", desc: "Smarter apps for higher engagement" },
    { icon: <Shield />, title: "Scalable Architecture", desc: "Built for long-term business growth" },
    { icon: <Cog />, title: "Full-Cycle Support", desc: "From ideation to launch & maintenance" },
    { icon: <Briefcase />, title: "Industry Expertise", desc: "FinTech, E-Commerce, SaaS, EdTech experts" },
  ];
  const projects = [
    {
      title: "Ride-Sharing App (Rapido-Style Model)",
      description:
        "AI-powered driver allocation, live tracking, and seamless user experience tailored for urban mobility.",
      imageAlt: "Ride Sharing App UI Concept",
      image: '/images/ride-sharing-ui.webp',
    },
    {
      title: "AI-Powered E-Commerce App",
      description:
        "Delivering hyper-personalized shopping experiences using real-time AI recommendations to boost conversions.",
      imageAlt: "E-Commerce App UI Concept",
      image: '/images/ecommerce-ui.webp', 
    },
    {
      title: "On-Demand Home Services App",
      description:
        "Instant booking of verified professionals with intelligent AI-matching and secure in-app payments.",
      imageAlt: "Home Services App UI Concept",
      image: '/images/home-services-ui.webp', 
    },
  ];
  const pricingPlans = [
    {
      name: "Basic",
      price: "₹1,99,999",
      description: "Startups & small businesses needing a simple online presence",
      features: [
        "Pre-designed UI templates",
        "Static website / MVP mobile app",
        "Basic SEO",
        "Shared Hosting",
        "3-Months Support",
        "No automation"
      ],
      bestFor: "Small Businesses, Landing Pages"
    },
    {
      name: "Growth",
      price: "₹4,49,999",
      description: "Mid-size businesses looking for scalability & custom integrations",
      features: [
        "Custom UI/UX Design",
        "Dynamic website/app with APIs",
        "Advanced SEO & Speed Optimization",
        "VPS Hosting with SSL",
        "6-Months Support",
        "CRM & API Integrations"
      ],
      bestFor: "Growth-Focused Brands"
    },
    {
      name: "Elite",
      price: "₹5,49,999",
      description: "Enterprises & brands needing a fully automated, high-converting app or website",
      features: [
        "AI-Powered UX with premium animations & motion design",
        "AI-driven app with automation & backend scalability",
        "AI-Based Performance & Conversion Optimization",
        "Cloud Hosting (AWS/Google Cloud) with CDN & Advanced Security",
        "12-Months Support + AI Monitoring",
        "AI Automation, Chatbots, Personalization Engine"
      ],
      bestFor: "Enterprises, SaaS, E-commerce"
    }
  ];
  


  const processSteps = [
    {
      title: "Discovery & Strategy",
      content: (
        <div className="space-y-4">
          <p className="text-gray-400 text-lg">
            Business analysis, user personas, competitor research
          </p>
          <ul className="space-y-3">
            <li className="flex items-center text-gray-400">
              <span className="text-[#c3ea00] mr-3 text-lg">✓</span>
              Market Analysis & Research
            </li>
            <li className="flex items-center text-gray-400">
              <span className="text-[#c3ea00] mr-3 text-lg">✓</span>
              User Journey Mapping
            </li>
            <li className="flex items-center text-gray-400">
              <span className="text-[#c3ea00] mr-3 text-lg">✓</span>
              Feature Prioritization
            </li>
          </ul>
        </div>
      ),
    },
    {
      title: "UI/UX Design",
      content: (
        <div className="space-y-4">
          <p className="text-gray-400 text-lg">
            Wireframing, interactive prototyping, design iterations
          </p>
          <ul className="space-y-3">
            <li className="flex items-center text-gray-400">
              <span className="text-[#c3ea00] mr-3 text-lg">✓</span>
              Interactive Prototypes
            </li>
            <li className="flex items-center text-gray-400">
              <span className="text-[#c3ea00] mr-3 text-lg">✓</span>
              User Testing & Feedback
            </li>
            <li className="flex items-center text-gray-400">
              <span className="text-[#c3ea00] mr-3 text-lg">✓</span>
              Design System Creation
            </li>
          </ul>
        </div>
      ),
    },
    {
      title: "Development",
      content: (
        <div className="space-y-4">
          <p className="text-gray-400 text-lg">
            Scalable architecture, API integrations, backend logic
          </p>
          <ul className="space-y-3">
            <li className="flex items-center text-gray-400">
              <span className="text-[#c3ea00] mr-3 text-lg">✓</span>
              Clean Code Architecture
            </li>
            <li className="flex items-center text-gray-400">
              <span className="text-[#c3ea00] mr-3 text-lg">✓</span>
              API Development
            </li>
            <li className="flex items-center text-gray-400">
              <span className="text-[#c3ea00] mr-3 text-lg">✓</span>
              Security Implementation
            </li>
          </ul>
        </div>
      ),
    },
    {
      title: "Testing & QA",
      content: (
        <div className="space-y-4">
          <p className="text-gray-400 text-lg">
            Performance testing, bug fixes, security checks
          </p>
          <ul className="space-y-3">
            <li className="flex items-center text-gray-400">
              <span className="text-[#c3ea00] mr-3 text-lg">✓</span>
              Automated Testing
            </li>
            <li className="flex items-center text-gray-400">
              <span className="text-[#c3ea00] mr-3 text-lg">✓</span>
              Performance Optimization
            </li>
            <li className="flex items-center text-gray-400">
              <span className="text-[#c3ea00] mr-3 text-lg">✓</span>
              Security Audits
            </li>
          </ul>
        </div>
      ),
    },
    {
      title: "Deployment",
      content: (
        <div className="space-y-4">
          <p className="text-gray-400 text-lg">
            Launch on Google Play & Apple App Store with optimization
          </p>
          <ul className="space-y-3">
            <li className="flex items-center text-gray-400">
              <span className="text-[#c3ea00] mr-3 text-lg">✓</span>
              Store Optimization
            </li>
            <li className="flex items-center text-gray-400">
              <span className="text-[#c3ea00] mr-3 text-lg">✓</span>
              Analytics Integration
            </li>
            <li className="flex items-center text-gray-400">
              <span className="text-[#c3ea00] mr-3 text-lg">✓</span>
              Launch Strategy
            </li>
          </ul>
        </div>
      ),
    },
    {
      title: "Post-Launch Growth",
      content: (
        <div className="space-y-4">
          <p className="text-gray-400 text-lg">
            Maintenance, AI updates, feature enhancements
          </p>
          <ul className="space-y-3">
            <li className="flex items-center text-gray-400">
              <span className="text-[#c3ea00] mr-3 text-lg">✓</span>
              Regular Updates
            </li>
            <li className="flex items-center text-gray-400">
              <span className="text-[#c3ea00] mr-3 text-lg">✓</span>
              Performance Monitoring
            </li>
            <li className="flex items-center text-gray-400">
              <span className="text-[#c3ea00] mr-3 text-lg">✓</span>
              User Feedback Integration
            </li>
          </ul>
        </div>
      ),
    },
  ];
  

const faqs = [
  {
    question: "How long does it take to develop a mobile app?",
    answer: "Typically 3-6 months depending on complexity. We follow an agile development approach to ensure efficient delivery while maintaining high quality."
  },
  {
    question: "What technologies do you use?",
    answer: "We use cutting-edge technologies including Flutter, React Native, Swift, Kotlin, Node.js, AWS, and Firebase to build robust and scalable applications."
  },
  {
    question: "Can you help with app launch & marketing?",
    answer: "Yes! We provide comprehensive launch support including ASO, digital marketing strategy, and launch campaign planning to ensure your app's success."
  },
  {
    question: "Do I retain full ownership of my app?",
    answer: "Absolutely! You retain 100% ownership of all code and intellectual property rights for your application."
  },
  {
    question: "What post-launch support do you offer?",
    answer: "We provide comprehensive post-launch support including maintenance, bug fixes, AI-based updates, and scalability support to ensure your app runs smoothly."
  }
];
interface FormData {
  pages: string;
  design: string;
  ecommerce: string;
  seo: string;
}

const { register, handleSubmit, watch } = useForm<FormData>();
  const [totalCost, setTotalCost] = useState(0);

  const calculateCost = (data: { pages: string; design: string; ecommerce: string; seo: string; }) => {
    let cost = 500; // Base price
    if (data.pages === "5-10") cost += 1000;
    if (data.pages === "10+") cost += 2000;
    if (data.design === "custom") cost += 1500;
    if (data.ecommerce === "yes") cost += 3000;
    if (data.seo === "yes") cost += 1000;

    setTotalCost(cost);  };

  return (
    
    <div className="min-h-screen bg-black text-white font-sans">
      {/* Hero Section */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
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
                Transform Your Vision into Reality
              </span>
            </button>
          </Container>
          <Container delay={0.15}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold !leading-tight max-w-4xl mx-auto">
              Transform Your Vision into a Powerful Mobile App – Get a Custom Solution Today
            </h1>
          </Container>
          <Container delay={0.2}>
            <p className="max-w-xl mx-auto mt-2 text-base lg:text-lg text-center text-muted-foreground">
              Build high-performance, scalable, and AI-powered mobile applications tailored to your business needs.
            </p>
          </Container>
          <Container delay={0.25} className="z-20">
            <div className="flex items-center justify-center mt-6 gap-x-4">
              <Link href="/leadform" className="flex items-center gap-2 group">
                <Button size="lg" className="bg-[#C4EA00]">
                  Get a Free App Development Consultation
                </Button>
              </Link>
            </div>
          </Container>
        </div>
      </div>

   
    {/* Why choose us */}
    <div className="py-20 border-t border-gray-800">
      
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Why Top Brands Trust 
            <span className="text-[#c3ea00]"> Wonder Creative Studio</span>
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((item, index) => (
            <MagicCard
              key={index}
              gradientFrom="#c4ea00"
              gradientTo="#c4ea00"
              gradientColor="rgba(196, 234, 0, 0.1)"
              className="p-4 lg:p-8 w-full overflow-hidden bg-[#1a1a1a] rounded-xl"
            >
              <div className="relative">
                {React.cloneElement(item.icon, { className: 'w-10 h-10 text-[#c3ea00] mb-6' })}
                <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                <p className="text-gray-400">{item.desc}</p>
              </div>
            </MagicCard>
          ))}
        </div>
      </div>
      <Container delay={0.25} className="z-20 mt-16">
        <div className="flex items-center justify-center mt-6 gap-x-4">
            <Link href="/leadform" className="flex items-center gap-2 group">
                <Button size="lg" className="bg-[#C4EA00]">
                Get a Custom Quote – Schedule a Call Now!
                </Button>
            </Link>
        </div>
      </Container>
    </div>

        {/* portfolio section */}
    <div className="py-20 border-t border-gray-800">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <h2 className="text-4xl font-bold tracking-tight sm:text-4xl lg:text-5xl mb-12">
      Our Expertise –
      <span className="text-[#c3ea00]"> Showcasing Innovation in App Development</span>
    </h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {projects.map((project, index) => (
        <MagicCard
          key={index}
          gradientFrom="#c4ea00"
          gradientTo="#c4ea00"
          gradientColor="rgba(196, 234, 0, 0.1)"
          className="p-4 lg:p-6 w-full overflow-hidden bg-[#1a1a1a] rounded-xl 
                      transition-transform duration-300 transform hover:scale-105 shadow-lg"
        >
          <div className="space-y-4">
            <img
              src={project.image}
              alt={project.imageAlt}
              className="rounded-lg w-full object-cover h-48 shadow hover:shadow-lg"
            />
            <h3 className="text-xl font-semibold">{project.title}</h3>
            <p className="text-sm text-gray-300">{project.description}</p>
          </div>
        </MagicCard>
      ))}
    </div>

    <Container delay={0.25} className="z-20 mt-16">
        <div className="flex items-center justify-center mt-6 gap-x-4">
            <Link href="/leadform" className="flex items-center gap-2 group">
                <Button size="lg" className="bg-[#C4EA00]">
                See More Projects – Schedule a Free Demo Call
                </Button>
            </Link>
        </div>
      </Container>
    </div>
  </div>

  {/* process timeline */}

  <div className="py-20 bg-[#0a0a0a] relative overflow-hidden border-t border-gray-800">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <Timeline data={processSteps} />
  </div>
</div>





      {/* Pricing Section */}

      <div className="py-20 border-t border-black-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              Transparent
              <span className="text-[#c3ea00]"> Pricing Plans</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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

            {/* client */}
            <div className="py-20 border-t border-gray-800 bg-[#0a0a0a] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Section Title */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold tracking-tight sm:text-4xl lg:text-5xl mb-12"
        >
          Unlock Growth –
          <span className="text-[#c4ea00]"> Drive Higher Engagement & Revenue</span>
        </motion.h2>

        {/* Comparison Table */}
        <div className="max-w-4xl mx-auto">
          <MagicCard
            gradientFrom="#c4ea00"
            gradientTo="#c4ea00"
            gradientColor="rgba(196, 234, 0, 0.1)"
            className="p-6 bg-[#1a1a1a] rounded-xl shadow-lg"
          >
            <h3 className="text-xl font-semibold text-gray-200 mb-6">
              Compare Plans – Find the Right Fit for Your Business
            </h3>
            <table className="w-full text-gray-300 border-collapse">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="py-4 text-left">Feature</th>
                  {plans.map((plan) => (
                    <th key={plan.name} className="py-4 text-center">{plan.name}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  "CRM Integration",
                  "AI Engagement Tools",
                  "Advanced Automation",
                  "Premium Support",
                ].map((feature) => (
                  <tr key={feature} className="border-t border-gray-700">
                    <td className="py-4 text-left">{feature}</td>
                    {plans.map((plan) => (
                      <td key={plan.name} className="py-4 text-center">
                        {plan.features.includes(feature) ? (
                          <span className="text-[#c4ea00] font-semibold">✓</span>
                        ) : (
                          <span className="text-gray-500">—</span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
                <tr className="border-t border-gray-700">
                  <td className="py-4 font-bold text-left">Price</td>
                  {plans.map((plan) => (
                    <td key={plan.name} className="py-4 text-center font-semibold text-[#c4ea00]">
                      {plan.price}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </MagicCard>
        </div>

        {/* Business Growth Message */}
        <div className="mt-12 text-gray-300 text-lg max-w-3xl mx-auto leading-relaxed">
          <p>
            Companies leveraging AI automation have seen a
            <span className="text-[#C4EA00] font-semibold"> 35% increase in customer retention</span> 
            and a
            <span className="text-[#C4EA00] font-semibold"> 20% boost in revenue.</span>
          </p>
          <p className="mt-4">
            Upgrade now and receive an 
            <span className="text-[#C4EA00] font-semibold"> AI Chatbot worth ₹75K for FREE</span> 
            (Limited Time Offer).
          </p>
        </div>

        {/* CTA Buttons */}
        <Container delay={0.25} className="z-20 mt-16">
          <div className="flex items-center justify-center mt-6 gap-x-6">
            <Link href="/leadform" className="flex items-center gap-2 group">
              <Button size="lg" className="bg-[#C4EA00] text-black hover:bg-[#a4c800] transition-all">
                See More – Schedule a Free Demo Call
              </Button>
            </Link>
            <Button
              size="lg"
              variant="outline"
              className="border-gray-500 text-gray-300 hover:border-[#C4EA00] hover:text-[#C4EA00] transition-all"
            >
              Compare Plans
            </Button>
          </div>
        </Container>
      </div>
    </div>

      {/* Industry Solutions Section */}
      <div className="py-20 bg-[#0a0a0a] relative overflow-hidden border-t border-gray-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
          <h2 className="text-4xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              Industry-Specific 
              <span className="text-[#c3ea00]"> App Development</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: <Briefcase />, title: "FinTech", desc: "Secure transactions & AI fraud detection" },
              { icon: <GraduationCap />, title: "EdTech", desc: "AI-driven learning & analytics" },
              { icon: <ShoppingCart />, title: "E-Commerce", desc: "Personalized shopping experience" },
              { icon: <Building2 />, title: "PropTech", desc: "Virtual tours & CRM automation" },
              { icon: <Car />, title: "Transportation", desc: "Route optimization & tracking" },
              { icon: <Book />, title: "Healthcare", desc: "Telemedicine & patient care" }
            ].map((industry, index) => (
              <MagicCard
                key={index}
                gradientFrom="#c4ea00"
                gradientTo="#c4ea00"
                gradientColor="rgba(196, 234, 0, 0.1)"
                className="p-4 lg:p-8 w-full overflow-hidden bg-[#1a1a1a] rounded-xl"
              >
                <div className="flex items-center mb-4">
                  {React.cloneElement(industry.icon, { className: 'w-8 h-8 text-[#c3ea00] mr-3' })}
                  <h3 className="text-xl font-semibold">{industry.title}</h3>
                </div>
                <p className="text-gray-400">{industry.desc}</p>
              </MagicCard>
            ))}
          </div>
        </div>
      </div>


      {/* FAQ Section */}
      <div className="py-20 bg-[#0a0a0a] relative overflow-hidden border-t border-gray-800">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold tracking-tight sm:text-4xl lg:text-5xl mb-12 text-center">
          Frequently Asked <span className="text-[#c3ea00]">Questions</span>
        </h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <MagicCard
              key={index}
              gradientFrom="#c4ea00"
              gradientTo="#c4ea00"
              gradientColor="rgba(196, 234, 0, 0.1)"
              className="p-4 lg:p-8 w-full overflow-hidden bg-[#1a1a1a] rounded-xl"
            >
              <details className="group">
                <summary className="flex justify-between items-center cursor-pointer list-none">
                  <h3 className="text-xl font-semibold">{faq.question}</h3>
                  <ChevronDown className="w-5 h-5 transition-transform group-open:rotate-180" />
                </summary>
                <p className="mt-4 text-gray-400 leading-relaxed">{faq.answer}</p>
              </details>
            </MagicCard>
          ))}
        </div>
      </div>
    </div>

      {/* Security Section */}
       <div className="py-20 bg-[#0a0a0a] relative overflow-hidden border-t border-gray-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold tracking-tight sm:text-4xl lg:text-5xl mb-12">
              Your Security is Our 
              <span className="text-[#c3ea00]"> Priority</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: <Shield />, title: "GDPR Compliant", desc: "Secure data handling & privacy" },
              { icon: <Lock />, title: "ISO Certified", desc: "Quality management system" },
              { icon: <Globe />, title: "Cloud Security", desc: "AWS/Google Cloud protection" },
              { icon: <Users />, title: "Access Control", desc: "Role-based authentication" }
            ].map((feature, index) => (
              <MagicCard
                key={index}
                gradientFrom="#c4ea00"
                gradientTo="#c4ea00"
                gradientColor="rgba(196, 234, 0, 0.1)"
                className="p-6 w-full overflow-hidden bg-[#1a1a1a] rounded-xl"
              >
                {React.cloneElement(feature.icon, { className: 'w-8 h-8 text-[#c3ea00] mb-4' })}
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.desc}</p>
              </MagicCard>
            ))}
          </div>
        </div>
      </div>

      {/* Live Demo Section */}
      <div className="py-20 bg-[#0a0a0a] relative overflow-hidden border-t border-gray-800">
     <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
       <div className="text-center mb-16">
         <h2 className="text-4xl font-bold tracking-tight sm:text-4xl lg:text-5xl mb-12">
           Experience Before You Invest –
           <span className="text-[#c3ea00]"> Live App Demos & Prototypes</span>
         </h2>
       </div>
       <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
         {[
           { icon: <Smartphone />, title: "Interactive Prototypes", desc: "Experience real app UI/UX before development" },
           { icon: <Video />, title: "Live App Demos", desc: "Explore fully functional versions of past projects (simulated)" },
           { icon: <MessageCircle />, title: "Real-Time Consultation", desc: "Book a screen-sharing session to discuss your project" },
         ].map((demo, index) => (
           <MagicCard
             key={index}
             gradientFrom="#c4ea00"
             gradientTo="#c4ea00"
             gradientColor="rgba(196, 234, 0, 0.1)"
             className="p-6 w-full overflow-hidden bg-[#1a1a1a] rounded-xl text-center"
           >
             {React.cloneElement(demo.icon, { className: 'w-12 h-12 text-[#c3ea00] mb-4 mx-auto' })}
             <h3 className="text-xl font-semibold mb-2">{demo.title}</h3>
             <p className="text-gray-400 mb-4">{demo.desc}</p>
             <Container delay={0.25} className="z-20">
                        <div className="flex items-center justify-center mt-6 gap-x-4">
                            <Link href="/leadform" className="flex items-center gap-2 group">
                                <Button size="lg" className="bg-[#C4EA00]">
                                Book Your Walkthrough Now
                                </Button>
                            </Link>
                        </div>
                    </Container>
           </MagicCard>
         ))}
       </div>
     </div>
   </div>
    </div>
  );
}

export default WebApp;