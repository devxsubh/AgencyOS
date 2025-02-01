"use client"

import { useState, useMemo } from "react"
import { SiteHeader } from "./site-header"
import { TemplateCard } from "./template-card"
import { TemplatesFilter, useCategories } from "./templates-filter"
import Link from "next/link"
import { templates } from "@/constants"

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