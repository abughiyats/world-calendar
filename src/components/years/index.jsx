import { useContext } from "react"
import { AppContext } from "../../context/AppContext"

const startYear = 1995
const endYear = 2030

const generateYears = (start, end) => {
  const option = []
  for (let i = start; i <= end; i++) {
    option.push( <option key={i} value={i} >{i}</option> )
  }
  return option
}

export default function Years() {
  const { date, setDate } = useContext(AppContext)

  const handleYear = (e) => {
    setDate({
      ...date,
      year : parseInt(e.target.value)
    })
  }

  return(
    <div>
      <select value={date.year} onChange={handleYear} >
        { generateYears(startYear, endYear) }
      </select>
    </div>
  )
}