import React, { useState, useEffect } from "react";
import axios from "axios";

const CountryInfo = ({ country }) => {
    const [weatherInfo, setWeatherInfo] = useState([])
    const ACCESS_KEY = '283ceebfe4e85c65eff91264b4e0411f';


    useEffect(() => {
        axios
            .get(`https://api.openweathermap.org/data/2.5/weather?q=${country.capital}&units=metric&appid=${ACCESS_KEY}`)
            .then(response => {
                setWeatherInfo(response.data)
                console.log('response data: ', setWeatherInfo);
                const temperature = response.data.main.temp;
                const wind = response.data.wind.speed;
                const icon = response.data.weather[0].icon;
                console.log(temperature);
                const weatherObject = {
                    temperature: temperature,
                    wind: wind,
                    icon: icon
                }
                setWeatherInfo(weatherObject)
            })
    })
    return (
        <div>
            <h2>{country.name.common}</h2>
            <p>Capital city: {country.capital}</p>
            <p>Population: {country.population}</p>
            <h3>Languages: </h3>
            <ul>
                {Object.keys(country.languages).map(lang =>
                    <li key={lang}>{country.languages[lang]}</li>
                )}
            </ul>
            <h3>Flag:</h3>
            <img src={country.flags.png} width={"200"} alt={country.name.common}/>
            <h3>Weather in {country.capital}</h3>
            <p>Temperature:{weatherInfo.temperature} Celcius</p>
            <img alt="weather-icon" src={`http://openweathermap.org/img/wn/${weatherInfo.icon}@2x.png`}/>
            <div>
                Wind {weatherInfo.wind} m/s
            </div>
        </div>
    )
}
export default CountryInfo;
