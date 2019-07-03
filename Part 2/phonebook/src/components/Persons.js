import React from 'react'
import phoneService from '../services/phoneService'

const Persons = (props) => (
    props.persons.filter(person => person.name.startsWith(props.newFilter)).map( person => 
    <li key={person.id}>{person.name} {person.number} 
    <button onClick=
    {() => {if(window.confirm(`Do you really want to delete ${person.name}?`)){
    phoneService.erase(person.id, props.setPersons, props.persons)
    props.setMessage({
        class : 'success',
        text: `${person.name} deleted successfully!`
    })
    setTimeout( () => {
        props.setMessage(null)
    }, 5000)
}}}>Delete</button></li>))


export default Persons