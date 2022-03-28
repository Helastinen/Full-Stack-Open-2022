import { useState, useEffect } from "react"
import axios from "axios"

const CountryFilter = ({ newFilter, handleFilter }) => {
  return(
    <>
      Find countries: <input value={newFilter} onChange={handleFilter}/>
    </>
  )
}

const CapitalWeather = ({ country }) => {
  const [weather, setWeather] = useState()

  const weatherHook = () => {
    const api_key = process.env.REACT_APP_API_KEY
    const lat = country.capitalInfo.latlng[0]
    //console.log(lat);
    const long = country.capitalInfo.latlng[1]
    //console.log(long);
    
    axios
      .get(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&appid=${api_key}&units=metric`)
      .then((response) => {
        setWeather(response.data)
        //console.log("response data:", response.data)
        //console.log("weather data:", weather)
      })
  } 

  useEffect(weatherHook, [])

  // if weatherHook has not fulfilled promise (= gotten data from API)
  if (!weather) return null

  return (
    <>
      <h4>Weather in {country.capital}</h4>
      <p>Temperature is {weather.current.temp} degrees Celsius.</p>
      <p><img src={`http://openweathermap.org/img/wn/${weather.current.weather[0].icon}@2x.png`} alt="weather icon"></img></p>
      <p>Wind speed is {weather.current.wind_speed} m/s </p>
    </>
  )
}

const Countries = ({ countries, handleShowCountry, filter }) =>  {

  const listLanguages = (country) => {
    // first get languages as array (Object.keys), then map that array into a list of languages
    const keys = Object.keys(country.languages)
    return keys.map(key => <li key={key}>{country.languages[key]}</li>)
  }

  if (filter === "") return null
  else if (countries.length > 10) return <div>Too many matches, please be more specific.</div>
  else if (countries.length > 1 && countries.length <= 10) {
    return (
      countries.map(country =>
        <li key={country.name.official}>
          {country.name.common} <button value={country.name.common} onClick={handleShowCountry}>show</button>
        </li>
      )
    )
  } else if (countries.length === 1) {
    return (
      countries.map(country => {
        return (
          <>
            <h3>{country.name.common}</h3>
            <p>Capital: {country.capital}<br/>
              Area: {country.area}</p>
            <h4>Languages</h4>
            <ul>{listLanguages(country)}</ul>
            <p><img src={country.flags.png} alt="Country flag" width="200px"></img></p>
            <CapitalWeather country={country} />
          </>
        )
      })
    )
  } else return <div>No countries found, please change your search term.</div>
}

export { CountryFilter, Countries }