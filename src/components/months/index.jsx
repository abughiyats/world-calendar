import { useState } from "react"

const masehi = [ "january", "february", "march", "april", "may", "june", "July" , "august", "september", "october", "november", "december" ]

export default function Months() {
  const thisMonth = new Date().getMonth()
  const initMonth = masehi.filter( (month, i) => {
    return i === thisMonth
  })

  const [selectedMonth, setSelectedMonth] = useState(initMonth[0])
  console.log(selectedMonth)

  const handleSelect = (e) => {
    setSelectedMonth(e.target.value)
  }

  return (
    <div>
      <select value={selectedMonth} onChange={ handleSelect } >
        { masehi.length && masehi.map( (month, key) => <option key={key} value={month}>{month.toUpperCase()}</option> ) }
      </select>
    </div>
  )
}