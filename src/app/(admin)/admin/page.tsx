"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import {
  BarChart,
  FileText,
  ImageIcon,
  TrendingUp,
  MessageSquare,
  Settings,
  CircleDollarSign,
  ArrowUpRight,
  RefreshCw,
  CheckCircle,
  AlertCircle,
  ChevronRight,
  Users,
  Calendar,
} from "lucide-react"

interface DashboardStats {
  totalBlogs: number
  totalPortfolios: number
  totalChats: number
  totalPricingPlans: number
  serviceStats: {
    webapp: number
    automation: number
    branding: number
    marketing: number
  }
  recentBlogs: Array<{ title: string; createdAt: string }>
  recentPortfolios: Array<{ title: string; createdAt: string }>
  recentChats: Array<{ messages: Array<{ from: string; text: string }>; createdAt: string }>
  systemPromptStatus: string
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalBlogs: 0,
    totalPortfolios: 0,
    totalChats: 0,
    totalPricingPlans: 0,
    serviceStats: {
      webapp: 0,
      automation: 0,
      branding: 0,
      marketing: 0,
    },
    recentBlogs: [],
    recentPortfolios: [],
    recentChats: [],
    systemPromptStatus: "Not configured",
  })
  const [isLoading, setIsLoading] = useState(true)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)

  const fetchStats = async () => {
    try {
      setIsLoading(true)
      const [blogsRes, portfoliosRes, chatsRes, configRes, pricesRes] = await Promise.all([
        fetch("/api/blogs"),
        fetch("/api/portfolios"),
        fetch("/api/chats"),
        fetch("/api/chatbot/config"),
        fetch("/api/prices"),
      ])

      const [blogsData, portfoliosData, chatsData, configData, pricesData] = await Promise.all([
        blogsRes.json(),
        portfoliosRes.json(),
        chatsRes.json(),
        configRes.json(),
        pricesRes.json(),
      ])

      const serviceStats = pricesData.prices.reduce(
        (acc: any, price: any) => {
          const type = price.serviceType
          acc[type] = (acc[type] || 0) + 1
          return acc
        },
        {
          webapp: 0,
          automation: 0,
          branding: 0,
          marketing: 0,
        },
      )

      setStats({
        totalBlogs: blogsData.blogs.length,
        totalPortfolios: portfoliosData.portfolios.length,
        totalChats: chatsData.chats.length,
        totalPricingPlans: pricesData.prices.length,
        serviceStats,
        recentBlogs: blogsData.blogs.slice(0, 5).map((blog: any) => ({
          title: blog.title,
          createdAt: new Date(blog.createdAt).toLocaleDateString(),
        })),
        recentPortfolios: portfoliosData.portfolios.slice(0, 5).map((portfolio: any) => ({
          title: portfolio.title,
          createdAt: new Date(portfolio.createdAt).toLocaleDateString(),
        })),
        recentChats: chatsData.chats.slice(0, 5).map((chat: any) => ({
          messages: chat.messages,
          createdAt: new Date(chat.createdAt).toLocaleDateString(),
        })),
        systemPromptStatus: configData.systemPrompt ? "Configured" : "Not configured",
      })

      setLastUpdated(new Date())
    } catch (error) {
      console.error("Error fetching dashboard stats:", error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchStats()
  }, [])

  // Calculate total services for percentage
  const totalServices = Object.values(stats.serviceStats).reduce((sum, count) => sum + count, 0)

  // Get service percentages
  const getServicePercentage = (count: number) => {
    return totalServices > 0 ? Math.round((count / totalServices) * 100) : 0
  }

  return (
    <div className="space-y-8 p-8 bg-gray-900 min-h-screen">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Dashboard Overview</h1>
          <p className="text-gray-400 mt-2">Monitor your content and performance</p>
        </div>
        <Button
          onClick={fetchStats}
          disabled={isLoading}
          variant="outline"
          className="flex items-center gap-2 border-gray-700 hover:bg-gray-800 text-gray-300"
        >
          <RefreshCw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
          {isLoading ? "Refreshing..." : "Refresh Data"}
        </Button>
      </div>

      {lastUpdated && (
        <div className="text-xs text-gray-500 flex items-center gap-1.5">
          <Calendar className="h-3 w-3" />
          Last updated: {lastUpdated.toLocaleTimeString()} on {lastUpdated.toLocaleDateString()}
        </div>
      )}

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {/* Stats Cards */}
        <Card className="bg-gray-800 border-gray-700 hover:shadow-lg hover:border-gray-600 transition-all">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-gray-300">Total Blogs</CardTitle>
            <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center">
              <FileText className="w-5 h-5 text-blue-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-white">{stats.totalBlogs}</div>
            <p className="text-xs text-gray-400 mt-1">Published blog posts</p>
            <Button
              variant="ghost"
              size="sm"
              className="mt-4 p-0 h-auto text-blue-400 hover:text-blue-300 hover:bg-transparent"
            >
              <span className="flex items-center text-xs">
                View all blogs <ArrowUpRight className="ml-1 h-3 w-3" />
              </span>
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700 hover:shadow-lg hover:border-gray-600 transition-all">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-gray-300">Total Portfolios</CardTitle>
            <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center">
              <ImageIcon className="w-5 h-5 text-green-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-white">{stats.totalPortfolios}</div>
            <p className="text-xs text-gray-400 mt-1">Published portfolio items</p>
            <Button
              variant="ghost"
              size="sm"
              className="mt-4 p-0 h-auto text-green-400 hover:text-green-300 hover:bg-transparent"
            >
              <span className="flex items-center text-xs">
                View all portfolios <ArrowUpRight className="ml-1 h-3 w-3" />
              </span>
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700 hover:shadow-lg hover:border-gray-600 transition-all">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-gray-300">Total Chats</CardTitle>
            <div className="w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center">
              <MessageSquare className="w-5 h-5 text-purple-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-white">{stats.totalChats}</div>
            <p className="text-xs text-gray-400 mt-1">Chat conversations</p>
            <Button
              variant="ghost"
              size="sm"
              className="mt-4 p-0 h-auto text-purple-400 hover:text-purple-300 hover:bg-transparent"
            >
              <span className="flex items-center text-xs">
                View all chats <ArrowUpRight className="ml-1 h-3 w-3" />
              </span>
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700 hover:shadow-lg hover:border-gray-600 transition-all">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-gray-300">Pricing Plans</CardTitle>
            <div className="w-10 h-10 rounded-full bg-[#c3ea00]/10 flex items-center justify-center">
              <CircleDollarSign className="w-5 h-5 text-[#c3ea00]" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-white">{stats.totalPricingPlans}</div>
            <p className="text-xs text-gray-400 mt-1">Active pricing plans</p>
            <Button
              variant="ghost"
              size="sm"
              className="mt-4 p-0 h-auto text-[#c3ea00] hover:text-[#b3d800] hover:bg-transparent"
            >
              <span className="flex items-center text-xs">
                View all plans <ArrowUpRight className="ml-1 h-3 w-3" />
              </span>
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Service Stats */}
        <Card className="bg-gray-800 border-gray-700 hover:shadow-lg hover:border-gray-600 transition-all">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-white">Service Distribution</CardTitle>
              <BarChart className="h-5 w-5 text-gray-400" />
            </div>
            <CardDescription className="text-gray-400">Breakdown of pricing plans by service type</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-200">Web Development</p>
                  <span className="text-sm font-bold text-[#c3ea00]">
                    {stats.serviceStats.webapp} ({getServicePercentage(stats.serviceStats.webapp)}%)
                  </span>
                </div>
                <Progress
                  value={getServicePercentage(stats.serviceStats.webapp)}
                  className="h-2 bg-gray-700"
                  // indicatorClassName="bg-blue-500"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-200">Marketing Automation</p>
                  <span className="text-sm font-bold text-[#c3ea00]">
                    {stats.serviceStats.automation} ({getServicePercentage(stats.serviceStats.automation)}%)
                  </span>
                </div>
                <Progress
                  value={getServicePercentage(stats.serviceStats.automation)}
                  className="h-2 bg-gray-700"
                  // indicatorClassName="bg-purple-500"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-200">Branding & Design</p>
                  <span className="text-sm font-bold text-[#c3ea00]">
                    {stats.serviceStats.branding} ({getServicePercentage(stats.serviceStats.branding)}%)
                  </span>
                </div>
                <Progress
                  value={getServicePercentage(stats.serviceStats.branding)}
                  className="h-2 bg-gray-700"
                  // indicatorClassName="bg-green-500"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-200">Digital Marketing</p>
                  <span className="text-sm font-bold text-[#c3ea00]">
                    {stats.serviceStats.marketing} ({getServicePercentage(stats.serviceStats.marketing)}%)
                  </span>
                </div>
                <Progress
                  value={getServicePercentage(stats.serviceStats.marketing)}
                  className="h-2 bg-gray-700"
                  // indicatorClassName="bg-orange-500"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* System Status */}
        <Card className="bg-gray-800 border-gray-700 hover:shadow-lg hover:border-gray-600 transition-all">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-white">System Status</CardTitle>
              <CardDescription className="text-gray-400">Current system configuration and health</CardDescription>
            </div>
            <Settings className="w-5 h-5 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="flex items-center justify-between p-4 bg-gray-700/30 rounded-lg">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      stats.systemPromptStatus === "Configured" ? "bg-green-500/20" : "bg-yellow-500/20"
                    }`}
                  >
                    {stats.systemPromptStatus === "Configured" ? (
                      <CheckCircle className="w-5 h-5 text-green-400" />
                    ) : (
                      <AlertCircle className="w-5 h-5 text-yellow-400" />
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-200">Chatbot System Prompt</p>
                    <p className="text-xs text-gray-400">Configuration status</p>
                  </div>
                </div>
                <span
                  className={`px-3 py-1 text-xs rounded-full ${
                    stats.systemPromptStatus === "Configured"
                      ? "bg-green-500/10 text-green-400 border border-green-500/20"
                      : "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20"
                  }`}
                >
                  {stats.systemPromptStatus}
                </span>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-700/30 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                    <Users className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-200">User Authentication</p>
                    <p className="text-xs text-gray-400">Admin login system</p>
                  </div>
                </div>
                <span className="px-3 py-1 text-xs rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
                  Active
                </span>
              </div>

              <Button variant="outline" className="w-full border-gray-700 hover:bg-gray-700 text-gray-300">
                View System Settings
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity Section */}
      <div className="grid gap-6 md:grid-cols-3">
        {/* Recent Blogs */}
        <Card className="bg-gray-800 border-gray-700 hover:shadow-lg hover:border-gray-600 transition-all">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-white flex items-center gap-2">
                <FileText className="w-4 h-4 text-blue-400" />
                Recent Blogs
              </CardTitle>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-white hover:bg-gray-700">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-0">
              {stats.recentBlogs.length > 0 ? (
                stats.recentBlogs.map((blog, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between py-3 px-2 border-b border-gray-700 last:border-0 hover:bg-gray-700/30 rounded-md transition-colors group cursor-pointer"
                  >
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-gray-200 line-clamp-1 group-hover:text-blue-400 transition-colors">
                        {blog.title}
                      </p>
                      <p className="text-xs text-gray-400">{blog.createdAt}</p>
                    </div>
                    <TrendingUp className="w-4 h-4 text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                ))
              ) : (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <FileText className="w-8 h-8 text-gray-600 mb-2" />
                  <p className="text-sm text-gray-400">No blogs published yet</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Recent Portfolios */}
        <Card className="bg-gray-800 border-gray-700 hover:shadow-lg hover:border-gray-600 transition-all">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-white flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-green-400" />
                Recent Portfolios
              </CardTitle>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-white hover:bg-gray-700">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-0">
              {stats.recentPortfolios.length > 0 ? (
                stats.recentPortfolios.map((portfolio, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between py-3 px-2 border-b border-gray-700 last:border-0 hover:bg-gray-700/30 rounded-md transition-colors group cursor-pointer"
                  >
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-gray-200 line-clamp-1 group-hover:text-green-400 transition-colors">
                        {portfolio.title}
                      </p>
                      <p className="text-xs text-gray-400">{portfolio.createdAt}</p>
                    </div>
                    <BarChart className="w-4 h-4 text-green-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                ))
              ) : (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <ImageIcon className="w-8 h-8 text-gray-600 mb-2" />
                  <p className="text-sm text-gray-400">No portfolios published yet</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Recent Chats */}
        <Card className="bg-gray-800 border-gray-700 hover:shadow-lg hover:border-gray-600 transition-all">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-white flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-purple-400" />
                Recent Chats
              </CardTitle>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-white hover:bg-gray-700">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-0">
              {stats.recentChats.length > 0 ? (
                stats.recentChats.map((chat, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between py-3 px-2 border-b border-gray-700 last:border-0 hover:bg-gray-700/30 rounded-md transition-colors group cursor-pointer"
                  >
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-gray-200 line-clamp-1 group-hover:text-purple-400 transition-colors">
                        {chat.messages[0]?.text.substring(0, 30)}...
                      </p>
                      <p className="text-xs text-gray-400">{chat.createdAt}</p>
                    </div>
                    <MessageSquare className="w-4 h-4 text-purple-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                ))
              ) : (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <MessageSquare className="w-8 h-8 text-gray-600 mb-2" />
                  <p className="text-sm text-gray-400">No chat conversations yet</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-lg p-6 flex flex-col items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#c3ea00] mb-4"></div>
            <p className="text-white">Loading dashboard data...</p>
          </div>
        </div>
      )}
    </div>
  )
}
