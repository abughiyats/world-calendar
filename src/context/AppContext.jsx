import { createContext, useState } from "react";

export const AppContext = createContext()

const initDate = {
  year : new Date().getFullYear(),
  month : new Date().getMonth(),
  monthName : new Date().toLocaleString('default', { month: 'long' }),
  date : new Date().getDate(),
  day : new Date().getDay(),
  weekday : new Date().toLocaleString('default', { weekday: 'long' })
}

export default function ContextProvider(props) {
  const [date, setDate] = useState(initDate)
  const value = { date, setDate }
  return(
    <AppContext.Provider value={value}>
      { props.children }
    </AppContext.Provider>
  )
}