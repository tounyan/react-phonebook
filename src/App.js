import React, { useState, useEffect } from 'react'
import Person from './components/Person'
import AddForm from './components/AddForm'
import Filter from './components/Filter'
import Notification from './components/Notification'
import personsService from './services/persons'

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setNewFilter ] = useState('')
  const [ notificationMessage, setNotificationMessage] = useState(null)
  const [ isSuccessful, setIsSuccessful ] = useState(true)

  useEffect(() => {
    personsService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const addPerson = () => {
    let newPerson = {
      name: newName,
      number: newNumber
    }
    personsService
      .create(newPerson)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewNumber('')
        setNewName('')
        setIsSuccessful(true)
        setNotificationMessage(`${returnedPerson.name} has been added to Phonebook`)
        setTimeout(() => {setNotificationMessage(null)}, 5000)
      })
  }

  const updatePerson = (person) => {
    if(window.confirm(`${person.name} is already in the phonebook. Update new number?`)) {
      let updatedPerson = {...person, number: newNumber}
      personsService
        .update(person.id, updatedPerson)
        .then(returnedPerson => {
          setPersons(persons.map(p => p.id !== person.id ? p : returnedPerson))
          setNewName('')
          setNewNumber('')
          setIsSuccessful(true)
          setNotificationMessage(`${returnedPerson.name} has been updated`)
          setTimeout(() => {setNotificationMessage(null)}, 5000)
        })
    }
  }

  const addOrUpdatePerson = (event) => {
    event.preventDefault()
    let p = persons.find(person => person.name.toLowerCase() === newName.toLowerCase())
    if (p == null) addPerson()
    else updatePerson(p)
  }

  const removePerson = (person) => {
    if (window.confirm(`Remove ${person.name}?`)) {
      personsService
        .remove(person.id)
        .then(response => {
          setPersons(persons.filter(p => p.id !== person.id))
          setIsSuccessful(true)
          setNotificationMessage(`${person.name} has been removed`)
          setTimeout(() => {setNotificationMessage(null)}, 5000)
        })
        .catch(error => {
          setPersons(persons.filter(p => p.id !== person.id))
          setIsSuccessful(false)
          setNotificationMessage(`Sorry, ${person.name} has been deleted from the server`)
          setTimeout(() => {setNotificationMessage(null)}, 5000)
        })
    }
  }

  const handleNameInputChange = (event) => setNewName(event.target.value)
  const handleNumberInputChange = (event) => setNewNumber(event.target.value)
  const handleFilter = (event) => setNewFilter(event.target.value)

  const personsToShow = persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notificationMessage} isSuccessful={isSuccessful}/>
      <AddForm
        newName={newName}
        newNumber={newNumber}
        handleNameInputChange={handleNameInputChange}
        handleNumberInputChange={handleNumberInputChange}
        addOrUpdatePerson={addOrUpdatePerson}
      />
      <h2>Search</h2>
      <Filter
        newFilter={newFilter}
        handleFilter={handleFilter}
      />
      <h2>Numbers</h2>
      {personsToShow.map(person => 
        <Person
          key={person.name} 
          person={person} 
          removePerson={() => removePerson(person)}
        />
      )}
    </div>
  )
}

export default App