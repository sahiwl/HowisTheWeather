import { useState } from 'react'
import './App.css'

import WeatherApp from './components/WeatherApp'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="bg-gradient-to-r from-teal-950 via-slate-700 to-slate-950 h-screen w-screen flex justify-center items-center font-Quicksand">
        <WeatherApp />
      </div>
    </>
  )
}

export default App
