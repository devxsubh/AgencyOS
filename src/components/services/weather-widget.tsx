export function WeatherWidget() {
    return (
      <div className="bg-gray-800 p-4 rounded-xl">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-medium">Weather</h3>
          <div className="w-6 h-6 bg-gray-700 rounded-full flex items-center justify-center">
            <span className="text-white text-xs">+</span>
          </div>
        </div>
        <div className="flex items-center justify-center py-4">
          <div className="text-center">
            <div className="w-16 h-16 bg-yellow-500/20 rounded-full mx-auto mb-2 flex items-center justify-center">
              <span className="text-2xl font-bold text-yellow-500">28°C</span>
            </div>
            <span className="text-sm text-gray-400">For your dates</span>
          </div>
        </div>
      </div>
    )
  }
  
  