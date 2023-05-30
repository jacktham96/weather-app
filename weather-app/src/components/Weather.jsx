import React, {useEffect,useState} from 'react'
import { apiKey , algoliaApiKey ,appID } from '../environment' 
import AlgoliaPlaces from 'algolia-places-react';  //https://www.npmjs.com/package/algolia-places-react
import CurrentWeather from './CurrentWeather'



const Weather = () => {
    let [error , setError] = useState(false)
    let [currentWeather, setCurrentWeather] = useState({
        temp: '1',
		feels_like: '-1',
		description: 'snowing',
		icon: '50d',
		name: 'Taipei, TW',
		lat: 25.03,
		lon: 121.56
    })

    let [url, setUrl] = useState(`https://api.openweathermap.org/data/2.5/weather?lat=${currentWeather.lat}&lon=${currentWeather.lon}&appid=${apiKey}&units=metric`)
    
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
    <div className='weather-container mt-32'>
        <div className='searchbar'>
            <AlgoliaPlaces
                placeholder='Write an address here'
                onChange = {({suggestion}) => 
                setUrl(`https://api.openweathermap.org/data/2.5/weather?lat=${suggestion.latlng.lat}&lon=${suggestion.latlng.lng}&appid=${apiKey}&units=metric`)
                }

                options={{
                    appID,
                    apiKey: algoliaApiKey,
                    aroundLatLngViaIP: false // disable the extra search/boost around the source IP
                  }}

            />
        </div>
        <div className='currentweather mt-16'>
            <CurrentWeather weather={currentWeather}/>
        </div>
    </div>
  )
}

export default Weather