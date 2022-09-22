import { useState, useEffect } from 'react';
import axios from 'axios';

const Search = ({ find, value, onChange }) => {
  return (
    <div>
      <p>
        Find {find}:
        <input value={value} onChange={onChange} type="text" />
      </p>
    </div>
  )
};

const Result = ({ result, show, onClick }) => {
    if (result.length >= 10){
      return <p>Too many matches, specify another filter</p>
    } else if (result.length > 1) {
      return(
        <div>
          {result.map(
            country => <MapResults key={country.name.common}
                                   name={country.name.common}
                                   onClick={onClick} />
          )}
        </div>
      )
  } else if (result.length === 1) {
    return <CountryData country={result} />
  }
};

const MapResults = ({ name, onClick }) => {
  return (
    <>
      <p>
        {name}
        <button value={name} onClick={onClick}>Show</button>
      </p>
    </>
  )
};

const CountryData = ({ country }) => {
  country = country[0];
  let languages = Object.values(country.languages);

  return (
    <div>
      <h2>{country.name.common}</h2>
      <p>Capital: {country.capital}</p>
      <p>Area: {country.area}</p>
      <p>Languages:</p>
      <ul>
        {languages.map(lang => <li key={lang}>{lang}</li>)}
      </ul>
      <img src={country.flags.png} alt="Country's flag" />
      <WeatherData city={country.capital} />
    </div>

  )
};

const WeatherData = ({ city }) => {
  const [weather, setWeather] = useState("");
  const url = "https://api.openweathermap.org/data/2.5/weather?q=";
  const appID = "&appid=";
  const api_key = process.env.REACT_APP_API_KEY;
  const units = "&units=metric";

  useEffect(() => {
    axios
      .get(url + city + appID + api_key + units)
      .then(response => {
        console.log("Weather:", response.data)
        setWeather({
          temp:response.data.main.temp,
          wind:response.data.wind.speed
        })
      })
  }, [api_key, city]);

  return (
    <div>
      <h3>Weather in {city}</h3>
      <p>Temperature {weather.temp}°C</p>
      <p>Wind {weather.wind} m/s</p>
    </div>
  )
};

const App = () => {
  const [country, setCountry] = useState('');
  const [result, setResult] = useState({});

  useEffect(() => {
    if (country){
      axios
        .get(`https://restcountries.com/v3.1/name/${country}`)
        .then(response => {
          console.log("Countries:", response.data)
          setResult(response.data)
        })
    }
  },[country]);

  const changeCountry = (event) => {
    setCountry(event.target.value)
  }

  const showData = (event) => {
    const name = event.target.value;
    const countryIndex = result.findIndex(
      country => country.name.common === name
    );
    setResult([result[countryIndex]]);
  }


  return(
    <>
      <h1>Country Data</h1>
      <Search find='country' value={country} onChange={changeCountry} />
      <Result result={result} onClick={showData} />
    </>
  )
};

export default App;
