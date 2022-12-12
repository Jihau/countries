import {useEffect, useState} from "react";
import './Styles/App.css';

import axios from "axios";
import Country from "./components/Country";
import CountryInfo from "./components/CountryInfo";
import Filter from './components/Filter';

const App = () => {
    const [filter, setFilter] = useState('')
    const [countries, setCountries] = useState([])



  useEffect(() => {
    axios
        .get('https://restcountries.com/v3.1/all')
        .then(response => {
          setCountries(response.data)
        })
  }, [])


  const handleFilterCountry = (event) => {
      setFilter(event.target.value)
  }

  const showCountries =
      filter === ""
          ? [] :
          countries.filter(country => country.name.common.toLowerCase().includes(filter.toLowerCase()))


  return (
    <div>
      <Filter value={filter} onChange={handleFilterCountry} />
        <div>
            {showCountries.length > 10 ? (
                "Too many matches, specify another filter"
            ): showCountries.length === 1 ? (
                <CountryInfo country={showCountries[0]} />
            ) : (showCountries.map(country => (
                <div key={country}>
                    <Country country={country} />
                </div>
            )))}
        </div>
    </div>
  );
}

export default App;
