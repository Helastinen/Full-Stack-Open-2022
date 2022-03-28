import { useState, useEffect } from "react"
import axios from "axios"
import { CountryFilter, Countries } from "./components/Countries"

const App = () =>  {
  const [newFilter, setNewFilter] = useState("")
  const [countries, setCountries] = useState([])
  
  useEffect(() => {
    axios
      .get("https://restcountries.com/v3.1/all")
      .then((response) => {
        setCountries(response.data)
        //console.log(response.data)
      })
  }, [])

  const handleFilter = (e) => {
    setNewFilter(e.target.value)
  }
  
  const filteredCountries = newFilter
  ? countries.filter(country => country.name.common.toLowerCase().includes(newFilter.toLowerCase()))
  : countries

  return (
    <div>
        <CountryFilter newFilter={newFilter} handleFilter={handleFilter} />
      <ul>
        <Countries countries={filteredCountries} />
      </ul>
    </div>
  )
}

export default App;
