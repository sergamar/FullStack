import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import Countries from './components/Countries'

const App = () => {
  const [ countries, setCountries] = useState([])
  const [ newFilter, setNewFilter ] = useState('')
  const [ newShow, setNewShow ] = useState(undefined)
  const [ newWeather, setNewWeather ] = useState(undefined)

  useEffect(() => {
    axios.get('https://restcountries.eu/rest/v2/all')
    .then(response => {
      setCountries(response.data)
    })
  }, [])

  const filterUpdater = (event) => {
    setNewFilter(event.target.value)
  }

  const changeShow = (country) => {
    setNewShow(country.name)
  }

  const showHandler = (event) => {
    setNewShow(event.target.id)
  }

  const hideHandler = () => {
    setNewFilter('')
    setNewShow(undefined)
  }

  return (
    <div>
        <Filter filterUpdater={filterUpdater} newFilter={newFilter} />
        <Countries newFilter={newFilter} countries={countries} showHandler={showHandler} 
        hideHandler={hideHandler} newShow={newShow} changeShow={changeShow} newWeather={newWeather} setNewWeather={setNewWeather}/>
    </div>
  )
}

export default App