"use client"

import { useState } from "react"
import Link from "next/link"
import { ChevronDown, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

export function SiteHeader() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="flex items-center space-x-4 md:space-x-8">
          <Link href="/" className="flex items-center space-x-2">
            <svg height="26" viewBox="0 0 235 203" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M101.634 202.096L0.509766 0.90625H46.7453L127.943 163.924L208.382 0.90625H235.172L133.289 202.096H101.634Z"
                fill="currentColor"
              />
            </svg>
          </Link>
          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
            <Button variant="ghost" className="h-8 w-full justify-start px-2">
              Products
              <ChevronDown className="ml-1 h-4 w-4" />
            </Button>
            <Button variant="ghost" className="h-8 w-full justify-start px-2">
              Solutions
              <ChevronDown className="ml-1 h-4 w-4" />
            </Button>
            <Button variant="ghost" className="h-8 w-full justify-start px-2">
              Resources
              <ChevronDown className="ml-1 h-4 w-4" />
            </Button>
            <Button variant="ghost" className="h-8 w-full justify-start px-2">
              Enterprise
            </Button>
            <Button variant="ghost" className="h-8 w-full justify-start px-2">
              Docs
            </Button>
            <Button variant="ghost" className="h-8 w-full justify-start px-2">
              Pricing
            </Button>
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" className="h-8 px-4">
              Log In
            </Button>
            <Button variant="ghost" className="h-8 px-4">
              Contact
            </Button>
          </div>
          <Button className="h-8 px-4">Sign Up</Button>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>
              <div className="mt-4 space-y-2">
                <Button variant="ghost" className="w-full justify-start">
                  Products
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  Solutions
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  Resources
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  Enterprise
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  Docs
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  Pricing
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  Log In
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  Contact
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}