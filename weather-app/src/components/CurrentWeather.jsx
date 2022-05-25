import React from "react";

function CurrentWeather() {
    return(
        <div className="rounded-2xl border-2		 current-weather bg-black text-white flex items-center justify-between px-8 py-10">
            <div className="flex flex-col md:flex-row items-center gap-10">
                <div>
                    <h1 className="text-6xl font-semibold">33°C</h1>
                    <h3>Feels Like 33°C</h3>
                </div>

                <div>
                    <h3>description</h3>
                    <h3>name</h3>
                </div>

                <div>
                    <p>icon</p>
                </div>
            </div>
        </div>
    )
}

export default CurrentWeather
