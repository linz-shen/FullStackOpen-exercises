// src/services/personService.js
import axios from 'axios'

const baseUrl = 'http://localhost:3001/persons'

// Function to get all persons
const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

// Function to create a new person
const create = newObject => {
  const request = axios.post(baseUrl, newObject)
  return request.then(response => response.data)
}

// Function to update an existing person's number
const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => response.data)
}

// Function to delete a person
const remove = id => {
  const request = axios.delete(`${baseUrl}/${id}`)
  return request.then(response => response.data)
}

export default { getAll, create, update, remove }