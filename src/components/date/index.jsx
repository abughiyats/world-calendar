import { useContext, useEffect, useState } from 'react'
import { AppContext } from "../../context/AppContext"

export default function Days() {

  const {date} = useContext(AppContext)
  const [publicHoliday, setPublicHoliday] = useState([])
  const [country, setCountry] = useState({
    isLoading : true,
    result : {}
  })
  const monthlyHoliday = []
  const apiKey = "tjJX9asUmbVq2M/LLN2Mug==EYYIf9URqp87vadR"
  const holidaysURL = "https://api.api-ninjas.com/v1/holidays?"

  useEffect(() => {
    (function() {
      const apiGeonames = `http://ip-api.com/json/`

      fetch(apiGeonames, {
        method: 'GET',
      })
      .then(res => res.json())
      .then(res => {
        const data = res
        setCountry({
          ...country,
          isLoading : false,
          result : data
        })
      })
    })()
  }, [])

  useEffect(() => {
    (async (url, national, year, apiKey) => {
      if (national.isLoading === false) {
        const countryCode = national.result.countryCode
        try {
          const response = await fetch(`${url}country=${countryCode}&year=${year}&type=public_holiday`, {
            headers: {
              'X-Api-Key': apiKey
            }
          })
          const toJSON = await response.json()
          setPublicHoliday(toJSON)
        } catch (error) {
          console.error(error);
        }
      }
    })(holidaysURL, country, date.year, apiKey)
  }, [date, country.result.countryCode])
  
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
      const holiday = publicHoliday.filter(day => day.date === today)

      if (holiday.length > 0) {
        monthlyHoliday.push(holiday[0])
      }

      if (weeks === 7) {
        weeks = 0
      }
      if(j % 7 === 0){
        multiple7 = j
      }
      row.push(<div className={ `${(holiday.length > 0 &&  j ===  parseInt(holiday[0].date.substr(8, 10))) || j === weeks || j === weeks + multiple7 ? "bg-red-400 text-white" : "border-gray-400"} border-2 hover:bg-blue-100 md:p-3 m-1 rounded-md` }>{j}</div>)
    }
    return row
  }


  return (
    <div>
      <div className="grid grid-cols-7 text-center px-4 pb-4">
        { generateDate(date) }
      </div>
      { monthlyHoliday.length > 0 ? (<h1 className="px-6 mb-4 md:text-xl sm:text-base">Holidays</h1>) : "" }
      <div className="px-6 grid md:grid-cols-2 sm:grid-cols-1 gap-4">
        { monthlyHoliday.length > 0 && monthlyHoliday.map((day, i) => ( <h1 key={i} className="mb-2 md:text-base sm: text-sm text-red-600"> <span className="bg-red-400 p-2 pl-3 pb-3 my-2 mr-2 rounded-md text-white">{day.date.substr(8, 10)} </span>{day.name} </h1> )) }
      </div>
    </div>
  )
}