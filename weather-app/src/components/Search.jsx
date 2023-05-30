import React, {useEffect,useState} from 'react'
import {AsyncPaginate} from 'react-select-async-paginate'
import { GeoAPIUrl , GeoAPIOptions } from '../environment' 


const Search = ({onSearchChange}) => {
    const [search , setSearch] = useState(null)

    const handleChange = (searchData) => {
        setSearch(searchData)
        onSearchChange(searchData)
    }

    const loadOptions = (inputValue) => {
        return fetch (
            `${GeoAPIUrl}/cities?minPopulation=10000&namePrefix=${inputValue}`, GeoAPIOptions
        )
        .then((response)=>response.json())
        .then((response)=> {
            return{
                options: response.data.map((city)=> {
                    return {
                        value: `${city.latitude} ${city.longitude}` ,
                        label: `${city.name} ${city.countryCode}`
                    }
                })
            }
        })

        .catch((error)=>console.log(error))
    }

    return(
        <AsyncPaginate
            placeholder='Search for City'
            debounceTimeout={600}
            value={search}
            onChange={handleChange}
            loadOptions={loadOptions}
        />
    )
}



export default Search
