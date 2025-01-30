export function PriceRange() {
    return (
      <div className="bg-gray-800 p-4 rounded-xl">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-medium">Price Range</h3>
          <div className="w-6 h-6 bg-gray-700 rounded-full flex items-center justify-center">
            <span className="text-white text-xs">$</span>
          </div>
        </div>
        <div className="space-y-2">
          <div className="text-lg font-semibold">$1,581 - $3,162</div>
          <div className="text-sm text-gray-400">One week trip</div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div className="bg-green-500 h-full w-3/4 rounded-full" />
          </div>
        </div>
      </div>
    )
  }
  
  