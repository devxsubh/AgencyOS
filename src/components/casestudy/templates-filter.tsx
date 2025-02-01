"use client"

import { useState } from "react"
import { Search, ChevronRight } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

export const useCategories = [
  { id: "ai", label: "AI" },
  { id: "it", label: "IT" },
  { id: "app", label: "App" },
  { id: "website", label: "Website" },
  { id: "ui/ux", label: "UI/UX" },
  { id: "portfolio", label: "Portfolio" },
  { id: "nft", label: "NFT" },
  { id: "branding", label: "Branding" },
  { id: "ecommerce", label: "Ecommerce" },
  { id: "multi-tenant", label: "Multi-tenant apps" },
]

interface TemplatesFilterProps {
  searchQuery: string
  setSearchQuery: (query: string) => void
  selectedCategories: string[]
  setSelectedCategories: (categories: string[]) => void
}

export function TemplatesFilter({
  searchQuery,
  setSearchQuery,
  selectedCategories,
  setSelectedCategories,
}: TemplatesFilterProps) {
  const [open, setOpen] = useState(false)

  const toggleCategory = (categoryId: string) => {
    setSelectedCategories(
      selectedCategories.includes(categoryId)
        ? selectedCategories.filter((id) => id !== categoryId)
        : [...selectedCategories, categoryId],
    )
  }

  return (
    <>
      {/* Desktop Filter */}
      <div className="hidden md:block w-[240px] flex-shrink-0">
        <div className="sticky top-24">
          <h2 className="mb-4 text-lg font-semibold">Filter Projects</h2>
          <div className="relative mb-6">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search templates..."
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="space-y-4">
            <div>
              <h3 className="mb-2 text-sm font-medium">Use Case</h3>
              <div className="space-y-2">
                {useCategories.map((category) => (
                  <div key={category.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={`desktop-${category.id}`}
                      checked={selectedCategories.includes(category.id)}
                      onCheckedChange={() => toggleCategory(category.id)}
                    />
                    <Label htmlFor={`desktop-${category.id}`} className="text-sm font-normal cursor-pointer">
                      {category.label}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Filter */}
      <div className="md:hidden w-full space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search templates..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" className="w-full justify-between">
              Filter By
              <ChevronRight className="h-4 w-4" />
            </Button>
          </SheetTrigger>
          <SheetContent side="bottom" className="h-[80vh]">
            <SheetHeader>
              <SheetTitle>Filter Templates</SheetTitle>
            </SheetHeader>
            <div className="mt-4 space-y-4">
              <div>
                <h3 className="mb-2 text-sm font-medium">Use Case</h3>
                <div className="space-y-2">
                  {useCategories.map((category) => (
                    <div key={category.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={`mobile-${category.id}`}
                        checked={selectedCategories.includes(category.id)}
                        onCheckedChange={() => toggleCategory(category.id)}
                      />
                      <Label htmlFor={`mobile-${category.id}`} className="text-sm font-normal cursor-pointer">
                        {category.label}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </>
  )
}