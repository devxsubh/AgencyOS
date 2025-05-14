'use client'

import type React from "react"
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from "next/link"
import {
  FileText,
  ImageIcon,
  Settings,
  LayoutDashboard,
  MessageSquare,
  CircleDollarSign,
  ChevronRight,
} from "lucide-react"
import LogoutButton from "@/components/admin/logout-button"
import Image from "next/image"
import { useAuth } from '../../contexts/AuthContext';

async function AdminLayoutContent({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, loading, user, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // If not authenticated and not loading, redirect to login
    if (!loading && !isAuthenticated) {
      router.push('/login?returnUrl=/protected-group');
    }
  }, [isAuthenticated, loading, router]);

  // Show loading indicator while checking auth status
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // If not authenticated, don't render anything
  // (we'll redirect in the useEffect)
  if (!isAuthenticated) {
    return null;
  }


  return (
    <div className="min-h-screen flex bg-gray-900">
      {/* Sidebar */}
      <aside className="fixed h-screen w-64 bg-gray-800 border-r border-gray-700 flex flex-col shadow-xl">
        <div className="p-6 border-b border-gray-700">
          <div className="flex items-center gap-3">
            <div className="rounded-md">
              <Image src="/icons/wonder logo png.png" alt="Wonder Admin" width={32} height={32} className="w-6 h-6" />
            </div>
            <h1 className="text-xl font-semibold text-white">Wonder Admin</h1>
          </div>
        </div>
        <nav className="p-4 space-y-1 flex-1 overflow-y-auto">
          <Link
            href="/admin"
            className="flex items-center justify-between px-4 py-3 text-gray-300 rounded-lg hover:bg-gray-700/70 hover:text-[#c3ea00] transition-colors group"
          >
            <div className="flex items-center gap-3">
              <LayoutDashboard className="w-5 h-5 text-gray-400 group-hover:text-[#c3ea00]" />
              <span className="font-medium">Dashboard</span>
            </div>
            <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-[#c3ea00]" />
          </Link>
          <Link
            href="/admin/blogs"
            className="flex items-center justify-between px-4 py-3 text-gray-300 rounded-lg hover:bg-gray-700/70 hover:text-[#c3ea00] transition-colors group"
          >
            <div className="flex items-center gap-3">
              <FileText className="w-5 h-5 text-gray-400 group-hover:text-[#c3ea00]" />
              <span className="font-medium">Blogs</span>
            </div>
            <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-[#c3ea00]" />
          </Link>
          <Link
            href="/admin/portfolios"
            className="flex items-center justify-between px-4 py-3 text-gray-300 rounded-lg hover:bg-gray-700/70 hover:text-[#c3ea00] transition-colors group"
          >
            <div className="flex items-center gap-3">
              <ImageIcon className="w-5 h-5 text-gray-400 group-hover:text-[#c3ea00]" />
              <span className="font-medium">Portfolios</span>
            </div>
            <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-[#c3ea00]" />
          </Link>
          <Link
            href="/admin/pricing"
            className="flex items-center justify-between px-4 py-3 text-gray-300 rounded-lg hover:bg-gray-700/70 hover:text-[#c3ea00] transition-colors group"
          >
            <div className="flex items-center gap-3">
              <CircleDollarSign className="w-5 h-5 text-gray-400 group-hover:text-[#c3ea00]" />
              <span className="font-medium">Pricing</span>
            </div>
            <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-[#c3ea00]" />
          </Link>
          <Link
            href="/admin/chatbot"
            className="flex items-center justify-between px-4 py-3 text-gray-300 rounded-lg hover:bg-gray-700/70 hover:text-[#c3ea00] transition-colors group"
          >
            <div className="flex items-center gap-3">
              <MessageSquare className="w-5 h-5 text-gray-400 group-hover:text-[#c3ea00]" />
              <span className="font-medium">Chatbot</span>
            </div>
            <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-[#c3ea00]" />
          </Link>
          <Link
            href="/admin/settings"
            className="flex items-center justify-between px-4 py-3 text-gray-300 rounded-lg hover:bg-gray-700/70 hover:text-[#c3ea00] transition-colors group"
          >
            <div className="flex items-center gap-3">
              <Settings className="w-5 h-5 text-gray-400 group-hover:text-[#c3ea00]" />
              <span className="font-medium">Settings</span>
            </div>
            <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-[#c3ea00]" />
          </Link>
        </nav>
        <div className="p-4 border-t border-gray-700">
          <LogoutButton/>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-64 flex-1 overflow-auto bg-gray-900">
        <div className="p-8 max-w-7xl mx-auto">{children}</div>
      </main>
    </div>
  )
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
      <AdminLayoutContent>{children}</AdminLayoutContent>
  )
}
