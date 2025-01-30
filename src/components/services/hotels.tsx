export function Hotels() {
    const hotels = [
      { name: "Canaves Oia Suites", rating: 5, price: "$$$$$" },
      { name: "Andronis Luxury Suites", rating: 5, price: "$$$$" },
      { name: "Astra Suites", rating: 4, price: "$$$" },
      { name: "Santorini Palace", rating: 4, price: "$$" },
    ]
  
    return (
      <div className="bg-gray-800 p-4 rounded-xl">
        <h2 className="text-xl font-bold mb-4">Santorini Hotels</h2>
        <div className="space-y-4">
          {hotels.map((hotel, index) => (
            <div key={index} className="flex justify-between items-center p-3 bg-gray-700 rounded-lg">
              <div>
                <h3 className="font-semibold">{hotel.name}</h3>
                <div className="flex items-center">
                  {[...Array(hotel.rating)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 text-yellow-500 fill-current" viewBox="0 0 24 24">
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  ))}
                </div>
              </div>
              <span className="text-gray-300">{hotel.price}</span>
            </div>
          ))}
        </div>
      </div>
    )
  }
  
  