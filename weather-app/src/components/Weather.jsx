import React, {useEffect,useState} from 'react'
import { apiKey , algoliaApiKey ,appID } from '../environment' 
import CurrentWeather from './CurrentWeather'
import Search from './Search';


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


    const handleonSearchChange = (searchData) => {
        const [lat, lon] = searchData.value.split("")
        const currentWeatherFetch = fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`)
        console.log(searchData);

        Promise.all([currentWeatherFetch])
            .then(async(response)=>{
                const weatherResponse = await response[0].json()

                setCurrentWeather({city: searchData.label, ...weatherResponse})
            })
            .catch((error)=>console.log(error))
    }

  return (
    <div className='weather-container mt-32'>

        <div className='searchbar2'>
            <Search 
                onSearchChange = {handleonSearchChange}
            />
        </div>



        <div className='currentweather mt-16'>
            {currentWeather && <CurrentWeather weather={currentWeather}/>}
        </div>
    </div>
  )
}

export default Weather