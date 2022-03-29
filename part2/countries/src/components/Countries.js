import { useState, useEffect } from "react"
import axios from "axios"

const CountryFilter = ({ newFilter, handleFilter }) => {
  return(
    <>
      Find countries: <input value={newFilter} onChange={handleFilter}/>
    </>
  )
}

const CapitalWeather = ({ country, api_key}) => {
  const [weather, setWeather] = useState()

  const weatherHook = () => {
    const lat = country.capitalInfo.latlng[0]
    const long = country.capitalInfo.latlng[1]
    
    axios
      .get(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&appid=${api_key}&units=metric`)
      .then((response) => {
        setWeather(response.data)
      })
  } 

  useEffect(weatherHook, [])

  // if weatherHook has not fulfilled promise (= gotten data from API)
  if (!weather) return null

  else return (
    <>
      <h4>Weather in {country.capital}</h4>
      <p>Temperature is {weather.current.temp} degrees Celsius.</p>
      <p><img src={`http://openweathermap.org/img/wn/${weather.current.weather[0].icon}@2x.png`} alt="weather icon"></img></p>
      <p>Wind speed is {weather.current.wind_speed} m/s </p>
    </>
  )
}

const CountryList = ({ countries, handleShowCountry }) => {
  return (
    countries.map((country) => {
      return (
        <li key={country.name.official}>
          {country.name.common} <button value={country.name.common} onClick={handleShowCountry}>Show</button>
        </li>
      )
    })
  )
}

const SingleCountryData = ({ country }) => {
  const listLanguages = (country) => {
    // first get languages as array (Object.keys), then map that array into a list of languages
    const keys = Object.keys(country.languages)
    return keys.map(key => <li key={key}>{country.languages[key]}</li>)
  }

  return (
    <>
      <h3>{country.name.common}</h3>
        <p>Capital: {country.capital}<br/>
          Area: {country.area}</p>
      <h4>Languages</h4>
        <ul>{listLanguages(country)}</ul>
      <p><img src={country.flags.png} alt="Country flag" width="200px"></img></p>
    </>
  )
}

const Countries = ({ countries, handleShowCountry, filter, api_key }) =>  {
  if (filter === "") 
    return null

  else if (countries.length > 10)
    return <>Too many matches, please be more specific.</>

  else if (countries.length > 1 && countries.length <= 10)
    return <ul><CountryList countries={countries} handleShowCountry={handleShowCountry} /></ul>

  else if (countries.length === 1) {
    return (
      countries.map(country => {
        return (
          <>
            <SingleCountryData country={country} />
            <CapitalWeather country={country} api_key={api_key} />
          </>
        )
      })
    )
  } 
  
  else return <>No countries found, please change your search term.</>
}

export { CountryFilter, Countries }