"use client"

import { useState, useMemo } from "react"
import { SiteHeader } from "./site-header"
import { TemplateCard } from "./template-card"
import { TemplatesFilter, useCategories } from "./templates-filter"
import Link from "next/link"

interface Template {
  title: string
  description: string
  image: string
  author: string
  categories: string[]
  link: string
}

const templates: Template[] = [
  {
    title: "Beyoung.in",
    description: "A dynamic fashion e-commerce store for trendy wear",
    image:
      "/images/project/Beyoung.png",
    author: "Wonder",
    categories: ["website","ecommerce"],
    link: "http://beyoung.in/",
  },
  {
    title: "DDesigno.com",
    description: "Furniture e-commerce and interior service provider",
    image:
      "/images/project/DDesigno.png",
    author: "Wonder",
    categories: ["ecommerce","website"],
    link: "http://ddesigno.com/",
  },
  {
    title: "Car Rental services",
    description: "Free car rental app used for Rental services, Share taxi",
    image:
      "/images/project/car_rental_flutter_app.webp",
    author: "Wonder",
    categories: ["app"],
    link: "/images/project/car_rental_flutter_app.webp",
  },
  {
    title: "Search - Real Estate App",
    description: "Real estate app Flutter app, can be used for listing app",
    image:
      "/images/project/SearchRealEstateApp.webp",
    author: "Wonder",
    categories: ["ecommerce", "app"],
    link: "/images/project/SearchRealEstateApp.webp",
  },
  {
    title: "Air Purifier App",
    description: "Air purifier flutter app, tracks the air index",
    image:
      "/images/project/Air.webp",
    author: "Wonder",
    categories: ["app"],
    link: "/images/project/Air.webp",
  },
  {
    title: "The Project Steel And DMC Pipe",
    description: "A Dubai base steel supplier no code website",
    image:
      "/images/project/SteelProject.png",
    author: "Wonder",
    categories: ["website"],
    link: "https://app.leadflow.in/v2/preview/B5tmKCntLdDPwdQFkRJz",
  },
  {
    title: "Monk.com",
    description: "Comprehensive IT service provider for digital growth",
    image:
      "/images/project/Monk.png",
    author: "Wonder",
    categories: ["it", "website"],
    link: "http://monk.com/",
  },
  {
    title: "Social Media - Gifting App",
    description: "A Unique Social Media app where you can gift",
    image:
      "/images/project/SocialGift.png",
    author: "Wonder",
    categories: ["ui/ux"],
    link: "/images/project/SocialGift.png",
  },
  {
    title: "Multi Vendor App",
    description: "A multivendor marketplace is platform that empowers multiple vendors",
    image:
      "/images/project/MultiVendor.png",
    author: "Wonder",
    categories: ["app"],
    link: "/images/project/MultiVendor.png",
  },
  {
    title: "Subham Portfolio",
    description: "A no code Framer portfolio website, Showcase you work",
    image:
      "/images/project/Subham.png",
    author: "Wonder",
    categories: ["website","portfolio"],
    link: "https://diligent-provide-720169.framer.app/",
  },
  {
    title: "AI Note taking app",
    description: "A Notion-like collaborative note-taking application",
    image:
      "/images/project/NoteTaking.webp",
    author: "Wonder",
    categories: ["website","ai"],
    link: "https://ai-note-taking-apps.vercel.app/",
  },
  {
    title: "Memowries",
    description: "MEMOW redefining how people access professional photography services",
    image:
      "/images/project/Memow.avif",
    author: "Wonder",
    categories: ["website","ecommerce"],
    link: "https://www.memowries.com/",
  },
  {
    title: "Car Showcase",
    description: "A Figma Design to Showcase car in a elegant way",
    image:
      "/images/project/Car.png",
    author: "Wonder",
    categories: ["ui/ux"],
    link: "https://www.figma.com/proto/hyJW8QJW1q4DxwD9KXBcr8/Cycle?node-id=1-32&p=f&t=9EVD1ed011mBmmpp-1&scaling=min-zoom&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=1%3A2",
  },
  {
    title: "Custom Admin Panel",
    description: "Admin Panel for listing your products, services and analytics",
    image:
      "/images/project/admin.png",
    author: "Wonder",
    categories: ["website"],
    link: "https://www.figma.com/proto/hyJW8QJW1q4DxwD9KXBcr8/Cycle?node-id=1-32&p=f&t=9EVD1ed011mBmmpp-1&scaling=min-zoom&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=1%3A2",
  },
  {
    title: "DDesigno Interior",
    description: "Furniture e-commerce and interior service provider",
    image:
      "/images/project/ddesignointerior.png",
    author: "Wonder",
    categories: ["website"],
    link: "https://ddesigno-frontend.vercel.app/",
  },
  {
    title: "Logitech",
    description: "Furniture e-commerce and interior service provider",
    image:
      "/images/project/Logitech rally bar poster.png",
    author: "Wonder",
    categories: ["branding"],
    link: "/images/project/Logitech rally bar poster.png",
  },
  {
    title: "Curo",
    description: "Furniture e-commerce and interior service provider",
    image:
      "/images/project/curo.png",
    author: "Wonder",
    categories: ["branding"],
    link: "/images/project/curo.png",
  },
  {
    title: "10K Generated NFT",
    description: "Furniture e-commerce and interior service provider",
    image:
      "/images/project/NFT1.png",
    author: "Wonder",
    categories: ["branding"],
    link: "/images/project/NFT1.png",
  },
  {
    title: "Customized NFT",
    description: "Furniture e-commerce and interior service provider",
    image:
      "/images/project/NFT2.png",
    author: "Wonder",
    categories: ["branding"],
    link: "/images/project/NFT2.png",
  },
  {
    title: "Davie Jones NFT",
    description: "Furniture e-commerce and interior service provider",
    image:
      "/images/project/davie-jones'.jpg",
    author: "Wonder",
    categories: ["branding"],
    link: "/images/project/davie-jones'.jpg",
  },
  {
    title: "Nibble",
    description: "Furniture e-commerce and interior service provider",
    image:
      "/images/project/nibble ip.jpg",
    author: "Wonder",
    categories: ["branding"],
    link: "/images/project/nibble ip.jpg",
  },
  {
    title: "Nibble Package",
    description: "Furniture e-commerce and interior service provider",
    image:
      "/images/project/nibblepackage.png",
    author: "Wonder",
    categories: ["branding"],
    link: "/images/project/nibblepackage.png",
  },
  {
    title: "NFT Work",
    description: "Furniture e-commerce and interior service provider",
    image:
      "/images/project/NFT3.png",
    author: "Wonder",
    categories: ["branding"],
    link: "/images/project/ad1.mp4",
  },
  {
    title: "Bank Of America Brochure",
    description: "Furniture e-commerce and interior service provider",
    image:
      "/images/project/bankofamericabrochure.jpg",
    author: "Wonder",
    categories: ["branding"],
    link: "/images/project/bankofamericabrochure.jpg",
  },
  {
    title: "Momowries 2nd Edition",
    description: "MEMOW redefining how people access professional photography services",
    image:
      "/images/project/MemowNew.png",
    author: "Wonder",
    categories: ["branding"],
    link: "https://memow-new.vercel.app/",
  },
]

