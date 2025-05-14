"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  PlusCircle,
  ExternalLink,
  ImageIcon,
  Palette,
  Tag,
  Building,
  Link2,
  FileText,
  X,
  Upload,
  Loader2,
} from "lucide-react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Edit, Trash } from "lucide-react"

interface Portfolio {
  _id: string
  title: string
  description: string
  image: string
  category: string
  agency: string
  url?: string
  color: string
  challenge: string
  solution: string
  result: string
  displayOrder: number
  createdAt: string
}


export default function PortfolioManagement() {
  const [portfolios, setPortfolios] = useState<Portfolio[]>([])
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState("")
  const [image, setImage] = useState("")
  const [agency, setAgency] = useState("Wonder")
  const [url, setUrl] = useState("")
  const [color, setColor] = useState("#c3ea00")
  const [challenge, setChallenge] = useState("")
  const [solution, setSolution] = useState("")
  const [result, setResult] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [selectedPortfolio, setSelectedPortfolio] = useState<Portfolio | null>(null)
  const [isDetailOpen, setIsDetailOpen] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [displayOrder, setDisplayOrder] = useState(0)

  useEffect(() => {
    fetchPortfolios()
  }, [])

  const fetchPortfolios = async () => {
    try {
      setIsLoading(true)
      const response = await fetch("/api/portfolios")
      const data = await response.json()
      if (data.success) {
        setPortfolios(data.portfolios)
      }
    } catch (error) {
      console.error("Error fetching portfolios:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleEdit = (portfolio: Portfolio, e: React.MouseEvent) => {
    e.stopPropagation() // Prevent triggering the card click
    setSelectedPortfolio(portfolio)
    setTitle(portfolio.title)
    setDescription(portfolio.description)
    setImage(portfolio.image)
    setCategory(portfolio.category)
    setAgency(portfolio.agency)
    setUrl(portfolio.url || '')
    setColor(portfolio.color)
    setChallenge(portfolio.challenge)
    setSolution(portfolio.solution)
    setResult(portfolio.result)
    setIsEditOpen(true)
  }

  const handleUpdate = async () => {
    if (!selectedPortfolio) return

    try {
      setIsLoading(true)
      const response = await fetch(`/api/portfolios/${selectedPortfolio._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          image,
          category,
          agency,
          url,
          color,
          challenge,
          solution,
          result,
          displayOrder
        }),
      })

      const data = await response.json()
      if (data.success) {
        setIsEditOpen(false)
        fetchPortfolios()
        resetForm()
        setSelectedPortfolio(null)
      } else {
        throw new Error(data.error || "Failed to update portfolio")
      }
    } catch (error) {
      console.error("Error:", error)
      alert("Failed to update portfolio. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation() // Prevent triggering the card click
    
    try {
      setIsLoading(true)
      const response = await fetch(`/api/portfolios/${id}`, {
        method: "DELETE",
      })

      const data = await response.json()
      if (data.success) {
        fetchPortfolios()
      } else {
        throw new Error(data.error || "Failed to delete portfolio")
      }
    } catch (error) {
      console.error("Error:", error)
      alert("Failed to delete portfolio")
    } finally {
      setIsLoading(false)
    }
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (!process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME) {
      console.error("Cloudinary cloud name is not configured")
      alert("Image upload is not configured properly. Please contact the administrator.")
      return
    }

    try {
      setIsUploading(true)
      const formData = new FormData()
      formData.append("file", file)
      formData.append("upload_preset", "blog-thumbnails")
      formData.append("folder", "portfolio-images") // Changed folder name to match portfolio context
      formData.append("resource_type", "image")

      const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/upload`
      console.log("Uploading to Cloudinary:", cloudinaryUrl)

      const response = await fetch(cloudinaryUrl, {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        const errorData = await response.text()
        console.error("Cloudinary error response:", errorData)
        throw new Error(`Upload failed: ${response.status} ${response.statusText}`)
      }

      const data = await response.json()
      console.log("Cloudinary response:", data)

      if (data.secure_url) {
        setImage(data.secure_url)
        // Refresh the file input
        if (fileInputRef.current) {
          fileInputRef.current.value = ""
        }
      } else {
        throw new Error("No secure URL in response")
      }
    } catch (error) {
      console.error("Error uploading image:", error)
      alert("Failed to upload image. Please try again.")
    } finally {
      setIsUploading(false)
    }
  }

  const handlePublish = async () => {
    try {
      setIsLoading(true)
      const response = await fetch("/api/portfolios/publish", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          image,
          category,
          agency,
          url,
          color,
          challenge,
          solution,
          result,
          displayOrder
        }),
      })

      const data = await response.json()
      if (data.success) {
        resetForm()
        fetchPortfolios()
        setIsCreateOpen(false)
      } else {
        throw new Error(data.error || "Failed to publish portfolio")
      }
    } catch (error) {
      console.error("Error:", error)
      alert("Failed to publish portfolio. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

    // Add to the form reset function
    const resetForm = () => {
      setTitle("")
      setDescription("")
      setImage("")
      setCategory("")
      setAgency("Wonder")
      setUrl("")
      setColor("#c3ea00")
      setChallenge("")
      setSolution("")
      setResult("")
      setDisplayOrder(0)
    }


  const handleViewDetails = (portfolio: Portfolio) => {
    setSelectedPortfolio(portfolio)
    setIsDetailOpen(true)
  }

  return (
    <div className="container mx-auto py-8 px-4 max-w-7xl bg-gray-900 min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Portfolio Management</h1>
          <p className="text-gray-400 mt-1">Create and manage your portfolio projects</p>
        </div>
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2 bg-[#c3ea00] text-gray-900 hover:bg-[#b3d800]">
              <PlusCircle className="h-4 w-4" />
              New Project
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-gray-900 border-gray-700">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold text-white">Create New Portfolio Project</DialogTitle>
              <DialogDescription className="text-gray-400">
                Fill in the details to publish a new portfolio project
              </DialogDescription>
            </DialogHeader>
            <div className="grid md:grid-cols-2 gap-6 py-4">
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center gap-2 text-gray-300">
                    <FileText className="h-4 w-4 text-[#c3ea00]" /> Project Title
                  </label>
                  <Input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter project title"
                    className="bg-gray-800 border-gray-700 focus:border-[#c3ea00] focus:ring-[#c3ea00]"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center gap-2 text-gray-300">
                    <Tag className="h-4 w-4 text-[#c3ea00]" /> Category
                  </label>
                  <Input
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    placeholder="e.g., Web Design, Branding"
                    className="bg-gray-800 border-gray-700"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center gap-2 text-gray-300">
                    <Building className="h-4 w-4 text-[#c3ea00]" /> Agency
                  </label>
                  <Input
                    value={agency}
                    onChange={(e) => setAgency(e.target.value)}
                    placeholder="Agency name"
                    className="bg-gray-800 border-gray-700"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center gap-2 text-gray-300">
                    <Link2 className="h-4 w-4 text-[#c3ea00]" /> Project URL
                  </label>
                  <Input
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="https://example.com"
                    className="bg-gray-800 border-gray-700"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center gap-2 text-gray-300">
                    <ImageIcon className="h-4 w-4 text-[#c3ea00]" /> Image
                  </label>
                  <div className="space-y-3">
                    {image && (
                      <div className="relative w-full h-32 rounded-md overflow-hidden border border-gray-700 bg-gray-800">
                        <img
                          src={image || "/placeholder.svg"}
                          alt="Project preview"
                          className="w-full h-full object-cover"
                        />
                        <Button
                          variant="destructive"
                          size="sm"
                          className="absolute top-2 right-2 h-8 w-8 p-0"
                          onClick={() => setImage("")}
                        >
                          <X className="h-4 w-4" />
                          <span className="sr-only">Remove image</span>
                        </Button>
                      </div>
                    )}
                    <div className="flex gap-2">
                      <Input
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                        placeholder="/images/project/example.png"
                        className="flex-1 bg-gray-800 border-gray-700"
                      />
                      <div className="relative">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => fileInputRef.current?.click()}
                          disabled={isUploading}
                          className="flex items-center gap-2 whitespace-nowrap border-gray-700 hover:bg-gray-800"
                        >
                          {isUploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
                          {isUploading ? "Uploading..." : "Upload"}
                        </Button>
                        <input
                          type="file"
                          ref={fileInputRef}
                          onChange={handleImageUpload}
                          accept="image/*"
                          className="hidden"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center gap-2 text-gray-300">
                    <Palette className="h-4 w-4 text-[#c3ea00]" /> Accent Color
                  </label>
                  <div className="flex gap-3 items-center">
                    <Input
                      type="color"
                      value={color}
                      onChange={(e) => setColor(e.target.value)}
                      className="w-16 h-10 p-1 bg-transparent"
                    />
                    <Input
                      type="text"
                      value={color}
                      onChange={(e) => setColor(e.target.value)}
                      className="flex-1 bg-gray-800 border-gray-700"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-6">

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Display Order</label>
                <Input
                  type="number"
                  value={displayOrder}
                  onChange={(e) => setDisplayOrder(parseInt(e.target.value) || 0)}
                  placeholder="Enter display order (0 = default)"
                  className="bg-gray-900 border-gray-700"
                />
                <p className="text-xs text-gray-500">Lower numbers will appear first. Use 0 for default ordering.</p>
              </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">Description</label>
                  <Textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Brief description of the project"
                    rows={3}
                    className="bg-gray-800 border-gray-700 min-h-[80px]"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">Challenge</label>
                  <Textarea
                    value={challenge}
                    onChange={(e) => setChallenge(e.target.value)}
                    placeholder="What challenges did this project address?"
                    rows={3}
                    className="bg-gray-800 border-gray-700 min-h-[80px]"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">Solution</label>
                  <Textarea
                    value={solution}
                    onChange={(e) => setSolution(e.target.value)}
                    placeholder="How did you solve the challenges?"
                    rows={3}
                    className="bg-gray-800 border-gray-700 min-h-[80px]"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">Result</label>
                  <Textarea
                    value={result}
                    onChange={(e) => setResult(e.target.value)}
                    placeholder="What was the outcome of the project?"
                    rows={3}
                    className="bg-gray-800 border-gray-700 min-h-[80px]"
                  />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={resetForm} className="border-gray-700 hover:bg-gray-800 text-gray-300">
                Reset Form
              </Button>
              <Button
                onClick={handlePublish}
                disabled={isLoading || !title || !description}
                className="min-w-[120px] bg-[#c3ea00] text-gray-900 hover:bg-[#b3d800]"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Publishing...
                  </>
                ) : (
                  "Publish Project"
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Portfolio Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading ? (
          Array(3)
            .fill(0)
            .map((_, i) => (
              <Card key={i} className="animate-pulse bg-gray-800 border-gray-700">
                <div className="h-48 bg-gray-700 rounded-t-lg"></div>
                <CardHeader>
                  <div className="h-6 bg-gray-700 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-700 rounded w-1/2 mt-2"></div>
                </CardHeader>
                <CardContent>
                  <div className="h-4 bg-gray-700 rounded w-full mb-2"></div>
                  <div className="h-4 bg-gray-700 rounded w-5/6"></div>
                </CardContent>
              </Card>
            ))
        ) : portfolios.length > 0 ? (
          portfolios.map((portfolio) => (
            <Card
              key={portfolio._id}
              className="overflow-hidden hover:shadow-lg transition-all cursor-pointer bg-gray-800 border-gray-700 hover:border-gray-600 group"
              onClick={() => handleViewDetails(portfolio)}
            >
              <div className="h-48 overflow-hidden relative" style={{ borderBottom: `4px solid ${portfolio.color}` }}>
                <img
                  src={portfolio.image || "/placeholder.svg?height=400&width=600&query=project"}
                  alt={portfolio.title}
                  className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-300"
                />
                <Badge
                  className="absolute top-3 right-3 font-medium"
                  style={{ backgroundColor: portfolio.color, color: "#111" }}
                >
                  {portfolio.category}
                </Badge>
              </div>
              <CardHeader className="pb-2">
                <CardTitle className="line-clamp-1 text-white">{portfolio.title}</CardTitle>
                <CardDescription className="line-clamp-2 text-gray-400">{portfolio.description}</CardDescription>
              </CardHeader>
              <CardContent className="pb-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-300">{portfolio.agency}</span>
                  {portfolio.url && (
                    <Button variant="ghost" size="sm" className="p-0 h-auto hover:bg-transparent" asChild>
                      <a
                        href={portfolio.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="flex items-center gap-1 text-sm"
                        style={{ color: portfolio.color }}
                      >
                        View <ExternalLink className="h-3 w-3" />
                      </a>
                    </Button>
                  )}
                </div>
                <div className="flex justify-end gap-2 mt-4 pt-2 border-t border-gray-700">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={(e) => handleEdit(portfolio, e)}
                    className="flex items-center gap-1.5 hover:bg-gray-700"
                  >
                    <Edit className="w-3.5 h-3.5" />
                    Edit
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={(e) => e.stopPropagation()}
                        className="flex items-center gap-1.5"
                      >
                        <Trash className="w-3.5 h-3.5" />
                        Delete
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent className="bg-gray-900 border-gray-700">
                      <AlertDialogHeader>
                        <AlertDialogTitle className="text-white">Delete Portfolio Project</AlertDialogTitle>
                        <AlertDialogDescription className="text-gray-400">
                          Are you sure you want to delete "{portfolio.title}"? This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel className="bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700 hover:text-white">
                          Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction
                          onClick={(e) => handleDelete(portfolio._id, e)}
                          className="bg-red-900 hover:bg-red-800 text-white"
                        >
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="col-span-full flex flex-col items-center justify-center py-16 px-4 border border-dashed border-gray-700 rounded-lg bg-gray-800/50">
            <div className="bg-gray-700 rounded-full p-6 mb-4">
              <FileText className="h-10 w-10 text-[#c3ea00]" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-white">No projects yet</h3>
            <p className="text-gray-400 text-center mb-6">Create your first portfolio project to get started</p>
            <Button onClick={() => setIsCreateOpen(true)} className="bg-[#c3ea00] text-gray-900 hover:bg-[#b3d800]">
              Create Project
            </Button>
          </div>
        )}
      </div>

      {/* Project Details Modal */}
      <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        {selectedPortfolio && (
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-gray-900 border-gray-700">
            <DialogHeader className="relative pb-0">
              {/* <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 top-2 z-10 bg-gray-800/80 hover:bg-gray-700"
                onClick={() => setIsDetailOpen(false)}
              >
                <X className="h-4 w-4" />
                <span className="sr-only">Close</span>
              </Button> */}
              <div className="w-full h-64 rounded-lg overflow-hidden mb-4">
                <img
                  src={selectedPortfolio.image || "/placeholder.svg?height=400&width=600&query=project"}
                  alt={selectedPortfolio.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-wrap gap-2 mb-4">
                <Badge style={{ backgroundColor: selectedPortfolio.color, color: "#111" }} className="font-medium">
                  {selectedPortfolio.category}
                </Badge>
                <Badge variant="outline" className="border-gray-700 text-gray-300">
                  {selectedPortfolio.agency}
                </Badge>
              </div>
              <DialogTitle className="text-2xl text-white">{selectedPortfolio.title}</DialogTitle>
              <DialogDescription className="text-base mt-2 text-gray-400">
                {selectedPortfolio.description}
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <div className="grid md:grid-cols-3 gap-8">
                <div className="space-y-2 bg-gray-800 p-4 rounded-lg">
                  <h3 className="font-semibold text-lg text-white flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#c3ea00]"></span>
                    Challenge
                  </h3>
                  <p className="text-gray-400">{selectedPortfolio.challenge}</p>
                </div>
                <div className="space-y-2 bg-gray-800 p-4 rounded-lg">
                  <h3 className="font-semibold text-lg text-white flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#c3ea00]"></span>
                    Solution
                  </h3>
                  <p className="text-gray-400">{selectedPortfolio.solution}</p>
                </div>
                <div className="space-y-2 bg-gray-800 p-4 rounded-lg">
                  <h3 className="font-semibold text-lg text-white flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#c3ea00]"></span>
                    Result
                  </h3>
                  <p className="text-gray-400">{selectedPortfolio.result}</p>
                </div>
              </div>
            </div>
            <DialogFooter className="flex justify-between items-center border-t border-gray-700 pt-4">
              <div className="text-sm text-gray-400">
                Created: {new Date(selectedPortfolio.createdAt).toLocaleDateString()}
              </div>
              {selectedPortfolio.url && (
                <Button className="gap-2 bg-[#c3ea00] text-gray-900 hover:bg-[#b3d800]" asChild>
                  <a href={selectedPortfolio.url} target="_blank" rel="noopener noreferrer">
                    View Live <ExternalLink className="h-4 w-4" />
                  </a>
                </Button>
              )}
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-gray-900 border-gray-700">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-white">Edit Portfolio Project</DialogTitle>
            <DialogDescription className="text-gray-400">
              Update the details of your portfolio project
            </DialogDescription>
          </DialogHeader>
          <div className="grid md:grid-cols-2 gap-6 py-4">
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center gap-2 text-gray-300">
                  <FileText className="h-4 w-4 text-[#c3ea00]" /> Project Title
                </label>
                <Input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter project title"
                  className="bg-gray-800 border-gray-700 focus:border-[#c3ea00] focus:ring-[#c3ea00]"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center gap-2 text-gray-300">
                  <Tag className="h-4 w-4 text-[#c3ea00]" /> Category
                </label>
                <Input
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  placeholder="e.g., Web Design, Branding"
                  className="bg-gray-800 border-gray-700"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center gap-2 text-gray-300">
                  <Building className="h-4 w-4 text-[#c3ea00]" /> Agency
                </label>
                <Input
                  value={agency}
                  onChange={(e) => setAgency(e.target.value)}
                  placeholder="Agency name"
                  className="bg-gray-800 border-gray-700"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center gap-2 text-gray-300">
                  <Link2 className="h-4 w-4 text-[#c3ea00]" /> Project URL
                </label>
                <Input
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://example.com"
                  className="bg-gray-800 border-gray-700"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center gap-2 text-gray-300">
                  <ImageIcon className="h-4 w-4 text-[#c3ea00]" /> Image
                </label>
                <div className="space-y-3">
                  {image && (
                    <div className="relative w-full h-32 rounded-md overflow-hidden border border-gray-700 bg-gray-800">
                      <img
                        src={image || "/placeholder.svg"}
                        alt="Project preview"
                        className="w-full h-full object-cover"
                      />
                      <Button
                        variant="destructive"
                        size="sm"
                        className="absolute top-2 right-2 h-8 w-8 p-0"
                        onClick={() => setImage("")}
                      >
                        <X className="h-4 w-4" />
                        <span className="sr-only">Remove image</span>
                      </Button>
                    </div>
                  )}
                  <div className="flex gap-2">
                    <Input
                      value={image}
                      onChange={(e) => setImage(e.target.value)}
                      placeholder="/images/project/example.png"
                      className="flex-1 bg-gray-800 border-gray-700"
                    />
                    <div className="relative">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => fileInputRef.current?.click()}
                        disabled={isUploading}
                        className="flex items-center gap-2 whitespace-nowrap border-gray-700 hover:bg-gray-800"
                      >
                        {isUploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
                        {isUploading ? "Uploading..." : "Upload"}
                      </Button>
                      <input
                          type="file"
                          ref={fileInputRef}
                          onChange={handleImageUpload}
                          accept="image/*"
                          className="hidden"
                        />
                    </div>
                  </div>
                </div>

                

                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center gap-2 text-gray-300">
                    <Palette className="h-4 w-4 text-[#c3ea00]" /> Accent Color
                  </label>
                  <div className="flex gap-3 items-center">
                    <Input
                      type="color"
                      value={color}
                      onChange={(e) => setColor(e.target.value)}
                      className="w-16 h-10 p-1 bg-transparent"
                    />
                    <Input
                      type="text"
                      value={color}
                      onChange={(e) => setColor(e.target.value)}
                      className="flex-1 bg-gray-800 border-gray-700"
                    />
                  </div>
                </div>
              </div>
              </div>

              <div className="space-y-6">

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Display Order</label>
                <Input
                  type="number"
                  value={displayOrder}
                  onChange={(e) => setDisplayOrder(parseInt(e.target.value) || 0)}
                  placeholder="Enter display order (0 = default)"
                  className="bg-gray-900 border-gray-700"
                />
                <p className="text-xs text-gray-500">Lower numbers will appear first. Use 0 for default ordering.</p>
              </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">Description</label>
                  <Textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Brief description of the project"
                    rows={3}
                    className="bg-gray-800 border-gray-700 min-h-[80px]"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">Challenge</label>
                  <Textarea
                    value={challenge}
                    onChange={(e) => setChallenge(e.target.value)}
                    placeholder="What challenges did this project address?"
                    rows={3}
                    className="bg-gray-800 border-gray-700 min-h-[80px]"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">Solution</label>
                  <Textarea
                    value={solution}
                    onChange={(e) => setSolution(e.target.value)}
                    placeholder="How did you solve the challenges?"
                    rows={3}
                    className="bg-gray-800 border-gray-700 min-h-[80px]"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">Result</label>
                  <Textarea
                    value={result}
                    onChange={(e) => setResult(e.target.value)}
                    placeholder="What was the outcome of the project?"
                    rows={3}
                    className="bg-gray-800 border-gray-700 min-h-[80px]"
                  />
                </div>
              </div>
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={resetForm} className="border-gray-700 hover:bg-gray-800 text-gray-300">
                Reset Form
              </Button>
              <Button
                onClick={handleUpdate}
                disabled={isLoading || !title || !description}
                className="min-w-[120px] bg-[#c3ea00] text-gray-900 hover:bg-[#b3d800]"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Updating...
                  </>
                ) : (
                  "Update Project"
                )}
              </Button>
            </DialogFooter>
            
          </DialogContent>
        </Dialog>

      {/* Global Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-lg p-6 flex flex-col items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#c3ea00] mb-4" />
            <p className="text-white">Loading...</p>
          </div>
        </div>
      )}
    </div>
  )
}
