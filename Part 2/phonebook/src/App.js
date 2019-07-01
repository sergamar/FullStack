import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setNewFilter ] = useState('')

  useEffect(() => {
    axios.get('http://localhost:3001/persons')
    .then(response => {
      setPersons(response.data)
    })
  }, [])

  const inputHandler = (event) => {
    event.preventDefault()
    const repeated = persons.find( (person) => person.name === newName)
    if(repeated !== undefined){
      window.alert(`${newName} is already added to phonebook`)
      return
    }
    if(newName === '' || newNumber === ''){
      window.alert(`Name and number fields cannot be empty`)
      return
    }
    const nameAux = {
      name: newName,
      Number: newNumber
    }
    setPersons(persons.concat(nameAux))
    setNewName('')
    setNewNumber('')
  }

  const nameUpdater = (event) => {
    setNewName(event.target.value)
  }

  const numberUpdater = (event) => {
    setNewNumber(event.target.value)
  }

  const filterUpdater = (event) => {
    setNewFilter(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
        <Filter filterUpdater={filterUpdater} newFilter={newFilter} />
      <h3>Add a new</h3>
        <PersonForm newName={newName} newNumber={newNumber} nameUpdater={nameUpdater} numberUpdater={numberUpdater} inputHandler={inputHandler} />
      <h3>Numbers</h3>
        <Persons newFilter={newFilter} persons={persons} />
    </div>
  )
}

export default App