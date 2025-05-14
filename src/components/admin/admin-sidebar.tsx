"use client"

import type React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import type { LucideIcon } from "lucide-react"
import LogoutButton from "@/components/admin/logout-button"
import { cn } from "@/lib"

interface NavItem {
  href: string
  label: string
  icon: LucideIcon
}

interface AdminSidebarProps {
  navItems: NavItem[]
}

export function AdminSidebar({ navItems }: AdminSidebarProps) {
  return (
    <aside className="w-64 bg-zinc-950 border-r border-zinc-800">
      <div className="p-6">
        <h1 className="text-xl font-bold flex items-center">
          <span className="text-[#c4ea00]">Wonder</span>
          <span className="ml-1">Admin</span>
        </h1>
      </div>
      <nav className="mt-6 px-3">
        {navItems.map((item) => (
          <NavLink key={item.href} href={item.href} icon={<item.icon className="w-5 h-5" />}>
            {item.label}
          </NavLink>
        ))}
        <div className="mt-6 px-3">
          <LogoutButton />
        </div>
      </nav>
    </aside>
  )
}

// Client component for active link highlighting
function NavLink({
  href,
  children,
  icon,
}: {
  href: string
  children: React.ReactNode
  icon: React.ReactNode
}) {
  const pathname = usePathname()
  const isActive = pathname === href || pathname?.startsWith(`${href}/`)

  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-3 px-4 py-3 mb-1 rounded-md transition-all",
        isActive ? "bg-zinc-800 text-[#c4ea00] font-medium" : "text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/50",
      )}
    >
      <span className={cn(isActive ? "text-[#c4ea00]" : "text-zinc-500")}>{icon}</span>
      {children}
    </Link>
  )
}
