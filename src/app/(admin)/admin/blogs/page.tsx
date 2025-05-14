"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
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
import { motion } from "framer-motion"
import { Loader2, PlusCircle, FileText, Upload, ImageIcon, RefreshCw } from "lucide-react"

interface Blog {
  _id: string
  title: string
  content: string
  thumbnail: string
  createdAt: string
}

interface BlogPreview {
  title: string
  content: string
  thumbnail: string
}

export default function GenerateBlogs() {
  const [topic, setTopic] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [preview, setPreview] = useState<BlogPreview | null>(null)
  const [imagePrompt, setImagePrompt] = useState("")
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Custom blog state
  const [customTitle, setCustomTitle] = useState("")
  const [customContent, setCustomContent] = useState("")
  const [customThumbnail, setCustomThumbnail] = useState("")

  const handleAIGenerate = async () => {
    if (!topic.trim()) {
      alert("Please enter a topic")
      return
    }

    try {
      setIsLoading(true)
      const response = await fetch("/api/blogs/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ topic }),
      })

      const data = await response.json()
      if (data.success) {
        setPreview({
          title: data.blog.title,
          content: data.blog.content,
          thumbnail: data.blog.thumbnail,
        })
        setImagePrompt(`Generate a thumbnail image for a blog post about ${topic}`)
      } else {
        throw new Error(data.error || "Failed to generate blog")
      }
    } catch (error) {
      console.error("Error:", error)
      alert("Failed to generate blog. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  // Update the handleGenerateImage function
  const handleGenerateImage = async () => {
    try {
      setIsLoading(true)
      const response = await fetch("/api/blogs/generate-image", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: imagePrompt }),
      })

      const data = await response.json()
      if (data.success) {
        if (preview) {
          setPreview({ ...preview, thumbnail: data.imageUrl })
        } else if (selectedBlog) {
          setSelectedBlog({ ...selectedBlog, thumbnail: data.imageUrl })
        } else {
          setCustomThumbnail(data.imageUrl)
        }
      } else {
        throw new Error(data.error || "Failed to generate image")
      }
    } catch (error) {
      console.error("Error:", error)
      alert("Failed to generate image. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  // Update the handleImageUpload function
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (!process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME) {
      console.error("Cloudinary cloud name is not configured")
      alert("Image upload is not configured properly. Please contact the administrator.")
      return
    }

    try {
      setIsLoading(true)
      const formData = new FormData()
      formData.append("file", file)
      formData.append("upload_preset", "blog-thumbnails")
      formData.append("folder", "blog-thumbnails") // Optional: organize uploads in a folder
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
        if (preview) {
          setPreview({ ...preview, thumbnail: data.secure_url })
        } else if (selectedBlog) {
          setSelectedBlog({ ...selectedBlog, thumbnail: data.secure_url })
        } else {
          setCustomThumbnail(data.secure_url)
        }
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
      setIsLoading(false)
    }
  }

  const handlePublish = async (isAIGenerated: boolean) => {
    const blogData = isAIGenerated
      ? preview
      : {
          title: customTitle,
          content: customContent,
          thumbnail: customThumbnail,
        }

    if (!blogData) return

    try {
      setIsLoading(true)
      const response = await fetch("/api/blogs/publish", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(blogData),
      })

      const data = await response.json()
      if (data.success) {
        alert("Blog published successfully!")
        if (isAIGenerated) {
          setTopic("")
          setPreview(null)
        } else {
          setCustomTitle("")
          setCustomContent("")
          setCustomThumbnail("")
        }
      } else {
        throw new Error(data.error || "Failed to publish blog")
      }
    } catch (error) {
      console.error("Error:", error)
      alert("Failed to publish blog. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const [blogs, setBlogs] = useState<Blog[]>([])
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [isAddBlogOpen, setIsAddBlogOpen] = useState(false)

  useEffect(() => {
    fetchBlogs()
  }, [])

  const fetchBlogs = async () => {
    try {
      setIsLoading(true)
      const response = await fetch("/api/blogs")
      const data = await response.json()
      if (data.success) {
        setBlogs(data.blogs)
      }
    } catch (error) {
      console.error("Error fetching blogs:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleEdit = async () => {
    if (!selectedBlog) return

    try {
      setIsLoading(true)
      const response = await fetch(`/api/blogs/${selectedBlog._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(selectedBlog),
      })

      const data = await response.json()
      if (data.success) {
        setBlogs(blogs.map((blog) => (blog._id === selectedBlog._id ? data.blog : blog)))
        setIsEditing(false)
        setSelectedBlog(null)
        alert("Blog updated successfully!")
      }
    } catch (error) {
      console.error("Error updating blog:", error)
      alert("Failed to update blog")
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async (blogId: string) => {
    try {
      setIsLoading(true)
      const response = await fetch(`/api/blogs/${blogId}`, {
        method: "DELETE",
      })

      const data = await response.json()
      if (data.success) {
        setBlogs(blogs.filter((blog) => blog._id !== blogId))
      } else {
        throw new Error(data.error || "Failed to delete blog")
      }
    } catch (error) {
      console.error("Error deleting blog:", error)
      alert("Failed to delete blog")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen py-12 px-4 bg-gray-900">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold text-white">Blog Management</h1>
            <p className="text-gray-400 mt-2">Create and manage your blog posts with AI assistance</p>
          </div>
          <Dialog open={isAddBlogOpen} onOpenChange={setIsAddBlogOpen}>
            <DialogTrigger asChild>
              <Button size="lg" className="gap-2 bg-[#c3ea00] text-gray-900 hover:bg-[#b3d800]">
                <PlusCircle className="w-4 h-4" />
                Create New Blog
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto bg-gray-900 border-gray-700">
              <DialogHeader>
                <DialogTitle className="text-xl font-bold text-white">Create New Blog</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 overflow-y-auto p-4">
                <Tabs defaultValue="ai" className="space-y-4">
                  <TabsList className="grid w-full grid-cols-2 sticky top-0 bg-gray-800 z-10">
                    <TabsTrigger value="ai" className="data-[state=active]:bg-gray-700 data-[state=active]:text-white">
                      AI Generated
                    </TabsTrigger>
                    <TabsTrigger
                      value="manual"
                      className="data-[state=active]:bg-gray-700 data-[state=active]:text-white"
                    >
                      Write Manually
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="ai" className="space-y-4 min-h-0">
                    {!preview ? (
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <label htmlFor="topic" className="text-sm font-medium text-gray-300">
                            Blog Topic
                          </label>
                          <Input
                            id="topic"
                            placeholder="Enter the blog topic..."
                            value={topic}
                            onChange={(e) => setTopic(e.target.value)}
                            disabled={isLoading}
                            className="bg-gray-800 border-gray-700"
                          />
                        </div>

                        <Button
                          onClick={handleAIGenerate}
                          disabled={isLoading}
                          className="w-full bg-[#c3ea00] text-gray-900 hover:bg-[#b3d800]"
                        >
                          {isLoading ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Generating...
                            </>
                          ) : (
                            "Generate Blog"
                          )}
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-6">
                        <Input
                          value={preview.title}
                          onChange={(e) => setPreview({ ...preview, title: e.target.value })}
                          className="text-xl font-semibold bg-gray-800 border-gray-700"
                        />

                        <div className="relative aspect-video rounded-lg overflow-hidden bg-gray-800 border border-gray-700">
                          <img
                            src={preview.thumbnail || "/placeholder.svg"}
                            alt="Blog thumbnail"
                            className="object-cover w-full h-full"
                          />
                        </div>

                        <div className="space-y-2">
                          <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                            <ImageIcon className="h-4 w-4 text-[#c3ea00]" /> Image Generation Prompt
                          </label>
                          <div className="flex gap-2">
                            <Input
                              value={imagePrompt}
                              onChange={(e) => setImagePrompt(e.target.value)}
                              disabled={isLoading}
                              className="bg-gray-800 border-gray-700"
                            />
                            <Button
                              onClick={handleGenerateImage}
                              disabled={isLoading}
                              variant="outline"
                              className="border-gray-700 hover:bg-gray-800 whitespace-nowrap"
                            >
                              {isLoading ? (
                                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                              ) : (
                                <RefreshCw className="h-4 w-4 mr-2" />
                              )}
                              Generate Image
                            </Button>
                          </div>
                          <Button
                            onClick={() => fileInputRef.current?.click()}
                            disabled={isLoading}
                            variant="outline"
                            className="w-full border-gray-700 hover:bg-gray-800"
                          >
                            <Upload className="h-4 w-4 mr-2" />
                            Upload Custom Image
                          </Button>
                        </div>

                        <div className="space-y-2">
                          <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                            <FileText className="h-4 w-4 text-[#c3ea00]" /> Blog Content
                          </label>
                          <Textarea
                            value={preview.content}
                            onChange={(e) => setPreview({ ...preview, content: e.target.value })}
                            className="h-[300px] resize-none font-mono bg-gray-800 border-gray-700"
                          />
                        </div>

                        <div className="flex gap-4 sticky bottom-0 bg-gray-900 py-4">
                          <Button
                            onClick={() => setPreview(null)}
                            variant="outline"
                            disabled={isLoading}
                            className="border-gray-700 hover:bg-gray-800 text-gray-300"
                          >
                            Start Over
                          </Button>
                          <Button
                            onClick={() => handlePublish(true)}
                            disabled={isLoading}
                            className="flex-1 bg-[#c3ea00] text-gray-900 hover:bg-[#b3d800]"
                          >
                            {isLoading ? (
                              <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Publishing...
                              </>
                            ) : (
                              "Publish Blog"
                            )}
                          </Button>
                        </div>
                      </div>
                    )}
                  </TabsContent>

                  <TabsContent value="manual" className="space-y-4 min-h-0">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                          <FileText className="h-4 w-4 text-[#c3ea00]" /> Blog Title
                        </label>
                        <Input
                          value={customTitle}
                          onChange={(e) => setCustomTitle(e.target.value)}
                          placeholder="Enter blog title..."
                          disabled={isLoading}
                          className="bg-gray-800 border-gray-700"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                          <FileText className="h-4 w-4 text-[#c3ea00]" /> Blog Content
                        </label>
                        <Textarea
                          value={customContent}
                          onChange={(e) => setCustomContent(e.target.value)}
                          placeholder="Write your blog content..."
                          className="h-[300px] resize-none font-mono bg-gray-800 border-gray-700"
                          disabled={isLoading}
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                          <ImageIcon className="h-4 w-4 text-[#c3ea00]" /> Thumbnail Image
                        </label>
                        {customThumbnail && (
                          <div className="relative aspect-video rounded-lg overflow-hidden bg-gray-800 mb-4 border border-gray-700">
                            <img
                              src={customThumbnail || "/placeholder.svg"}
                              alt="Blog thumbnail"
                              className="object-cover w-full h-full"
                            />
                          </div>
                        )}
                        <div className="space-y-2">
                          <div className="flex gap-2">
                            <Input
                              value={imagePrompt}
                              onChange={(e) => setImagePrompt(e.target.value)}
                              placeholder="Enter image generation prompt..."
                              disabled={isLoading}
                              className="bg-gray-800 border-gray-700"
                            />
                            <Button
                              onClick={handleGenerateImage}
                              disabled={isLoading}
                              variant="outline"
                              className="border-gray-700 hover:bg-gray-800 whitespace-nowrap"
                            >
                              {isLoading ? (
                                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                              ) : (
                                <RefreshCw className="h-4 w-4 mr-2" />
                              )}
                              Generate Image
                            </Button>
                          </div>
                          <Button
                            onClick={() => fileInputRef.current?.click()}
                            disabled={isLoading}
                            variant="outline"
                            className="w-full border-gray-700 hover:bg-gray-800"
                          >
                            <Upload className="h-4 w-4 mr-2" />
                            Upload Image
                          </Button>
                        </div>
                      </div>
                    </div>

                    <Button
                      onClick={() => handlePublish(false)}
                      disabled={isLoading || !customTitle || !customContent || !customThumbnail}
                      className="w-full bg-[#c3ea00] text-gray-900 hover:bg-[#b3d800]"
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Publishing...
                        </>
                      ) : (
                        "Publish Blog"
                      )}
                    </Button>
                  </TabsContent>
                </Tabs>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Blog List */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {isLoading && blogs.length === 0
            ? Array(3)
                .fill(0)
                .map((_, index) => (
                  <div
                    key={index}
                    className="bg-gray-800 border border-gray-700 rounded-xl overflow-hidden animate-pulse"
                  >
                    <div className="aspect-video bg-gray-700"></div>
                    <div className="p-6 space-y-4">
                      <div className="h-6 bg-gray-700 rounded w-3/4"></div>
                      <div className="h-4 bg-gray-700 rounded w-1/2"></div>
                      <div className="h-4 bg-gray-700 rounded w-full"></div>
                      <div className="h-4 bg-gray-700 rounded w-5/6"></div>
                      <div className="flex gap-2 pt-2">
                        <div className="h-10 bg-gray-700 rounded flex-1"></div>
                        <div className="h-10 bg-gray-700 rounded flex-1"></div>
                      </div>
                    </div>
                  </div>
                ))
            : blogs.map((blog, index) => (
                <motion.div
                  key={blog._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="group relative bg-gray-800 rounded-xl overflow-hidden border border-gray-700 shadow-sm hover:shadow-lg hover:border-gray-600 transition-all duration-200"
                >
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={blog.thumbnail || "/placeholder.svg"}
                      alt={blog.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6 space-y-4">
                    <div>
                      <h3 className="text-xl font-semibold line-clamp-1 group-hover:text-[#c3ea00] transition-colors text-white">
                        {blog.title}
                      </h3>
                      <time className="text-sm text-gray-400">
                        {new Intl.DateTimeFormat("en-US", {
                          dateStyle: "medium",
                        }).format(new Date(blog.createdAt))}
                      </time>
                    </div>
                    <p className="text-gray-400 line-clamp-2">{blog.content.slice(0, 120)}...</p>
                    <div className="flex gap-2 pt-2">
                      <Button
                        onClick={() => {
                          setSelectedBlog(blog)
                          setIsEditing(true)
                        }}
                        variant="outline"
                        className="flex-1 border-gray-700 hover:bg-gray-700 text-gray-300 hover:text-white"
                      >
                        Edit
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            variant="outline"
                            className="flex-1 border-gray-700 hover:bg-red-900/30 text-red-400 hover:text-red-300"
                          >
                            Delete
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent className="sm:max-w-md bg-gray-900 border-gray-700">
                          <AlertDialogHeader>
                            <AlertDialogTitle className="text-xl text-white">Delete Blog Post</AlertDialogTitle>
                            <AlertDialogDescription className="text-base text-gray-400">
                              Are you sure you want to delete "{blog.title}"? This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter className="gap-2 sm:gap-0">
                            <AlertDialogCancel className="bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700 hover:text-white">
                              Cancel
                            </AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDelete(blog._id)}
                              className="bg-red-900 hover:bg-red-800 text-white"
                            >
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                </motion.div>
              ))}
        </div>

        {blogs.length === 0 && !isLoading && (
          <div className="text-center py-16 border border-dashed border-gray-700 rounded-lg bg-gray-800/50">
            <div className="w-20 h-20 rounded-full bg-gray-800 mx-auto flex items-center justify-center mb-4">
              <FileText className="w-8 h-8 text-[#c3ea00]" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-white">No blogs yet</h3>
            <p className="text-gray-400 mb-6">Create your first blog post to get started</p>
            <Button
              onClick={() => setIsAddBlogOpen(true)}
              size="lg"
              className="gap-2 bg-[#c3ea00] text-gray-900 hover:bg-[#b3d800]"
            >
              <PlusCircle className="w-4 h-4" />
              Create First Blog
            </Button>
          </div>
        )}
      </div>

      {/* Edit Dialog */}
      {selectedBlog && (
        <Dialog
          open={isEditing}
          onOpenChange={(open) => {
            if (!open) {
              setSelectedBlog(null)
              setIsEditing(false)
              setImagePrompt("")
            }
          }}
        >
          <DialogContent className="max-w-4xl max-h-[85vh] overflow-y-auto bg-gray-900 border-gray-700">
            <DialogHeader>
              <DialogTitle className="text-2xl font-semibold text-white">Edit Blog</DialogTitle>
            </DialogHeader>
            <div className="space-y-6 p-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                  <FileText className="h-4 w-4 text-[#c3ea00]" /> Title
                </label>
                <Input
                  value={selectedBlog.title}
                  onChange={(e) =>
                    setSelectedBlog({
                      ...selectedBlog,
                      title: e.target.value,
                    })
                  }
                  disabled={isLoading}
                  className="text-lg bg-gray-800 border-gray-700"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                  <FileText className="h-4 w-4 text-[#c3ea00]" /> Content
                </label>
                <Textarea
                  value={selectedBlog.content}
                  onChange={(e) =>
                    setSelectedBlog({
                      ...selectedBlog,
                      content: e.target.value,
                    })
                  }
                  className="min-h-[300px] resize-none font-mono text-sm leading-relaxed bg-gray-800 border-gray-700"
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-4">
                <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                  <ImageIcon className="h-4 w-4 text-[#c3ea00]" /> Thumbnail
                </label>
                <div className="relative aspect-video rounded-lg overflow-hidden bg-gray-800 mb-4 border border-gray-700">
                  <img
                    src={selectedBlog.thumbnail || "/placeholder.svg"}
                    alt={selectedBlog.title}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="space-y-3">
                  <div className="flex gap-2">
                    <Input
                      value={imagePrompt}
                      onChange={(e) => setImagePrompt(e.target.value)}
                      placeholder="Enter image generation prompt..."
                      disabled={isLoading}
                      className="bg-gray-800 border-gray-700"
                    />
                    <Button
                      onClick={handleGenerateImage}
                      disabled={isLoading || !imagePrompt.trim()}
                      variant="outline"
                      className="whitespace-nowrap border-gray-700 hover:bg-gray-800"
                    >
                      {isLoading ? (
                        <Loader2 className="h-4 w-4 animate-spin mr-2" />
                      ) : (
                        <RefreshCw className="h-4 w-4 mr-2" />
                      )}
                      Generate Image
                    </Button>
                  </div>
                  <Button
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isLoading}
                    variant="outline"
                    className="w-full border-gray-700 hover:bg-gray-800"
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Image
                  </Button>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-6 border-t border-gray-700">
                <Button
                  onClick={() => {
                    setSelectedBlog(null)
                    setIsEditing(false)
                    setImagePrompt("")
                  }}
                  variant="outline"
                  disabled={isLoading}
                  className="border-gray-700 hover:bg-gray-800 text-gray-300"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleEdit}
                  disabled={isLoading}
                  className="bg-[#c3ea00] text-gray-900 hover:bg-[#b3d800]"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    "Save Changes"
                  )}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      <input type="file" ref={fileInputRef} onChange={handleImageUpload} accept="image/*" className="hidden" />

      {/* Global Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-lg p-6 flex flex-col items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#c3ea00] mb-4"></div>
            <p className="text-white">Loading...</p>
          </div>
        </div>
      )}
    </div>
  )
}
