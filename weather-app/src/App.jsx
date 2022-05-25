import React from 'react'
import './index.css'
import CurrentWeather from './components/CurrentWeather'

function App() {

  return (
    <div className='weather-container h-screen w-full flex justify-center items-center'>
      <CurrentWeather/>
    </div>
  )

}

export default App
