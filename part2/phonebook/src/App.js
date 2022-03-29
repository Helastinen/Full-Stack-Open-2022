import { useState, useEffect } from 'react'
import { PersonForm, Persons, FilterPersons } from './components/Persons'
import personsService from "./services/persons"

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")
  const [newFilter, setNewFilter] = useState("")

  useEffect(() => {
    personsService
      .getAll()
      .then(initialPersons => setPersons(initialPersons))
  }, [])

  const handleNewName = (e) => setNewName(e.target.value)
  const handleNewNumber = (e) => setNewNumber(e.target.value)

  const filteredPersons = newFilter 
  ? persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase())) 
  : persons

  const handleFilter = (e) => {
    setNewFilter(e.target.value)
  }

  const handleDelete = (person) => {    
    const message = `Delete \"${person.name}\"?`
    const result = window.confirm(message)

    if (result) {
      personsService
        .remove(person.id)
        .then(getAll => setPersons(getAll))
    }
  }

  const addPerson = (e) => {
    e.preventDefault()

    const personObj = {
      name: newName,
      number: newNumber,
    }

    if (persons.some(person => person.name === newName)) {
      return alert(`\"${newName}\" has already been added to the phonebook.`)
    }

    personsService
      .create(personObj)  
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName("")
        setNewNumber("")
      })
  }

  return (
    <div>
      <h1>Phonebook</h1>

        <h2>Search</h2>
          <div>
            <FilterPersons 
              newFilter={newFilter} 
              handleFilter={handleFilter} 
            />
          </div>
  
        <h2>Add person</h2>
          <div>
            <PersonForm 
              addPerson={addPerson} 
              newName= {newName} 
              handleNewName={handleNewName} 
              newNumber={newNumber} 
              handleNewNumber={handleNewNumber} 
            />
          </div>
  
        <h2>Numbers</h2>
          <ul>
            <Persons 
              persons={filteredPersons}
              handleDelete={handleDelete} 
            />
          </ul>
    </div>
  )
}

export default App