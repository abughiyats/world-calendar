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

  console.log(country);

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
  console.log(publicHoliday);
  
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
      row.push(<div className={ `${(holiday.length > 0 &&  j ===  parseInt(holiday[0].date.substr(8, 10))) || j === weeks || j === weeks + multiple7 ? "bg-red-400" : "border-gray-400"} border-2 hover:bg-blue-100 p-4 m-2 rounded-md` }>{j}</div>)
    }
    return row
  }


  return (
    <div>
      <div className="grid grid-cols-7 text-center p-4">
        { generateDate(date) }
      </div>
      <div className="px-8">
        { monthlyHoliday.length > 0 && monthlyHoliday.map((day, i) => ( <h1 key={i}>{`${day.date.substr(8, 10)} ${day.name}`} </h1> )) }
      </div>
    </div>
  )
}