// src/App.jsx

import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/personService'
import Notification from './components/Notification' // Import the new Notification component

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  // New state for notifications
  const [notification, setNotification] = useState({ message: null, type: null })

  // Effect hook to fetch initial data
  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  // Helper function to show notifications
  const showNotification = (message, type) => {
    setNotification({ message, type })
    setTimeout(() => {
      setNotification({ message: null, type: null })
    }, 5000) // Notification disappears after 5 seconds
  }

  // Event handler for adding/updating a person
  const addPerson = (event) => {
    event.preventDefault()
    const existingPerson = persons.find(p => p.name.toLowerCase() === newName.toLowerCase())

    if (existingPerson) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const changedPerson = { ...existingPerson, number: newNumber }
        personService
          .update(existingPerson.id, changedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(p => p.id !== existingPerson.id ? p : returnedPerson))
            showNotification(`Updated ${returnedPerson.name}'s number`, 'success')
            setNewName('')
            setNewNumber('')
          })
          .catch(error => {
            // This handles the case where the person was already deleted (Exercise 2.20)
            showNotification(`Information of ${existingPerson.name} has already been removed from server`, 'error')
            setPersons(persons.filter(p => p.id !== existingPerson.id))
          })
      }
    } else {
      const personObject = { name: newName, number: newNumber }
      personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          showNotification(`Added ${returnedPerson.name}`, 'success')
          setNewName('')
          setNewNumber('')
        })
    }
  }

  // Event handler for deleting a person
  const handleDeleteOf = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      personService
        .remove(id)
        .then(() => {
          setPersons(persons.filter(p => p.id !== id))
          showNotification(`Deleted ${name}`, 'success')
        })
        .catch(error => {
          showNotification(`Information of '${name}' was already deleted from the server.`, 'error')
          setPersons(persons.filter(p => p.id !== id))
        })
    }
  }

  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)
  const handleFilterChange = (event) => setFilter(event.target.value)

  const personsToShow = filter
    ? persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
    : persons

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification notification={notification} /> {/* Add the Notification component here */}
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <h3>Add a new</h3>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h3>Numbers</h3>
      <Persons personsToShow={personsToShow} handleDelete={handleDeleteOf} />
    </div>
  )
}

export default App