const PersonForm = ({ addPerson, newName, handleNewName, newNumber, handleNewNumber }) => {
  return (
    <>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNewName} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNewNumber} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </>
  )
}

const Persons = ({ persons }) => {
  return (
    persons.map(person => 
      <li key={person.id}>
        {person.name} - {person.number}
      </li>
    )
  )
}

const FilterPersons = ({ newFilter, handleFilter }) => {
  return(
    <div>
      Filter people by name: <input value={newFilter} onChange={handleFilter} />
      {/*Debug filter: {newFilter}*/}
    </div>
  ) 
} 

export { PersonForm, Persons, FilterPersons }