"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import { PlusCircle, Edit, Trash } from "lucide-react"

interface Price {
  _id: string
  name: string
  price: string
  description: string
  features: string[]
  bestFor: string
  serviceType: string
}

const serviceTypes = [
  { id: "webapp", name: "Web & App Development" },
  { id: "automation", name: "Marketing Automation" },
  { id: "branding", name: "Branding & Design" },
  { id: "marketing", name: "Digital Marketing" },
]

export default function PricingManagement() {
  const router = useRouter()
  const { toast } = useToast()
  const [prices, setPrices] = useState<Price[]>([])
  const [loading, setLoading] = useState(false)
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("webapp")
  const [newPrice, setNewPrice] = useState({
    name: "",
    price: "",
    description: "",
    features: [""],
    bestFor: "",
    serviceType: "webapp",
  })
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [selectedPrice, setSelectedPrice] = useState<Price | null>(null)

  const handleEdit = (price: Price) => {
    setSelectedPrice(price)
    setNewPrice({
      name: price.name,
      price: price.price,
      description: price.description,
      features: price.features,
      bestFor: price.bestFor,
      serviceType: price.serviceType,
    })
    setIsEditOpen(true)
  }

  const handleUpdate = async () => {
    try {
      setLoading(true)
      const response = await fetch(`/api/prices/${selectedPrice?._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(newPrice),
      })

      const data = await response.json()
      if (data.success) {
        toast({
          title: "Success",
          description: "Price plan updated successfully",
        })
        setIsEditOpen(false)
        fetchPrices()
        setNewPrice({
          name: "",
          price: "",
          description: "",
          features: [""],
          bestFor: "",
          serviceType: activeTab,
        })
      } else {
        throw new Error(data.error || "Failed to update price plan")
      }
    } catch (error) {
      console.error("Error:", error)
      toast({
        title: "Error",
        description: "Failed to update price plan",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this price plan?")) return

    try {
      setLoading(true)
      const response = await fetch(`/api/prices/${id}`, {
        method: "DELETE",
        credentials: "include",
      })

      const data = await response.json()
      if (data.success) {
        toast({
          title: "Success",
          description: "Price plan deleted successfully",
        })
        fetchPrices()
      } else {
        throw new Error(data.error || "Failed to delete price plan")
      }
    } catch (error) {
      console.error("Error:", error)
      toast({
        title: "Error",
        description: "Failed to delete price plan",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPrices()
  }, [])

  const fetchPrices = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/prices", {
        credentials: "include",
      })
      const data = await response.json()
      if (data.success) {
        setPrices(data.prices)
      } else if (data.error === "Unauthorized") {
        router.push("/admin/login")
      }
    } catch (error) {
      console.error("Error fetching prices:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleFeatureChange = (index: number, value: string) => {
    const updatedFeatures = [...newPrice.features]
    updatedFeatures[index] = value
    setNewPrice({ ...newPrice, features: updatedFeatures })
  }

  const addFeature = () => {
    setNewPrice({ ...newPrice, features: [...newPrice.features, ""] })
  }

  const removeFeature = (index: number) => {
    const updatedFeatures = newPrice.features.filter((_, i) => i !== index)
    setNewPrice({ ...newPrice, features: updatedFeatures })
  }

  const handleSubmit = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/prices", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(newPrice),
      })

      const data = await response.json()
      if (data.success) {
        toast({
          title: "Success",
          description: "Price plan created successfully",
        })
        setIsCreateOpen(false)
        fetchPrices()
        setNewPrice({
          name: "",
          price: "",
          description: "",
          features: [""],
          bestFor: "",
          serviceType: activeTab,
        })
      } else {
        throw new Error(data.error || "Failed to create price plan")
      }
    } catch (error) {
      console.error("Error:", error)
      toast({
        title: "Error",
        description: "Failed to create price plan",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const filteredPrices = prices.filter((price) => price.serviceType === activeTab)

  // Update the card component to include edit and delete buttons
  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Pricing Management</h1>
          <p className="text-gray-400 mt-1">Manage service-specific pricing plans</p>
        </div>
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2 bg-[#c3ea00] text-gray-900 hover:bg-[#b3d800]">
              <PlusCircle className="w-4 h-4" />
              New Plan
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-gray-900 border-gray-700">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold text-white">Create New Price Plan</DialogTitle>
            </DialogHeader>
            <div className="space-y-5 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Plan Name</label>
                  <Input
                    value={newPrice.name}
                    onChange={(e) => setNewPrice({ ...newPrice, name: e.target.value })}
                    placeholder="e.g., Basic, Growth, Elite"
                    className="bg-gray-800 border-gray-700"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Price</label>
                  <Input
                    value={newPrice.price}
                    onChange={(e) => setNewPrice({ ...newPrice, price: e.target.value })}
                    placeholder="e.g., ₹1,99,999"
                    className="bg-gray-800 border-gray-700"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Service Type</label>
                <Select
                  value={newPrice.serviceType}
                  onValueChange={(value) => setNewPrice({ ...newPrice, serviceType: value })}
                >
                  <SelectTrigger className="bg-gray-800 border-gray-700">
                    <SelectValue placeholder="Select service type" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700">
                    {serviceTypes.map((type) => (
                      <SelectItem key={type.id} value={type.id}>
                        {type.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Description</label>
                <Textarea
                  value={newPrice.description}
                  onChange={(e) => setNewPrice({ ...newPrice, description: e.target.value })}
                  placeholder="Enter plan description"
                  className="bg-gray-800 border-gray-700 min-h-[80px]"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Best For</label>
                <Input
                  value={newPrice.bestFor}
                  onChange={(e) => setNewPrice({ ...newPrice, bestFor: e.target.value })}
                  placeholder="e.g., Small Businesses, Growth-Focused Brands"
                  className="bg-gray-800 border-gray-700"
                />
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-medium">Features</label>
                  <Button onClick={addFeature} variant="outline" size="sm" className="h-8 px-2 text-xs">
                    <PlusCircle className="w-3 h-3 mr-1" /> Add Feature
                  </Button>
                </div>
                <div className="space-y-2 max-h-[200px] overflow-y-auto pr-1">
                  {newPrice.features.map((feature, index) => (
                    <div key={index} className="flex gap-2 items-center">
                      <div className="rounded-full bg-gray-700 w-6 h-6 flex items-center justify-center flex-shrink-0">
                        {index + 1}
                      </div>
                      <Input
                        value={feature}
                        onChange={(e) => handleFeatureChange(index, e.target.value)}
                        placeholder="Enter feature"
                        className="bg-gray-800 border-gray-700"
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeFeature(index)}
                        disabled={newPrice.features.length === 1}
                        className="h-8 w-8 text-gray-400 hover:text-white hover:bg-gray-700"
                      >
                        <Trash className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <Button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full bg-[#c3ea00] text-gray-900 hover:bg-[#b3d800] font-medium"
            >
              {loading ? "Creating..." : "Create Plan"}
            </Button>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
        <TabsList className="mb-6 bg-gray-800 p-1">
          {serviceTypes.map((type) => (
            <TabsTrigger
              key={type.id}
              value={type.id}
              className="data-[state=active]:bg-gray-700 data-[state=active]:text-white px-4 py-2"
            >
              {type.name}
            </TabsTrigger>
          ))}
        </TabsList>

        {serviceTypes.map((type) => (
          <TabsContent key={type.id} value={type.id}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPrices.map((price) => (
                <Card
                  key={price._id}
                  className="bg-gray-800 border-gray-700 overflow-hidden transition-all hover:shadow-lg hover:border-gray-600"
                >
                  <CardHeader className="border-b border-gray-700 pb-4">
                    <CardTitle className="flex justify-between items-center">
                      <span className="text-xl">{price.name}</span>
                      <span className="text-[#c3ea00] font-bold text-xl">{price.price}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6 space-y-4">
                    <p className="text-gray-400">{price.description}</p>
                    <div className="space-y-2">
                      <h4 className="font-semibold text-white">Features:</h4>
                      <ul className="space-y-2">
                        {price.features.map((feature, index) => (
                          <li key={index} className="flex items-start gap-2 text-gray-300">
                            <div className="rounded-full bg-[#c3ea00] w-1.5 h-1.5 mt-2 flex-shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-1">Best For:</h4>
                      <p className="text-gray-300">{price.bestFor}</p>
                    </div>
                    <div className="flex justify-end gap-2 mt-4 pt-2 border-t border-gray-700">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(price)}
                        className="flex items-center gap-1.5 hover:bg-gray-700"
                      >
                        <Edit className="w-3.5 h-3.5" />
                        Edit
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDelete(price._id)}
                        className="flex items-center gap-1.5"
                      >
                        <Trash className="w-3.5 h-3.5" />
                        Delete
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            {filteredPrices.length === 0 && (
              <div className="flex flex-col items-center justify-center py-12 px-4 border border-dashed border-gray-700 rounded-lg bg-gray-800/50">
                <div className="bg-gray-700 rounded-full p-3 mb-4">
                  <PlusCircle className="w-6 h-6 text-[#c3ea00]" />
                </div>
                <h3 className="text-lg font-medium mb-1">No pricing plans yet</h3>
                <p className="text-gray-400 text-center mb-4">
                  Create your first pricing plan for {serviceTypes.find((t) => t.id === type.id)?.name}
                </p>
                <Button
                  onClick={() => {
                    setNewPrice({ ...newPrice, serviceType: type.id })
                    setIsCreateOpen(true)
                  }}
                  className="bg-[#c3ea00] text-gray-900 hover:bg-[#b3d800]"
                >
                  Create Plan
                </Button>
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>

      {/* Add Edit Dialog */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-gray-900 border-gray-700">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-white">Edit Price Plan</DialogTitle>
          </DialogHeader>
          <div className="space-y-5 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Plan Name</label>
                <Input
                  value={newPrice.name}
                  onChange={(e) => setNewPrice({ ...newPrice, name: e.target.value })}
                  placeholder="e.g., Basic, Growth, Elite"
                  className="bg-gray-800 border-gray-700"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Price</label>
                <Input
                  value={newPrice.price}
                  onChange={(e) => setNewPrice({ ...newPrice, price: e.target.value })}
                  placeholder="e.g., ₹1,99,999"
                  className="bg-gray-800 border-gray-700"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Service Type</label>
              <Select
                value={newPrice.serviceType}
                onValueChange={(value) => setNewPrice({ ...newPrice, serviceType: value })}
              >
                <SelectTrigger className="bg-gray-800 border-gray-700">
                  <SelectValue placeholder="Select service type" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700">
                  {serviceTypes.map((type) => (
                    <SelectItem key={type.id} value={type.id}>
                      {type.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Description</label>
              <Textarea
                value={newPrice.description}
                onChange={(e) => setNewPrice({ ...newPrice, description: e.target.value })}
                placeholder="Enter plan description"
                className="bg-gray-800 border-gray-700 min-h-[80px]"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Best For</label>
              <Input
                value={newPrice.bestFor}
                onChange={(e) => setNewPrice({ ...newPrice, bestFor: e.target.value })}
                placeholder="e.g., Small Businesses, Growth-Focused Brands"
                className="bg-gray-800 border-gray-700"
              />
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <label className="text-sm font-medium">Features</label>
                <Button onClick={addFeature} variant="outline" size="sm" className="h-8 px-2 text-xs">
                  <PlusCircle className="w-3 h-3 mr-1" /> Add Feature
                </Button>
              </div>
              <div className="space-y-2 max-h-[200px] overflow-y-auto pr-1">
                {newPrice.features.map((feature, index) => (
                  <div key={index} className="flex gap-2 items-center">
                    <div className="rounded-full bg-gray-700 w-6 h-6 flex items-center justify-center flex-shrink-0">
                      {index + 1}
                    </div>
                    <Input
                      value={feature}
                      onChange={(e) => handleFeatureChange(index, e.target.value)}
                      placeholder="Enter feature"
                      className="bg-gray-800 border-gray-700"
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeFeature(index)}
                      disabled={newPrice.features.length === 1}
                      className="h-8 w-8 text-gray-400 hover:text-white hover:bg-gray-700"
                    >
                      <Trash className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <Button
            onClick={handleUpdate}
            disabled={loading}
            className="w-full bg-[#c3ea00] text-gray-900 hover:bg-[#b3d800] font-medium"
          >
            {loading ? "Updating..." : "Update Plan"}
          </Button>
        </DialogContent>
      </Dialog>
      {loading && (
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
