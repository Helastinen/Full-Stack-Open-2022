import { useState } from 'react'
import { PersonForm, Persons, FilterPersons } from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")
  const [newFilter, setNewFilter] = useState("")

  const handleNewName = (e) => setNewName(e.target.value)
  const handleNewNumber = (e) => setNewNumber(e.target.value)

  const filteredPersons = newFilter 
  ? persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase())) 
  : persons

  const handleFilter = (e) => {
    setNewFilter(e.target.value)
    setPersons(filteredPersons)
  }

  const addPerson = (e) => {
    e.preventDefault()

    const personObj = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    }

    if (persons.some(person => person.name === newName)) {
      return alert(
        `\"${newName}\" has already been added to the phonebook.`
      )
    }

    setPersons(persons.concat(personObj))
    setNewName("")
    setNewNumber("")
  }

  return (
    <div>
      <h1>Phonebook</h1>

        <h2>Search</h2>
          <FilterPersons newFilter={newFilter} handleFilter={handleFilter} />
  
        <h2>Add person</h2>
          <div>
            <PersonForm 
            addPerson={addPerson} 
            newName= {newName} 
            handleNewName={handleNewName} 
            newNumber={newNumber} 
            handleNewNumber={handleNewNumber} />
          </div>
  
        <h2>Numbers</h2>
          <ul>
            <Persons persons={filteredPersons} />
          </ul>
    </div>
  )
}

export default App