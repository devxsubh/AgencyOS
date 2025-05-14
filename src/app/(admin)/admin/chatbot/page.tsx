"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import {
  MessageSquare,
  Settings,
  User,
  Bot,
  Calendar,
  Loader2,
  Save,
  RefreshCw,
  AlertCircle,
  CheckCircle,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

interface Message {
  from: "user" | "bot"
  text: string
  timestamp: string
}

interface Chat {
  _id: string
  messages: Message[]
  systemPrompt?: string
  createdAt: string
  sessionId?: string
}

interface GroupedChats {
  [key: string]: Chat[]
}

export default function ChatbotManagement() {
  const router = useRouter()
  const { toast } = useToast()
  const [chats, setChats] = useState<Chat[]>([])
  const [groupedChats, setGroupedChats] = useState<GroupedChats>({})
  const [systemPrompt, setSystemPrompt] = useState("")
  const [loading, setLoading] = useState(false)
  const [refreshing, setRefreshing] = useState(false)
  const [activeTab, setActiveTab] = useState("conversations")

  useEffect(() => {
    fetchChats()
    fetchSystemPrompt()
  }, [])

  useEffect(() => {
    // Group chats by session ID or date if no session ID
    const grouped = chats.reduce((acc: GroupedChats, chat) => {
      const key = chat.sessionId || new Date(chat.createdAt).toLocaleDateString()
      if (!acc[key]) {
        acc[key] = []
      }
      acc[key].push(chat)
      return acc
    }, {})
    setGroupedChats(grouped)
  }, [chats])

  const fetchSystemPrompt = async () => {
    try {
      const response = await fetch("/api/chatbot/config", {
        credentials: "include",
      })
      const data = await response.json()
      if (data.success) {
        setSystemPrompt(data.systemPrompt)
      } else if (data.error === "Unauthorized") {
        router.push("/admin/login")
      }
    } catch (error) {
      console.error("Error fetching system prompt:", error)
      toast({
        title: "Error",
        description: "Failed to fetch system prompt",
        variant: "destructive",
      })
    }
  }

  const updateSystemPrompt = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/chatbot/config", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ systemPrompt }),
      })

      const data = await response.json()

      if (data.success) {
        toast({
          title: "Success",
          description: "System prompt updated successfully",
        })
      } else if (data.error === "Unauthorized") {
        router.push("/admin/login")
      } else {
        throw new Error(data.error || "Failed to update system prompt")
      }
    } catch (error) {
      console.error("Error updating system prompt:", error)
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to update system prompt",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const fetchChats = async () => {
    try {
      setRefreshing(true)
      const response = await fetch("/api/chats", {
        credentials: "include",
      })
      const data = await response.json()
      if (data.success) {
        setChats(data.chats)
      } else if (data.error === "Unauthorized") {
        router.push("/admin/login")
      }
    } catch (error) {
      console.error("Error fetching chats:", error)
      toast({
        title: "Error",
        description: "Failed to fetch chat conversations",
        variant: "destructive",
      })
    } finally {
      setRefreshing(false)
    }
  }

  return (
    <div className="container mx-auto py-8 px-4 bg-gray-900 min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white">Chatbot Management</h1>
          <p className="text-gray-400 mt-1">Manage conversations and configure chatbot settings</p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={fetchChats}
          disabled={refreshing}
          className="border-gray-700 hover:bg-gray-800 text-gray-300"
        >
          {refreshing ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <RefreshCw className="mr-2 h-4 w-4" />}
          Refresh
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="bg-gray-800 p-1">
          <TabsTrigger
            value="conversations"
            className="flex items-center gap-2 data-[state=active]:bg-gray-700 data-[state=active]:text-white"
          >
            <MessageSquare className="w-4 h-4" />
            Conversations
          </TabsTrigger>
          <TabsTrigger
            value="settings"
            className="flex items-center gap-2 data-[state=active]:bg-gray-700 data-[state=active]:text-white"
          >
            <Settings className="w-4 h-4" />
            Settings
          </TabsTrigger>
        </TabsList>

        <TabsContent value="conversations" className="space-y-8">
          {Object.keys(groupedChats).length === 0 && !refreshing ? (
            <div className="flex flex-col items-center justify-center py-16 px-4 border border-dashed border-gray-700 rounded-lg bg-gray-800/50">
              <div className="bg-gray-700 rounded-full p-6 mb-4">
                <MessageSquare className="h-10 w-10 text-[#c3ea00]" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">No conversations yet</h3>
              <p className="text-gray-400 text-center mb-6">
                Conversations will appear here once users start chatting with your bot
              </p>
            </div>
          ) : (
            Object.entries(groupedChats).map(([sessionId, sessionChats]) => (
              <Card
                key={sessionId}
                className="bg-gray-800 border-gray-700 overflow-hidden shadow-md hover:shadow-lg transition-shadow"
              >
                <CardHeader className="border-b border-gray-700 py-4 px-6 bg-gray-800/90">
                  <CardTitle className="text-sm font-medium text-gray-300 flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-[#c3ea00]" />
                    Session: {sessionId}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                  {sessionChats.map((chat) => (
                    <div key={chat._id} className="space-y-4">
                      {chat.messages.map((message, index) => (
                        <div
                          key={index}
                          className={`flex items-start gap-3 ${
                            message.from === "user" ? "justify-end" : "justify-start"
                          }`}
                        >
                          {message.from === "bot" && (
                            <div className="w-8 h-8 rounded-full bg-[#c3ea00] flex items-center justify-center">
                              <Bot className="w-5 h-5 text-gray-900" />
                            </div>
                          )}
                          <div
                            className={`max-w-[80%] rounded-lg p-4 ${
                              message.from === "user"
                                ? "bg-gray-700 text-white"
                                : "bg-[#c3ea00]/10 border border-[#c3ea00]/20 text-gray-200"
                            }`}
                          >
                            <div className="text-sm font-medium mb-1 flex items-center gap-2">
                              {message.from === "user" ? (
                                "User"
                              ) : (
                                <>
                                  <span className="text-[#c3ea00]">WonderBot</span>
                                  <span className="text-xs text-gray-400">
                                    {new Date(message.timestamp || "").toLocaleTimeString()}
                                  </span>
                                </>
                              )}
                            </div>
                            <div className="whitespace-pre-wrap text-sm">{message.text}</div>
                          </div>
                          {message.from === "user" && (
                            <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center">
                              <User className="w-5 h-5 text-white" />
                            </div>
                          )}
                        </div>
                      ))}
                      <div className="text-xs text-gray-500 text-right border-t border-gray-700 pt-2 mt-4">
                        {new Date(chat.createdAt).toLocaleString()}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            ))
          )}

          {refreshing && (
            <div className="flex justify-center items-center py-8">
              <div className="flex flex-col items-center gap-2">
                <Loader2 className="h-8 w-8 animate-spin text-[#c3ea00]" />
                <p className="text-gray-400">Loading conversations...</p>
              </div>
            </div>
          )}
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <Card className="bg-gray-800 border-gray-700 shadow-md">
            <CardHeader className="border-b border-gray-700">
              <CardTitle className="text-xl font-semibold text-white flex items-center gap-2">
                <Bot className="h-5 w-5 text-[#c3ea00]" />
                System Prompt Configuration
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <Alert className="mb-6 bg-gray-700 border-[#c3ea00]/30 text-gray-300">
                <AlertCircle className="h-4 w-4 text-[#c3ea00]" />
                <AlertTitle className="text-white">Important</AlertTitle>
                <AlertDescription>
                  The system prompt defines your chatbot's personality and behavior. Changes will affect all future
                  conversations.
                </AlertDescription>
              </Alert>

              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">System Prompt</label>
                  <Textarea
                    value={systemPrompt}
                    onChange={(e) => setSystemPrompt(e.target.value)}
                    placeholder="Enter the system prompt for the chatbot..."
                    className="min-h-[350px] bg-gray-700 border-gray-600 focus:border-[#c3ea00] text-white"
                  />
                </div>

                <div className="flex justify-end">
                  <Button
                    onClick={updateSystemPrompt}
                    disabled={loading}
                    className="bg-[#c3ea00] text-gray-900 hover:bg-[#b3d800] flex items-center gap-2"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="h-4 w-4" />
                        Save Changes
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700 shadow-md">
            <CardHeader className="border-b border-gray-700">
              <CardTitle className="text-xl font-semibold text-white">Usage Tips</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="bg-[#c3ea00]/20 p-2 rounded-full">
                    <CheckCircle className="h-5 w-5 text-[#c3ea00]" />
                  </div>
                  <div>
                    <h3 className="font-medium text-white mb-1">Be specific about the bot's role</h3>
                    <p className="text-gray-400 text-sm">
                      Clearly define who the chatbot is, what it knows, and how it should respond.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="bg-[#c3ea00]/20 p-2 rounded-full">
                    <CheckCircle className="h-5 w-5 text-[#c3ea00]" />
                  </div>
                  <div>
                    <h3 className="font-medium text-white mb-1">Set boundaries</h3>
                    <p className="text-gray-400 text-sm">
                      Specify topics the bot should avoid or how to handle questions outside its scope.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="bg-[#c3ea00]/20 p-2 rounded-full">
                    <CheckCircle className="h-5 w-5 text-[#c3ea00]" />
                  </div>
                  <div>
                    <h3 className="font-medium text-white mb-1">Define the tone and style</h3>
                    <p className="text-gray-400 text-sm">
                      Instruct the bot on how formal or casual its responses should be.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Global Loading Overlay */}
      {loading && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-lg p-6 flex flex-col items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#c3ea00] mb-4"></div>
            <p className="text-white">Updating system prompt...</p>
          </div>
        </div>
      )}
    </div>
  )
}
