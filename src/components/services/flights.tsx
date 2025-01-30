export function Flights() {
    const flights = [
      { airline: "Aegean Airlines", departure: "10:00 AM", arrival: "11:30 AM", price: "$150" },
      { airline: "Ryanair", departure: "2:00 PM", arrival: "3:30 PM", price: "$120" },
      { airline: "EasyJet", departure: "6:00 PM", arrival: "7:30 PM", price: "$100" },
    ]
  
    return (
      <div className="bg-gray-800 p-4 rounded-xl">
        <h2 className="text-xl font-bold mb-4">Flights to Santorini</h2>
        <div className="space-y-4">
          {flights.map((flight, index) => (
            <div key={index} className="flex justify-between items-center p-3 bg-gray-700 rounded-lg">
              <div>
                <h3 className="font-semibold">{flight.airline}</h3>
                <p className="text-sm text-gray-300">Departure: {flight.departure}</p>
                <p className="text-sm text-gray-300">Arrival: {flight.arrival}</p>
              </div>
              <span className="text-lg font-semibold">{flight.price}</span>
            </div>
          ))}
        </div>
      </div>
    )
  }
  
  