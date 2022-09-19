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


const App = () => {
  const [country, setCountry] = useState('');


  const changeCountry = (event) => {
    setCountry(event.target.value)
  }

  return(
    <>
      <h1>Country Data</h1>
      <Search find='country' value={country} onChange={changeCountry} />
      <h2>Country</h2>
      <p></p>
    </>
  )
};

export default App;
