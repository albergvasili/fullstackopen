import { useState, useEffect } from 'react';

const App = () => {
  const [country, setCountry] = useState('');

  const changeCountry = (event) => {
    setCountry(event.target.value)
  }

  return(
    <>
      <h1>Country Data</h1>
      <p>
        Find country:
        <input value={country} onChange={changeCountry} type="text" />
      </p>
    </>
  )
};

export default App;
