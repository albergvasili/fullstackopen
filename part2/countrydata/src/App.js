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

const Result = ({ result }) => {
    if (result.length >= 10){
      return <p>Too many matches, specify another filter</p>
    } else if (result.length > 1) {
      return(
        <div>
          {result.map(
            country => <p key={country.name.common}>{country.name.common}</p>
          )}
        </div>
      )
  }
};

const App = () => {
  const [country, setCountry] = useState('');
  const [result, setResult] = useState({});

  useEffect(() => {
    if (country){
      axios
        .get(`https://restcountries.com/v3.1/name/${country}`)
        .then(response => {
          console.log(response)
          setResult(response.data)
        })
    }
  },[country])

  const changeCountry = (event) => {
    setCountry(event.target.value)
  }

  return(
    <>
      <h1>Country Data</h1>
      <Search find='country' value={country} onChange={changeCountry} />
      <Result result={result}/>
    </>
  )
};

export default App;
