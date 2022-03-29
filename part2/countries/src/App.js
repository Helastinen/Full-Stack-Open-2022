import { useState, useEffect } from "react"
import axios from "axios"
import { CountryFilter, Countries } from "./components/Countries"

const App = () =>  {
  const [filter, setFilter] = useState("")
  const [countries, setCountries] = useState([])
  const api_key = process.env.REACT_APP_API_KEY
  
  useEffect(() => {
    axios
      .get("https://restcountries.com/v3.1/all")
      .then((response) => {
        setCountries(response.data)
        console.log(response.data)
      })
  }, [])

  const handleFilter = (e) => setFilter(e.target.value)
  
  const filteredCountries = filter
  ? countries.filter(country => country.name.common.toLowerCase().includes(filter.toLowerCase()))
  : countries

  return (
    <div>
        <div><CountryFilter newFilter={filter} handleFilter={handleFilter} /></div>
        <div><Countries countries={filteredCountries} handleShowCountry={handleFilter} filter={filter} api_key= {api_key} /></div>
    </div>
  )
}

export default App;
