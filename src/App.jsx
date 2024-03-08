import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import WeatherApp from './components/WeatherApp'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="bg-gradient-to-r from-slate-200 to-blue-500 h-screen w-screen flex justify-center items-center">
        <WeatherApp />
      </div>
    </>
  )
}

export default App
