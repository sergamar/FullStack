import React from 'react'

const Persons = (props) => (
    props.persons.filter(person => person.name.startsWith(props.newFilter)).map( person => <li key={person.name}>{person.name} {person.number}</li>)
)


export default Persons