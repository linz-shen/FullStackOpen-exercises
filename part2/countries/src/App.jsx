// src/App.jsx

import { useState, useEffect } from 'react'
import axios from 'axios'

// Weather component
const Weather = ({ capital }) => {
  const [weather, setWeather] = useState(null)
  const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY // Vite way to access env vars

  useEffect(() => {
    if (capital) {
      axios
        .get(`https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${apiKey}&units=metric`)
        .then(response => {
          setWeather(response.data)
        })
        .catch(error => {
          console.log("Error fetching weather data:", error)
          setWeather(null) // Reset weather on error
        })
    }
  }, [capital]) // Re-run effect if capital city changes

  if (!weather) {
    return <p>Loading weather data...</p>
  }

  return (
    <div>
      <h3>Weather in {capital}</h3>
      <p>temperature {weather.main.temp} Celsius</p>
      <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={weather.weather[0].description} />
      <p>wind {weather.wind.speed} m/s</p>
    </div>
  )
}

// Single country detailed view
const CountryDetail = ({ country }) => {
  return (
    <div>
      <h2>{country.name.common}</h2>
      <p>capital {country.capital[0]}</p>
      <p>area {country.area}</p>
      <h3>languages:</h3>
      <ul>
        {Object.values(country.languages).map(lang => <li key={lang}>{lang}</li>)}
      </ul>
      <img src={country.flags.png} alt={`Flag of ${country.name.common}`} width="150" />
      <Weather capital={country.capital[0]} />
    </div>
  )
}

// List of countries view
const CountryList = ({ countries, setFilter }) => {
  if (countries.length > 10) {
    return <p>Too many matches, specify another filter</p>
  }

  if (countries.length > 1) {
    return (
      <div>
        {countries.map(country => (
          <p key={country.cca3}>
            {country.name.common}
            <button onClick={() => setFilter(country.name.common)}>show</button>
          </p>
        ))}
      </div>
    )
  }

  if (countries.length === 1) {
    return <CountryDetail country={countries[0]} />
  }

  return <p>No matches found</p>
}


const App = () => {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const filteredCountries = filter
    ? countries.filter(country => country.name.common.toLowerCase().includes(filter.toLowerCase()))
    : [] // Initially show nothing until user types

  return (
    <div>
      find countries <input value={filter} onChange={handleFilterChange} />
      <CountryList countries={filteredCountries} setFilter={setFilter} />
    </div>
  )
}

export default App