"use client"

import type React from "react"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { useAuth } from "../../contexts/AuthContext"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle, Lock, Mail, Loader2, ArrowRight, User } from "lucide-react"
import Link from "next/link"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const { login } = useAuth()

  // Only follow same-site paths so the login page can't be used as an open redirect.
  const requested = searchParams.get("returnUrl") || ""
  const returnUrl = requested.startsWith("/") && !requested.startsWith("//") && !requested.startsWith("/\\") ? requested : "/admin"

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      await login(email, password)
      // Redirect to the original URL they tried to access or home page
      router.push(returnUrl)
    } catch (err) {
      setError("Invalid email or password")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 p-4">
      <div className="w-full max-w-md">
        <Card className="bg-gray-800 border-gray-700 shadow-xl">
          <CardHeader className="space-y-1 pb-6">
            <div className="mx-auto bg-gray-700 w-16 h-16 rounded-full flex items-center justify-center mb-2">
              <User className="h-8 w-8 text-[#c3ea00]" />
            </div>
            <CardTitle className="text-2xl font-bold text-center text-white">Welcome Back</CardTitle>
            <CardDescription className="text-center text-gray-400">
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            {error && (
              <div className="bg-red-900/30 border border-red-800 text-red-300 px-4 py-3 rounded mb-6 flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-red-400" />
                <span>{error}</span>
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 flex items-center gap-2">
                  <Mail className="h-4 w-4 text-[#c3ea00]" />
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-gray-700 border-gray-600 focus:border-[#c3ea00] focus:ring-[#c3ea00]"
                  placeholder="Enter your email"
                  autoComplete="email"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="password" className="block text-sm font-medium text-gray-300 flex items-center gap-2">
                  <Lock className="h-4 w-4 text-[#c3ea00]" />
                  Password
                </label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="bg-gray-700 border-gray-600 focus:border-[#c3ea00] focus:ring-[#c3ea00]"
                  placeholder="Enter your password"
                  autoComplete="current-password"
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-600 bg-gray-700 text-[#c3ea00] focus:ring-[#c3ea00]"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-400">
                    Remember me
                  </label>
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter>
            <Button
              type="submit"
              className="w-full bg-[#c3ea00] text-gray-900 hover:bg-[#b3d800] font-medium h-11"
              disabled={isLoading}
              onClick={handleSubmit}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Logging in...
                </>
              ) : (
                <>
                  Log In
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </CardFooter>
          <div className="px-8 pb-8 text-center">
            <p className="text-sm text-gray-400">
              Don't have an account?{" "}
              <span className="block mt-1 text-gray-500 italic">
                Well, that's awkward... You'll need to bribe the admin with coffee to create one for you!
                <span className="block mt-1">🧙‍♂️ admin@example.com</span>
              </span>
            </p>
          </div>
        </Card>
        <div className="mt-6 text-center">
          <Link href="/" className="text-sm text-gray-500 hover:text-gray-400">
            ← Back to home
          </Link>
        </div>
      </div>
    </div>
  )
}
