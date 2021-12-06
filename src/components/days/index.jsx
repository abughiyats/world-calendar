const DAYS = [ "sunday", "monday", "thursday", "wednesday", "tuesday", "friday", "saturday" ]

export default function Days() {
  return (
    <div>
      <ul className="flex justify-around bg-gray-200 p-4">
        { DAYS.length && DAYS.map(( day, i ) => (<li key={i} >{ day.toUpperCase().substring(0, 3) }</li>) ) }
      </ul>
    </div>
  )
}