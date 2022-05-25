import React, {useEffect,useState} from 'react'
import { apiKey } from '../environment'

const Weather = () => {
    let [error , setError] = useState(false)
    let [currentWeather, setCurrentWeather] = useState({
        temp: '1',
		feels_like: '-1',
		description: 'snowing',
		icon: '50d',
		name: 'Tala, MX',
		lat: 20.67,
		lon: -103.7
    })

    let [url, setUrl] = useState(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`)
    
    useEffect(()=>{
        const getWeather = async() =>{
            try {
                let response = await fetch(url);
                const data = await response.json();
                let {icon,description} = data.weather[0]
                let {temp, feels_like} = data.main

                setCurrentWeather({
                    temp,
                    feels_like,
                    description,
                    icon,
                    name: `${data.name} , ${data.sys.country}`,
                    lat: data.coord.lon,
                    lon: data.coord.lat
                })
            }
            catch (e){
                setError(true)
            }
        }
        getWeather()
    }, [url])


  return (
    <div>
        <currentWeather/>
    </div>
  )
}

export default Weather