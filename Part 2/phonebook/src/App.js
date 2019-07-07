import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import phoneService from './services/phoneService'
import Message from './components/Message'

const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setNewFilter ] = useState('')
  const [ message, setMessage ] = useState(null)

  useEffect(() => {
    phoneService.getAll().then(persons => setPersons(persons))
  }, [])

  const inputHandler = (event) => {
    event.preventDefault()
    const repeated = persons.find( (person) => person.name === newName)
    if(repeated !== undefined){
      if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)){
        phoneService.update({...repeated, number: newNumber}).then(edited => {
          setPersons(persons.map(person => person.name !== newName ? person : edited))
        }).catch(error => {
          setMessage({
            class: 'error',
            text: `${newName} has been deleted from the server by another user`
          })
          setTimeout(() => {
            setMessage(null)
          }, 5000)
          setPersons(persons.filter(person => person.name !== newName))
        })
        setMessage({
          class: 'success',
          text: newName + '\'s phone number edited successfully!'
        })
        setTimeout(() =>{
          setMessage(null)
        }, 5000)
      }
      return
    }
    if(newName === '' || newNumber === ''){
      setMessage({
        class: 'error',
        text: 'Name nor number can be empty'
      })
      setTimeout(() =>{
        setMessage(null)
      }, 5000)
      return
    }
    const newPerson = {
      name: newName,
      number: newNumber
    }
    phoneService.create(newPerson).then(data => {
      setPersons(persons.concat(data))
      setMessage({
        class: 'success',
        text: `${newName} registered successfully!`
      })
      setTimeout(() =>{
        setMessage(null)
      }, 5000)
    }).catch(error => {
      setMessage({
        class: 'error',
        text: error.response.data.error
      })
      setTimeout(() => {
        setMessage(null)
      }, 5000)
      return
    })
    
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
        <Message message={message} />
        <Filter filterUpdater={filterUpdater} newFilter={newFilter} />
      <h3>Add a new</h3>
        <PersonForm newName={newName} newNumber={newNumber} nameUpdater={nameUpdater} 
        numberUpdater={numberUpdater} inputHandler={inputHandler} />
      <h3>Numbers</h3>
        <Persons newFilter={newFilter} persons={persons} setPersons={setPersons} setMessage={setMessage}/>
    </div>
  )
}

export default App