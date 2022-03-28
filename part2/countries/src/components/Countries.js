const CountryFilter = ({ newFilter, handleFilter }) => {
  return(
    <>
    Find countries: <input value={newFilter} onChange={handleFilter}/>
    </>
  )
}

const Countries = ({ countries }) =>  {

  const listLanguages = (languages) => {
    const languagesList = []
    for (let language in languages) {
      //console.log("Languages:", languages)
      languagesList.push(<li key="index">{languages[language]}</li>)
    }
    return languagesList
  }

  if (countries.length > 10) {
    return(
      <div>Too many matches, plase specify.</div>
    )
  } else if (countries.length > 1 && countries.length <= 10) {
    return(
      countries.map(country =>
        <li key={country.name.official}>
          {country.name.common}
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
              {listLanguages(country.languages)}
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