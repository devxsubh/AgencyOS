'use client'

import { LogOut } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'

export default function LogoutButton() {
  const router = useRouter()
  const { logout } = useAuth()

  const handleLogout = () => {
    logout()
    router.replace('/login')
  }

  return (
    <button 
      className="w-full flex items-center gap-3 px-4 py-3 text-red-400 rounded-lg hover:bg-gray-700/50 transition-colors group"
      onClick={handleLogout}
    >
      <LogOut className="w-5 h-5 group-hover:text-red-400" />
      <span className="font-medium">Logout</span>
    </button>
  )
}