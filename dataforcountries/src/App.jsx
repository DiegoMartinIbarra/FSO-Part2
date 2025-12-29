import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import countryService from './services/countryService'
import WeatherData from './services/weatherService'

function App() {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('') 

  useEffect(() => {
    countryService
      .getAll()
      .then(initialCountries => {
        setCountries(initialCountries)
      })
  }, [])

 
  const filteredCountries = countries.filter(country => 
    country.name.common.toLowerCase().includes(filter.toLowerCase())
  )

  const countryCount = filteredCountries.length

 
  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  if (countryCount > 10) {
    return (
      <>
        find countries <input value={filter} onChange={handleFilterChange}/>
        <p>Too many matches, specify another filter</p>
      </>
    )
  } 
  else if (countryCount === 1) {
    const country = filteredCountries[0]
    return (
      <>
        find countries <input value={filter} onChange={handleFilterChange}/>
        <h2>{country.name.common}</h2>
        <p>Capital: {country.capital}</p>
        <p>Area: {country.area}</p>
        <h3>Languages:</h3>
        <ul>
          {Object.values(country.languages).map(lang => (
            <li key={lang}>{lang}</li>
          ))}
        </ul>
        <img src={country.flags.png} alt={country.flags.alt} />
        <WeatherData city={country.capital} />
      </>
    )
  }
  else {
    return (
      <>
        find countries <input value={filter} onChange={handleFilterChange}/>
        {filteredCountries.map(country => (
          <p key={country.cca3}>{country.name.common} <button onClick={()=>setFilter(country.name.common)}> show</button></p> 
        ))}
      </>
    )
  }
}

export default App