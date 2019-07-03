import axios from 'axios'
const baseUrl = '/api/persons'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = newObject => {
  const request = axios.post(baseUrl, newObject)
  return request.then(response => response.data)
}

const erase = (id, setPersons, persons) => {
  const request = axios.delete(`${baseUrl}/${id}`)
  setPersons(persons.filter(person => person.id !== id))
  return request.then(response => response.data)
}

const update = newPerson => {
  const request = axios.put(`${baseUrl}/${newPerson.id}`, newPerson)
  return request.then(response => response.data)
}

export default { 
  getAll: getAll, 
  create: create,
  erase: erase,
  update: update
}