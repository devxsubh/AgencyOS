import { MapPin, Plus, Minus } from "lucide-react"

export function TravelMap() {
  return (
    <div className="bg-gray-800 p-4 rounded-xl">
      <div className="relative h-[200px] sm:h-[300px] bg-gray-700 rounded-lg">
        {/* Map would go here - using placeholder */}
        <div className="absolute bottom-4 right-4 flex flex-col space-y-2">
          <button className="w-8 h-8 bg-gray-800 rounded-full shadow flex items-center justify-center">
            <Plus className="w-4 h-4" />
          </button>
          <button className="w-8 h-8 bg-gray-800 rounded-full shadow flex items-center justify-center">
            <Minus className="w-4 h-4" />
          </button>
        </div>
        <div className="absolute top-4 left-4 flex space-x-2">
          <button className="p-1 bg-gray-800 rounded-full shadow">
            <MapPin className="w-4 h-4 text-green-500" />
          </button>
          <button className="p-1 bg-gray-800 rounded-full shadow">
            <MapPin className="w-4 h-4 text-blue-500" />
          </button>
        </div>
      </div>
    </div>
  )
}

