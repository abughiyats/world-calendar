import { useContext } from "react"
import { AppContext } from "../../context/AppContext"

const masehi = [ "january", "february", "march", "april", "may", "june", "July" , "august", "september", "october", "november", "december" ]

export default function Months() {
  const { date, setDate } = useContext(AppContext)

  const selectedMonth = masehi.filter( (month, i) => {
    return i === date.month
  })

  const handleSelect = (e) => {
    setDate({
      ...date,
      month: e.target.selectedIndex,
      monthName : e.target.value.toLowerCase().replace(/\w/, firstLetter => firstLetter.toUpperCase())
    })
  }

  return (
    <div>
      <select value={selectedMonth[0]} onChange={ handleSelect } >
        { masehi.length && masehi.map( (month, key) => <option key={key} value={month}>{month.toUpperCase()}</option> ) }
      </select>
    </div>
  )
}