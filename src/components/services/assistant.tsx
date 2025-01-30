import { Mic, ImageIcon, Send } from "lucide-react"

export function Assistant() {
  return (
    <div className="bg-[#7a9101] p-4 sm:p-6 rounded-xl relative min-h-[300px]">
      <div className="flex items-center space-x-2 mb-4">
        <div className="w-8 h-8 bg-[#c4ea00] rounded-full" />
        <span className="font-medium">Assistant</span>
        <button className="ml-auto">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M1 1L15 15M1 15L15 1" stroke="currentColor" strokeWidth="2" />
          </svg>
        </button>
      </div>
      <div className="mb-4">
        <p className="font-medium mb-1">Ready to dive into</p>
        <p className="font-medium">
          some <span className="underline">hotel options</span> or maybe an <span className="underline">itinerary</span>
          ?
        </p>
      </div>
      <div className="flex space-x-2 mb-4">
        <button className="px-4 py-2 bg-gray-800 rounded-full text-sm">Hotel options</button>
        <button className="px-4 py-2 bg-gray-800 rounded-full text-sm">Itinerary</button>
        <button className="px-4 py-2 bg-gray-800 rounded-full text-sm">Things to do</button>
      </div>
      <div className="absolute bottom-6 left-6 right-6">
        <div className="flex items-center space-x-3">
          <button className="p-2 hover:bg-yellow-800 rounded-full">
            <ImageIcon className="w-5 h-5" />
          </button>
          <button className="p-2 hover:bg-yellow-800 rounded-full">
            <Mic className="w-5 h-5" />
          </button>
          <button className="p-2 bg-[#c4ea00] text-gray-900 rounded-full">
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  )
}

