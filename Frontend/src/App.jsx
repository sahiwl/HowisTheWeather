import { useEffect, useState } from 'react'
import './App.css'

import WeatherApp from './components/WeatherApp'
import axios from 'axios'
import Loading from './components/Loading'
import Navbar from './components/Navbar'

function App() {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState(null)
  
  const be = import.meta.env.VITE_BE_URL
  useEffect(()=>{
    const fetch = async ()=>{
      try {
        const res = await axios.get(`${be}`)
        setData(res)
      } catch (error) {
        console.error("Error fetching data:", error);
      }finally{
        setLoading(false)
      }
    }
    fetch()
  }, [])

  if(loading) return <Loading/>

  return (
    <>
      <div className="bg-gradient-to-r from-teal-950 via-slate-700 to-slate-950 h-screen w-screen flex justify-center items-center font-Quicksand">
        <Navbar/>
        <WeatherApp />
      </div>
    </>
  )
}

export default App
