import React from "react";

function CurrentWeather({weather}) {
    return(
        <div className="rounded-2xl border-2  current-weather bg-black text-white flex items-center justify-between px-8 py-10">
            <div className="flex flex-col md:flex-row items-center gap-10">
                <div>
                    <h1 className="text-6xl font-semibold">{weather.temp} °C</h1>
                    <h3>Feels Like {weather.feels_like} °C</h3>
                </div>

                <div>
                    <h3>{weather.description}</h3>
                    <h3>{weather.name}</h3>
                </div>

                <div>
                    {weather.icon}
                </div>
            </div>
        </div>
    )
}

export default CurrentWeather
