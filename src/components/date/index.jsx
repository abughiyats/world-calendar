import { useContext, useEffect, useState } from 'react'
import { AppContext } from "../../context/AppContext"

export default function Days() {
  const {date} = useContext(AppContext)
  const [publicHoliday, setPublicHoliday] = useState([])
  const monthlyHoliday = []

  useEffect(() => {
    (async (country) => {
    var GEOCODING = `https://www.googleapis.com/calendar/v3/calendars/en.${country}%23holiday%40group.v.calendar.google.com/events?key=AIzaSyDaXPy-BCusl8r3QIexjPOUYmBNIfe4t8o`;

    await fetch(GEOCODING)
      .then(res => res.json())
      .then(res => {
        const data = res.items
        const result = data.filter( day => day.description === "Public holiday" && day.start.date.includes(date.year))
        setPublicHoliday(result)
      })
  })('indonesian')
  }, [])

  const generateDate = (date) => {
    const currentMonth = new Date(date.year, date.month, 0)
    const lengthOfDate = new Date(date.year, date.month+1, 0).getDate()
    const indexOfDay = currentMonth.getDay()
    const row = []
    let weeks = 6

    for (let i = 0; i <= indexOfDay; i++) {
      indexOfDay === weeks ? row.push("") : row.push(<div className="p-4 m-2 "></div>)
    }

    weeks = (weeks - indexOfDay) + 1
    let multiple7 = 0
    for (let j = 1; j <= lengthOfDate; j++) {
      let today = new Date(date.year, date.month, j+1).toISOString().substr(0, 10)
      const holiday = publicHoliday.filter(day => day.start.date === today)

      if (holiday.length > 0) {
        monthlyHoliday.push(holiday[0])
      }

      if (weeks === 7) {
        weeks = 0
      }
      if(j % 7 === 0){
        multiple7 = j
      }
      row.push(<div className={ `${holiday.length > 0 &&  j ==  holiday[0].start.date.substr(8, 10) || j === weeks || j === weeks + multiple7 ? "bg-red-400" : "border-gray-400"} border-2 hover:bg-blue-100 p-4 m-2 rounded-md` }>{j}</div>)
    }
    return row
  }


  return (
    <div>
      <div className="grid grid-cols-7 text-center p-4">
        { generateDate(date) }
      </div>
      <div className="px-8">
        { monthlyHoliday.length > 0 && monthlyHoliday.map((day, i) => ( <h1 key={i}>{`${day.start.date.substr(8, 10)} ${day.summary}`} </h1> )) }
      </div>
    </div>
  )
}