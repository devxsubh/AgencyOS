"use client"

import { useState } from "react"
import { MapPin, Plus, X, Command } from "lucide-react"
import Image from "next/image"
import { WeatherWidget } from "./weather-widget"
import { PriceRange } from "./price-range"
import { Assistant } from "./assistant"
import { TravelMap } from "./travel-map"
import { Overview } from "./overview"
import { Hotels } from "./hotels"
import { Itinerary } from "./itinerary"
import { Flights } from "./flights"

export default function Service() {
  const [activeTab, setActiveTab] = useState("overview")
  return (
    <div className="min-h-screen text-gray-100">
      <div className="max-w-7xl mx-auto p-2 sm:p-4">
        {/* Hero Section */}
        <div className="relative rounded-xl overflow-hidden mb-6">
          <Image
            src="https://cdn.dribbble.com/userupload/8240015/file/original-32d0389365bc3e08fc7263628ea34106.jpeg?resize=1504x1128&vertical=center"
            alt="Santorini windmill"
            width={1200}
            height={400}
            className="w-full h-[300px] object-cover opacity-75"
          />
          <div className="absolute top-8 left-1/2 text-white -translate-x-1/2 text-center  w-[90%] sm:w-auto">
            <h1 className="text-3xl sm:text-5xl font-bold mb-2">Santorini</h1>
            <p className="text-xs sm:text-sm opacity-90">
              Santorini is a beautiful city located in the Aegean Sea in Greece. It is known for its stunning views of
              the sea, the white-washed buildings, and the blue-domed churches.
            </p>
          </div>
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-[90%] sm:w-auto">
            <nav className="flex space-x-2 sm:space-x-4 bg-gray-800/50 backdrop-blur-md rounded-full px-2 sm:px-4 py-2 overflow-x-auto">
              <button
                className={`text-white px-2 sm:px-4 py-1 rounded-full whitespace-nowrap ${activeTab === "overview" ? "bg-gray-700" : ""}`}
                onClick={() => setActiveTab("overview")}
              >
                Overview
              </button>
              <button
                className={`text-white px-2 sm:px-4 py-1 rounded-full whitespace-nowrap ${activeTab === "hotels" ? "bg-gray-700" : ""}`}
                onClick={() => setActiveTab("hotels")}
              >
                Hotels
              </button>
              <button
                className={`text-white px-2 sm:px-4 py-1 rounded-full whitespace-nowrap ${activeTab === "itinerary" ? "bg-gray-700" : ""}`}
                onClick={() => setActiveTab("itinerary")}
              >
                Itinerary
              </button>
              <button
                className={`text-white px-2 sm:px-4 py-1 rounded-full whitespace-nowrap ${activeTab === "flights" ? "bg-gray-700" : ""}`}
                onClick={() => setActiveTab("flights")}
              >
                Flights
              </button>
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6">
          <div className="lg:col-span-4">
            <Assistant />
          </div>
          <div className="lg:col-span-8 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <WeatherWidget />
              <PriceRange />
              <div className="bg-gray-800 p-4 rounded-xl">
                <h3 className="font-medium mb-2">Not too busy</h3>
                {/* Add occupancy chart here */}
              </div>
            </div>
            {activeTab === "overview" && <Overview />}
            {activeTab === "hotels" && <Hotels />}
            {activeTab === "itinerary" && <Itinerary />}
            {activeTab === "flights" && <Flights />}
            <TravelMap />
          </div>
        </div>
      </div>
    </div>
  )
}

