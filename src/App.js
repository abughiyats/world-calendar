import React from "react"
import Months from "./components/months"
import Days from './components/days'
import Date from './components/date'
import Years from "./components/years"
import ContextProvider from "./context/AppContext"

export default function App() {
  return (
    <ContextProvider>
      <div className="container mx-auto py-5">
        <h1 className="text-center md:text-3xl font-semibold">World Calendar</h1>
        <div className="flex justify-between mx-5">
          <Months />
          <Years />  
        </div>
        <div className="mx-auto" ><Days /></div>
        <div className="mx-auto" ><Date /></div>
    </div>
    </ContextProvider>
  )
}
