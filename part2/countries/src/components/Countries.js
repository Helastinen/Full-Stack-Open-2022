const CountryFilter = ({ newFilter, handleFilter }) => {
  return(
    <>
    Find countries: <input value={newFilter} onChange={handleFilter}/>
    </>
  )
}

const Countries = ({ countries, handleShowCountry }) =>  {

  const listLanguages = (country) => {
    // first get languages as array (Object.keys), then map that array into a list of languages
    const keys = Object.keys(country.languages)
    return keys.map(key => <li key={key}>{country.languages[key]}</li>)
  }

  if (countries.length > 10) {
    return(
      <div>Too many matches, please be more specific.</div>
    )
  } else if (countries.length > 1 && countries.length <= 10) {
    return(
      countries.map(country =>
        <li key={country.name.official}>
          {country.name.common} <button value={country.name.common} onClick={handleShowCountry}>show</button>
        </li>
      )
    )
  } else {
    return(
      countries.map(country => {
        return (
          <>
            <h3>{country.name.common}</h3>
            <p>
              Capital: {country.capital}<br/>
              Area: {country.area}
            </p>
            
            <b>Languages</b>
            <ul>
              {listLanguages(country)}
            </ul>
            <p>
              <img src={country.flags.png} alt="Country flag" width="200px"></img>
            </p>
          </>
        )
      })
    )
  }
}

export { CountryFilter, Countries }