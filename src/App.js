import Months from "./components/months"
import Days from './components/days'
import Date from './components/date'

export default function App() {
  return (
    <div className="container mx-auto">
      <div><Months /></div>
      <div className="mx-auto" ><Days /></div>
      <div className="mx-auto" ><Date /></div>
    </div>
  )
}