export default function Templates() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])

  const filteredTemplates = useMemo(() => {
    return templates.filter((template) => {
      // Search filter
      const matchesSearch =
        template.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        template.description.toLowerCase().includes(searchQuery.toLowerCase())

      // Category filter
      const matchesCategory =
        selectedCategories.length === 0 || template.categories.some((category) => selectedCategories.includes(category))

      return matchesSearch && matchesCategory
    })
  }, [searchQuery, selectedCategories])

  return (
    <div className="min-h-screen bg-background">
      <div className="container py-6 md:py-6">
        <div className="mx-auto max-w-[980px] text-center">
          <h1 className="text-3xl md:text-4xl font-bold leading-tight tracking-tighter lg:text-6xl">
          Proven Results Across Industries
          </h1>
          <p className="mx-auto mt-4 max-w-[700px] text-sm md:text-base text-muted-foreground px-4 md:px-0">
          Discover how we’ve helped businesses like yours achieve their goals. Our case studies highlight the strategies and solutions that have delivered measurable success.
          </p>
        </div>
        <div className="mt-8 md:mt-16 flex flex-col md:flex-row gap-6 md:gap-10">
          <TemplatesFilter
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            selectedCategories={selectedCategories}
            setSelectedCategories={setSelectedCategories}
          />
          <div className="grid flex-1 grid-cols-1 gap-4 md:gap-6 md:grid-cols-3">
            {filteredTemplates.length > 0 ? (
              filteredTemplates.map((template, index) => <a href={template.link} key={index}><TemplateCard key={template.title} {...template}/></a>)
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-lg text-muted-foreground">No Project found. Try adjusting your filters.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}