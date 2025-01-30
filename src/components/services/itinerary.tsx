export function Itinerary() {
    const itinerary = [
      { day: 1, activities: ["Arrive in Santorini", "Check-in to hotel", "Explore Fira town", "Watch sunset in Oia"] },
      { day: 2, activities: ["Visit Red Beach", "Explore Ancient Akrotiri", "Wine tasting tour"] },
      { day: 3, activities: ["Boat tour to volcano", "Swim in hot springs", "Visit Thirassia island"] },
      { day: 4, activities: ["Hike from Fira to Oia", "Relax at Perissa Beach", "Farewell dinner in Oia"] },
    ]
  
    return (
      <div className="bg-gray-800 p-4 rounded-xl">
        <h2 className="text-xl font-bold mb-4">Santorini Itinerary</h2>
        <div className="space-y-4">
          {itinerary.map((day, index) => (
            <div key={index} className="p-3 bg-gray-700 rounded-lg">
              <h3 className="font-semibold mb-2">Day {day.day}</h3>
              <ul className="list-disc list-inside">
                {day.activities.map((activity, actIndex) => (
                  <li key={actIndex}>{activity}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    )
  }
  
  