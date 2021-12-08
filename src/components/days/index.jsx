const DAYS = [ "Sunday", "Monday", "Thursday", "Wednesday", "Tuesday", "Friday", "Saturday" ]

export default function Days() {
  
  return (
    <div>
      <ul className="grid grid-cols-7 text-center p-4">
        { DAYS.length > 0 && DAYS.map((day, index) => (<li className="border-2 bg-gray-300 p-4 mx-2 rounded-md" key={index} >{day.substring(0, 3).toUpperCase()}</li>) ) }
      </ul>
    </div>
  )
}